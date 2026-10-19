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

  // Startar helt tomt (inga förifyllda mock-sidor)
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

  // Modals state
  const [isLogModalOpen, setIsLogModalOpen] = useState<boolean>(false);
  const [logTargetUser, setLogTargetUser] = useState<UserId>('ellen');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isRewardOpen, setIsRewardOpen] = useState<boolean>(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);

  // Sound state
  const [isMuted, setIsMuted] = useState<boolean>(() => isSoundMuted());
  const [isRainPlaying, setIsRainPlaying] = useState<boolean>(false);

  // Rensa bort gammal mockdata automatiskt vid första start
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isCleaned = localStorage.getItem('cozy_cafe_reset_done');
      if (!isCleaned) {
        localStorage.removeItem('cozy_cafe_entries');
        localStorage.removeItem('reading_entries');
        localStorage.setItem('cozy_cafe_reset_done', 'true');
        setEntries([]);
      }
    }
  }, []);

  // Prenumerera på uppdateringar
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

  // Beräkna totalt antal lästa sidor
  const totalPages = useMemo(() => {
    return entries.reduce((sum, item) => sum + (Number(item.pages) || 0), 0);
  }, [entries]);

  // Lista över tidigare inlagda böcker
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
