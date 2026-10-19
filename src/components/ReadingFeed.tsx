import React from 'react';
import { ReadingEntry } from '../types';
import { PARTICIPANTS } from '../data/participants';
import { CharacterAvatar } from './CharacterAvatar';
import { BookOpen, Star, Trash2, Heart, Coffee, Bookmark } from 'lucide-react';
import { addReactionToEntry, removeReadingEntry } from '../services/storage';
import { playChimeSound } from '../services/sound';

interface ReadingFeedProps {
  entries: ReadingEntry[];
}

export const ReadingFeed: React.FC<ReadingFeedProps> = ({ entries }) => {
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const handleReaction = async (id: string, type: 'heart' | 'coffee' | 'star' | 'book') => {
    playChimeSound();
    await addReactionToEntry(id, type);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Vill du ta bort denna läsloggning?')) {
      setDeletingId(id);
      try {
        await removeReadingEntry(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <section id="reading-feed" className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[#2b2118] tracking-tight">
            Familjens Läsflöde
          </h2>
          <p className="text-xs sm:text-sm text-[#7a6654]">
            Senaste lästa sidorna och boktankarna – heja på varandra!
          </p>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-[#422e1b]/30 bg-[#faf6f0] p-8 text-center text-[#7d6855]">
          <BookOpen className="w-8 h-8 mx-auto mb-2 text-[#a89888]" />
          <p className="text-sm font-bold">Inga böcker har loggats ännu.</p>
          <p className="text-xs text-[#998877] mt-1">Klicka på "Logga sidor" för att sätta igång bygget av caféet!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.slice(0, 15).map((entry) => {
            const person = PARTICIPANTS[entry.userId];
            const reactions = entry.reactions || {};

            return (
              <div
                key={entry.id}
                className="bg-white rounded-3xl border-2 border-[#422e1b]/30 p-4 sm:p-5 shadow-xs hover:border-[#422e1b] transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  {/* Character Avatar */}
                  <CharacterAvatar userId={entry.userId} size="md" />

                  <div className="flex-1 min-w-0">
                    {/* Header info */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#705e4f] mb-1">
                      <span className="font-bold text-sm text-[#2b2118]">
                        {person?.name || entry.userId}
                      </span>
                      <span className="text-[#a49180]">·</span>
                      <span className="font-semibold text-[#52796F] text-sm tabular-nums">
                        +{entry.pages} sidor
                      </span>
                      {entry.bookTitle && (
                        <>
                          <span className="text-[#a49180]">·</span>
                          <span className="font-medium text-[#4a3b2c] truncate max-w-[220px]">
                            {entry.bookTitle}
                          </span>
                        </>
                      )}
                      <span className="text-[#a49180]">·</span>
                      <span className="text-[#8c7866]">{entry.date}</span>
                    </div>

                    {/* Rating stars if provided */}
                    {entry.rating && (
                      <div className="flex items-center gap-0.5 text-xs text-[#e5a83b] mb-1.5">
                        {Array.from({ length: entry.rating }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    )}

                    {/* Note/Quote */}
                    {entry.note && (
                      <p className="text-xs sm:text-sm text-[#47382b] bg-[#faf6f0] border border-[#eee5d8] rounded-xl px-3.5 py-2 my-1.5 leading-relaxed italic">
                        "{entry.note}"
                      </p>
                    )}

                    {/* Emoji Reaction Buttons */}
                    <div className="flex items-center gap-1.5 mt-2.5">
                      <button
                        onClick={() => handleReaction(entry.id, 'heart')}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f7f1e7] hover:bg-[#ede1d1] text-xs text-[#523d2e] border border-[#e5d9ca] transition-colors"
                      >
                        <span>❤️</span>
                        <span className="font-semibold tabular-nums">{reactions.heart || 0}</span>
                      </button>

                      <button
                        onClick={() => handleReaction(entry.id, 'coffee')}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f7f1e7] hover:bg-[#ede1d1] text-xs text-[#523d2e] border border-[#e5d9ca] transition-colors"
                      >
                        <span>☕</span>
                        <span className="font-semibold tabular-nums">{reactions.coffee || 0}</span>
                      </button>

                      <button
                        onClick={() => handleReaction(entry.id, 'star')}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f7f1e7] hover:bg-[#ede1d1] text-xs text-[#523d2e] border border-[#e5d9ca] transition-colors"
                      >
                        <span>🌟</span>
                        <span className="font-semibold tabular-nums">{reactions.star || 0}</span>
                      </button>

                      <button
                        onClick={() => handleReaction(entry.id, 'book')}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f7f1e7] hover:bg-[#ede1d1] text-xs text-[#523d2e] border border-[#e5d9ca] transition-colors"
                      >
                        <span>📚</span>
                        <span className="font-semibold tabular-nums">{reactions.book || 0}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Delete button */}
                <div className="self-end sm:self-start">
                  <button
                    onClick={() => handleDelete(entry.id)}
                    disabled={deletingId === entry.id}
                    title="Ta bort logg"
                    className="p-1.5 rounded-lg text-[#ad9d8f] hover:text-[#992222] hover:bg-[#fae8e8] transition-colors text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
