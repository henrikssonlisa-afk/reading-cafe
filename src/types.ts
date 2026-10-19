export type UserId = 'ellen' | 'tilde' | 'lisa' | 'mange';

export interface Participant {
  id: UserId;
  name: string;
  role: string;
  age?: number;
  dailyTarget: number; // pages per day
  totalTarget: number; // pages for 14 days
  accentColor: string;
  softBg: string;
  textColor: string;
  borderColor: string;
  avatarIcon: string;
  favoriteOrder: string;
  favoriteGenre: string;
}

export interface ReadingEntry {
  id: string;
  userId: UserId;
  pages: number;
  bookTitle?: string;
  note?: string;
  rating?: number; // 1-5
  date: string; // YYYY-MM-DD
  createdAt: number; // timestamp
  reactions?: {
    heart?: number;
    coffee?: number;
    star?: number;
    book?: number;
  };
}

export interface CafeMilestone {
  step: number; // 1 - 100
  requiredPages: number; // step * 10
  phase: 1 | 2 | 3 | 4;
  title: string;
  description: string;
  category: 'structure' | 'furniture' | 'coffee' | 'books' | 'plants' | 'decor' | 'ceramic';
  icon: string;
}

export interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  databaseURL?: string;
}
