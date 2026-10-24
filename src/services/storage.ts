/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReadingEntry, UserId, ReactionType } from '../types';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  Firestore,
} from 'firebase/firestore';

export const INITIAL_SAMPLE_READS: ReadingEntry[] = [];

// Lisa & familjens Firebase-inställningar
export const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAk0Idtztu1oWXfFHqcXC7DuUWTpmVqxMY",
  authDomain: "reading-cafe.firebaseapp.com",
  projectId: "reading-cafe",
  storageBucket: "reading-cafe.firebasestorage.app",
  messagingSenderId: "513439624067",
  appId: "1:513439624067:web:7462566672e8689ec8a4b6"
};

let firestoreInstance: Firestore | null = null;
let broadcastChannel: BroadcastChannel | null = null;

try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    broadcastChannel = new BroadcastChannel('cozy_cafe_channel');
  }
} catch (e) {
  console.warn('BroadcastChannel not supported', e);
}

export function getStoredFirebaseConfig() {
  if (typeof window === 'undefined') return DEFAULT_FIREBASE_CONFIG;
  const stored = localStorage.getItem('cozy_cafe_firebase_config');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return DEFAULT_FIREBASE_CONFIG;
    }
  }
  return DEFAULT_FIREBASE_CONFIG;
}

export function saveFirebaseConfig(config: any): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cozy_cafe_firebase_config', JSON.stringify(config));
  firestoreInstance = null;
}

function getDatabase(): Firestore | null {
  if (firestoreInstance) return firestoreInstance;
  try {
    const config = getStoredFirebaseConfig();
    const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(config);
    firestoreInstance = getFirestore(app);
    return firestoreInstance;
  } catch (err) {
    console.error('Kunde inte initiera Firebase:', err);
    return null;
  }
}

export function getCurrentUser(): UserId | null {
  if (typeof window === 'undefined') return null;
  return (localStorage.getItem('cozy_cafe_current_user') as UserId) || null;
}

export function setCurrentUser(userId: UserId): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cozy_cafe_current_user', userId);
}

export function clearCurrentUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('cozy_cafe_current_user');
}

export function getLocalEntries(): ReadingEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('cozy_cafe_entries');
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function setLocalEntries(entries: ReadingEntry[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cozy_cafe_entries', JSON.stringify(entries));
  if (broadcastChannel) {
    broadcastChannel.postMessage({ type: 'UPDATE_ENTRIES' });
  }
}

export function subscribeToReadingEntries(
  callback: (entries: ReadingEntry[], isFirebase: boolean) => void
): () => void {
  const db = getDatabase();

  if (db) {
    try {
      const q = query(collection(db, 'reading_entries'), orderBy('timestamp', 'desc'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const list: ReadingEntry[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            list.push({
              id: docSnap.id,
              userId: data.userId,
              pages: Number(data.pages) || 0,
              bookTitle: data.bookTitle || '',
              note: data.note || '',
              rating: data.rating || 5,
              date: data.date || new Date().toISOString().split('T')[0],
              createdAt: data.createdAt || Date.now(),
              reactions: data.reactions || { heart: 0, star: 0, coffee: 0 },
            } as ReadingEntry);
          });

          if (typeof window !== 'undefined') {
            localStorage.setItem('cozy_cafe_entries', JSON.stringify(list));
          }
          callback(list, true);
        },
        (error) => {
          console.error('Firestore listener error:', error);
          callback(getLocalEntries(), false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Kunde inte prenumerera på Firestore:', err);
    }
  }

  callback(getLocalEntries(), false);

  const handleStorage = (e: StorageEvent) => {
    if (e.key === 'cozy_cafe_entries') {
      callback(getLocalEntries(), false);
    }
  };

  const handleBroadcast = (e: MessageEvent) => {
    if (e.data?.type === 'UPDATE_ENTRIES') {
      callback(getLocalEntries(), false);
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorage);
  }
  if (broadcastChannel) {
    broadcastChannel.addEventListener('message', handleBroadcast);
  }

  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorage);
    }
    if (broadcastChannel) {
      broadcastChannel.removeEventListener('message', handleBroadcast);
    }
  };
}

export async function addReadingEntry(entry: {
  userId: UserId;
  pages: number;
  bookTitle?: string;
  note?: string;
  rating?: number;
  date: string;
}): Promise<void> {
  const db = getDatabase();
  const timestamp = Date.now();

  const newEntryPayload = {
    userId: entry.userId,
    pages: Number(entry.pages) || 0,
    bookTitle: entry.bookTitle || '',
    note: entry.note || '',
    rating: entry.rating || 5,
    date: entry.date,
    createdAt: timestamp,
    timestamp: timestamp,
    reactions: { heart: 0, star: 0, coffee: 0 },
  };

  if (db) {
    try {
      await addDoc(collection(db, 'reading_entries'), newEntryPayload);
      return;
    } catch (e) {
      console.error('Kunde inte spara i Firestore, sparar lokalt:', e);
    }
  }

  const local = getLocalEntries();
  const mockEntry: ReadingEntry = {
    id: `local-${timestamp}`,
    ...newEntryPayload,
  } as unknown as ReadingEntry;
  setLocalEntries([mockEntry, ...local]);
}

export async function removeReadingEntry(id: string): Promise<void> {
  const db = getDatabase();
  if (db && !id.startsWith('local-')) {
    try {
      await deleteDoc(doc(db, 'reading_entries', id));
      return;
    } catch (err) {
      console.error('Kunde inte ta bort ur Firestore:', err);
    }
  }

  const current = getLocalEntries().filter((e) => e.id !== id);
  setLocalEntries(current);
}

export async function addReactionToEntry(id: string, reactionType: ReactionType): Promise<void> {
  const db = getDatabase();
  const entries = getLocalEntries();
  const target = entries.find((e) => e.id === id);

  if (!target) return;

  const currentReactions = target.reactions || { heart: 0, star: 0, coffee: 0 };
  const updatedReactions = {
    ...currentReactions,
    [reactionType]: (currentReactions[reactionType] || 0) + 1,
  };

  if (db && !id.startsWith('local-')) {
    try {
      await updateDoc(doc(db, 'reading_entries', id), {
        reactions: updatedReactions,
      });
      return;
    } catch (err) {
      console.error('Kunde inte uppdatera reaktion i Firestore:', err);
    }
  }

  const updatedEntries = entries.map((e) =>
    e.id === id ? { ...e, reactions: updatedReactions } : e
  );
  setLocalEntries(updatedEntries);
}

export async function resetChallengeData(): Promise<void> {
  setLocalEntries([]);
}
