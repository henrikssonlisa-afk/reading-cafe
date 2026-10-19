import React, { useState } from 'react';
import { UserId } from '../types';
import { PARTICIPANT_LIST, PARTICIPANTS } from '../data/participants';
import { CharacterAvatar } from './CharacterAvatar';
import { BookOpen, Star, Plus, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playChimeSound, playPageTurnSound, playCelebrationSound } from '../services/sound';

interface LogReadingModalProps {
  initialUserId: UserId;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    userId: UserId;
    pages: number;
    bookTitle?: string;
    note?: string;
    rating?: number;
    date: string;
  }) => Promise<void>;
  recentBooks: string[];
}

export const LogReadingModal: React.FC<LogReadingModalProps> = ({
  initialUserId,
  isOpen,
  onClose,
  onSubmit,
  recentBooks,
}) => {
  const [selectedUser, setSelectedUser] = useState<UserId>(initialUserId);
  const [pages, setPages] = useState<number>(15);
  const [bookTitle, setBookTitle] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Sync if initialUserId changed when opened
  React.useEffect(() => {
    setSelectedUser(initialUserId);
  }, [initialUserId, isOpen]);

  if (!isOpen) return null;

  const quickChips = [5, 10, 15, 20, 30, 50];
  const activeUser = PARTICIPANTS[selectedUser];
  const stepsEarned = Math.floor(pages / 10);
  const remainderPages = pages % 10;

  const handleQuickAdd = (amount: number) => {
    playPageTurnSound();
    setPages((prev) => Math.max(1, prev + amount));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pages <= 0 || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        userId: selectedUser,
        pages: Number(pages),
        bookTitle: bookTitle.trim() || undefined,
        note: note.trim() || undefined,
        rating: rating || undefined,
        date,
      });

      // Celebration effects!
      playChimeSound();
      if (pages >= 25) {
        playCelebrationSound();
      }

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#52796F', '#BC6C25', '#DDA15E', '#84A98C', '#9C6644'],
      });

      onClose();
    } catch (err) {
      console.error('Error logging pages:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#faf6f0] border-2 border-[#422e1b] rounded-3xl p-6 sm:p-7 shadow-2xl overflow-y-auto max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#ebdcd0]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#52796F] text-white flex items-center justify-center text-lg shadow-xs">
              📚
            </div>
            <div>
              <h2 className="text-lg font-bold font-display text-[#2b2118]">Logga lästa sidor</h2>
              <p className="text-xs text-[#7d6855]">Varje 10 sidor bygger 1 nytt steg i caféet</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8c7460] hover:text-[#2b2118] text-sm rounded-lg hover:bg-[#ede3d4] transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Member Picker */}
          <div>
            <label className="block text-xs font-semibold text-[#5c4a3b] mb-1.5">Vem har läst?</label>
            <div className="grid grid-cols-4 gap-2">
              {PARTICIPANT_LIST.map((p) => {
                const isSelected = p.id === selectedUser;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      playPageTurnSound();
                      setSelectedUser(p.id);
                    }}
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-2xl border-2 text-xs transition-all ${
                      isSelected
                        ? 'bg-white border-[#422e1b] text-[#2b2118] font-bold shadow-xs ring-2 ring-[#52796F]'
                        : 'bg-[#f4eee5] border-[#ded4c6] text-[#6b5847] hover:bg-white'
                    }`}
                  >
                    <CharacterAvatar userId={p.id} size="sm" showBorder={false} className="mb-1" />
                    <span className="truncate w-full text-center font-bold">{p.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Number of Pages Input & Quick Chips */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#e5dcd0]">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="pages-input" className="text-xs font-semibold text-[#5c4a3b]">
                Antal lästa sidor
              </label>
              <span className="text-xs font-bold text-[#52796F]">
                +{stepsEarned} {stepsEarned === 1 ? 'byggsteg' : 'byggsteg'}
                {remainderPages > 0 ? ` (+${remainderPages}s mot nästa)` : ''}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <input
                id="pages-input"
                type="number"
                min={1}
                max={500}
                required
                value={pages || ''}
                onChange={(e) => setPages(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-28 px-3 py-2 text-2xl font-bold font-display text-[#2b2118] bg-[#faf6f0] border border-[#d6c7b6] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#52796F]"
              />

              {/* Quick Increment Buttons */}
              <div className="flex flex-wrap gap-1.5 flex-1">
                {quickChips.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleQuickAdd(amount)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#f4eee5] hover:bg-[#ede2d2] text-[#4d3d2f] border border-[#decbb8] transition-colors"
                  >
                    +{amount}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Book Title */}
          <div>
            <label htmlFor="book-title" className="block text-xs font-semibold text-[#5c4a3b] mb-1">
              Boktitel (frivilligt)
            </label>
            <input
              id="book-title"
              type="text"
              placeholder="T.ex. Percy Jackson, Harry Potter, Ett litet liv..."
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#d8ccbe] rounded-xl text-[#2b2118] focus:outline-hidden focus:ring-2 focus:ring-[#52796F] placeholder:text-[#a89888]"
            />
            {recentBooks.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-1.5 text-[11px] text-[#7d6855]">
                <span>Tidigare lästa:</span>
                {recentBooks.slice(0, 3).map((title, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setBookTitle(title)}
                    className="px-2 py-0.5 rounded-md bg-[#ede3d4] hover:bg-[#dfd3c2] text-[#423223] transition-colors truncate max-w-[150px]"
                  >
                    {title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date & Rating Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="reading-date" className="block text-xs font-semibold text-[#5c4a3b] mb-1">
                Datum
              </label>
              <input
                id="reading-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#d8ccbe] rounded-xl text-[#2b2118] focus:outline-hidden focus:ring-2 focus:ring-[#52796F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5c4a3b] mb-1">Betyg på läsningen</label>
              <div className="flex items-center gap-1.5 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-lg transition-transform hover:scale-125 ${
                      star <= rating ? 'text-[#e5a83b]' : 'text-[#d6c7b6]'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Note / Quote */}
          <div>
            <label htmlFor="reading-note" className="block text-xs font-semibold text-[#5c4a3b] mb-1">
              En tanke, favoritcitat eller känsla (frivilligt)
            </label>
            <textarea
              id="reading-note"
              rows={2}
              placeholder="Vad hände i boken? Hur kändes det att läsa idag?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white border border-[#d8ccbe] rounded-xl text-[#2b2118] focus:outline-hidden focus:ring-2 focus:ring-[#52796F] placeholder:text-[#a89888]"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || pages <= 0}
              className="w-full py-3.5 px-4 bg-[#52796F] hover:bg-[#42655c] active:scale-98 disabled:opacity-50 text-white font-bold rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#f0e6d6]" />
              <span>Spara & Bygg Caféet ({pages} sidor)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
