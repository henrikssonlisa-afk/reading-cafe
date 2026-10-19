import React, { useState } from 'react';
import { CAFE_MILESTONES, CAFE_PHASES } from '../data/cafeMilestones';
import { CAFE_ASSET_DEFINITIONS, CAFE_ASSETS } from '../data/cafeAssets';
import { CafeMilestone } from '../types';
import { Check, Lock, Sparkles, Filter, Copy, Image as ImageIcon, BookOpen } from 'lucide-react';
import { AssetManagerView } from './AssetManagerView';

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalPages: number;
}

export const CatalogModal: React.FC<CatalogModalProps> = ({
  isOpen,
  onClose,
  totalPages,
}) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'assets'>('catalog');
  const [selectedPhase, setSelectedPhase] = useState<number>(0); // 0 = all
  const [filterUnlocked, setFilterUnlocked] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  if (!isOpen) return null;

  const currentStep = Math.min(100, Math.floor(totalPages / 10));

  const copyToClipboard = (text: string, id?: string) => {
    navigator.clipboard.writeText(text);
    if (id) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } else {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  const assetList = Object.values(CAFE_ASSET_DEFINITIONS);

  const filteredMilestones = CAFE_MILESTONES.filter((m) => {
    if (selectedPhase !== 0 && m.phase !== selectedPhase) return false;
    const isUnlocked = totalPages >= m.requiredPages;
    if (filterUnlocked === 'unlocked' && !isUnlocked) return false;
    if (filterUnlocked === 'locked' && isUnlocked) return false;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-[#faf6f0] border-2 border-[#422e1b] rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd0]">
          <div>
            <h2 className="text-lg font-bold font-display text-[#2b2118]">
              {activeTab === 'catalog' ? 'Caféets Upplåsningskatalog' : '🎨 Illustratörs-specifikation (PNG)'}
            </h2>
            <p className="text-xs text-[#7d6855]">
              {activeTab === 'catalog'
                ? `Totalt 100 inredningsdetaljer – ${currentStep} av 100 upplåsta (${totalPages} sidor)`
                : `Komplett lista med alla ${assetList.length} grafikdelar & ID:n för illustratören`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8c7460] hover:text-[#2b2118] text-sm rounded-lg hover:bg-[#ede3d4] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 pt-3 pb-2 border-b border-[#ebdcd0]">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'catalog'
                ? 'bg-[#52796F] text-white shadow-xs'
                : 'bg-white/80 text-[#5c4a3b] border border-[#dfd5c8] hover:bg-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Upplåsningssteg (100)
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'assets'
                ? 'bg-[#bc6c25] text-white shadow-xs'
                : 'bg-white/80 text-[#5c4a3b] border border-[#dfd5c8] hover:bg-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            🎨 Illustratörs-spec ({assetList.length} PNG-objekt)
          </button>
        </div>

        {activeTab === 'catalog' ? (
          <>
            {/* Phase selector buttons */}
            <div className="flex flex-wrap items-center gap-1.5 py-3 border-b border-[#ebdcd0] text-xs">
              <button
                onClick={() => setSelectedPhase(0)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                  selectedPhase === 0
                    ? 'bg-[#52796F] text-white shadow-xs'
                    : 'bg-white text-[#5c4a3b] border border-[#dfd5c8] hover:bg-[#f5ede2]'
                }`}
              >
                Alla faser
              </button>
              {CAFE_PHASES.map((p) => (
                <button
                  key={p.phase}
                  onClick={() => setSelectedPhase(p.phase)}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                    selectedPhase === p.phase
                      ? 'bg-[#52796F] text-white shadow-xs'
                      : 'bg-white text-[#5c4a3b] border border-[#dfd5c8] hover:bg-[#f5ede2]'
                  }`}
                >
                  Fas {p.phase} ({p.steps})
                </button>
              ))}
            </div>

            {/* Filter Unlocked tabs */}
            <div className="flex items-center justify-between py-2.5 text-xs text-[#7d6855]">
              <span>Visar {filteredMilestones.length} föremål</span>
              <div className="flex items-center gap-1 bg-[#ede4d8] p-0.5 rounded-lg">
                <button
                  onClick={() => setFilterUnlocked('all')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    filterUnlocked === 'all' ? 'bg-white text-[#2b2118] shadow-xs' : 'text-[#705e4f]'
                  }`}
                >
                  Alla
                </button>
                <button
                  onClick={() => setFilterUnlocked('unlocked')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    filterUnlocked === 'unlocked' ? 'bg-white text-[#2b2118] shadow-xs' : 'text-[#705e4f]'
                  }`}
                >
                  Upplåsta
                </button>
                <button
                  onClick={() => setFilterUnlocked('locked')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    filterUnlocked === 'locked' ? 'bg-white text-[#2b2118] shadow-xs' : 'text-[#705e4f]'
                  }`}
                >
                  Kommande
                </button>
              </div>
            </div>

            {/* Items Grid */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 py-2">
              {filteredMilestones.map((m) => {
                const isUnlocked = totalPages >= m.requiredPages;
                return (
                  <div
                    key={m.step}
                    className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 ${
                      isUnlocked
                        ? 'bg-white border-[#e0d6c8] shadow-xs'
                        : 'bg-[#faf6f0]/50 border-[#ede3d6] opacity-75'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                        isUnlocked ? 'bg-[#f4efe8]' : 'bg-[#ece4d9]'
                      }`}
                    >
                      {isUnlocked ? m.icon : '🔒'}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <h4 className="font-bold text-sm text-[#2b2118] truncate">
                          {m.title}
                        </h4>
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                            isUnlocked
                              ? 'bg-[#e3ede6] text-[#365942]'
                              : 'bg-[#ede4d8] text-[#705e4f]'
                          }`}
                        >
                          {isUnlocked ? '✓ Upplåst' : `${m.requiredPages} sidor`}
                        </span>
                      </div>

                      <p className="text-xs text-[#6e5b4b] leading-relaxed mb-1">
                        {m.description}
                      </p>

                      <div className="text-[11px] text-[#8c7866]">
                        Steg {m.step} av 100 · Fas {m.phase}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <AssetManagerView totalPages={totalPages} />
        )}
      </div>
    </div>
  );
};
