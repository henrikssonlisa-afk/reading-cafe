/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useMemo } from 'react';
import { ReadingEntry, UserId } from './types';
import { PARTICIPANTS, TOTAL_GOAL_PAGES } from './data/participants';
import {
  getCurrentUser,
  setCurrentUser,
  clearCurrentUser,
  subscribeToReadingEntries,
  addReadingEntry,
} from './services/storage';
import {
  isSoundMuted,
  setSoundMuted,
  toggleRainAmbience,
  playPageTurnSound,
} from './services/sound';
import { Header } from './components/Header';
import { CozyCafeIllustration } from './components/CozyCafeIllustration';
import { FamilyProgress } from './components/FamilyProgress';
import { ChallengeTimeline } from './components/ChallengeTimeline';
import { ReadingFeed } from './components/ReadingFeed';
import { WelcomeProfileSelect } from './components/WelcomeProfileSelect';
import { LogReadingModal } from './components/LogReadingModal';
import { SettingsModal } from './components/SettingsModal';
import { CeramicRewardModal } from './components/CeramicRewardModal';
import { CatalogModal } from './components/CatalogModal';
import { CharacterAvatar } from './components/CharacterAvatar';

export default function App() {
  const [currentUser, setLocalCurrentUser] = useState<UserId | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const userParam = params.get('user')?.toLowerCase();
      if (userParam && ['ellen', 'tilde', 'lisa', 'mange'].includes(userParam)) {
        const validId = userParam as UserId;
        setCurrentUser(validId);
        return validId;
      }
    }
    return getCurrentUser();
  });

  const [entries, setEntries] = useState<ReadingEntry[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('cozy_cafe_entries');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const [isFirebaseActive, setIsFirebaseActive] = useState<boolean>(false);

  const [isLogModalOpen, setIsLogModalOpen] = useState<boolean>(false);
  const [logTargetUser, setLogTargetUser] = useState<UserId>('ellen');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isRewardOpen, setIsRewardOpen] = useState<boolean>(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);

  const [isMuted, setIsMuted] = useState<boolean>(() => isSoundMuted());
  const [isRainPlaying, setIsRainPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isCleaned = localStorage.getItem('cozy_cafe_force_v2');
      if (!isCleaned) {
        localStorage.clear();
        sessionStorage.clear();
        localStorage.setItem('cozy_cafe_force_v2', 'true');
        setEntries([]);
      }
    }
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToReadingEntries((updatedEntries, isFirebase) => {
      setEntries(updatedEntries);
      setIsFirebaseActive(isFirebase);
    });

    return () => {
      unsubscribe();
      toggleRainAmbience(false);
    };
  }, []);

  const totalPages = useMemo(() => {
    return entries.reduce((sum, item) => sum + (Number(item.pages) || 0), 0);
  }, [entries]);

  const recentBooks = useMemo(() => {
    const set = new Set<string>();
    entries.forEach((e) => {
      if (e.bookTitle && e.bookTitle.trim()) {
        set.add(e.bookTitle.trim());
      }
    });
    return Array.from(set);
  }, [entries]);

  const handleSelectUser = (userId: UserId) => {
    playPageTurnSound();
    setCurrentUser(userId);
    setLocalCurrentUser(userId);
    setIsProfileModalOpen(false);
  };

  const handleOpenLogModalFor = (userId?: UserId) => {
    playPageTurnSound();
    setLogTargetUser(userId || currentUser || 'ellen');
    setIsLogModalOpen(true);
  };

  const handleToggleSoundMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    setSoundMuted(nextMuted);
  };

  const handleToggleRainSound = () => {
    if (isRainPlaying) {
      toggleRainAmbience(false);
      setIsRainPlaying(false);
    } else {
      const started = toggleRainAmbience(true);
      setIsRainPlaying(started);
    }
  };

  const handleLogSubmit = async (data: {
    userId: UserId;
    pages: number;
    bookTitle?: string;
    note?: string;
    rating?: number;
    date: string;
  }) => {
    await addReadingEntry(data);
    const newEntry: ReadingEntry = {
      id: Date.now().toString(),
      ...data,
      timestamp: Date.now(),
    } as unknown as ReadingEntry;

    setEntries((prev) => {
      const next = [newEntry, ...prev];
      if (typeof window !== 'undefined') {
        localStorage.setItem('cozy_cafe_entries', JSON.stringify(next));
      }
      return next;
    });
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#faf7f2] text-[#2b2118] flex flex-col justify-between">
        <header className="py-4 px-6 border-b border-[#ebdcd0] bg-[#fcf9f4]">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">☕</span>
              <span className="font-bold font-display text-base text-[#2b2118]">
                The Cozy Coffee & Book Café
              </span>
            </div>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="text-xs text-[#7d6855] hover:text-[#2b2118] underline cursor-pointer"
            >
              Inställningar & Synk
            </button>
          </div>
        </header>

        <main className="flex-1 flex items-center">
          <WelcomeProfileSelect onSelectUser={handleSelectUser} />
        </main>

        <footer className="py-4 text-center text-xs text-[#8c7866] border-t border-[#ebdcd0]">
          The Cozy Coffee & Book Café · 1 000 sidor tillsammans på 14 dagar
        </footer>

        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          isFirebaseActive={isFirebaseActive}
        />
      </div>
    );
  }

  const currentMember = PARTICIPANTS[currentUser];

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#2b2118] flex flex-col">
      <Header
        currentUser={currentUser}
        onOpenSwitchProfile={() => setIsProfileModalOpen(true)}
        onOpenLogModal={() => handleOpenLogModalFor()}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenReward={() => setIsRewardOpen(true)}
        isSoundMuted={isMuted}
        onToggleSoundMute={handleToggleSoundMute}
        isFirebaseActive={isFirebaseActive}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-10">
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-[#f6efe4] border-2 border-[#422e1b]/30 shadow-xs">
          <div className="flex items-center gap-3.5">
            <CharacterAvatar userId={currentUser} size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#8c7460] uppercase tracking-wide">
                  Välkommen tillbaka,
                </span>
                <span className="font-bold text-base text-[#2b2118]">{currentMember.name}!</span>
              </div>
              <p className="text-xs text-[#6e5a48] mt-0.5 font-medium">
                Målbild: ~{currentMember.dailyTarget} sidor idag · Favoritfika: {currentMember.favoriteOrder}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsRewardOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#faf5ee] border border-[#ded5c7] text-xs font-semibold text-[#bc6c25] transition-colors cursor-pointer"
            >
              <span>🏺</span>
              <span>Slutbelöning: Keramikverkstad</span>
            </button>
            <button
              onClick={() => handleOpenLogModalFor()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#52796F] hover:bg-[#43645b] text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-98"
            >
              <span>+ Logga läsning</span>
            </button>
          </div>
        </section>

        <section id="cafe-view" className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#2b2118] tracking-tight">
                Vårt Mysiga Café
              </h2>
              <p className="text-xs sm:text-sm text-[#7a6654]">
                Klicka på möbler och detaljer i caféet för att se vad familjen har byggt!
              </p>
            </div>
          </div>

          <CozyCafeIllustration
            totalPages={totalPages}
            onOpenCatalog={() => setIsCatalogOpen(true)}
            onToggleRainSound={handleToggleRainSound}
            isRainPlaying={isRainPlaying}
            currentUser={currentUser}
            entries={entries}
          />
        </section>

        <FamilyProgress
          entries={entries}
          onLogForUser={handleOpenLogModalFor}
          currentUser={currentUser}
        />

        <ChallengeTimeline entries={entries} />

        <ReadingFeed entries={entries} />
      </main>

      <footer className="mt-16 py-8 border-t border-[#e8dfd5] bg-[#faf6f0] text-xs text-[#7d6855]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#3b2b1e]">The Cozy Coffee & Book Café</span>
            <span>·</span>
            <span>Familjens 14-dagars Läsutmaning</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="hover:text-[#2b2118] underline transition-colors cursor-pointer"
            >
              Byt inloggad profil
            </button>
            <span>·</span>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="hover:text-[#2b2118] underline transition-colors cursor-pointer"
            >
              Dela mobillänkar & Firebase
            </button>
            <span>·</span>
            <button
              onClick={() => setIsRewardOpen(true)}
              className="hover:text-[#2b2118] text-[#bc6c25] font-semibold transition-colors cursor-pointer"
            >
              Keramikverkstaden 🏺
            </button>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <LogReadingModal
        initialUserId={logTargetUser}
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        onSubmit={handleLogSubmit}
        recentBooks={recentBooks}
      />
      {/* 2. Switch Profile Modal */}
      {isProfileModalOpen && (
        <WelcomeProfileSelect
          isOpenAsModal
          onCloseModal={() => setIsProfileModalOpen(false)}
          onSelectUser={handleSelectUser}
        />
      )}

      {/* 3. Settings & Firebase Sync Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isFirebaseActive={isFirebaseActive}
      />

      {/* 4. Grand Ceramic Workshop Reward Modal */}
      <CeramicRewardModal
        isOpen={isRewardOpen}
        onClose={() => setIsRewardOpen(false)}
        totalPages={totalPages}
      />

      {/* 5. 100 Milestones Catalog Modal */}
      <CatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        totalPages={totalPages}
      />
    </div>
  );
}
