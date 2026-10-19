import { FirebaseConfig, ReadingEntry, UserId } from '../types';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  Firestore,
  query,
  orderBy
} from 'firebase/firestore';

const LOCAL_STORAGE_READS_KEY = 'cozy_cafe_reads_v2';
const LOCAL_STORAGE_FIREBASE_KEY = 'cozy_cafe_firebase_config_v1';
const LOCAL_STORAGE_USER_KEY = 'cozy_cafe_current_user_v1';

// Initial sample reads so the app has immediate life on first load, demonstrating the phases and progress
export const INITIAL_SAMPLE_READS: ReadingEntry[] = [
  {
    id: 'sample-1',
    userId: 'ellen',
    pages: 18,
    bookTitle: 'Percy Jackson & Född till hjälte',
    note: 'Så spännande! Kunde inte sluta läsa kapitlet om minotauren.',
    rating: 5,
    date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    createdAt: Date.now() - 2 * 86400000,
    reactions: { heart: 3, star: 2, coffee: 1 },
  },
  {
    id: 'sample-2',
    userId: 'tilde',
    pages: 35,
    bookTitle: 'A Court of Thorns and Roses',
    note: 'Underbar världsbyggnad. Älskar karaktärerna!',
    rating: 5,
    date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    createdAt: Date.now() - 2 * 86400000 + 3600000,
    reactions: { star: 4, heart: 2 },
  },
  {
    id: 'sample-3',
    userId: 'lisa',
    pages: 25,
    bookTitle: 'Ett litet liv',
    note: 'Väldigt berörande och vackert skrivet.',
    rating: 4,
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    createdAt: Date.now() - 86400000,
    reactions: { coffee: 2, heart: 3 },
  },
  {
    id: 'sample-4',
    userId: 'mange',
    pages: 10,
    bookTitle: 'Kaffe: Från böna till kopp',
    note: 'Perfekt bok till morgonkaffet!',
    rating: 4,
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    createdAt: Date.now() - 86400000 + 7200000,
    reactions: { coffee: 4, heart: 1 },
  },
  {
    id: 'sample-5',
    userId: 'ellen',
    pages: 22,
    bookTitle: 'Percy Jackson & Född till hjälte',
    note: 'Läste i sängen innan läggdags, så mysigt!',
    rating: 5,
    date: new Date().toISOString().split('T')[0],
    createdAt: Date.now() - 14400000,
    reactions: { heart: 4, book: 3 },
  },
  {
    id: 'sample-6',
    userId: 'tilde',
    pages: 40,
    bookTitle: 'A Court of Thorns and Roses',
    note: 'Klarade dagens mål med råge! Nu är caféet ännu finare.',
    rating: 5,
    date: new Date().toISOString().split('T')[0],
    createdAt: Date.now() - 7200000,
    reactions: { star: 3, heart: 3, coffee: 2 },
  },
];

let firestoreInstance: Firestore | null = null;
let broadcastChannel: BroadcastChannel | null = null;

try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    broadcastChannel = new BroadcastChannel('cozy_cafe_channel');
  }
} catch {
  // BroadcastChannel not supported or restricted
}

export function getCurrentUser(): UserId | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
  if (stored && ['ellen', 'tilde', 'lisa', 'mange'].includes(stored)) {
    return stored as UserId;
  }
  return null;
}

export function setCurrentUser(userId: UserId): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_STORAGE_USER_KEY, userId);
}

export function clearCurrentUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
}

export function getStoredFirebaseConfig(): FirebaseConfig | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(LOCAL_STORAGE_FIREBASE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && parsed.projectId && parsed.apiKey) {
      return parsed;
    }
  } catch {
    // invalid JSON
  }
  return null;
}

export function saveFirebaseConfig(config: FirebaseConfig | null): void {
  if (typeof window === 'undefined') return;
  if (!config) {
    localStorage.removeItem(LOCAL_STORAGE_FIREBASE_KEY);
    firestoreInstance = null;
    return;
  }
  localStorage.setItem(LOCAL_STORAGE_FIREBASE_KEY, JSON.stringify(config));
  initFirebase(config);
}

export function initFirebase(config?: FirebaseConfig | null): Firestore | null {
  const conf = config || getStoredFirebaseConfig();
  if (!conf || !conf.projectId || !conf.apiKey) {
    firestoreInstance = null;
    return null;
  }

  try {
    let app: FirebaseApp;
    const existingApps = getApps();
    if (existingApps.length > 0) {
      app = getApp();
    } else {
      app = initializeApp({
        apiKey: conf.apiKey,
        authDomain: conf.authDomain || `${conf.projectId}.firebaseapp.com`,
        projectId: conf.projectId,
        storageBucket: conf.storageBucket || `${conf.projectId}.appspot.com`,
        messagingSenderId: conf.messagingSenderId,
        appId: conf.appId,
        databaseURL: conf.databaseURL,
      });
    }
    firestoreInstance = getFirestore(app);
    return firestoreInstance;
  } catch (err) {
    console.warn('Could not initialize Firebase:', err);
    firestoreInstance = null;
    return null;
  }
}

