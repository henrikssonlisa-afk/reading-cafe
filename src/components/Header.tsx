import React from 'react';
import { Participant, UserId } from '../types';
import { PARTICIPANTS } from '../data/participants';
import { CharacterAvatar } from './CharacterAvatar';
import { BookOpen, Coffee, Volume2, VolumeX, Settings, Plus, UserCheck } from 'lucide-react';

interface HeaderProps {
  currentUser: UserId | null;
  onOpenSwitchProfile: () => void;
  onOpenLogModal: () => void;
  onOpenSettings: () => void;
  onOpenReward: () => void;
  isSoundMuted: boolean;
  onToggleSoundMute: () => void;
  isFirebaseActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onOpenSwitchProfile,
  onOpenLogModal,
  onOpenSettings,
  onOpenReward,
  isSoundMuted,
  onToggleSoundMute,
  isFirebaseActive,
}) => {
  const activeParticipant: Participant | undefined = currentUser ? PARTICIPANTS[currentUser] : undefined;

  return (
    <header className="sticky top-0 z-30 w-full bg-[#fcf9f4]/95 backdrop-blur-md border-b border-[#e8dfd5] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand title, single element */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-[#52796F] text-white flex items-center justify-center shadow-xs">
            <Coffee className="w-5 h-5 text-[#f4ece1]" />
          </div>
          <div className="flex flex-col">
            <a
              href="/"
              className="text-base sm:text-lg font-bold tracking-tight text-[#2b2118] font-display whitespace-nowrap hover:text-[#52796F] transition-colors"
            >
              The Cozy Coffee & Book Café
            </a>
            <span className="text-[11px] text-[#7a6654] -mt-0.5 hidden sm:inline">
              Familjens 14-dagars läsutmaning · 1 000 sidor
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation & Quick Status Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#6b5847]">
          <a href="#cafe-view" className="hover:text-[#2b2118] transition-colors whitespace-nowrap shrink-0">
            Caféet
          </a>
          <a href="#family-progress" className="hover:text-[#2b2118] transition-colors whitespace-nowrap shrink-0">
            Familjen
          </a>
          <a href="#challenge-days" className="hover:text-[#2b2118] transition-colors whitespace-nowrap shrink-0">
            14 Dagar
          </a>
          <a href="#reading-feed" className="hover:text-[#2b2118] transition-colors whitespace-nowrap shrink-0">
            Läslogg
          </a>
          <button
            onClick={onOpenReward}
            className="hover:text-[#bc6c25] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-[#bc6c25] font-semibold"
          >
            <span>🏺</span>
            <span>Keramikbelöning</span>
          </button>
        </nav>

        {/* Zone 3: Active Profile, Settings, & Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Active Profile Badge / Switcher */}
          {activeParticipant ? (
            <button
              onClick={onOpenSwitchProfile}
              title="Klicka för att byta profil"
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-[#ded5c7] bg-[#f7f1e7] hover:bg-[#ede3d4] transition-colors text-xs text-[#3d2f23]"
            >
              <CharacterAvatar userId={activeParticipant.id} size="xs" showBorder={false} />
              <span className="font-bold">{activeParticipant.name}</span>
              <span className="text-[10px] text-[#8c7460] underline decoration-[#c9b8a3]">Byt</span>
            </button>
          ) : (
            <button
              onClick={onOpenSwitchProfile}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#ded5c7] bg-[#f7f1e7] hover:bg-[#ede3d4] text-xs font-semibold text-[#544234] transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#8c6747]" />
              <span>Välj profil</span>
            </button>
          )}

          {/* Sound Mute Toggle */}
          <button
            onClick={onToggleSoundMute}
            title={isSoundMuted ? 'Slå på ljud' : 'Stäng av ljud'}
            className="p-2 rounded-lg text-[#6b5847] hover:text-[#2b2118] hover:bg-[#f1ebe0] transition-colors"
          >
            {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            title="Inställningar & Synk"
            className="relative p-2 rounded-lg text-[#6b5847] hover:text-[#2b2118] hover:bg-[#f1ebe0] transition-colors"
          >
            <Settings className="w-4 h-4" />
            {isFirebaseActive && (
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#52796f] ring-2 ring-white"
                title="Firebase realtidssynk aktiv"
              />
            )}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenLogModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#52796F] hover:bg-[#43645b] active:scale-98 rounded-xl shadow-xs transition-all whitespace-nowrap shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Logga sidor</span>
          </button>
        </div>
      </div>
    </header>
  );
};
