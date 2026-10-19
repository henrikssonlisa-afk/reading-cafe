import React, { useState, useRef } from 'react';
import {
  CAFE_ASSET_DEFINITIONS,
  CAFE_ASSETS,
  getCafeAsset,
  setCustomCafeAsset,
  clearCustomCafeAsset,
  clearAllCustomCafeAssets,
  hasCustomCafeAsset,
} from '../data/cafeAssets';
import {
  Upload,
  Copy,
  Scissors,
  RotateCcw,
  Check,
  Image as ImageIcon,
  Link,
  Download,
  Sparkles,
  Info,
  X,
} from 'lucide-react';

interface AssetManagerViewProps {
  totalPages: number;
}

interface CropBox {
  id: string;
  label: string;
  xPct: number;
  yPct: number;
  wPct: number;
  hPct: number;
  color: string;
}

export const AssetManagerView: React.FC<AssetManagerViewProps> = ({ totalPages }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [pastingId, setPastingId] = useState<string | null>(null);
  const [pasteUrlInput, setPasteUrlInput] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Character Cropper State
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [cropperImageSrc, setCropperImageSrc] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 4 family crop zones (Ellen, Lisa, Tilde, Mange)
  const [cropBoxes, setCropBoxes] = useState<CropBox[]>([
    { id: 'char_ellen_reading', label: '👧 Ellen (Läshörnan)', xPct: 2, yPct: 5, wPct: 24, hPct: 90, color: '#2d5a27' },
    { id: 'char_lisa_bistro', label: '👩 Lisa (Bordet vänster)', xPct: 26, yPct: 5, wPct: 24, hPct: 90, color: '#9c6644' },
    { id: 'char_tilde_bistro', label: '👧 Tilde (Bordet höger)', xPct: 50, yPct: 5, wPct: 24, hPct: 90, color: '#3d5a80' },
    { id: 'char_mange_bar', label: '👨 Mange (Kaffebaren)', xPct: 74, yPct: 5, wPct: 24, hPct: 90, color: '#6f4e37' },
  ]);

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const showToast = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

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

  const handleFileUpload = (assetId: string, file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setCustomCafeAsset(assetId, result);
        showToast(`✓ Bilden sparades för ${CAFE_ASSET_DEFINITIONS[assetId]?.name || assetId}!`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyPastedUrl = (assetId: string) => {
    if (!pasteUrlInput.trim()) return;
    setCustomCafeAsset(assetId, pasteUrlInput.trim());
    setPastingId(null);
    setPasteUrlInput('');
    showToast(`✓ Bild lades till för ${CAFE_ASSET_DEFINITIONS[assetId]?.name || assetId}!`);
  };

  const handleResetAsset = (assetId: string) => {
    clearCustomCafeAsset(assetId);
    showToast(`Återställd till standard för ${CAFE_ASSET_DEFINITIONS[assetId]?.name || assetId}`);
  };

  const handleResetAll = () => {
    if (window.confirm('Vill du återställa alla uppladdade bilder till standardillustrationerna?')) {
      clearAllCustomCafeAssets();
      showToast('Alla bilder återställdes till standard!');
    }
  };

  const handleExportFullCode = () => {
    const exported: Record<string, string> = {};
    Object.keys(CAFE_ASSETS).forEach((k) => {
      exported[k] = getCafeAsset(k) || '';
    });
    const code = `export const CAFE_ASSETS: Record<string, string> = ${JSON.stringify(exported, null, 2)};`;
    copyToClipboard(code);
    showToast('✓ Hela CAFE_ASSETS-koden har kopierats till urklipp!');
  };

  // Group Photo Cropper logic
  const handleCropperImageSelect = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setCropperImageSrc(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleApplyCroppedCharacters = () => {
    if (!cropperImageSrc) return;
    const img = new Image();
    img.onload = () => {
      cropBoxes.forEach((box) => {
        const offCanvas = document.createElement('canvas');
        const sx = (box.xPct / 100) * img.naturalWidth;
        const sy = (box.yPct / 100) * img.naturalHeight;
        const sw = (box.wPct / 100) * img.naturalWidth;
        const sh = (box.hPct / 100) * img.naturalHeight;

        offCanvas.width = sw;
        offCanvas.height = sh;
        const ctx = offCanvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
          const dataUrl = offCanvas.toDataURL('image/png');
          setCustomCafeAsset(box.id, dataUrl);
        }
      });
      setIsCropperOpen(false);
      showToast('🎉 Alla 4 familjemedlemmar är nu utskurna och aktiva i caféet!');
    };
    img.src = cropperImageSrc;
  };

  const assetList = Object.values(CAFE_ASSET_DEFINITIONS);
  const categories = [
    { id: 'all', label: 'Alla' },
    { id: 'character', label: '👨‍👩‍👧‍👧 Familjen (4 figurer)' },
    { id: 'furniture', label: '🪑 Möbler' },
    { id: 'coffee', label: '☕ Kaffe & Fika' },
    { id: 'ceramic', label: '🏺 Keramik & Pokal' },
    { id: 'decor', label: '🌿 Växter & Dekor' },
    { id: 'structure', label: '🏡 Rum & Golv' },
  ];

  const filteredAssets = assetList.filter((a) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'character') return a.category === 'character';
    return a.category === filterCategory;
  });

  return (
    <div className="flex-1 overflow-y-auto pr-1 py-2 flex flex-col gap-4 text-xs">
      {/* Toast message */}
      {statusMessage && (
        <div className="p-3 bg-[#e3ede6] border border-[#a3c4ae] text-[#2b4c35] font-bold rounded-2xl flex items-center justify-between shadow-xs animate-in fade-in">
          <span>{statusMessage}</span>
          <button onClick={() => setStatusMessage(null)} className="text-[#2b4c35] hover:opacity-75">
            ✕
          </button>
        </div>
      )}

      {/* Action Banner */}
      <div className="p-4 bg-gradient-to-r from-amber-50 to-[#faf3e8] border border-amber-200/80 rounded-2xl text-[#422e1b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-bold text-sm text-[#2b2118]">
            <Sparkles className="w-4 h-4 text-[#bc6c25]" />
            <span>Caféets Bildhanterare & Illustratörs-spec</span>
          </div>
          <p className="text-[11.5px] text-[#705e4f] leading-relaxed max-w-xl">
            Ladda upp eller klistra in egna bilder för figurerna och caféinredningen.
            Bilderna sparas automatiskt och syns direkt i caféet!
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => setIsCropperOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#bc6c25] hover:bg-[#a2591a] text-white font-bold rounded-xl shadow-xs transition-all text-xs"
          >
            <Scissors className="w-4 h-4" />
            <span>✂️ Klipp ut från bild</span>
          </button>

          <button
            onClick={handleExportFullCode}
            className="flex items-center gap-1 px-3 py-2 bg-[#ede4d8] hover:bg-[#dfd3c3] text-[#422e1b] font-bold rounded-xl transition-all text-xs border border-[#d6c7b5]"
            title="Kopiera fullständigt TypeScript CAFE_ASSETS-objekt"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copiedAll ? '✓ Kopierad!' : 'Kopiera kod'}</span>
          </button>

          <button
            onClick={handleResetAll}
            className="flex items-center gap-1 px-2.5 py-2 text-stone-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all"
            title="Återställ alla anpassade bilder"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Category selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[#ebdcd0]">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilterCategory(c.id)}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap text-xs ${
              filterCategory === c.id
                ? 'bg-[#422e1b] text-white shadow-xs'
                : 'bg-[#f4efe8] text-[#5c4a3b] hover:bg-[#e8ded1]'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Asset Cards Grid */}
      <div className="space-y-3">
        {filteredAssets.map((asset) => {
          const currentSrc = getCafeAsset(asset.id);
          const hasCustom = hasCustomCafeAsset(asset.id);
          const isCharacter = asset.category === 'character';

          return (
            <div
              key={asset.id}
              className={`p-3.5 bg-white border rounded-2xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5 transition-all ${
                isCharacter ? 'border-[#bc6c25]/40 bg-[#fffdfa]' : 'border-[#dfd5c8]'
              }`}
            >
              {/* Thumbnail / Image Preview */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="w-16 h-16 rounded-xl border border-[#ebdcd0] bg-[#faf6f0] flex items-center justify-center overflow-hidden shrink-0 relative group">
                  {currentSrc ? (
                    <img
                      src={currentSrc}
                      alt={asset.name}
                      className="w-full h-full object-contain p-1"
                    />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-stone-400" />
                  )}
                  {hasCustom && (
                    <span className="absolute bottom-0 right-0 bg-emerald-600 text-white text-[8px] font-bold px-1 rounded-tl">
                      EGEN
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="font-bold text-sm text-[#2b2118]">{asset.name}</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#ede4d8] text-[#5c4a3b] text-[10px] font-bold uppercase">
                      {asset.category}
                    </span>
                    {currentSrc ? (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        ✓ Aktiv bild
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 text-[10px]">
                        SVG-kod
                      </span>
                    )}
                  </div>

                  <p className="text-[#695444] text-[11px] leading-relaxed line-clamp-2 mb-1">
                    {asset.description}
                  </p>

                  <div className="flex items-center gap-2 font-mono text-[10.5px] text-[#8c7460]">
                    <span className="bg-[#f5ede2] px-1.5 py-0.5 rounded border border-[#e8ded0]">
                      {asset.id}
                    </span>
                    <span>·</span>
                    <span>{asset.unlockedAtPages === 0 ? 'Start (0 s)' : `${asset.unlockedAtPages} sidor`}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1.5 w-full md:w-auto justify-end flex-wrap pt-2 md:pt-0 border-t md:border-t-0 border-[#f0e8dc]">
                {/* Hidden File input */}
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp, image/svg+xml"
                  ref={(el) => {
                    fileInputRefs.current[asset.id] = el;
                  }}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFileUpload(asset.id, f);
                  }}
                  className="hidden"
                />

                {/* Upload Button */}
                <button
                  onClick={() => fileInputRefs.current[asset.id]?.click()}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-[#f5ede2] hover:bg-[#ebdcd0] text-[#3c2a1a] font-bold rounded-xl transition-all border border-[#decbb9] text-[11px]"
                  title="Ladda upp PNG/JPG för detta objekt"
                >
                  <Upload className="w-3.5 h-3.5 text-[#bc6c25]" />
                  <span>Välj bild</span>
                </button>

                {/* Paste URL button */}
                <button
                  onClick={() => {
                    setPastingId(pastingId === asset.id ? null : asset.id);
                    setPasteUrlInput('');
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-xl transition-all text-[11px]"
                  title="Klistra in URL eller Base64"
                >
                  <Link className="w-3.5 h-3.5" />
                  <span>Klistra in</span>
                </button>

                {/* Copy ID button */}
                <button
                  onClick={() => copyToClipboard(asset.id, asset.id)}
                  className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-all"
                  title="Kopiera ID"
                >
                  {copiedId === asset.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>

                {/* Reset button if custom */}
                {hasCustom && (
                  <button
                    onClick={() => handleResetAsset(asset.id)}
                    className="p-1.5 text-amber-700 hover:bg-amber-100 rounded-lg transition-all"
                    title="Återställ till standard"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Expandable Paste Input */}
              {pastingId === asset.id && (
                <div className="w-full pt-2 flex items-center gap-2 animate-in fade-in">
                  <input
                    type="text"
                    value={pasteUrlInput}
                    onChange={(e) => setPasteUrlInput(e.target.value)}
                    placeholder="Klistra in data:image/png;base64,... eller https://..."
                    className="flex-1 px-3 py-1.5 text-xs bg-[#faf6f0] border border-[#ebdcd0] rounded-xl font-mono focus:outline-hidden focus:ring-1 focus:ring-[#bc6c25]"
                  />
                  <button
                    onClick={() => handleApplyPastedUrl(asset.id)}
                    className="px-3 py-1.5 bg-[#bc6c25] hover:bg-[#a2591a] text-white font-bold rounded-xl text-xs"
                  >
                    Spara
                  </button>
                  <button
                    onClick={() => setPastingId(null)}
                    className="px-2 py-1.5 text-stone-500 hover:text-stone-700"
                  >
                    Avbryt
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Character Cropper Modal */}
      {isCropperOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#faf6f0] border-2 border-[#422e1b] rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd0]">
              <div className="flex items-center gap-2">
                <Scissors className="w-5 h-5 text-[#bc6c25]" />
                <h3 className="font-bold text-base text-[#2b2118]">
                  Klipp ut de 4 figurerna från en familjebild
                </h3>
              </div>
              <button
                onClick={() => setIsCropperOpen(false)}
                className="w-8 h-8 rounded-full bg-[#ebdcd0] text-[#422e1b] hover:bg-[#dfd0c4] flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="py-3 space-y-4">
              <p className="text-xs text-[#695444] leading-relaxed">
                Välj eller släpp din bild med familjemedlemmarna (t.ex. Ellen, Lisa, Tilde och Mange).
                Justera rutorna nedan så att varje person täcks, och klicka sedan på{' '}
                <strong>"Tillämpa alla 4 i caféet"</strong>!
              </p>

              {/* Upload area */}
              {!cropperImageSrc ? (
                <label className="border-2 border-dashed border-[#bc6c25]/50 bg-amber-50/50 hover:bg-amber-50 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors text-center">
                  <Upload className="w-8 h-8 text-[#bc6c25] mb-2 animate-bounce" />
                  <span className="font-bold text-sm text-[#3c2a1a]">
                    Klicka för att välja bild eller släpp den här
                  </span>
                  <span className="text-xs text-[#8c7460] mt-1">
                    Stöder PNG, JPG och WebP (både enskilda figurer och gruppbild)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleCropperImageSelect(f);
                    }}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="space-y-4">
                  {/* Image with overlay boxes */}
                  <div className="relative border-2 border-[#422e1b] rounded-2xl overflow-hidden bg-stone-900 flex items-center justify-center max-h-[360px]">
                    <img
                      src={cropperImageSrc}
                      alt="Familjebild"
                      className="w-full h-auto object-contain select-none"
                    />

                    {/* Visual Crop Guides */}
                    <div className="absolute inset-0 pointer-events-none">
                      {cropBoxes.map((box) => (
                        <div
                          key={box.id}
                          style={{
                            left: `${box.xPct}%`,
                            top: `${box.yPct}%`,
                            width: `${box.wPct}%`,
                            height: `${box.hPct}%`,
                            borderColor: box.color,
                          }}
                          className="absolute border-2 bg-white/10 rounded-lg shadow-sm flex flex-col justify-between p-1"
                        >
                          <span
                            style={{ backgroundColor: box.color }}
                            className="text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs self-start"
                          >
                            {box.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sliders to fine-tune horizontal split */}
                  <div className="p-3 bg-white border border-[#ebdcd0] rounded-xl space-y-2">
                    <span className="font-bold text-xs text-[#3c2a1a] block">
                      Fördela beskärningsrutorna (Vänster till Höger):
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                      {cropBoxes.map((box, idx) => (
                        <div key={box.id} className="p-2 bg-[#faf6f0] rounded-lg border border-[#ebdcd0]">
                          <span className="font-bold block truncate" style={{ color: box.color }}>
                            {box.label}
                          </span>
                          <label className="text-[10px] text-stone-500 block mt-1">
                            X-position: {box.xPct}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="80"
                            value={box.xPct}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setCropBoxes((prev) =>
                                prev.map((b, i) => (i === idx ? { ...b, xPct: val } : b))
                              );
                            }}
                            className="w-full accent-[#bc6c25]"
                          />
                          <label className="text-[10px] text-stone-500 block mt-1">
                            Bredd: {box.wPct}%
                          </label>
                          <input
                            type="range"
                            min="10"
                            max="50"
                            value={box.wPct}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setCropBoxes((prev) =>
                                prev.map((b, i) => (i === idx ? { ...b, wPct: val } : b))
                              );
                            }}
                            className="w-full accent-[#bc6c25]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cropper Action buttons */}
                  <div className="flex items-center justify-between gap-3 pt-2">
                    <label className="text-xs text-[#8c7460] underline cursor-pointer hover:text-[#3c2a1a]">
                      Välj en annan bild
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleCropperImageSelect(f);
                        }}
                        className="hidden"
                      />
                    </label>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsCropperOpen(false)}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-200 transition-colors"
                      >
                        Avbryt
                      </button>
                      <button
                        onClick={handleApplyCroppedCharacters}
                        className="flex items-center gap-2 px-5 py-2 bg-[#bc6c25] hover:bg-[#a2591a] text-white text-xs font-bold rounded-xl shadow-md transition-all"
                      >
                        <Check className="w-4 h-4" />
                        <span>Tillämpa alla 4 i caféet!</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