export function getLocalReads(): ReadingEntry[] {
  if (typeof window === 'undefined') return INITIAL_SAMPLE_READS;
  const raw = localStorage.getItem(LOCAL_STORAGE_READS_KEY);
  if (!raw) {
    // Seed with initial sample reads
    localStorage.setItem(LOCAL_STORAGE_READS_KEY, JSON.stringify(INITIAL_SAMPLE_READS));
    return INITIAL_SAMPLE_READS;
  }
  try {
    const list = JSON.parse(raw);
    if (Array.isArray(list)) return list;
  } catch {
    // fallback
  }
  return INITIAL_SAMPLE_READS;
}

export function saveLocalReads(reads: ReadingEntry[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_STORAGE_READS_KEY, JSON.stringify(reads));
  if (broadcastChannel) {
    broadcastChannel.postMessage({ type: 'READS_UPDATED', reads });
  }
}

export function subscribeToReadingEntries(callback: (reads: ReadingEntry[], isFirebase: boolean) => void): () => void {
  const db = initFirebase();

  // If Firebase is configured and available
  if (db) {
    try {
      const q = query(collection(db, 'cafe_reads'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const list: ReadingEntry[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            list.push({
              id: docSnap.id,
              userId: data.userId || 'ellen',
              pages: Number(data.pages) || 0,
              bookTitle: data.bookTitle || '',
              note: data.note || '',
              rating: data.rating,
              date: data.date || new Date().toISOString().split('T')[0],
              createdAt: data.createdAt || Date.now(),
              reactions: data.reactions || {},
            });
          });

          // Save local backup as well
          saveLocalReads(list);
          callback(list, true);
        },
        (err) => {
          console.warn('Firestore subscription failed, falling back to local storage:', err);
          callback(getLocalReads(), false);
        }
      );

      return () => unsubscribe();
    } catch (e) {
      console.warn('Error starting Firestore listener:', e);
    }
  }

  // Fallback: LocalStorage + cross-tab synchronization
  callback(getLocalReads(), false);

  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === LOCAL_STORAGE_READS_KEY) {
      callback(getLocalReads(), false);
    }
  };

  const handleBroadcastMessage = (e: MessageEvent) => {
    if (e.data?.type === 'READS_UPDATED' && Array.isArray(e.data.reads)) {
      callback(e.data.reads, false);
    }
  };

  window.addEventListener('storage', handleStorageChange);
  if (broadcastChannel) {
    broadcastChannel.addEventListener('message', handleBroadcastMessage);
  }

  return () => {
    window.removeEventListener('storage', handleStorageChange);
    if (broadcastChannel) {
      broadcastChannel.removeEventListener('message', handleBroadcastMessage);
    }
  };
}

export async function addReadingEntry(entry: Omit<ReadingEntry, 'id' | 'createdAt'>): Promise<void> {
  const newEntry: ReadingEntry = {
    ...entry,
    id: 'read_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    createdAt: Date.now(),
    reactions: {},
  };

  const db = firestoreInstance || initFirebase();
  if (db) {
    try {
      await addDoc(collection(db, 'cafe_reads'), {
        userId: newEntry.userId,
        pages: newEntry.pages,
        bookTitle: newEntry.bookTitle || '',
        note: newEntry.note || '',
        rating: newEntry.rating || 0,
        date: newEntry.date,
        createdAt: newEntry.createdAt,
        reactions: {},
      });
      return;
    } catch (err) {
      console.warn('Failed to save to Firestore, saving locally:', err);
    }
  }

  // Local storage save
  const current = getLocalReads();
  const updated = [newEntry, ...current];
  saveLocalReads(updated);
}

export async function removeReadingEntry(id: string): Promise<void> {
  const db = firestoreInstance || initFirebase();
  if (db) {
    try {
      await deleteDoc(doc(db, 'cafe_reads', id));
      return;
    } catch (err) {
      console.warn('Failed to delete from Firestore, removing locally:', err);
    }
  }

  const current = getLocalReads();
  const updated = current.filter((r) => r.id !== id);
  saveLocalReads(updated);
}

export async function addReactionToEntry(
  id: string,
  reaction: 'heart' | 'coffee' | 'star' | 'book'
): Promise<void> {
  const current = getLocalReads();
  const entry = current.find((r) => r.id === id);
  if (!entry) return;

  const currentReactions = entry.reactions || {};
  const currentCount = currentReactions[reaction] || 0;
  const updatedReactions = {
    ...currentReactions,
    [reaction]: currentCount + 1,
  };

  const db = firestoreInstance || initFirebase();
  if (db) {
    try {
      const entryRef = doc(db, 'cafe_reads', id);
      await updateDoc(entryRef, {
        reactions: updatedReactions,
      });
      return;
    } catch {
      // fallback to local update
    }
  }

  const updated = current.map((item) =>
    item.id === id ? { ...item, reactions: updatedReactions } : item
  );
  saveLocalReads(updated);
}

export function resetChallengeData(mode: 'fresh' | 'sample'): void {
  if (mode === 'fresh') {
    saveLocalReads([]);
  } else {
    saveLocalReads(INITIAL_SAMPLE_READS);
  }
}
