import React from 'react';
import { TOTAL_GOAL_PAGES } from '../data/participants';
import { Sparkles, Trophy, CheckCircle2, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CeramicRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalPages: number;
}

export const CeramicRewardModal: React.FC<CeramicRewardModalProps> = ({
  isOpen,
  onClose,
  totalPages,
}) => {
  if (!isOpen) return null;

  const isCompleted = totalPages >= TOTAL_GOAL_PAGES;
  const remainingPages = Math.max(0, TOTAL_GOAL_PAGES - totalPages);
  const percent = Math.min(100, Math.round((totalPages / TOTAL_GOAL_PAGES) * 100));

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#BC6C25', '#52796F', '#DDA15E', '#9C6644', '#F4A261'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-xl bg-[#faf6f0] border-2 border-[#422e1b] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-[#8c7866] hover:text-[#2b2118] text-sm rounded-lg hover:bg-[#ede3d4] transition-colors"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-[#BC6C25]/15 text-[#BC6C25] text-3xl mb-3 shadow-inner">
            🏺
          </div>
          <h2 className="text-2xl font-bold font-display text-[#2b2118] tracking-tight">
            Slutbelöningen: Keramikverkstad!
          </h2>
          <p className="text-xs sm:text-sm text-[#7a6654] max-w-md mx-auto mt-1">
            När vi når 1 000 sidor firar hela familjen med att besöka en keramikverkstad och måla keramik tillsammans.
          </p>
        </div>

        {/* Progress Card */}
        <div className="p-4 rounded-2xl bg-white border border-[#e5dcd0] mb-5">
          <div className="flex items-center justify-between text-xs text-[#5c4a3b] mb-1.5">
            <span className="font-semibold text-sm text-[#2b2118] font-display">
              {totalPages.toLocaleString('sv-SE')} / {TOTAL_GOAL_PAGES.toLocaleString('sv-SE')} sidor
            </span>
            <span className="font-bold text-[#BC6C25]">{percent}% uppnått</span>
          </div>

          <div className="w-full h-3 bg-[#f0e8dc] rounded-full overflow-hidden p-0.5">
            <div
              className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-[#84a98c] via-[#bc6c25] to-[#9c6644]"
              style={{ width: `${Math.max(3, percent)}%` }}
            />
          </div>

          <div className="mt-2 text-xs text-[#6e5c4d] text-center">
            {isCompleted ? (
              <span className="text-[#365942] font-bold flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Målet är nått! Dags att boka verkstaden!
              </span>
            ) : (
              <span>Endast <strong className="text-[#2b2118]">{remainingPages} sidor</strong> kvar till den stora utflykten!</span>
            )}
          </div>
        </div>

        {/* Reward Explanation & Inspiration */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-xs">
          <div className="p-3.5 rounded-xl bg-white border border-[#ebdcd0] text-center">
            <div className="text-xl mb-1">🎨</div>
            <div className="font-bold text-[#3d2f23] mb-0.5">Välj & Måla</div>
            <div className="text-[#7d6855]">Muggar, skålar eller vaser i valfri form och stil.</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-[#ebdcd0] text-center">
            <div className="text-xl mb-1">🔥</div>
            <div className="font-bold text-[#3d2f23] mb-0.5">Glasering & Bränning</div>
            <div className="text-[#7d6855]">Keramiken glaseras och bränns i hög temperatur.</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-[#ebdcd0] text-center">
            <div className="text-xl mb-1">☕</div>
            <div className="font-bold text-[#3d2f23] mb-0.5">Hedersplats Hemma</div>
            <div className="text-[#7d6855]">Drick te och choklad ur dina egendesignade koppar!</div>
          </div>
        </div>

        {/* THE GOLDEN TICKET (GYLLENE BILJETT TILL KERAMIKVERKSTADEN) */}
        <div className="relative my-4 p-0.5 rounded-3xl bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 shadow-xl overflow-hidden">
          <div className="p-6 bg-gradient-to-b from-amber-50 via-yellow-50/90 to-amber-100/90 border-2 border-[#b8860b] rounded-[22px] relative text-[#3b2b1e]">
            {/* Ticket Notches (left & right ticket perforations) */}
            <div className="absolute top-1/2 -left-4 w-6 h-6 rounded-full bg-[#faf6f0] border-2 border-[#b8860b] -translate-y-1/2" />
            <div className="absolute top-1/2 -right-4 w-6 h-6 rounded-full bg-[#faf6f0] border-2 border-[#b8860b] -translate-y-1/2" />

            {/* Ticket Header */}
            <div className="text-center pb-3 border-b-2 border-dashed border-[#b8860b]/50">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/80 border border-amber-400 text-amber-900 text-[11px] font-extrabold tracking-widest uppercase mb-1.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>GYLLENE BILJETT · GOLDEN TICKET</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display text-[#3d2714] tracking-tight">
                Heldag på Keramikverkstaden!
              </h3>
              <p className="text-xs font-semibold text-[#7c5328]">
                Utfärdad till: <strong>Ellen, Tilde, Lisa & Mange</strong>
              </p>
            </div>

            {/* Ticket Body */}
            <div className="py-4 space-y-3 text-xs">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#8c5e2a]">
                <span>MÅL: 1 000 SIDOR LÄSTA</span>
                <span className="font-mono">NR: #KERAMIK-1000-GOLD</span>
              </div>

              <div className="p-3 bg-white/80 backdrop-blur-xs rounded-xl border border-amber-300/80 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-[#3b2715]">
                  <span className="text-base">🏺</span>
                  <span>Skapa & måla egna keramikmuggar, skålar eller vaser</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-[#3b2715]">
                  <span className="text-base">🔥</span>
                  <span>Professionell glasering och högtemperatur-bränning</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-[#3b2715]">
                  <span className="text-base">☕</span>
                  <span>Fikastund med kardemummabullar och varm choklad/kaffe</span>
                </div>
              </div>

              {/* Status stamp */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-amber-400/30 border-2 border-amber-600 flex items-center justify-center text-lg shadow-inner">
                    ⭐
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                      {isCompleted ? 'Officiell Status' : 'Preliminär Biljett'}
                    </div>
                    <div className="font-bold text-[#3b2715]">
                      {isCompleted ? '✓ GODKÄND & AKTIV' : `${remainingPages} sidor kvar till aktivering`}
                    </div>
                  </div>
                </div>

                <div className="px-3 py-1 bg-amber-200/90 border border-amber-500 rounded-lg text-center">
                  <span className="text-[10px] font-bold text-amber-900 uppercase block">Giltighet</span>
                  <span className="text-xs font-black text-amber-950">LIVSTID</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-3 border-t-2 border-dashed border-[#b8860b]/50 flex flex-wrap items-center justify-center gap-2.5">
              <button
                onClick={triggerConfetti}
                className="px-4 py-2 bg-[#bc6c25] hover:bg-[#a65d1d] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Skjut Guld-Konfetti!</span>
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-white hover:bg-[#faf4ec] text-[#4d3b2c] border border-[#d8c7b4] font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Skriv ut biljetten</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Close Button */}
        <div className="text-center mt-4">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#52796F] hover:bg-[#43645b] text-white font-bold text-xs rounded-2xl shadow-xs transition-colors cursor-pointer"
          >
            Tillbaka till caféet & fortsätt läsa!
          </button>
        </div>
      </div>
    </div>
  );
};
