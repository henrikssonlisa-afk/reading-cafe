import React, { useState } from 'react';
import { FirebaseConfig, UserId } from '../types';
import { PARTICIPANT_LIST } from '../data/participants';
import { CharacterAvatar } from './CharacterAvatar';
import {
  getStoredFirebaseConfig,
  saveFirebaseConfig,
  resetChallengeData,
} from '../services/storage';
import { Check, Copy, Database, RefreshCw, Smartphone, Trash2 } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isFirebaseActive: boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  isFirebaseActive,
}) => {
  const [configText, setConfigText] = useState<string>(() => {
    const existing = getStoredFirebaseConfig();
    return existing ? JSON.stringify(existing, null, 2) : '';
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [copiedUser, setCopiedUser] = useState<UserId | null>(null);

  if (!isOpen) return null;

  const getShareUrl = (userId: UserId) => {
    if (typeof window === 'undefined') return `?user=${userId}`;
    const url = new URL(window.location.href);
    url.searchParams.set('user', userId);
    return url.toString();
  };

  const handleCopyLink = (userId: UserId) => {
    const link = getShareUrl(userId);
    navigator.clipboard.writeText(link);
    setCopiedUser(userId);
    setTimeout(() => setCopiedUser(null), 2500);
  };

  const handleSaveFirebase = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const trimmed = configText.trim();
    if (!trimmed) {
      saveFirebaseConfig(null);
      setSuccessMsg('Firebase-konfiguration borttagen. Appen använder nu lokal lagring.');
      return;
    }

    try {
      // Allow flexible format (either raw JSON or javascript object format)
      let parsed: FirebaseConfig;
      if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
        // Standard JSON or relaxed
        try {
          parsed = JSON.parse(trimmed);
        } catch {
          // Try converting unquoted keys { apiKey: "..." }
          const formatted = trimmed
            .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
            .replace(/'/g, '"');
          parsed = JSON.parse(formatted);
        }
      } else {
        throw new Error('Konfigurationen måste vara ett JSON-objekt omgivet av { }');
      }

      if (!parsed.apiKey || !parsed.projectId) {
        throw new Error('Objektet saknar "apiKey" eller "projectId"');
      }

      saveFirebaseConfig(parsed);
      setSuccessMsg('Firebase-konfiguration sparad! Ansluter i realtid...');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Ogiltigt format. Klistra in ett giltigt Firebase config-objekt.'
      );
    }
  };

  const handleReset = (mode: 'fresh' | 'sample') => {
    const msg =
      mode === 'fresh'
        ? 'Är du säker på att du vill nollställa till 0 sidor? Detta tar bort alla loggade böcker.'
        : 'Vill du ladda in demonstrationsdata med några exempelloggar?';

    if (window.confirm(msg)) {
      resetChallengeData(mode);
      onClose();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-xl bg-[#faf6f0] border-2 border-[#422e1b] rounded-3xl p-6 sm:p-7 shadow-2xl overflow-y-auto max-h-[92vh]">
        <div className="flex items-center justify-between pb-4 border-b border-[#ebdcd0]">
          <h2 className="text-lg font-bold font-display text-[#2b2118]">Inställningar & Synk</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8c7460] hover:text-[#2b2118] text-sm rounded-lg hover:bg-[#ede3d4] transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 space-y-6">
          {/* Section 1: Personal Instant-Login Links */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="w-4 h-4 text-[#52796F]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5c4a3b]">
                Direktlänkar för familjens mobiler
              </h3>
            </div>
            <p className="text-xs text-[#7d6855] mb-3">
              Kopiera den personliga länken och skicka till respektive person via SMS eller meddelande.
              Öppnas länken på mobilen loggas de in omedelbart och kan lägga till appen på hemskärmen!
            </p>

            <div className="space-y-2">
              {PARTICIPANT_LIST.map((p) => {
                const isCopied = copiedUser === p.id;
                return (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-white border-2 border-[#422e1b]/30 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CharacterAvatar userId={p.id} size="xs" showBorder={false} />
                      <div className="truncate">
                        <span className="font-bold text-[#2b2118]">{p.name}</span>
                        <span className="text-[#8c7866] ml-2 font-mono text-[11px]">
                          ?user={p.id}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopyLink(p.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all shrink-0 cursor-pointer ${
                        isCopied
                          ? 'bg-[#e3ede6] text-[#365942] border border-[#a9cbb3]'
                          : 'bg-[#faf6f0] hover:bg-[#ede2d2] text-[#4d3d2f] border border-[#ded4c6]'
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Kopierad!' : 'Kopiera länk'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Firebase Realtime Database / Firestore Sync */}
          <div className="pt-4 border-t border-[#ebdcd0]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[#bc6c25]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#5c4a3b]">
                  Firebase Realtidssynkning
                </h3>
              </div>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  isFirebaseActive
                    ? 'bg-[#e3ede6] text-[#365942]'
                    : 'bg-[#f4eee5] text-[#7d6855]'
                }`}
              >
                {isFirebaseActive ? '● Uppkopplad' : '○ Lokal lagring (Offline-läge)'}
              </span>
            </div>

            <p className="text-xs text-[#7d6855] mb-3 leading-relaxed">
              Utan Firebase sparas allt lokalt i webbläsaren. För att synka i realtid mellan alla familjens
              mobiler, klistra in ert Firebase-projektobjekt nedan:
            </p>

            <form onSubmit={handleSaveFirebase} className="space-y-3">
              <textarea
                rows={5}
                value={configText}
                onChange={(e) => setConfigText(e.target.value)}
                placeholder={`{\n  "apiKey": "AIzaSy...",\n  "authDomain": "cozy-cafe.firebaseapp.com",\n  "projectId": "cozy-cafe",\n  "appId": "..."\n}`}
                className="w-full p-3 font-mono text-[11px] bg-white border border-[#d8ccbe] rounded-xl text-[#2b2118] focus:outline-hidden focus:ring-2 focus:ring-[#52796F]"
              />

              {errorMsg && (
                <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="p-2.5 rounded-lg bg-green-50 border border-green-200 text-green-800 text-xs">
                  {successMsg}
                </div>
              )}

              <div className="flex items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setConfigText('');
                    saveFirebaseConfig(null);
                    setSuccessMsg('Återgick till lokal lagring.');
                  }}
                  className="px-3 py-1.5 text-xs text-[#8c7866] hover:text-[#2b2118] hover:bg-[#ede3d4] rounded-lg transition-colors"
                >
                  Rensa Firebase
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-[#52796F] hover:bg-[#43645b] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Spara Firebase-konfiguration
                </button>
              </div>
            </form>
          </div>

          {/* Section 3: Data Management */}
          <div className="pt-4 border-t border-[#ebdcd0]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#5c4a3b] mb-2">
              Utmaningsdata & Testning
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleReset('sample')}
                className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#f7f2ea] text-[#4d3d2f] border border-[#d8ccbe] rounded-xl text-xs font-medium transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#52796F]" />
                <span>Ladda demodata</span>
              </button>

              <button
                onClick={() => handleReset('fresh')}
                className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-medium transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-500" />
                <span>Nollställ till 0 sidor</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
