import { Participant, UserId } from '../types';

export const PARTICIPANTS: Record<UserId, Participant> = {
  ellen: {
    id: 'ellen',
    name: 'Ellen',
    role: '13 år',
    age: 13,
    dailyTarget: 8,
    totalTarget: 112,
    accentColor: '#52796F',
    softBg: '#E9F1EE',
    textColor: '#2F4F4F',
    borderColor: '#84A98C',
    avatarIcon: '🌿',
    favoriteOrder: 'Varm choklad med marshmallows & bokmärke',
    favoriteGenre: 'Äventyr & Manga',
  },
  tilde: {
    id: 'tilde',
    name: 'Tilde',
    role: '15 år',
    age: 15,
    dailyTarget: 30,
    totalTarget: 420,
    accentColor: '#BC6C25',
    softBg: '#FDF6EE',
    textColor: '#703A00',
    borderColor: '#DDA15E',
    avatarIcon: '☕',
    favoriteOrder: 'Isad vaniljlatte & en bra fantasyroman',
    favoriteGenre: 'Fantasy & YA Spänning',
  },
  lisa: {
    id: 'lisa',
    name: 'Lisa',
    role: 'Mamma',
    dailyTarget: 20,
    totalTarget: 280,
    accentColor: '#9C6644',
    softBg: '#F7EFE9',
    textColor: '#573319',
    borderColor: '#B08968',
    avatarIcon: '📖',
    favoriteOrder: 'Kardemummakaffe & en varm feelgood-bok',
    favoriteGenre: 'Historiska romaner & Biografier',
  },
  mange: {
    id: 'mange',
    name: 'Mange',
    role: 'Pappa',
    dailyTarget: 2,
    totalTarget: 20,
    accentColor: '#6F4E37',
    softBg: '#F5EBE6',
    textColor: '#422817',
    borderColor: '#A47148',
    avatarIcon: '🥐',
    favoriteOrder: 'Stark espresso & en färsk kanelbulle',
    favoriteGenre: 'Spänning & Facklitteratur',
  },
};

export const PARTICIPANT_LIST: Participant[] = Object.values(PARTICIPANTS);

export const TOTAL_GOAL_PAGES = 1000;
export const PAGES_PER_STEP = 10;
export const TOTAL_STEPS = 100;
export const CHALLENGE_DAYS = 14;
