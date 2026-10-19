import React from 'react';
import { ReadingEntry } from '../types';
import { CHALLENGE_DAYS, TOTAL_GOAL_PAGES } from '../data/participants';
import { Calendar, Target, CheckCircle2, ChevronRight } from 'lucide-react';

interface ChallengeTimelineProps {
  entries: ReadingEntry[];
}

export const ChallengeTimeline: React.FC<ChallengeTimelineProps> = ({ entries }) => {
  const dailyTargetPace = Math.ceil(TOTAL_GOAL_PAGES / CHALLENGE_DAYS); // ~72 sidor/dag

  // Aggregate pages by date
  const pagesByDate = React.useMemo(() => {
    const map: Record<string, number> = {};
    entries.forEach((e) => {
      const d = e.date || new Date(e.createdAt).toISOString().split('T')[0];
      map[d] = (map[d] || 0) + e.pages;
    });
    return map;
  }, [entries]);

  // Determine chronological days for 14 days
  // Let's create a 14-day span starting from the earliest entry date, or current week
  const daysList = React.useMemo(() => {
    let startDate = new Date();
    if (entries.length > 0) {
      const dates = entries.map((e) => new Date(e.date || e.createdAt).getTime());
      const minDate = Math.min(...dates);
      startDate = new Date(minDate);
    } else {
      // Default: started 2 days ago
      startDate = new Date(Date.now() - 2 * 86400000);
    }

    return Array.from({ length: CHALLENGE_DAYS }, (_, idx) => {
      const d = new Date(startDate);
      d.setDate(d.getDate() + idx);
      const isoString = d.toISOString().split('T')[0];
      const pagesRead = pagesByDate[isoString] || 0;
      const isPastOrToday = d.getTime() <= Date.now() + 86400000;
      const isTargetMet = pagesRead >= dailyTargetPace;

      let milestoneNote = '';
      if (idx === 3) milestoneNote = 'Fas 1 (250s)';
      else if (idx === 6) milestoneNote = 'Halvtid (500s)';
      else if (idx === 10) milestoneNote = 'Fas 3 (750s)';
      else if (idx === 13) milestoneNote = 'Keramikverkstad (1000s)';

      return {
        dayNumber: idx + 1,
        dateString: isoString,
        weekday: d.toLocaleDateString('sv-SE', { weekday: 'short' }),
        formattedDate: d.toLocaleDateString('sv-SE', { month: 'numeric', day: 'numeric' }),
        pagesRead,
        isPastOrToday,
        isTargetMet,
        milestoneNote,
      };
    });
  }, [entries, pagesByDate, dailyTargetPace]);

  return (
    <section id="challenge-days" className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[#2b2118] tracking-tight">
            14-dagars Tidslinje
          </h2>
          <p className="text-xs sm:text-sm text-[#7a6654]">
            Gemensamt tempo för 1 000 sidor: ~{dailyTargetPace} sidor/dag
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#6e5c4d]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#52796F]" />
            Mål uppnått (≥{dailyTargetPace} s)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e0d6c8]" />
            Påbörjad dag
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
        {daysList.map((day) => {
          return (
            <div
              key={day.dayNumber}
              className={`relative rounded-2xl p-3 border-2 transition-all flex flex-col justify-between ${
                day.isTargetMet
                  ? 'bg-[#f0f6f2] border-[#365942] shadow-xs'
                  : day.pagesRead > 0
                  ? 'bg-white border-[#422e1b]/35 shadow-xs'
                  : 'bg-[#faf6f0]/60 border-[#422e1b]/15'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#7d6855] mb-1">
                  <span className="font-bold text-[#3b2b1e]">Dag {day.dayNumber}</span>
                  <span className="capitalize">{day.weekday}</span>
                </div>

                <div className="text-[11px] text-[#8c7866] mb-2">{day.formattedDate}</div>

                <div className="text-lg font-bold font-display text-[#2b2118] tabular-nums mb-1">
                  {day.pagesRead}{' '}
                  <span className="text-xs font-normal text-[#8c7866]">sidor</span>
                </div>
              </div>

              {day.milestoneNote && (
                <div className="mt-2 pt-1.5 border-t border-[#e2d5c5] text-[10px] font-semibold text-[#bc6c25] truncate">
                  🎯 {day.milestoneNote}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
