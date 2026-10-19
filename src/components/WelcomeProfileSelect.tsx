import React from 'react';
import { UserId } from '../types';
import { PARTICIPANT_LIST } from '../data/participants';
import { CharacterAvatar } from './CharacterAvatar';
import { Coffee, Sparkles, BookOpen, Heart } from 'lucide-react';

interface WelcomeProfileSelectProps {
  onSelectUser: (userId: UserId) => void;
  isOpenAsModal?: boolean;
  onCloseModal?: () => void;
}

export const WelcomeProfileSelect: React.FC<WelcomeProfileSelectProps> = ({
  onSelectUser,
  isOpenAsModal = false,
  onCloseModal,
}) => {
  const content = (
    <div className="w-full max-w-2xl mx-auto text-center">
      {/* Brand & Introduction */}
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#52796F] text-white shadow-md mb-4">
        <Coffee className="w-8 h-8 text-[#f4ece1]" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#2b2118] tracking-tight mb-2">
        Välkommen till The Cozy Café!
      </h1>
      <p className="text-sm sm:text-base text-[#6b5847] max-w-lg mx-auto mb-8 leading-relaxed">
        Vår familj har 14 dagar på sig att tillsammans läsa <strong className="text-[#2b2118]">1 000 sidor</strong>.
        Varje 10 sidor bygger en ny mysig detalj i caféet – och när vi når 1 000 sidor firar vi med keramikmålning!
      </p>

      {/* 4 Profile Cards / Buttons */}
      <div className="text-left mb-6">
        <div className="text-xs uppercase tracking-wider font-semibold text-[#8c7866] mb-3 text-center">
          Vem läser nu?
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {PARTICIPANT_LIST.map((person) => (
            <button
              key={person.id}
              onClick={() => onSelectUser(person.id)}
              className="group relative flex items-start gap-4 p-4 rounded-2xl bg-white hover:bg-[#faf5ee] border-2 border-[#422e1b]/30 hover:border-[#422e1b] shadow-xs hover:shadow-md transition-all text-left cursor-pointer active:scale-98"
            >
              {/* Cute Character Avatar */}
              <CharacterAvatar userId={person.id} size="lg" className="group-hover:scale-105 transition-transform" />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h3 className="font-bold text-base text-[#2b2118] group-hover:text-[#52796F] transition-colors">
                    {person.name}
                  </h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#f4ede3] text-[#705e4f] border border-[#422e1b]/20">
                    {person.role}
                  </span>
                </div>

                <div className="text-xs font-semibold text-[#52796F] mb-1">
                  Mål: ~{person.dailyTarget} sidor/dag ({person.totalTarget} sidor totalt)
                </div>

                <div className="text-[11px] text-[#8c7866] italic truncate">
                  "{person.favoriteOrder}"
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs text-[#8c7866] flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#bc6c25]" />
        <span>Ditt val sparas automatiskt i webbläsaren. Du kan alltid byta profil senare!</span>
      </div>
    </div>
  );

  if (isOpenAsModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
        <div className="relative w-full max-w-2xl bg-[#faf6f0] border border-[#e0d5c7] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
          {onCloseModal && (
            <button
              onClick={onCloseModal}
              className="absolute top-5 right-5 text-[#8c7866] hover:text-[#2b2118] text-sm p-1"
            >
              ✕ Stäng
            </button>
          )}
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-8">
      {content}
    </div>
  );
};
