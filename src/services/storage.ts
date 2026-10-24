/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReadingEntry, UserId } from '../types';
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  query,
  orderBy,
  Firestore,
} from 'firebase/firestore';

export const INITIAL_SAMPLE_READS: ReadingEntry[] = [];

// Lisa & familjens Firebase-inställningar
const FIREBASE_CONFIG = {
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

function getDatabase(): Firestore | null {
  if (firestoreInstance) return firestoreInstance;
  try {
    const app = getApps().length > 0 ? getApp() : initializeApp(FIREBASE_CONFIG);
    firestoreInstance = getFirestore(app);
    return firestoreInstance;
  } catch (err) {
    console.error('Kunde inte starta Firebase Firestore:', err);
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
          console.error('Firestore snapshot listener error:', error);
          const fallback = getLocalEntries();
          callback(fallback, false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Kunde inte lyssna på Firestore:', err);
    }
  }

  const initial = getLocalEntries();
  callback(initial, false);

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

function getLocalEntries(): ReadingEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('cozy_cafe_entries');
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
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
      console.error('Kunde inte spara till Firestore, sparar lokalt:', e);
    }
  }

  if (typeof window !== 'undefined') {
    const local = getLocalEntries();
    const mockEntry: ReadingEntry = {
      id: `local-${timestamp}`,
      ...newEntryPayload,
    } as unknown as ReadingEntry;
    const updated = [mockEntry, ...local];
    localStorage.setItem('cozy_cafe_entries', JSON.stringify(updated));

    if (broadcastChannel) {
      broadcastChannel.postMessage({ type: 'UPDATE_ENTRIES' });
    }
  }
}
