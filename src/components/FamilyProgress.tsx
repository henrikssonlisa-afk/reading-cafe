import React from 'react';
import { Participant, ReadingEntry, UserId } from '../types';
import { PARTICIPANT_LIST } from '../data/participants';
import { CharacterAvatar } from './CharacterAvatar';
import { Plus, BookOpen, Flame, Award } from 'lucide-react';

interface FamilyProgressProps {
  entries: ReadingEntry[];
  onLogForUser: (userId: UserId) => void;
  currentUser: UserId | null;
}

export const FamilyProgress: React.FC<FamilyProgressProps> = ({
  entries,
  onLogForUser,
  currentUser,
}) => {
  // Compute user statistics
  const userStats = React.useMemo(() => {
    const stats: Record<
      UserId,
      {
        totalPages: number;
        entriesCount: number;
        streakDays: number;
        latestBook?: string;
        latestDate?: string;
      }
    > = {
      ellen: { totalPages: 0, entriesCount: 0, streakDays: 0 },
      tilde: { totalPages: 0, entriesCount: 0, streakDays: 0 },
      lisa: { totalPages: 0, entriesCount: 0, streakDays: 0 },
      mange: { totalPages: 0, entriesCount: 0, streakDays: 0 },
    };

    // Calculate total pages & books
    entries.forEach((e) => {
      if (stats[e.userId]) {
        stats[e.userId].totalPages += e.pages;
        stats[e.userId].entriesCount += 1;
        if (!stats[e.userId].latestBook && e.bookTitle) {
          stats[e.userId].latestBook = e.bookTitle;
          stats[e.userId].latestDate = e.date;
        }
      }
    });

    // Approximate unique active days streak
    PARTICIPANT_LIST.forEach((p) => {
      const dates = new Set(
        entries.filter((e) => e.userId === p.id && e.date).map((e) => e.date)
      );
      stats[p.id].streakDays = dates.size;
    });

    return stats;
  }, [entries]);

  return (
    <section id="family-progress" className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[#2b2118] tracking-tight">
            Familjens Läsare
          </h2>
          <p className="text-xs sm:text-sm text-[#7a6654]">
            Personliga mål och framsteg mot vår gemensamma dröm om 1 000 sidor
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PARTICIPANT_LIST.map((person) => {
          const stats = userStats[person.id];
          const progressPercent = Math.min(100, Math.round((stats.totalPages / person.totalTarget) * 100));
          const isCurrentUser = person.id === currentUser;

          return (
            <div
              key={person.id}
              className={`relative rounded-3xl p-4.5 sm:p-5 flex flex-col justify-between transition-all bg-white border-2 ${
                isCurrentUser
                  ? 'border-[#422e1b] ring-2 ring-[#52796F] shadow-sm'
                  : 'border-[#422e1b]/30 hover:border-[#422e1b] shadow-xs'
              }`}
            >
              {/* Header with avatar & name */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <CharacterAvatar userId={person.id} size="md" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-base text-[#2b2118] font-display">
                          {person.name}
                        </h3>
                        {isCurrentUser && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#e3ede6] text-[#365942] border border-[#365942]/30">
                            Du
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#7d6855] font-semibold">{person.role}</div>
                    </div>
                  </div>

                  {stats.streakDays > 0 && (
                    <div
                      className="flex items-center gap-1 text-[11px] font-semibold text-[#bc6c25] px-2 py-0.5 rounded-lg bg-[#fdf5ec]"
                      title={`${stats.streakDays} aktiva läsdagar`}
                    >
                      <Flame className="w-3.5 h-3.5" />
                      <span>{stats.streakDays} d</span>
                    </div>
                  )}
                </div>

                {/* Pages Stat & Personal Target */}
                <div className="mb-3">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-2xl font-bold font-display text-[#2b2118] tabular-nums">
                      {stats.totalPages}
                      <span className="text-xs font-normal text-[#8c7866] ml-1">
                        / {person.totalTarget} sidor
                      </span>
                    </span>
                    <span className="text-xs font-semibold text-[#52796F] tabular-nums">
                      {progressPercent}%
                    </span>
                  </div>

                  {/* Personal Progress Bar */}
                  <div className="w-full h-2 bg-[#f0e8dc] rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${Math.max(4, progressPercent)}%`,
                        backgroundColor: person.accentColor,
                      }}
                    />
                  </div>
                </div>

                {/* Target context */}
                <div className="text-xs text-[#6e5c4d] mb-3 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#8c7866]">Målbild:</span>
                    <span className="font-medium text-[#4a3b2c]">
                      ~{person.dailyTarget} {person.dailyTarget === 1 ? 'sida' : 'sidor'}/dag
                    </span>
                  </div>
                  {stats.latestBook ? (
                    <div className="flex items-start gap-1 text-[11px] text-[#594738] truncate pt-1 border-t border-[#f2ede4]">
                      <BookOpen className="w-3 h-3 shrink-0 mt-0.5 text-[#8c7866]" />
                      <span className="truncate italic">"{stats.latestBook}"</span>
                    </div>
                  ) : (
                    <div className="text-[11px] text-[#998877] italic pt-1 border-t border-[#f2ede4]">
                      Ingen bok loggad ännu
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button: Log for this user */}
              <button
                onClick={() => onLogForUser(person.id)}
                className="w-full mt-2 py-2 px-3 rounded-xl border border-[#ded5c7] hover:border-[#b8a694] bg-[#faf6f0] hover:bg-[#f2ece2] active:scale-98 text-xs font-semibold text-[#423223] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#52796F]" />
                <span>Logga för {person.name}</span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
