import React, { useState, useMemo, useEffect } from 'react';
import { CAFE_MILESTONES, CAFE_PHASES } from '../data/cafeMilestones';
import { TOTAL_GOAL_PAGES } from '../data/participants';
import { getCafeAsset } from '../data/cafeAssets';
import { UserId, ReadingEntry } from '../types';
import { Info, Sparkles, CloudRain, Sun, Moon, Volume2, VolumeX, Eye, Users } from 'lucide-react';

interface CozyCafeIllustrationProps {
  totalPages: number;
  onOpenCatalog: () => void;
  onToggleRainSound: () => void;
  isRainPlaying: boolean;
  currentUser?: UserId | null;
  entries?: ReadingEntry[];
}

function wrapTextToLines(text: string, maxCharsPerLine: number = 20): string[] {
  if (!text) return [];
  const clean = text.trim();
  const words = clean.split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);

  // If longer than 4 lines, clamp to 4 lines with ellipsis
  if (lines.length > 4) {
    const clamped = lines.slice(0, 3);
    let fourth = lines[3];
    if (fourth.length > maxCharsPerLine - 3) {
      fourth = fourth.substring(0, maxCharsPerLine - 4) + '...';
    } else {
      fourth += '...';
    }
    clamped.push(fourth);
    return clamped;
  }

  return lines;
}

interface DynamicBubbleProps {
  x: number; // horizontal center offset of the bubble box
  y: number; // vertical bottom of the bubble box
  headX?: number; // target character head X in local group coords
  headY?: number; // target character head Y in local group coords
  text: string;
  color: string;
  onClick?: (e: React.MouseEvent) => void;
  maxCharsPerLine?: number;
}

const DynamicSpeechBubble: React.FC<DynamicBubbleProps> = ({
  x,
  y,
  headX,
  headY = 4,
  text,
  color,
  onClick,
  maxCharsPerLine = 18,
}) => {
  const lines = wrapTextToLines(text, maxCharsPerLine);
  const maxLineLen = Math.max(...lines.map((l) => l.length), 6);
  // Compact, cute width capped at 124px to ensure adjacent bubbles never touch or overlap
  const width = Math.max(76, Math.min(124, maxLineLen * 6.2 + 14));
  const lineHeight = 11.5;
  const height = lines.length * lineHeight + 12;

  const halfW = width / 2;
  const boxTop = y - height;

  const targetX = headX !== undefined ? headX : x;
  const targetY = headY;

  // Base of the pointer tail clamped safely inside the bubble box bottom edge
  const tailBaseX = Math.max(x - halfW + 12, Math.min(x + halfW - 12, targetX));

  return (
    <g
      className="cursor-pointer group select-none transition-transform duration-200 hover:scale-105"
      onClick={onClick}
    >
      {/* Speech Pointer Tail connecting bubble bottom directly to character head */}
      <polygon
        points={`${tailBaseX - 5},${y} ${tailBaseX + 5},${y} ${targetX},${targetY}`}
        fill="#ffffff"
        stroke="#3c2a1a"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Main Bubble Box with cozy rounded corners */}
      <rect
        x={x - halfW}
        y={boxTop}
        width={width}
        height={height}
        rx={10}
        fill="#ffffff"
        stroke="#3c2a1a"
        strokeWidth="2.5"
        className="filter drop-shadow-xs"
      />

      {/* Mask over top stroke of pointer tail so bubble interior is contiguous white */}
      <line
        x1={tailBaseX - 4.5}
        y1={y}
        x2={tailBaseX + 4.5}
        y2={y}
        stroke="#ffffff"
        strokeWidth="3.5"
      />

      {/* Formatted Text Lines */}
      {lines.map((line, idx) => (
        <text
          key={idx}
          x={x}
          y={boxTop + 10.5 + idx * lineHeight}
          textAnchor="middle"
          fontSize="7.5"
          fontWeight="bold"
          fill={color}
          className="select-none pointer-events-none"
        >
          {line}
        </text>
      ))}
    </g>
  );
};

interface AssetItemProps {
  id: string;
  fallback: React.ReactNode;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  transform?: string;
}

const AssetItem: React.FC<AssetItemProps> = ({
  id,
  fallback,
  x,
  y,
  width,
  height,
  className,
  onClick,
  transform,
}) => {
  const src = getCafeAsset(id);
  if (src) {
    return (
      <image
        href={src}
        x={x}
        y={y}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        className={className}
        onClick={onClick}
        transform={transform}
      />
    );
  }
  return <>{fallback}</>;
};

export const CozyCafeIllustration: React.FC<CozyCafeIllustrationProps> = ({
  totalPages,
  onOpenCatalog,
  onToggleRainSound,
  isRainPlaying,
  currentUser,
  entries = [],
}) => {
  const [activeMood, setActiveMood] = useState<'afternoon' | 'golden' | 'evening'>('afternoon');
  const [inspectedItem, setInspectedItem] = useState<{ title: string; desc: string; step: number; icon: string } | null>(null);
  const [, setAssetsVersion] = useState(0);

  useEffect(() => {
    const onAssetsUpdated = () => setAssetsVersion((v) => v + 1);
    window.addEventListener('cafe-assets-updated', onAssetsUpdated);
    return () => window.removeEventListener('cafe-assets-updated', onAssetsUpdated);
  }, []);

  // Presence in the café: allow toggling who is hanging out in the cafe (default all active or all family!)
  const [presentMembers, setPresentMembers] = useState<Record<UserId, boolean>>({
    ellen: true,
    tilde: true,
    lisa: true,
    mange: true,
  });

  const toggleMemberPresence = (id: UserId) => {
    setPresentMembers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Extract dynamic quotes & book titles for each family member from reading entries
  const memberQuotes = useMemo(() => {
    const defaults: Record<
      UserId,
      { quote: string; bookTitle?: string; date?: string; pages?: number }
    > = {
      ellen: {
        quote: 'Så spännande! Kunde inte sluta läsa kapitlet om minotauren.',
        bookTitle: 'Percy Jackson & Född till hjälte',
        pages: 18,
      },
      tilde: {
        quote: 'Underbar världsbyggnad. Älskar karaktärerna!',
        bookTitle: 'A Court of Thorns and Roses',
        pages: 35,
      },
      lisa: {
        quote: 'Väldigt berörande och vackert skrivet.',
        bookTitle: 'Ett litet liv',
        pages: 25,
      },
      mange: {
        quote: 'Perfekt bok till morgonkaffet!',
        bookTitle: 'Kaffe: Från böna till kopp',
        pages: 10,
      },
    };

    if (entries && entries.length > 0) {
      (['ellen', 'tilde', 'lisa', 'mange'] as UserId[]).forEach((uid) => {
        const userReads = entries.filter((e) => e.userId === uid);
        const withNote = userReads.find((e) => e.note && e.note.trim().length > 0);
        if (withNote && withNote.note) {
          defaults[uid] = {
            quote: withNote.note,
            bookTitle: withNote.bookTitle,
            date: withNote.date,
            pages: withNote.pages,
          };
        } else if (userReads.length > 0 && userReads[0].bookTitle) {
          defaults[uid] = {
            quote: `Läser "${userReads[0].bookTitle}"! 📖`,
            bookTitle: userReads[0].bookTitle,
            date: userReads[0].date,
            pages: userReads[0].pages,
          };
        }
      });
    }

    return defaults;
  }, [entries]);

  const currentStep = Math.min(100, Math.floor(totalPages / 10));
  const progressPercent = Math.min(100, (totalPages / TOTAL_GOAL_PAGES) * 100);

  // Next milestone calculation
  const nextMilestone = CAFE_MILESTONES.find((m) => m.step > currentStep) || CAFE_MILESTONES[CAFE_MILESTONES.length - 1];
  const pagesToNext = Math.max(0, nextMilestone.requiredPages - totalPages);

  // Active Phase
  let currentPhase = 1;
  if (totalPages >= 751) currentPhase = 4;
  else if (totalPages >= 501) currentPhase = 3;
  else if (totalPages >= 251) currentPhase = 2;

  const phaseMeta = CAFE_PHASES[currentPhase - 1];

  // Visual thresholds for café building
  const hasFloor = totalPages >= 30;
  const hasWallPaint = totalPages >= 50;
  const hasWindow = totalPages >= 70;
  const hasWindowRain = totalPages >= 90;
  const hasTableAndChairs = totalPages >= 130;
  const hasCounterAndMenu = totalPages >= 180;
  const hasFirstBookshelf = totalPages >= 260;
  const hasReadingArmchair = totalPages >= 290;
  const hasReadingLamp = totalPages >= 320;
  const hasEspressoMachine = totalPages >= 350;
  const hasSecondBookshelf = totalPages >= 390;
  const hasMonstera = totalPages >= 510;
  const hasHangingPlants = totalPages >= 520;
  const hasFairyLights = totalPages >= 540;
  const hasPastryCase = totalPages >= 560;
  const hasGramophone = totalPages >= 600;
  const hasFireplace = totalPages >= 710;
  const hasArtGallery = totalPages >= 760;
  const hasSleepingCat = totalPages >= 790;
  const hasCeramicShelf = totalPages >= 900;
  const isCompleted = totalPages >= 1000;

  // Atmosphere palette
  const moodBackdrops = {
    afternoon: {
      sky: '#95afc0',
      wallColor: '#f7f1e7',
      floorColor: '#d6a87c',
      windowGlow: 'rgba(235, 243, 250, 0.5)',
      lampGlow: 'rgba(255, 235, 175, 0.45)',
    },
    golden: {
      sky: '#f6b986',
      wallColor: '#fff5ea',
      floorColor: '#e0b085',
      windowGlow: 'rgba(255, 215, 160, 0.65)',
      lampGlow: 'rgba(255, 220, 140, 0.6)',
    },
    evening: {
      sky: '#34495e',
      wallColor: '#ece1d0',
      floorColor: '#be9168',
      windowGlow: 'rgba(44, 62, 80, 0.7)',
      lampGlow: 'rgba(255, 210, 110, 0.75)',
    },
  };

  const currentMood = moodBackdrops[activeMood];

  return (
    <div className="relative w-full rounded-3xl bg-[#faf6f0] border-2 border-[#422e1b] shadow-md overflow-hidden flex flex-col">
      {/* Top Banner & Atmospheric Controls */}
      <div className="px-4 sm:px-6 py-3 border-b-2 border-[#422e1b] bg-[#fbf5ed] flex flex-wrap items-center justify-between gap-3 text-xs text-[#5c4a3b]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#84A98C] border border-[#422e1b]" />
          <span className="font-bold text-sm text-[#3b2d20] font-display">{phaseMeta.title}</span>
          <span className="text-[#a89078]">·</span>
          <span className="text-[#7d6855] font-semibold">{phaseMeta.pageRange}</span>
        </div>

        {/* Action Toggles: Mood, Ambience, Catalog, and Family in Cafe */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Mood Switches */}
          <div className="flex items-center bg-[#ede3d4] p-0.5 rounded-xl border border-[#422e1b]/40">
            <button
              onClick={() => setActiveMood('afternoon')}
              title="Regnig eftermiddag"
              className={`p-1.5 rounded-lg transition-colors ${
                activeMood === 'afternoon' ? 'bg-white text-[#2b2118] shadow-xs' : 'text-[#705e4f]'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveMood('golden')}
              title="Gyllene timmen"
              className={`p-1.5 rounded-lg transition-colors ${
                activeMood === 'golden' ? 'bg-white text-[#2b2118] shadow-xs' : 'text-[#705e4f]'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveMood('evening')}
              title="Mysig kväll med lampor"
              className={`p-1.5 rounded-lg transition-colors ${
                activeMood === 'evening' ? 'bg-white text-[#2b2118] shadow-xs' : 'text-[#705e4f]'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Rain Sound Ambient Toggle */}
          <button
            onClick={onToggleRainSound}
            title={isRainPlaying ? 'Pausa regnljud' : 'Spela mysigt regnljud'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border border-[#422e1b] ${
              isRainPlaying
                ? 'bg-[#84A98C] text-white shadow-xs'
                : 'bg-white text-[#5c4a3b] hover:bg-[#f6eee2]'
            }`}
          >
            {isRainPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isRainPlaying ? 'Regn på' : 'Regnljud'}</span>
          </button>

          {/* Catalog */}
          <button
            onClick={onOpenCatalog}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#f6eee2] text-[#422e1b] border border-[#422e1b] rounded-xl text-xs font-bold transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#bc6c25]" />
            <span>Katalog</span>
          </button>
        </div>
      </div>

      {/* Family in the Cafe Presence Switcher Bar */}
      <div className="px-4 py-2 bg-[#f4ebe1] border-b border-[#422e1b]/20 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-bold text-[#5c4a3b]">
          <Users className="w-3.5 h-3.5 text-[#52796F]" />
          <span>I caféet just nu:</span>
        </div>

        <div className="flex items-center gap-1.5">
          {(['ellen', 'tilde', 'lisa', 'mange'] as UserId[]).map((id) => {
            const isPresent = presentMembers[id];
            const names = { ellen: 'Ellen', tilde: 'Tilde', lisa: 'Lisa', mange: 'Mange' };
            const colors = {
              ellen: '#52796F',
              tilde: '#BC6C25',
              lisa: '#9C6644',
              mange: '#6F4E37',
            };

            return (
              <button
                key={id}
                onClick={() => toggleMemberPresence(id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                  isPresent
                    ? 'text-white border-[#422e1b] shadow-xs'
                    : 'bg-white/80 text-[#8c7866] border-[#decbb7] opacity-60'
                }`}
                style={{ backgroundColor: isPresent ? colors[id] : undefined }}
              >
                {names[id]} {isPresent ? '✓' : ''}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Cozy Coloring-Book Style SVG Illustration */}
      <div className="relative w-full aspect-[16/9] min-h-[360px] max-h-[620px] bg-[#faf6f0] select-none">
        <svg
          viewBox="0 0 960 540"
          className="w-full h-full block"
          style={{ backgroundColor: currentMood.wallColor }}
        >
          <defs>
            {/* Warm Rounded Outlines Style Guide */}
            {/* Standard stroke color: #3c2a1a, strokeWidth: 3.5 / 4, strokeLinecap: round, strokeLinejoin: round */}

            {/* Rain Drops Pattern with rounded chubby drops */}
            <pattern id="cozyRain" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 12,6 Q 16,16 12,20 Q 8,16 12,6 Z" fill="rgba(255,255,255,0.45)" />
              <path d="M 28,18 Q 32,28 28,32 Q 24,28 28,18 Z" fill="rgba(255,255,255,0.4)" />
            </pattern>

            {/* Lamp Warm Glow Radial */}
            <radialGradient id="chubbyLampGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={currentMood.lampGlow} />
              <stop offset="60%" stopColor="rgba(255, 235, 175, 0.25)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </radialGradient>
          </defs>

          {/* BACK WALL */}
          <AssetItem
            id="bg_room_empty"
            x={0}
            y={0}
            width={960}
            height={540}
            fallback={<rect x="0" y="0" width="960" height="360" fill={currentMood.wallColor} />}
          />

          {/* SAGE WALL ACCENT PANEL (Step >= 50) */}
          {hasWallPaint && (
            <AssetItem
              id="bg_wall_paint"
              x={0}
              y={35}
              width={360}
              height={320}
              fallback={
                <g>
                  <rect x="0" y="40" width="360" height="320" fill="#75937a" />
                  {/* Chubby Wainscoting molding */}
                  <rect x="0" y="35" width="360" height="12" rx="4" fill="#5a7860" stroke="#3c2a1a" strokeWidth="3" />
                  <rect x="0" y="240" width="360" height="10" rx="3" fill="#5a7860" stroke="#3c2a1a" strokeWidth="2.5" />
                  {/* Rounded panel inserts */}
                  <rect x="30" y="60" width="80" height="160" rx="14" fill="#6a8770" stroke="#3c2a1a" strokeWidth="3" />
                  <rect x="140" y="60" width="80" height="160" rx="14" fill="#6a8770" stroke="#3c2a1a" strokeWidth="3" />
                  <rect x="250" y="60" width="80" height="160" rx="14" fill="#6a8770" stroke="#3c2a1a" strokeWidth="3" />
                </g>
              }
            />
          )}

          {/* BIG ARCHED STREET WINDOW (Step >= 70) */}
          {hasWindow ? (
            <g
              className="cursor-pointer"
              onClick={() =>
                setInspectedItem({
                  title: 'Välvt caféfönster mot gatan',
                  desc: 'Stort runt, mjukt fönster där man kan sitta och titta på regndropparna som pärlar sig.',
                  step: 7,
                  icon: '🪟',
                })
              }
            >
              <AssetItem
                id="room_window_frame"
                x={375}
                y={60}
                width={310}
                height={235}
                fallback={
                  <g>
                    {/* Window sky outdoor view */}
                    <path
                      d="M 400,280 L 400,160 C 400,70 660,70 660,160 L 660,280 Z"
                      fill={currentMood.sky}
                    />

                    {/* Distant cozy rooftops */}
                    <polygon points="400,280 440,240 480,265 540,210 600,260 660,230 660,280" fill="#3a4a58" opacity="0.6" />
                    <circle cx="560" cy="130" r="26" fill="#ffeaa7" opacity={activeMood === 'golden' ? '0.9' : '0.2'} />

                    {/* Raindrops against glass */}
                    {hasWindowRain && (
                      <AssetItem
                        id="room_window_rain"
                        x={395}
                        y={65}
                        width={270}
                        height={215}
                        fallback={
                          <path
                            d="M 400,280 L 400,160 C 400,70 660,70 660,160 L 660,280 Z"
                            fill="url(#cozyRain)"
                          />
                        }
                      />
                    )}

                    {/* Thick rounded wooden frame (Bobbie Goods style) */}
                    <path
                      d="M 395,280 L 395,160 C 395,60 665,60 665,160 L 665,280 Z"
                      fill="none"
                      stroke="#6b4629"
                      strokeWidth="16"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 395,280 L 395,160 C 395,60 665,60 665,160 L 665,280 Z"
                      fill="none"
                      stroke="#3c2a1a"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Curved window mullions */}
                    <line x1="530" y1="65" x2="530" y2="280" stroke="#3c2a1a" strokeWidth="6" strokeLinecap="round" />
                    <line x1="400" y1="180" x2="660" y2="180" stroke="#3c2a1a" strokeWidth="6" strokeLinecap="round" />

                    {/* Chunky rounded window sill in oak */}
                    <rect x="375" y="275" width="310" height="22" rx="10" fill="#8c5836" stroke="#3c2a1a" strokeWidth="4" />
                    <rect x="385" y="278" width="290" height="6" rx="3" fill="#b07d54" />
                  </g>
                }
              />

              {/* Window sill chubby succulent pots (Step >= 63) */}
              {totalPages >= 630 && (
                <AssetItem
                  id="plant_succulents_window"
                  x={415}
                  y={245}
                  width={80}
                  height={35}
                  fallback={
                    <g>
                      {/* Chubby Pot 1 */}
                      <rect x="420" y="255" width="28" height="22" rx="7" fill="#e76f51" stroke="#3c2a1a" strokeWidth="3" />
                      <ellipse cx="434" cy="248" rx="12" ry="10" fill="#588157" stroke="#3c2a1a" strokeWidth="2.5" />
                      {/* Chubby Pot 2 */}
                      <rect x="460" y="258" width="22" height="18" rx="6" fill="#f4a261" stroke="#3c2a1a" strokeWidth="3" />
                      <ellipse cx="471" cy="252" rx="9" ry="8" fill="#84a98c" stroke="#3c2a1a" strokeWidth="2.5" />
                    </g>
                  }
                />
              )}

              {/* Wooden "Öppet" sign (Step >= 78) */}
              {totalPages >= 780 && (
                <AssetItem
                  id="sign_open_window"
                  x={580}
                  y={175}
                  width={65}
                  height={45}
                  fallback={
                    <g transform="translate(580, 190)">
                      <line x1="10" y1="-15" x2="16" y2="0" stroke="#3c2a1a" strokeWidth="2.5" />
                      <line x1="50" y1="-15" x2="44" y2="0" stroke="#3c2a1a" strokeWidth="2.5" />
                      <rect x="0" y="0" width="60" height="26" rx="8" fill="#fffdfa" stroke="#3c2a1a" strokeWidth="3" />
                      <text x="30" y="17" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#bc6c25" letterSpacing="1">
                        ÖPPET
                      </text>
                    </g>
                  }
                />
              )}
            </g>
          ) : (
            /* Window outline before unlocked */
            <path
              d="M 400,280 L 400,160 C 400,70 660,70 660,160 L 660,280 Z"
              fill="#dfd3c3"
              stroke="#b5a390"
              strokeWidth="4"
              strokeDasharray="8 8"
            />
          )}

          {/* CEILING WOOD BEAM & FAIRY LIGHTS */}
          <rect x="0" y="0" width="960" height="28" fill="#583101" stroke="#3c2a1a" strokeWidth="4" />
          <rect x="180" y="0" width="22" height="34" rx="4" fill="#6f4e37" stroke="#3c2a1a" strokeWidth="3" />
          <rect x="480" y="0" width="22" height="34" rx="4" fill="#6f4e37" stroke="#3c2a1a" strokeWidth="3" />
          <rect x="760" y="0" width="22" height="34" rx="4" fill="#6f4e37" stroke="#3c2a1a" strokeWidth="3" />

          {/* GLOWING FAIRY LIGHTS (Step >= 54) */}
          {hasFairyLights && (
            <AssetItem
              id="decor_fairy_lights"
              x={0}
              y={10}
              width={960}
              height={60}
              fallback={
                <g>
                  <path
                    d="M 0,30 Q 120,55 240,35 Q 360,58 480,36 Q 600,58 720,35 Q 840,55 960,30"
                    fill="none"
                    stroke="#3c2a1a"
                    strokeWidth="2.5"
                  />
                  {[60, 140, 220, 300, 380, 460, 540, 620, 700, 780, 860].map((cx, i) => (
                    <g key={i}>
                      <circle cx={cx} cy={38 + Math.sin(i) * 6} r="16" fill="url(#chubbyLampGlow)" />
                      <ellipse
                        cx={cx}
                        cy={38 + Math.sin(i) * 6}
                        rx="5.5"
                        ry="6.5"
                        fill="#ffeaa7"
                        stroke="#3c2a1a"
                        strokeWidth="2.5"
                      />
                      <circle cx={cx - 1} cy={36 + Math.sin(i) * 6} r="1.5" fill="#fff" />
                    </g>
                  ))}
                </g>
              }
            />
          )}

          {/* ART GALLERY ON SAGE WALL (Step >= 76) */}
          {hasArtGallery && (
            <g
              className="cursor-pointer"
              onClick={() =>
                setInspectedItem({
                  title: 'Inramad bokkonst',
                  desc: 'Mjuka, bulliga tavlor med favoritillustrationer och mysiga citat.',
                  step: 76,
                  icon: '🖼️',
                })
              }
            >
              <AssetItem
                id="decor_art_gallery"
                x={45}
                y={65}
                width={180}
                height={110}
                fallback={
                  <g>
                    {/* Frame 1: Coffee Cup Art */}
                    <rect x="50" y="80" width="65" height="80" rx="10" fill="#fffdfa" stroke="#3c2a1a" strokeWidth="4" />
                    <ellipse cx="82" cy="120" rx="16" ry="14" fill="#dda15e" stroke="#3c2a1a" strokeWidth="3" />
                    <path d="M 82,102 Q 80,95 84,90" stroke="#3c2a1a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    {/* Frame 2: Heart & Book Art */}
                    <rect x="140" y="70" width="75" height="95" rx="12" fill="#fffdfa" stroke="#3c2a1a" strokeWidth="4" />
                    <path
                      d="M 177,105 C 177,95 162,95 162,108 C 162,120 177,130 177,130 C 177,130 192,120 192,108 C 192,95 177,95 177,105 Z"
                      fill="#e76f51"
                      stroke="#3c2a1a"
                      strokeWidth="3"
                    />
                    <text x="177" y="148" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#3c2a1a">
                      COZY BOOKS
                    </text>
                  </g>
                }
              />
            </g>
          )}

          {/* RUSTIC WOOD FLOOR (Step >= 30) */}
          <AssetItem
            id="room_wood_floor"
            x={0}
            y={355}
            width={960}
            height={185}
            fallback={
              <g>
                <rect
                  x="0"
                  y="355"
                  width="960"
                  height="185"
                  fill={hasFloor ? currentMood.floorColor : '#c7b7a6'}
                  stroke="#3c2a1a"
                  strokeWidth="5"
                />

                {/* Chubby Wooden Floor Seams */}
                {hasFloor && (
                  <g stroke="#3c2a1a" strokeWidth="3" strokeLinecap="round" opacity="0.45">
                    <line x1="0" y1="395" x2="960" y2="395" />
                    <line x1="0" y1="440" x2="960" y2="440" />
                    <line x1="0" y1="485" x2="960" y2="485" />
                    {/* Plank ends */}
                    <line x1="140" y1="355" x2="140" y2="395" />
                    <line x1="420" y1="355" x2="420" y2="395" />
                    <line x1="280" y1="395" x2="280" y2="440" />
                    <line x1="680" y1="395" x2="680" y2="440" />
                    <line x1="190" y1="440" x2="190" y2="485" />
                    <line x1="560" y1="440" x2="560" y2="485" />
                  </g>
                )}
              </g>
            }
          />

          {/* PUFFY ROUND RUG UNDER READING CORNER (Step >= 33) */}
          {totalPages >= 330 && (
            <AssetItem
              id="rug_round_reading"
              x={50}
              y={410}
              width={300}
              height={110}
              fallback={
                <g>
                  <ellipse cx="200" cy="465" rx="150" ry="55" fill="#f4a261" stroke="#3c2a1a" strokeWidth="4" />
                  <ellipse cx="200" cy="465" rx="130" ry="44" fill="#fcedd8" stroke="#3c2a1a" strokeWidth="3" strokeDasharray="6 6" />
                  <ellipse cx="200" cy="465" rx="90" ry="28" fill="#e76f51" stroke="#3c2a1a" strokeWidth="2.5" />
                </g>
              }
            />
          )}

          {/* CHUBBY LEFT BOOKSHELF (Step >= 26) */}
          {hasFirstBookshelf && (
            <g
              className="cursor-pointer"
              onClick={() =>
                setInspectedItem({
                  title: 'Bokhyllor i ek',
                  desc: 'Fyllda med böcker i alla regnbågens färger, doftljus och bokmärken.',
                  step: 26,
                  icon: '📚',
                })
              }
            >
              <AssetItem
                id="bookshelf_left"
                x={15}
                y={70}
                width={200}
                height={285}
                fallback={
                  <g>
                    {/* Arched Top Wooden Bookcase Frame */}
                    <path
                      d="M 15,355 L 15,110 C 15,70 215,70 215,110 L 215,355 Z"
                      fill="#8c5836"
                      stroke="#3c2a1a"
                      strokeWidth="5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 23,355 L 23,115 C 23,80 207,80 207,115 L 207,355 Z"
                      fill="#6a3e20"
                      stroke="#3c2a1a"
                      strokeWidth="3"
                    />

                    {/* Chubby Shelves with rounded edges */}
                    {[130, 185, 240, 295].map((sy, i) => (
                      <rect key={i} x="20" y={sy} width="190" height="12" rx="5" fill="#a46d46" stroke="#3c2a1a" strokeWidth="3.5" />
                    ))}

                    {/* Cute Chubby Books on Shelf 1 */}
                    <g>
                      <rect x="30" y="95" width="16" height="35" rx="4" fill="#e76f51" stroke="#3c2a1a" strokeWidth="3" />
                      <rect x="50" y="92" width="18" height="38" rx="4" fill="#2a9d8f" stroke="#3c2a1a" strokeWidth="3" />
                      <rect x="72" y="98" width="15" height="32" rx="4" fill="#e9c46a" stroke="#3c2a1a" strokeWidth="3" />
                      <rect x="91" y="90" width="22" height="40" rx="4" fill="#f4a261" stroke="#3c2a1a" strokeWidth="3" />
                      {/* Horizontal pile */}
                      <rect x="125" y="118" width="45" height="12" rx="3" fill="#84a98c" stroke="#3c2a1a" strokeWidth="3" />
                      <rect x="130" y="106" width="36" height="12" rx="3" fill="#dda15e" stroke="#3c2a1a" strokeWidth="3" />
                    </g>

                    {/* Cute Chubby Books on Shelf 2 */}
                    <g>
                      <rect x="30" y="148" width="20" height="37" rx="4" fill="#52796f" stroke="#3c2a1a" strokeWidth="3" />
                      <rect x="54" y="144" width="16" height="41" rx="4" fill="#bc6c25" stroke="#3c2a1a" strokeWidth="3" />
                      <rect x="74" y="150" width="18" height="35" rx="4" fill="#9c6644" stroke="#3c2a1a" strokeWidth="3" />
                      {/* Owl Bookend */}
                      <ellipse cx="110" cy="165" rx="12" ry="16" fill="#fcedd8" stroke="#3c2a1a" strokeWidth="3" />
                      <circle cx="106" cy="160" r="3" fill="#3c2a1a" />
                      <circle cx="114" cy="160" r="3" fill="#3c2a1a" />
                      <polygon points="110,165 107,169 113,169" fill="#bc6c25" />
                    </g>

                    {/* Books on Shelf 3 */}
                    <g>
                      <rect x="30" y="202" width="18" height="38" rx="4" fill="#bc6c25" stroke="#3c2a1a" strokeWidth="3" />
                      <rect x="52" y="206" width="16" height="34" rx="4" fill="#e76f51" stroke="#3c2a1a" strokeWidth="3" />
                      <rect x="72" y="198" width="22" height="42" rx="4" fill="#457b9d" stroke="#3c2a1a" strokeWidth="3" />
                      {/* Potted trailing ivy */}
                      <rect x="145" y="222" width="24" height="18" rx="5" fill="#e76f51" stroke="#3c2a1a" strokeWidth="3" />
                      <path d="M 157,222 Q 150,240 155,260 Q 148,275 152,290" fill="none" stroke="#2d6a4f" strokeWidth="4" strokeLinecap="round" />
                      <circle cx="152" cy="245" r="5" fill="#52b788" stroke="#3c2a1a" strokeWidth="2" />
                      <circle cx="156" cy="265" r="5.5" fill="#52b788" stroke="#3c2a1a" strokeWidth="2" />
                    </g>

                    {/* Books on Shelf 4 */}
                    <g>
                      <rect x="30" y="258" width="19" height="37" rx="4" fill="#84a98c" stroke="#3c2a1a" strokeWidth="3" />
                      <rect x="53" y="255" width="21" height="40" rx="4" fill="#6f4e37" stroke="#3c2a1a" strokeWidth="3" />
                      <rect x="78" y="260" width="17" height="35" rx="4" fill="#dda15e" stroke="#3c2a1a" strokeWidth="3" />
                      <rect x="99" y="254" width="22" height="41" rx="4" fill="#e76f51" stroke="#3c2a1a" strokeWidth="3" />
                    </g>
                  </g>
                }
              />
            </g>
          )}

          {/* CHUBBY RIGHT BOOKSHELF / CERAMIC SHOWCASE (Step >= 39 & 90) */}
          {hasSecondBookshelf && (
            <g
              className="cursor-pointer"
              onClick={() => {
                if (hasCeramicShelf) {
                  setInspectedItem({
                    title: 'KERAMIK-HEDERSHYLLAN',
                    desc: 'Upplyst hedershylla med handmålade koppar, vaser och fat inför keramikverkstaden!',
                    step: 90,
                    icon: '🏺',
                  });
                } else {
                  setInspectedItem({
                    title: 'Högra bokhyllan',
                    desc: 'Fylld med poesi, manga och feelgood-romaner.',
                    step: 39,
                    icon: '📖',
                  });
                }
              }}
            >
              <AssetItem
                id={hasCeramicShelf ? 'shelf_ceramic_tribute' : 'bookshelf_right'}
                x={760}
                y={70}
                width={185}
                height={285}
                fallback={
                  <g>
                    {/* Arched Bookcase Frame */}
                    <path
                      d="M 760,355 L 760,110 C 760,70 945,70 945,110 L 945,355 Z"
                      fill="#8c5836"
                      stroke="#3c2a1a"
                      strokeWidth="5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 768,355 L 768,115 C 768,80 937,80 937,115 L 937,355 Z"
                      fill="#6a3e20"
                      stroke="#3c2a1a"
                      strokeWidth="3"
                    />

                    {[140, 200, 260].map((sy, i) => (
                      <rect key={i} x="765" y={sy} width="175" height="12" rx="5" fill="#a46d46" stroke="#3c2a1a" strokeWidth="3.5" />
                    ))}

                    {/* CERAMIC SHOWCASE DISPLAY (Step >= 90) */}
                    {hasCeramicShelf ? (
                      <g>
                        {/* Warm spotlight glow */}
                        <rect x="770" y="152" width="165" height="46" rx="6" fill="#ffeaa7" opacity="0.4" />
                        <rect x="770" y="212" width="165" height="46" rx="6" fill="#ffeaa7" opacity="0.4" />

                        {/* Chubby Handpainted Mug 1: Pastel Teal with spots */}
                        <g transform="translate(780, 160)">
                          <rect x="0" y="5" width="28" height="30" rx="8" fill="#a8dadc" stroke="#3c2a1a" strokeWidth="3" />
                          <path d="M 28,12 Q 38,18 28,26" fill="none" stroke="#3c2a1a" strokeWidth="3.5" strokeLinecap="round" />
                          <circle cx="8" cy="18" r="3" fill="#fff" />
                          <circle cx="18" cy="22" r="3" fill="#fff" />
                        </g>

                        {/* Chubby Ceramic Bowl: Terracotta with scallop rim */}
                        <g transform="translate(830, 168)">
                          <ellipse cx="20" cy="12" rx="20" ry="8" fill="#e76f51" stroke="#3c2a1a" strokeWidth="3" />
                          <path d="M 0,12 Q 20,32 40,12" fill="#f4a261" stroke="#3c2a1a" strokeWidth="3" />
                        </g>

                        {/* Chubby Fluted Ceramic Vase with Daisy flower */}
                        <g transform="translate(885, 150)">
                          <ellipse cx="16" cy="36" rx="16" ry="12" fill="#e9c46a" stroke="#3c2a1a" strokeWidth="3" />
                          <rect x="10" y="14" width="12" height="22" rx="4" fill="#e9c46a" stroke="#3c2a1a" strokeWidth="3" />
                          <line x1="16" y1="14" x2="16" y2="-6" stroke="#2d6a4f" strokeWidth="2.5" strokeLinecap="round" />
                          <circle cx="16" cy="-6" r="6" fill="#fff" stroke="#3c2a1a" strokeWidth="2" />
                          <circle cx="16" cy="-6" r="2.5" fill="#e76f51" />
                        </g>

                        {/* Family Mug Set on Shelf 2 */}
                        <g transform="translate(775, 222)">
                          {/* Ellen's mug */}
                          <rect x="0" y="6" width="22" height="26" rx="6" fill="#84a98c" stroke="#3c2a1a" strokeWidth="3" />
                          <text x="11" y="23" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">E</text>
                          {/* Tilde's mug */}
                          <rect x="30" y="6" width="22" height="26" rx="6" fill="#bc6c25" stroke="#3c2a1a" strokeWidth="3" />
                          <text x="41" y="23" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">T</text>
                          {/* Lisa's mug */}
                          <rect x="60" y="6" width="22" height="26" rx="6" fill="#9c6644" stroke="#3c2a1a" strokeWidth="3" />
                          <text x="71" y="23" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">L</text>
                          {/* Mange's mug */}
                          <rect x="90" y="6" width="22" height="26" rx="6" fill="#6f4e37" stroke="#3c2a1a" strokeWidth="3" />
                          <text x="101" y="23" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">M</text>
                          {/* Painter's Palette & Brushes */}
                          <ellipse cx="138" cy="22" rx="18" ry="12" fill="#deb887" stroke="#3c2a1a" strokeWidth="2.5" />
                          <circle cx="130" cy="20" r="2.5" fill="#e76f51" />
                          <circle cx="138" cy="17" r="2.5" fill="#2a9d8f" />
                          <circle cx="145" cy="22" r="2.5" fill="#e9c46a" />
                        </g>
                      </g>
                    ) : (
                      /* Books on shelf before ceramics */
                      <g>
                        <rect x="780" y="160" width="18" height="38" rx="4" fill="#bc6c25" stroke="#3c2a1a" strokeWidth="3" />
                        <rect x="802" y="156" width="20" height="42" rx="4" fill="#52796f" stroke="#3c2a1a" strokeWidth="3" />
                        <rect x="826" y="162" width="16" height="36" rx="4" fill="#e76f51" stroke="#3c2a1a" strokeWidth="3" />
                        <rect x="846" y="158" width="22" height="40" rx="4" fill="#dda15e" stroke="#3c2a1a" strokeWidth="3" />
                      </g>
                    )}
                  </g>
                }
              />
            </g>
          )}

          {/* GIANT BULLIG MARSHMALLOW READING ARMCHAIR (Step >= 29) */}
          {hasReadingArmchair && (
            <g
              className="cursor-pointer"
              onClick={() =>
                setInspectedItem({
                  title: 'Bullig sammetsfåtölj & läshörna',
                  desc: 'Mjuk, rund och djup fåtölj i salviagrön sammet med en tjock stickad senapsgul ullpläd.',
                  step: 29,
                  icon: '🛋️',
                })
              }
              transform="translate(110, 310)"
            >
              {/* Reading Lamp (Step >= 32) */}
              {hasReadingLamp && (
                <AssetItem
                  id="lamp_reading_floor"
                  x={-15}
                  y={-55}
                  width={95}
                  height={225}
                  fallback={
                    <g transform="translate(-10, -50)">
                      {/* Huge soft light circle */}
                      <circle cx="50" cy="100" r="120" fill="url(#chubbyLampGlow)" />
                      {/* Lamp base */}
                      <ellipse cx="20" cy="190" rx="20" ry="8" fill="#bc6c25" stroke="#3c2a1a" strokeWidth="3.5" />
                      {/* Lamp curved pole */}
                      <path d="M 20,190 L 20,40 Q 20,0 55,5" fill="none" stroke="#bc6c25" strokeWidth="6" strokeLinecap="round" />
                      <path d="M 20,190 L 20,40 Q 20,0 55,5" fill="none" stroke="#3c2a1a" strokeWidth="3" strokeLinecap="round" />
                      {/* Chubby bell shade */}
                      <path
                        d="M 45,5 C 45,25 75,25 75,5 Z"
                        fill="#ffeaa7"
                        stroke="#3c2a1a"
                        strokeWidth="3.5"
                        strokeLinejoin="round"
                        transform="rotate(15 60 15)"
                      />
                    </g>
                  }
                />
              )}

              {/* Chubby Armchair */}
              <AssetItem
                id="chair_armchair_green"
                x={10}
                y={15}
                width={160}
                height={160}
                fallback={
                  <g>
                    {/* Chubby Short Wooden Feet */}
                    <ellipse cx="40" cy="165" rx="10" ry="7" fill="#6f4e37" stroke="#3c2a1a" strokeWidth="3.5" />
                    <ellipse cx="140" cy="165" rx="10" ry="7" fill="#6f4e37" stroke="#3c2a1a" strokeWidth="3.5" />

                    {/* Chubby Rounded Armchair Backrest */}
                    <path
                      d="M 25,110 C 25,20 155,20 155,110 Z"
                      fill="#84a98c"
                      stroke="#3c2a1a"
                      strokeWidth="5"
                      strokeLinejoin="round"
                    />
                    {/* Backrest tufting seams */}
                    <path d="M 60,60 Q 60,95 60,110" stroke="#52796f" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                    <path d="M 90,50 Q 90,95 90,110" stroke="#52796f" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                    <path d="M 120,60 Q 120,95 120,110" stroke="#52796f" strokeWidth="3.5" strokeLinecap="round" fill="none" />

                    {/* Big Chubby Seat Cushion */}
                    <ellipse cx="90" cy="125" rx="65" ry="30" fill="#759c83" stroke="#3c2a1a" strokeWidth="4.5" />

                    {/* Bulliga Round Armrests */}
                    <ellipse cx="25" cy="115" rx="20" ry="26" fill="#84a98c" stroke="#3c2a1a" strokeWidth="4.5" />
                    <ellipse cx="155" cy="115" rx="20" ry="26" fill="#84a98c" stroke="#3c2a1a" strokeWidth="4.5" />

                    {/* Knitted Mustard Wool Throw (Step >= 30) */}
                    <path
                      d="M 120,80 Q 155,100 162,140 Q 145,155 130,145 Q 125,115 120,80 Z"
                      fill="#e9c46a"
                      stroke="#3c2a1a"
                      strokeWidth="3.5"
                    />
                  </g>
                }
              />

              {/* SLEEPING CAT ON CHAIR (Step >= 79, shown if Ellen is not sitting there) */}
              {hasSleepingCat && !presentMembers.ellen && (
                <g
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setInspectedItem({
                      title: 'Katten Misse',
                      desc: 'Bullig liten tabby-katt som sover som en mjuk kanelbulle i fåtöljen.',
                      step: 79,
                      icon: '🐱',
                    });
                  }}
                >
                  <AssetItem
                    id="cat_sleeping_tabby"
                    x={65}
                    y={100}
                    width={65}
                    height={45}
                    fallback={
                      <g transform="translate(65, 100)">
                        {/* Round Chubby Sleeping Cat Body */}
                        <ellipse cx="25" cy="15" rx="22" ry="16" fill="#f4a261" stroke="#3c2a1a" strokeWidth="3.5" />
                        {/* Stripes */}
                        <path d="M 18,5 Q 22,12 18,18" stroke="#bc6c25" strokeWidth="2.5" fill="none" />
                        <path d="M 26,4 Q 30,12 26,19" stroke="#bc6c25" strokeWidth="2.5" fill="none" />
                        {/* Round Head */}
                        <circle cx="38" cy="10" r="11" fill="#f4a261" stroke="#3c2a1a" strokeWidth="3" />
                        <polygon points="35,1 40,-4 43,2" fill="#bc6c25" stroke="#3c2a1a" strokeWidth="2" />
                        <polygon points="42,2 47,-3 48,5" fill="#bc6c25" stroke="#3c2a1a" strokeWidth="2" />
                        {/* Sleeping eyes */}
                        <path d="M 36,11 Q 39,13 41,11" fill="none" stroke="#3c2a1a" strokeWidth="2" strokeLinecap="round" />
                        {/* Tail wrapped */}
                        <path d="M 8,20 Q -4,12 2,2" fill="none" stroke="#f4a261" strokeWidth="7" strokeLinecap="round" />
                        <path d="M 8,20 Q -4,12 2,2" fill="none" stroke="#3c2a1a" strokeWidth="3.5" strokeLinecap="round" />
                        <text x="42" y="-3" fontSize="10" fill="#3c2a1a" fontWeight="bold">z</text>
                        <text x="49" y="-8" fontSize="12" fill="#3c2a1a" fontWeight="bold">Z</text>
                      </g>
                    }
                  />
                </g>
              )}

              {/* AVATAR: ELLEN CURLED UP IN THE ARMCHAIR WITH ARMS & LEGS! (if present) */}
              {presentMembers.ellen && (
                <g
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setInspectedItem({
                      title: 'Ellen läser i fåtöljen',
                      desc: 'Ellen (13 år, minst i familjen) har krupit upp i fåtöljen med sitt blonda vågiga hår och benen under sig, håller boken med båda händerna och njuter av sin varma choklad!',
                      step: 29,
                      icon: '👧',
                    });
                  }}
                  transform="translate(52, 54) scale(0.88)"
                >
                  <AssetItem
                    id="char_ellen_reading"
                    x={-5}
                    y={-10}
                    width={95}
                    height={125}
                    fallback={
                      <g>
                        {/* LEGS & SHOES: Two clear forward legs resting with striped socks & cozy shoes */}
                  <g>
                    {/* Hips / Seat in dark forest green */}
                    <ellipse cx="40" cy="70" rx="19" ry="9" fill="#1e3d34" stroke="#3c2a1a" strokeWidth="3" />

                    {/* Left Leg: thigh & calf extending forward and down */}
                    <path
                      d="M 28,68 L 24,98"
                      fill="none"
                      stroke="#3c2a1a"
                      strokeWidth="14"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 28,68 L 24,98"
                      fill="none"
                      stroke="#1e3d34"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    {/* Left Reddish-Brown leather shoe */}
                    <ellipse cx="23" cy="102" rx="9" ry="5.5" fill="#8c4a32" stroke="#3c2a1a" strokeWidth="2.8" />
                    <line x1="20" y1="100" x2="26" y2="100" stroke="#5c2c1a" strokeWidth="1.5" strokeLinecap="round" />

                    {/* Right Leg: thigh & calf extending forward and down */}
                    <path
                      d="M 52,68 L 56,98"
                      fill="none"
                      stroke="#3c2a1a"
                      strokeWidth="14"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 52,68 L 56,98"
                      fill="none"
                      stroke="#1e3d34"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    {/* Right Reddish-Brown leather shoe */}
                    <ellipse cx="57" cy="102" rx="9" ry="5.5" fill="#8c4a32" stroke="#3c2a1a" strokeWidth="2.8" />
                    <line x1="54" y1="100" x2="60" y2="100" stroke="#5c2c1a" strokeWidth="1.5" strokeLinecap="round" />
                  </g>

                  {/* Body in cozy dark forest green chunky ribbed sweater */}
                  <ellipse cx="40" cy="54" rx="22" ry="24" fill="#2d6a4f" stroke="#3c2a1a" strokeWidth="4" />
                  {/* Ribbed lines on sweater */}
                  <line x1="33" y1="46" x2="33" y2="68" stroke="#1b4332" strokeWidth="2" strokeLinecap="round" />
                  <line x1="40" y1="45" x2="40" y2="70" stroke="#1b4332" strokeWidth="2" strokeLinecap="round" />
                  <line x1="47" y1="46" x2="47" y2="68" stroke="#1b4332" strokeWidth="2" strokeLinecap="round" />
                  {/* Chunky knit turtleneck collar */}
                  <rect x="27" y="27" width="26" height="13" rx="6" fill="#1b4332" stroke="#3c2a1a" strokeWidth="3" />
                  <line x1="33" y1="28" x2="33" y2="39" stroke="#3c2a1a" strokeWidth="1.8" />
                  <line x1="40" y1="28" x2="40" y2="39" stroke="#3c2a1a" strokeWidth="1.8" />
                  <line x1="47" y1="28" x2="47" y2="39" stroke="#3c2a1a" strokeWidth="1.8" />

                  {/* VISIBLE ARMS IN DARK GREEN SWEATER SLEEVES */}
                  {/* Left Arm & Sleeve */}
                  <path
                    d="M 22,46 Q 14,60 27,65"
                    fill="none"
                    stroke="#3c2a1a"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 22,46 Q 14,60 27,65"
                    fill="none"
                    stroke="#2d6a4f"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  {/* Left ribbed sweater cuff */}
                  <rect x="24" y="60" width="7" height="6" rx="2" fill="#1b4332" stroke="#3c2a1a" strokeWidth="2" />
                  {/* Left Hand holding book */}
                  <circle cx="31" cy="64" r="5" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2.2" />

                  {/* Right Arm & Sleeve */}
                  <path
                    d="M 58,46 Q 66,60 53,65"
                    fill="none"
                    stroke="#3c2a1a"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 58,46 Q 66,60 53,65"
                    fill="none"
                    stroke="#2d6a4f"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  {/* Right ribbed sweater cuff */}
                  <rect x="49" y="60" width="7" height="6" rx="2" fill="#1b4332" stroke="#3c2a1a" strokeWidth="2" />
                  {/* Right Hand holding book */}
                  <circle cx="49" cy="64" r="5" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2.2" />

                  {/* Open Olive-Green Book held in both hands */}
                  <g transform="translate(25, 48)">
                    <polygon points="0,18 15,12 30,18 15,24" fill="#fffdfa" stroke="#3c2a1a" strokeWidth="2.5" />
                    <polygon points="0,18 0,22 15,28 30,22 30,18" fill="#4d6037" stroke="#3c2a1a" strokeWidth="2.5" />
                    <line x1="15" y1="13" x2="15" y2="27" stroke="#3c2a1a" strokeWidth="2" strokeLinecap="round" />
                  </g>

                  {/* BLOND VÅGIGT HÅR: Utsläppt till axlarna och lite vågigt */}
                  <path
                    d="M 22,14 C 18,4 26,-4 40,-4 C 54,-4 62,4 58,14 C 63,22 64,34 61,44 C 58,47 54,45 52,41 C 50,35 49,32 40,32 C 31,32 30,35 28,41 C 26,45 22,47 19,44 C 16,34 17,22 22,14 Z"
                    fill="#f5d061"
                    stroke="#3c2a1a"
                    strokeWidth="3.2"
                    strokeLinejoin="round"
                  />
                  {/* Wavy hair lines */}
                  <path d="M 20,24 Q 24,33 21,41" fill="none" stroke="#d49b22" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M 60,24 Q 56,33 59,41" fill="none" stroke="#d49b22" strokeWidth="1.6" strokeLinecap="round" />

                  {/* Golden-Yellow Headband (as in user's illustration) */}
                  <path
                    d="M 24,12 C 24,-1 32,-5 40,-5 C 48,-5 56,-1 56,12"
                    fill="none"
                    stroke="#f4a261"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 24,12 C 24,-1 32,-5 40,-5 C 48,-5 56,-1 56,12"
                    fill="none"
                    stroke="#3c2a1a"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  {/* Chubby Head */}
                  <ellipse cx="40" cy="16" rx="18" ry="17" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="3.5" />

                  {/* Front blonde bangs & soft waves */}
                  <path
                    d="M 23,13 C 24,3 31,0 40,0 C 49,0 56,3 57,13 C 53,8 47,6 40,7 C 33,6 27,8 23,13 Z"
                    fill="#f5d061"
                    stroke="#3c2a1a"
                    strokeWidth="2.6"
                    strokeLinejoin="round"
                  />
                  <path d="M 27,10 Q 33,7 38,10" fill="none" stroke="#3c2a1a" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M 42,10 Q 47,7 53,10" fill="none" stroke="#3c2a1a" strokeWidth="1.8" strokeLinecap="round" />

                  {/* Cute Eyes reading downward */}
                  <circle cx="34" cy="17" r="2" fill="#3c2a1a" />
                  <circle cx="46" cy="17" r="2" fill="#3c2a1a" />
                  <circle cx="35" cy="16" r="0.7" fill="#ffffff" />
                  <circle cx="47" cy="16" r="0.7" fill="#ffffff" />
                  <path d="M 37,23 Q 40,26 43,23" fill="none" stroke="#3c2a1a" strokeWidth="2.2" strokeLinecap="round" />

                  {/* Blush */}
                  <ellipse cx="28" cy="20" rx="4" ry="2.5" fill="#fca5a5" opacity="0.85" />
                  <ellipse cx="52" cy="20" rx="4" ry="2.5" fill="#fca5a5" opacity="0.85" />
                </g>
              }
            />

                  {/* Dynamic Speech bubble: Ellen's real quote */}
                  <DynamicSpeechBubble
                    x={20}
                    y={-14}
                    headX={40}
                    headY={-4}
                    text={memberQuotes.ellen.quote}
                    color="#52796F"
                    onClick={(e) => {
                      e.stopPropagation();
                      setInspectedItem({
                        title: `Ellen läser: ${memberQuotes.ellen.bookTitle || 'Percy Jackson'}`,
                        desc: `"${memberQuotes.ellen.quote}"${
                          memberQuotes.ellen.pages ? ` (${memberQuotes.ellen.pages} sidor lästa)` : ''
                        }`,
                        step: 29,
                        icon: '👧',
                      });
                    }}
                  />
                </g>
              )}
            </g>
          )}

          {/* FALLBACK: ELLEN SITTING ON COZY POUF IF ARMCHAIR NOT YET UNLOCKED */}
          {!hasReadingArmchair && presentMembers.ellen && (
            <g
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setInspectedItem({
                  title: 'Ellen i läshörnan',
                  desc: 'Ellen (13 år, minst i familjen) sitter på en mjuk sittpuff med sitt blonda lockiga hår och läser sin fantasybok!',
                  step: 5,
                  icon: '👧',
                });
              }}
              transform="translate(186, 368) scale(0.88)"
            >
              {/* Cozy Braided Jute Floor Pouf */}
              <ellipse cx="40" cy="98" rx="42" ry="16" fill="#dda15e" stroke="#3c2a1a" strokeWidth="3.5" />
              <ellipse cx="40" cy="92" rx="36" ry="12" fill="#fefae0" stroke="#3c2a1a" strokeWidth="2.5" />

              {/* LEGS & SHOES */}
              <g>
                <ellipse cx="40" cy="70" rx="19" ry="9" fill="#45645b" stroke="#3c2a1a" strokeWidth="3" />
                <path d="M 28,68 L 24,98" fill="none" stroke="#3c2a1a" strokeWidth="14" strokeLinecap="round" />
                <path d="M 28,68 L 24,98" fill="none" stroke="#45645b" strokeWidth="10" strokeLinecap="round" />
                <ellipse cx="23" cy="100" rx="8" ry="5.5" fill="#fcedd8" stroke="#3c2a1a" strokeWidth="2.5" />
                <line x1="20" y1="97" x2="20" y2="103" stroke="#e76f51" strokeWidth="2" strokeLinecap="round" />
                <ellipse cx="23" cy="105" rx="8.5" ry="4.5" fill="#8c5836" stroke="#3c2a1a" strokeWidth="2.5" />

                <path d="M 52,68 L 56,98" fill="none" stroke="#3c2a1a" strokeWidth="14" strokeLinecap="round" />
                <path d="M 52,68 L 56,98" fill="none" stroke="#45645b" strokeWidth="10" strokeLinecap="round" />
                <ellipse cx="57" cy="100" rx="8" ry="5.5" fill="#fcedd8" stroke="#3c2a1a" strokeWidth="2.5" />
                <line x1="54" y1="97" x2="54" y2="103" stroke="#e76f51" strokeWidth="2" strokeLinecap="round" />
                <ellipse cx="57" cy="105" rx="8.5" ry="4.5" fill="#8c5836" stroke="#3c2a1a" strokeWidth="2.5" />
              </g>

              {/* Body in cozy oversized sage sweater */}
              <ellipse cx="40" cy="54" rx="22" ry="24" fill="#52796f" stroke="#3c2a1a" strokeWidth="4" />
              <rect x="28" y="27" width="24" height="13" rx="6" fill="#84a98c" stroke="#3c2a1a" strokeWidth="3" />
              <line x1="34" y1="28" x2="34" y2="39" stroke="#3c2a1a" strokeWidth="1.8" />
              <line x1="40" y1="28" x2="40" y2="39" stroke="#3c2a1a" strokeWidth="1.8" />
              <line x1="46" y1="28" x2="46" y2="39" stroke="#3c2a1a" strokeWidth="1.8" />

              {/* VISIBLE ARMS */}
              <path d="M 22,46 Q 14,60 27,65" fill="none" stroke="#3c2a1a" strokeWidth="12" strokeLinecap="round" />
              <path d="M 22,46 Q 14,60 27,65" fill="none" stroke="#52796f" strokeWidth="8" strokeLinecap="round" />
              <rect x="24" y="60" width="7" height="6" rx="2" fill="#84a98c" stroke="#3c2a1a" strokeWidth="2" />
              <circle cx="31" cy="64" r="5" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2.2" />

              <path d="M 58,46 Q 66,60 53,65" fill="none" stroke="#3c2a1a" strokeWidth="12" strokeLinecap="round" />
              <path d="M 58,46 Q 66,60 53,65" fill="none" stroke="#52796f" strokeWidth="8" strokeLinecap="round" />
              <rect x="49" y="60" width="7" height="6" rx="2" fill="#84a98c" stroke="#3c2a1a" strokeWidth="2" />
              <circle cx="49" cy="64" r="5" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2.2" />

              {/* Book */}
              <g transform="translate(25, 48)">
                <polygon points="0,18 15,12 30,18 15,24" fill="#ffffff" stroke="#3c2a1a" strokeWidth="2.5" />
                <polygon points="0,18 0,22 15,28 30,22 30,18" fill="#bc6c25" stroke="#3c2a1a" strokeWidth="2.5" />
                <line x1="15" y1="14" x2="15" y2="30" stroke="#e76f51" strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* BLONT VÅGIGT HÅR: Utsläppt till axlarna och lite vågigt */}
              <path
                d="M 22,14 C 18,4 26,-4 40,-4 C 54,-4 62,4 58,14 C 63,22 64,34 61,44 C 58,47 54,45 52,41 C 50,35 49,32 40,32 C 31,32 30,35 28,41 C 26,45 22,47 19,44 C 16,34 17,22 22,14 Z"
                fill="#f5d061"
                stroke="#3c2a1a"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              {/* Gentle wavy hair texture lines */}
              <path d="M 20,24 Q 24,33 21,41" fill="none" stroke="#d49b22" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M 60,24 Q 56,33 59,41" fill="none" stroke="#d49b22" strokeWidth="1.6" strokeLinecap="round" />

              {/* Head */}
              <ellipse cx="40" cy="16" rx="18" ry="17" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="3.5" />

              {/* Front blonde bangs & soft waves - loose and gentle */}
              <path
                d="M 23,13 C 24,3 31,0 40,0 C 49,0 56,3 57,13 C 53,8 47,6 40,7 C 33,6 27,8 23,13 Z"
                fill="#f5d061"
                stroke="#3c2a1a"
                strokeWidth="2.6"
                strokeLinejoin="round"
              />
              {/* Soft wave fringe tips */}
              <path d="M 27,10 Q 33,7 38,10" fill="none" stroke="#3c2a1a" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 42,10 Q 47,7 53,10" fill="none" stroke="#3c2a1a" strokeWidth="1.8" strokeLinecap="round" />

              <path d="M 32,17 Q 35,21 38,17" fill="none" stroke="#3c2a1a" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 44,17 Q 47,21 50,17" fill="none" stroke="#3c2a1a" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 38,24 Q 41,27 44,24" fill="none" stroke="#3c2a1a" strokeWidth="2" strokeLinecap="round" />
              <ellipse cx="28" cy="20" rx="4" ry="2.5" fill="#fca5a5" opacity="0.85" />
              <ellipse cx="52" cy="20" rx="4" ry="2.5" fill="#fca5a5" opacity="0.85" />

              {/* Dynamic Speech bubble */}
              <DynamicSpeechBubble
                x={15}
                y={-14}
                headX={40}
                headY={-4}
                text={memberQuotes.ellen.quote}
                color="#52796F"
                onClick={(e) => {
                  e.stopPropagation();
                  setInspectedItem({
                    title: `Ellen läser: ${memberQuotes.ellen.bookTitle || 'Percy Jackson'}`,
                    desc: `"${memberQuotes.ellen.quote}"${
                      memberQuotes.ellen.pages ? ` (${memberQuotes.ellen.pages} sidor lästa)` : ''
                    }`,
                    step: 5,
                    icon: '👧',
                  });
                }}
              />
            </g>
          )}

          {/* CHUBBY COFFEE COUNTER & ESPRESSO BAR (Step >= 18 & 35) */}
          {hasCounterAndMenu && (
            <g
              className="cursor-pointer"
              onClick={() =>
                setInspectedItem({
                  title: 'Espressobaren i mjukt trä',
                  desc: 'Här står den blanka kopparmaskinen, kardemummabullarna och kaffekvarnen.',
                  step: 35,
                  icon: '☕',
                })
              }
              transform="translate(480, 270)"
            >
              {/* Chalkboard Menu (Step >= 19) */}
              <AssetItem
                id="menu_chalkboard"
                x={25}
                y={-180}
                width={140}
                height={75}
                fallback={
                  <g>
                    <rect x="25" y="-180" width="140" height="75" rx="12" fill="#2d3748" stroke="#3c2a1a" strokeWidth="4" />
                    <text x="95" y="-160" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffeaa7" letterSpacing="1">
                      CAFÉ MENY
                    </text>
                    <line x1="45" y1="-152" x2="145" y2="-152" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" />
                    <text x="45" y="-138" fontSize="8" fontWeight="bold" fill="#fff">☕ Espresso ...... 25:-</text>
                    <text x="45" y="-124" fontSize="8" fontWeight="bold" fill="#fff">🥛 Havrelatte ... 38:-</text>
                    <text x="45" y="-110" fontSize="8" fontWeight="bold" fill="#fff">🥐 Kardemumma .. 32:-</text>
                  </g>
                }
              />

              {/* Wooden Counter Body with rounded edges */}
              <AssetItem
                id="counter_wood_bar"
                x={-10}
                y={45}
                width={265}
                height={145}
                fallback={
                  <g>
                    <rect x="0" y="55" width="245" height="135" rx="16" fill="#8c5836" stroke="#3c2a1a" strokeWidth="5" />
                    {/* White rounded countertop slab */}
                    <rect x="-10" y="45" width="265" height="18" rx="8" fill="#fdfaf3" stroke="#3c2a1a" strokeWidth="4" />
                    {/* Vertical wooden rounded grooves */}
                    {[45, 95, 145, 195].map((gx, i) => (
                      <rect key={i} x={gx} y="68" width="8" height="108" rx="4" fill="#6f4e37" stroke="#3c2a1a" strokeWidth="2.5" />
                    ))}
                  </g>
                }
              />

              {/* CHUBBY COPPER ESPRESSO MACHINE (Step >= 35) */}
              {hasEspressoMachine && (
                <AssetItem
                  id="coffee_espresso_copper"
                  x={15}
                  y={-18}
                  width={75}
                  height={80}
                  fallback={
                    <g transform="translate(15, -18)">
                      {/* Round chubby machine body */}
                      <rect x="0" y="10" width="65" height="52" rx="14" fill="#d97736" stroke="#3c2a1a" strokeWidth="4" />
                      {/* Top cup warmer with chubby cups */}
                      <rect x="5" y="4" width="55" height="10" rx="5" fill="#f4a261" stroke="#3c2a1a" strokeWidth="3" />
                      <ellipse cx="18" cy="2" rx="6" ry="4" fill="#fff" stroke="#3c2a1a" strokeWidth="2" />
                      <ellipse cx="34" cy="2" rx="6" ry="4" fill="#fff" stroke="#3c2a1a" strokeWidth="2" />
                      <ellipse cx="50" cy="2" rx="6" ry="4" fill="#fff" stroke="#3c2a1a" strokeWidth="2" />
                      {/* Round pressure dial */}
                      <circle cx="50" cy="30" r="7" fill="#fff" stroke="#3c2a1a" strokeWidth="2.5" />
                      <line x1="50" y1="30" x2="52" y2="27" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" />
                      {/* Groupheads */}
                      <rect x="14" y="55" width="16" height="10" rx="3" fill="#2d3748" stroke="#3c2a1a" strokeWidth="2.5" />
                      {/* Puffy Steam Cloud ☁️ */}
                      <g transform="translate(-10, -5)">
                        <path
                          d="M 5,20 C -2,20 -4,12 2,8 C 0,2 10,0 14,5 C 20,2 24,10 20,16 C 24,20 18,22 15,20 Z"
                          fill="#ffffff"
                          stroke="#3c2a1a"
                          strokeWidth="2.5"
                        />
                      </g>
                    </g>
                  }
                />
              )}

              {/* CHUBBY GLASS PASTRY BELL DOME (Step >= 56) */}
              {hasPastryCase && (
                <AssetItem
                  id="pastry_glass_dome"
                  x={100}
                  y={2}
                  width={65}
                  height={50}
                  fallback={
                    <g transform="translate(100, 2)">
                      <rect x="10" y="42" width="55" height="6" rx="3" fill="#6f4e37" stroke="#3c2a1a" strokeWidth="3" />
                      {/* Round Dome */}
                      <path
                        d="M 12,42 C 12,12 63,12 63,42 Z"
                        fill="rgba(235, 248, 255, 0.55)"
                        stroke="#3c2a1a"
                        strokeWidth="3.5"
                      />
                      <circle cx="37.5" cy="14" r="4.5" fill="#fff" stroke="#3c2a1a" strokeWidth="2.5" />
                      {/* Bullig Kanelbulle */}
                      <ellipse cx="28" cy="36" rx="11" ry="8" fill="#bc6c25" stroke="#3c2a1a" strokeWidth="2.5" />
                      <path d="M 23,34 Q 28,30 33,35" stroke="#fefae0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      {/* Bullig Croissant */}
                      <path d="M 40,38 Q 50,28 58,38 Q 50,33 40,38 Z" fill="#e9c46a" stroke="#3c2a1a" strokeWidth="2.5" />
                    </g>
                  }
                />
              )}

              {/* AVATAR: MANGE AT THE ESPRESSO COUNTER! (if present) */}
              {presentMembers.mange && (
                <g
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setInspectedItem({
                      title: 'Mange vid kaffebaren',
                      desc: 'Mange (Pappa) njuter av doften av nymalda bönor och en rykande färsk espresso!',
                      step: 35,
                      icon: '👨',
                    });
                  }}
                  transform="translate(160, -75)"
                >
                  <AssetItem
                    id="char_mange_bar"
                    x={-15}
                    y={-10}
                    width={110}
                    height={180}
                    fallback={
                      <g>
                        {/* LEGS & SHOES (Standing on the floor beside the counter) */}
                  <g>
                    {/* Left Leg in dark green chinos */}
                    <path
                      d="M 24,105 L 20,154"
                      fill="none"
                      stroke="#3c2a1a"
                      strokeWidth="15"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 24,105 L 20,154"
                      fill="none"
                      stroke="#344e41"
                      strokeWidth="11"
                      strokeLinecap="round"
                    />
                    {/* Left Shoe in sturdy brown leather */}
                    <ellipse cx="17" cy="158" rx="11" ry="6.5" fill="#4a2e1b" stroke="#3c2a1a" strokeWidth="3" />
                    <rect x="20" y="153" width="7" height="6" rx="2" fill="#3c2a1a" />

                    {/* Right Leg in dark green chinos */}
                    <path
                      d="M 46,105 L 50,154"
                      fill="none"
                      stroke="#3c2a1a"
                      strokeWidth="15"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 46,105 L 50,154"
                      fill="none"
                      stroke="#344e41"
                      strokeWidth="11"
                      strokeLinecap="round"
                    />
                    {/* Right Shoe */}
                    <ellipse cx="53" cy="158" rx="11" ry="6.5" fill="#4a2e1b" stroke="#3c2a1a" strokeWidth="3" />
                    <rect x="43" y="153" width="7" height="6" rx="2" fill="#3c2a1a" />
                  </g>

                  {/* Body in warm mocha sweater */}
                  <ellipse cx="35" cy="80" rx="26" ry="30" fill="#6f4e37" stroke="#3c2a1a" strokeWidth="4" />
                  {/* Sweater waist hem */}
                  <path d="M 12,98 Q 35,108 58,98" stroke="#3c2a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <rect x="23" y="48" width="24" height="12" rx="6" fill="#8c5836" stroke="#3c2a1a" strokeWidth="3" />

                  {/* CLEAR VISIBLE ARMS */}
                  {/* Left Arm: resting on the wooden counter */}
                  <g>
                    <path
                      d="M 16,68 Q -4,90 2,120"
                      fill="none"
                      stroke="#3c2a1a"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 16,68 Q -4,90 2,120"
                      fill="none"
                      stroke="#6f4e37"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    {/* Rolled up cuff */}
                    <rect x="-3" y="112" width="10" height="7" rx="3" fill="#8c5836" stroke="#3c2a1a" strokeWidth="2" />
                    {/* Left Hand relaxed on counter */}
                    <circle cx="2" cy="123" r="5" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2.2" />
                  </g>

                  {/* Right Arm: holding espresso cup with saucer */}
                  <g>
                    <path
                      d="M 54,68 Q 72,82 58,94"
                      fill="none"
                      stroke="#3c2a1a"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 54,68 Q 72,82 58,94"
                      fill="none"
                      stroke="#6f4e37"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    {/* Right cuff */}
                    <rect x="52" y="88" width="10" height="7" rx="3" fill="#8c5836" stroke="#3c2a1a" strokeWidth="2" />
                    {/* Right Hand holding the cup */}
                    <circle cx="56" cy="94" r="5" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2.2" />

                    {/* Chubby Espresso Cup in hand */}
                    <g transform="translate(48, 86)">
                      <rect x="0" y="0" width="16" height="14" rx="4" fill="#ffffff" stroke="#3c2a1a" strokeWidth="2.5" />
                      <ellipse cx="8" cy="1" rx="6" ry="2" fill="#583101" />
                      <path d="M 16,3 Q 22,7 16,11" fill="none" stroke="#3c2a1a" strokeWidth="2.5" strokeLinecap="round" />
                      {/* Little steam puff */}
                      <path d="M 6,-2 Q 4,-8 8,-12" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
                    </g>
                  </g>

                  {/* Chubby Head */}
                  <ellipse cx="35" cy="30" rx="20" ry="20" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="3.8" />

                  {/* Dark short hair */}
                  <path d="M 15,26 C 14,4 28,0 35,0 C 48,0 56,4 55,26 C 50,14 42,10 35,10 C 26,10 18,14 15,26 Z" fill="#22160f" stroke="#3c2a1a" strokeWidth="3.5" />
                  <path d="M 23,8 Q 29,4 35,5 Q 41,4 47,8" fill="none" stroke="#3c2a1a" strokeWidth="2" strokeLinecap="round" />

                  {/* Fyrkantiga glasögon */}
                  <rect x="20" y="22" width="13" height="12" rx="2.5" fill="rgba(255,255,255,0.45)" stroke="#3c2a1a" strokeWidth="2.8" />
                  <rect x="37" y="22" width="13" height="12" rx="2.5" fill="rgba(255,255,255,0.45)" stroke="#3c2a1a" strokeWidth="2.8" />
                  <line x1="33" y1="27" x2="37" y2="27" stroke="#3c2a1a" strokeWidth="2.8" strokeLinecap="round" />
                  <line x1="20" y1="26" x2="16" y2="28" stroke="#3c2a1a" strokeWidth="2.2" strokeLinecap="round" />
                  <line x1="50" y1="26" x2="54" y2="28" stroke="#3c2a1a" strokeWidth="2.2" strokeLinecap="round" />

                  {/* Eyes behind square glasses */}
                  <circle cx="26.5" cy="27.5" r="2" fill="#3c2a1a" />
                  <circle cx="43.5" cy="27.5" r="2" fill="#3c2a1a" />
                  <circle cx="27.5" cy="26.5" r="0.7" fill="#fff" />
                  <circle cx="44.5" cy="26.5" r="0.7" fill="#fff" />

                  {/* Smile */}
                  <path d="M 30,38 Q 35,42 40,38" fill="none" stroke="#3c2a1a" strokeWidth="2.8" strokeLinecap="round" />
                  {/* Rosy cheeks */}
                  <ellipse cx="20" cy="34" rx="4" ry="2.5" fill="#fca5a5" opacity="0.8" />
                  <ellipse cx="50" cy="34" rx="4" ry="2.5" fill="#fca5a5" opacity="0.8" />
                </g>
              }
            />

                  {/* Dynamic Speech bubble: Mange's real quote */}
                  <DynamicSpeechBubble
                    x={35}
                    y={-14}
                    headX={35}
                    headY={2}
                    text={memberQuotes.mange.quote}
                    color="#6F4E37"
                    onClick={(e) => {
                      e.stopPropagation();
                      setInspectedItem({
                        title: `Mange läser: ${memberQuotes.mange.bookTitle || 'Kaffeboken'}`,
                        desc: `"${memberQuotes.mange.quote}"${
                          memberQuotes.mange.pages ? ` (${memberQuotes.mange.pages} sidor lästa)` : ''
                        }`,
                        step: 35,
                        icon: '👨',
                      });
                    }}
                  />
                </g>
              )}
            </g>
          )}

          {/* FALLBACK: MANGE STANDING AT COFFEE STATION IF COUNTER NOT YET UNLOCKED */}
          {!hasCounterAndMenu && presentMembers.mange && (
            <g
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setInspectedItem({
                  title: 'Mange vid kaffehörnan',
                  desc: 'Mange (Pappa, störst i familjen) står i kaffehörnan med kort mörkt hår och fyrkantiga glasögon, och dricker en nylagad espresso!',
                  step: 10,
                  icon: '👨',
                });
              }}
              transform="translate(675, 268) scale(1.06)"
            >
              {/* LEGS & SHOES */}
              <g>
                <path d="M 24,105 L 20,154" fill="none" stroke="#3c2a1a" strokeWidth="15" strokeLinecap="round" />
                <path d="M 24,105 L 20,154" fill="none" stroke="#344e41" strokeWidth="11" strokeLinecap="round" />
                <ellipse cx="17" cy="158" rx="11" ry="6.5" fill="#4a2e1b" stroke="#3c2a1a" strokeWidth="3" />
                <rect x="20" y="153" width="7" height="6" rx="2" fill="#3c2a1a" />

                <path d="M 46,105 L 50,154" fill="none" stroke="#3c2a1a" strokeWidth="15" strokeLinecap="round" />
                <path d="M 46,105 L 50,154" fill="none" stroke="#344e41" strokeWidth="11" strokeLinecap="round" />
                <ellipse cx="53" cy="158" rx="11" ry="6.5" fill="#4a2e1b" stroke="#3c2a1a" strokeWidth="3" />
                <rect x="43" y="153" width="7" height="6" rx="2" fill="#3c2a1a" />
              </g>

              {/* Body in mocha sweater */}
              <ellipse cx="35" cy="80" rx="26" ry="30" fill="#6f4e37" stroke="#3c2a1a" strokeWidth="4" />
              <path d="M 12,98 Q 35,108 58,98" stroke="#3c2a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
              <rect x="23" y="48" width="24" height="12" rx="6" fill="#8c5836" stroke="#3c2a1a" strokeWidth="3" />

              {/* VISIBLE ARMS */}
              {/* Left Arm: on hip */}
              <g>
                <path d="M 16,68 Q 0,84 14,94" fill="none" stroke="#3c2a1a" strokeWidth="12" strokeLinecap="round" />
                <path d="M 16,68 Q 0,84 14,94" fill="none" stroke="#6f4e37" strokeWidth="8" strokeLinecap="round" />
                <circle cx="14" cy="94" r="5" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2.2" />
              </g>

              {/* Right Arm: holding espresso */}
              <g>
                <path d="M 54,68 Q 72,82 58,94" fill="none" stroke="#3c2a1a" strokeWidth="12" strokeLinecap="round" />
                <path d="M 54,68 Q 72,82 58,94" fill="none" stroke="#6f4e37" strokeWidth="8" strokeLinecap="round" />
                <circle cx="56" cy="94" r="5" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2.2" />
                <g transform="translate(48, 86)">
                  <rect x="0" y="0" width="16" height="14" rx="4" fill="#ffffff" stroke="#3c2a1a" strokeWidth="2.5" />
                  <ellipse cx="8" cy="1" rx="6" ry="2" fill="#583101" />
                  <path d="M 16,3 Q 22,7 16,11" fill="none" stroke="#3c2a1a" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 6,-2 Q 4,-8 8,-12" fill="none" stroke="#bc6c25" strokeWidth="1.8" strokeLinecap="round" />
                </g>
              </g>

              {/* Head */}
              <ellipse cx="35" cy="30" rx="20" ry="20" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="3.8" />
              <path d="M 15,26 C 14,4 28,0 35,0 C 48,0 56,4 55,26 C 50,14 42,10 35,10 C 26,10 18,14 15,26 Z" fill="#22160f" stroke="#3c2a1a" strokeWidth="3.5" />
              <path d="M 23,8 Q 29,4 35,5 Q 41,4 47,8" fill="none" stroke="#3c2a1a" strokeWidth="2" strokeLinecap="round" />

              {/* Fyrkantiga glasögon */}
              <rect x="20" y="22" width="13" height="12" rx="2.5" fill="rgba(255,255,255,0.45)" stroke="#3c2a1a" strokeWidth="2.8" />
              <rect x="37" y="22" width="13" height="12" rx="2.5" fill="rgba(255,255,255,0.45)" stroke="#3c2a1a" strokeWidth="2.8" />
              <line x1="33" y1="27" x2="37" y2="27" stroke="#3c2a1a" strokeWidth="2.8" strokeLinecap="round" />
              <line x1="20" y1="26" x2="16" y2="28" stroke="#3c2a1a" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="50" y1="26" x2="54" y2="28" stroke="#3c2a1a" strokeWidth="2.2" strokeLinecap="round" />

              <circle cx="26.5" cy="27.5" r="2" fill="#3c2a1a" />
              <circle cx="43.5" cy="27.5" r="2" fill="#3c2a1a" />
              <circle cx="27.5" cy="26.5" r="0.7" fill="#fff" />
              <circle cx="44.5" cy="26.5" r="0.7" fill="#fff" />
              <path d="M 30,38 Q 35,42 40,38" fill="none" stroke="#3c2a1a" strokeWidth="2.8" strokeLinecap="round" />
              <ellipse cx="20" cy="34" rx="4" ry="2.5" fill="#fca5a5" opacity="0.8" />
              <ellipse cx="50" cy="34" rx="4" ry="2.5" fill="#fca5a5" opacity="0.8" />

              <DynamicSpeechBubble
                x={35}
                y={-14}
                headX={35}
                headY={2}
                text={memberQuotes.mange.quote}
                color="#6F4E37"
                onClick={(e) => {
                  e.stopPropagation();
                  setInspectedItem({
                    title: `Mange läser: ${memberQuotes.mange.bookTitle || 'Kaffeboken'}`,
                    desc: `"${memberQuotes.mange.quote}"${
                      memberQuotes.mange.pages ? ` (${memberQuotes.mange.pages} sidor lästa)` : ''
                    }`,
                    step: 10,
                    icon: '👨',
                  });
                }}
              />
            </g>
          )}

          {/* CHUBBY FRONT BISTRO TABLE & CHAIRS (Step >= 12) */}
          {hasTableAndChairs && (
            <g
              className="cursor-pointer"
              onClick={() =>
                setInspectedItem({
                  title: 'Runda cafébordet',
                  desc: 'Ett runt, bulligt träbord med mjuk linneduk, torkade blommor och plats för god fika!',
                  step: 12,
                  icon: '🪑',
                })
              }
              transform="translate(360, 375)"
            >
              {/* LAYER 1: CHAIR BACKRESTS (Drawn behind characters) */}
              {/* Left Bentwood Chair Back */}
              <AssetItem
                id="chair_bentwood_left"
                x={-40}
                y={0}
                width={45}
                height={80}
                fallback={
                  <g transform="translate(-40, 0)">
                    <ellipse cx="18" cy="25" rx="16" ry="18" fill="#6f4e37" stroke="#3c2a1a" strokeWidth="3.5" />
                    <ellipse cx="18" cy="38" rx="18" ry="8" fill="#8c5836" stroke="#3c2a1a" strokeWidth="3.5" />
                    <line x1="6" y1="44" x2="2" y2="78" stroke="#3c2a1a" strokeWidth="4" strokeLinecap="round" />
                    <line x1="30" y1="44" x2="34" y2="78" stroke="#3c2a1a" strokeWidth="4" strokeLinecap="round" />
                  </g>
                }
              />

              {/* Right Bentwood Chair Back */}
              <AssetItem
                id="chair_bentwood_right"
                x={90}
                y={0}
                width={45}
                height={80}
                fallback={
                  <g transform="translate(90, 0)">
                    <ellipse cx="18" cy="25" rx="16" ry="18" fill="#6f4e37" stroke="#3c2a1a" strokeWidth="3.5" />
                    <ellipse cx="18" cy="38" rx="18" ry="8" fill="#8c5836" stroke="#3c2a1a" strokeWidth="3.5" />
                    <line x1="6" y1="44" x2="2" y2="78" stroke="#3c2a1a" strokeWidth="4" strokeLinecap="round" />
                    <line x1="30" y1="44" x2="34" y2="78" stroke="#3c2a1a" strokeWidth="4" strokeLinecap="round" />
                  </g>
                }
              />

              {/* LAYER 2: LISA'S LOWER BODY & LEGS (Clearly visible sitting on chair, feet down on the floor!) */}
              {presentMembers.lisa && !getCafeAsset('char_lisa_bistro') && (
                <g transform="translate(-65, -45)">
                  {/* Hips / Seat in navy trousers */}
                  <ellipse cx="28" cy="72" rx="18" ry="10" fill="#4a5568" stroke="#3c2a1a" strokeWidth="3.5" />

                  {/* Left Leg: thigh extending forward & calf down to floor */}
                  <path
                    d="M 20,72 Q 32,74 36,84 L 34,120"
                    fill="none"
                    stroke="#3c2a1a"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 20,72 Q 32,74 36,84 L 34,120"
                    fill="none"
                    stroke="#4a5568"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Left Shoe: cozy brown clog resting on the floor */}
                  <ellipse cx="33" cy="123" rx="9" ry="5.5" fill="#8c5836" stroke="#3c2a1a" strokeWidth="2.8" />

                  {/* Right Leg: thigh & calf down to floor */}
                  <path
                    d="M 32,72 Q 44,74 48,84 L 46,120"
                    fill="none"
                    stroke="#3c2a1a"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 32,72 Q 44,74 48,84 L 46,120"
                    fill="none"
                    stroke="#4a5568"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Right Shoe */}
                  <ellipse cx="48" cy="123" rx="9" ry="5.5" fill="#8c5836" stroke="#3c2a1a" strokeWidth="2.8" />

                  {/* Torso in warm cocoa cardigan */}
                  <ellipse cx="28" cy="52" rx="22" ry="24" fill="#9c6644" stroke="#3c2a1a" strokeWidth="4" />
                  <polygon points="28,42 20,30 36,30" fill="#fffdfa" stroke="#3c2a1a" strokeWidth="2.5" />
                </g>
              )}

              {/* LAYER 2B: TILDE'S LOWER BODY & LEGS (Sitting tall and upright with good posture) */}
              {presentMembers.tilde && !getCafeAsset('char_tilde_bistro') && (
                <g transform="translate(105, -45) scale(1.02)">
                  {/* Hips in blue denim */}
                  <ellipse cx="28" cy="72" rx="18" ry="10" fill="#2b6cb0" stroke="#3c2a1a" strokeWidth="3.5" />

                  {/* Left Leg: thigh & calf down to floor */}
                  <path
                    d="M 36,72 Q 24,74 20,84 L 18,120"
                    fill="none"
                    stroke="#3c2a1a"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 36,72 Q 24,74 20,84 L 18,120"
                    fill="none"
                    stroke="#2b6cb0"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Left Blue Sneaker with white toe & sole */}
                  <ellipse cx="16" cy="123" rx="10" ry="5.5" fill="#1e40af" stroke="#3c2a1a" strokeWidth="2.8" />
                  <ellipse cx="11" cy="123" rx="3.5" ry="4" fill="#ffffff" stroke="#3c2a1a" strokeWidth="1.5" />
                  <line x1="8" y1="126" x2="24" y2="126" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

                  {/* Right Leg */}
                  <path
                    d="M 24,72 Q 12,74 8,84 L 6,120"
                    fill="none"
                    stroke="#3c2a1a"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 24,72 Q 12,74 8,84 L 6,120"
                    fill="none"
                    stroke="#2b6cb0"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Right Blue Sneaker */}
                  <ellipse cx="4" cy="123" rx="10" ry="5.5" fill="#1e40af" stroke="#3c2a1a" strokeWidth="2.8" />
                  <ellipse cx="-1" cy="123" rx="3.5" ry="4" fill="#ffffff" stroke="#3c2a1a" strokeWidth="1.5" />
                  <line x1="-4" y1="126" x2="12" y2="126" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

                  {/* Upright, straight torso in slate blue/grey sweater */}
                  <ellipse cx="28" cy="50" rx="20" ry="22" fill="#3d5a80" stroke="#3c2a1a" strokeWidth="4" />
                </g>
              )}

              {/* LAYER 3: PEDESTAL TABLE BASE & TOP (Between the characters) */}
              <AssetItem
                id="table_bistro_round"
                x={-15}
                y={20}
                width={115}
                height={90}
                fallback={
                  <g>
                    <line x1="42" y1="50" x2="42" y2="95" stroke="#3c2a1a" strokeWidth="10" strokeLinecap="round" />
                    <ellipse cx="42" cy="98" rx="30" ry="10" fill="#2d3748" stroke="#3c2a1a" strokeWidth="3.5" />
                    {/* Chubby Tabletop */}
                    <ellipse cx="42" cy="40" rx="58" ry="20" fill="#8c5836" stroke="#3c2a1a" strokeWidth="4.5" />
                    {/* Linen cloth */}
                    <ellipse cx="42" cy="38" rx="50" ry="16" fill="#fcedd8" stroke="#3c2a1a" strokeWidth="3" />
                  </g>
                }
              />

              {/* LAYER 4: LISA'S ARMS, HEAD, FACE & SPEECH BUBBLE (Resting ON TOP of table!) */}
              {presentMembers.lisa && (
                <g
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setInspectedItem({
                      title: 'Lisa vid bordet',
                      desc: 'Lisa (Mamma) har en kort mörk page och stora glasögon, sitter bekvämt vid cafébordet, läser en feelgood-roman och njuter av sitt kaffe!',
                      step: 12,
                      icon: '👩',
                    });
                  }}
                  transform="translate(-65, -45) scale(0.93)"
                >
                  <AssetItem
                    id="char_lisa_bistro"
                    x={-5}
                    y={-5}
                    width={95}
                    height={140}
                    fallback={
                      <g>
                        {/* Left Arm: resting on table, holding open novel */}
                        <g>
                          <path
                            d="M 12,46 Q 2,64 16,74"
                            fill="none"
                            stroke="#3c2a1a"
                            strokeWidth="12"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 12,46 Q 2,64 16,74"
                            fill="none"
                            stroke="#9c6644"
                            strokeWidth="8"
                            strokeLinecap="round"
                          />
                          <circle cx="18" cy="74" r="5" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2.2" />
                          <polygon points="12,74 24,70 34,74 24,78" fill="#ffffff" stroke="#3c2a1a" strokeWidth="2" />
                        </g>

                        {/* Right Arm: holding warm ceramic mug */}
                        <g>
                          <path
                            d="M 44,46 Q 54,64 38,72"
                            fill="none"
                            stroke="#3c2a1a"
                            strokeWidth="12"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 44,46 Q 54,64 38,72"
                            fill="none"
                            stroke="#9c6644"
                            strokeWidth="8"
                            strokeLinecap="round"
                          />
                          <circle cx="36" cy="72" r="5" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2.2" />
                          <rect x="33" y="66" width="13" height="12" rx="4" fill="#e76f51" stroke="#3c2a1a" strokeWidth="2" />
                          <ellipse cx="39.5" cy="67" rx="5" ry="2" fill="#fffdfa" />
                        </g>

                        {/* KORT MÖRKT HÅR I PAGE: Short dark page/bob back hair curving smoothly along jaw */}
                        <path
                          d="M 9,18 C 8,4 17,0 28,0 C 39,0 48,4 47,18 C 49,27 47,35 43,37 C 39,38 38,34 38,31 C 34,34 22,34 18,31 C 18,34 17,38 13,37 C 9,35 7,27 9,18 Z"
                          fill="#342017"
                          stroke="#3c2a1a"
                          strokeWidth="3.2"
                          strokeLinejoin="round"
                        />

                        {/* Chubby Head */}
                        <ellipse cx="28" cy="20" rx="18" ry="17" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="3.5" />

                        {/* Front page fringe & side page locks framing cheeks */}
                        <path
                          d="M 11,18 C 12,7 19,4 28,4 C 37,4 44,7 45,18 C 41,13 35,11 28,12 C 21,12 15,13 11,18 Z"
                          fill="#342017"
                          stroke="#3c2a1a"
                          strokeWidth="3"
                          strokeLinejoin="round"
                        />
                        <path d="M 12,17 Q 8,27 12,34 Q 15,35 15,31" fill="#342017" stroke="#3c2a1a" strokeWidth="2.6" />
                        <path d="M 44,17 Q 48,27 44,34 Q 41,35 41,31" fill="#342017" stroke="#3c2a1a" strokeWidth="2.6" />

                        {/* RÄTT SÅ STORA GLASÖGON (Big stylish retro-round glasses) */}
                        <circle cx="21" cy="19" r="6.5" fill="rgba(255,255,255,0.45)" stroke="#3c2a1a" strokeWidth="2.4" />
                        <circle cx="35" cy="19" r="6.5" fill="rgba(255,255,255,0.45)" stroke="#3c2a1a" strokeWidth="2.4" />
                        <path d="M 27.5,19 Q 28,17 28.5,19" stroke="#3c2a1a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                        <line x1="14.5" y1="19" x2="11" y2="20" stroke="#3c2a1a" strokeWidth="2" strokeLinecap="round" />
                        <line x1="41.5" y1="19" x2="45" y2="20" stroke="#3c2a1a" strokeWidth="2" strokeLinecap="round" />

                        {/* Kind eyes behind big glasses */}
                        <circle cx="21" cy="19" r="1.8" fill="#3c2a1a" />
                        <circle cx="35" cy="19" r="1.8" fill="#3c2a1a" />
                        <circle cx="22" cy="18" r="0.7" fill="#ffffff" />
                        <circle cx="36" cy="18" r="0.7" fill="#ffffff" />

                        <path d="M 24,26 Q 28,30 32,26" fill="none" stroke="#3c2a1a" strokeWidth="2.5" strokeLinecap="round" />
                        <ellipse cx="14" cy="23" rx="3.5" ry="2" fill="#fca5a5" opacity="0.85" />
                        <ellipse cx="42" cy="23" rx="3.5" ry="2" fill="#fca5a5" opacity="0.85" />
                      </g>
                    }
                  />

                  {/* Dynamic Speech bubble: Lisa on left side of table (elevated & shifted left) */}
                  <DynamicSpeechBubble
                    x={10}
                    y={-22}
                    headX={28}
                    headY={5}
                    text={memberQuotes.lisa.quote}
                    color="#9C6644"
                    onClick={(e) => {
                      e.stopPropagation();
                      setInspectedItem({
                        title: `Lisa läser: ${memberQuotes.lisa.bookTitle || 'Feelgood-roman'}`,
                        desc: `"${memberQuotes.lisa.quote}"${
                          memberQuotes.lisa.pages ? ` (${memberQuotes.lisa.pages} sidor lästa)` : ''
                        }`,
                        step: 12,
                        icon: '👩',
                      });
                    }}
                  />
                </g>
              )}

              {/* LAYER 4B: TILDE'S ARMS, HEAD, FACE & SPEECH BUBBLE (Resting ON TOP of table!) */}
              {presentMembers.tilde && (
                <g
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setInspectedItem({
                      title: 'Tilde läser vid fönstret',
                      desc: 'Tilde (15 år, näststörst i familjen) har långt, mörkt tjockt hår, jeans och sneakers, och dricker sin isade vaniljlatte!',
                      step: 12,
                      icon: '👧',
                    });
                  }}
                  transform="translate(105, -45) scale(1.02)"
                >
                  <AssetItem
                    id="char_tilde_bistro"
                    x={-5}
                    y={-5}
                    width={95}
                    height={140}
                    fallback={
                      <g>
                        {/* Left Arm: holding open book with left hand */}
                        <g>
                          <path
                            d="M 14,46 Q 4,64 18,72"
                            fill="none"
                            stroke="#3c2a1a"
                            strokeWidth="12"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 14,46 Q 4,64 18,72"
                            fill="none"
                            stroke="#3d5a80"
                            strokeWidth="8"
                            strokeLinecap="round"
                          />
                          <circle cx="18" cy="72" r="5" fill="#feddc7" stroke="#3c2a1a" strokeWidth="2.2" />
                        </g>

                        {/* Right Arm: holding open book with right hand */}
                        <g>
                          <path
                            d="M 42,46 Q 52,64 38,72"
                            fill="none"
                            stroke="#3c2a1a"
                            strokeWidth="12"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 42,46 Q 52,64 38,72"
                            fill="none"
                            stroke="#3d5a80"
                            strokeWidth="8"
                            strokeLinecap="round"
                          />
                          <circle cx="38" cy="72" r="5" fill="#feddc7" stroke="#3c2a1a" strokeWidth="2.2" />
                        </g>

                        {/* Open Reddish-Brown Book held with both hands */}
                        <g transform="translate(13, 56)">
                          <polygon points="0,18 15,12 30,18 15,24" fill="#fffdfa" stroke="#3c2a1a" strokeWidth="2.5" />
                          <polygon points="0,18 0,22 15,28 30,22 30,18" fill="#a44a2a" stroke="#3c2a1a" strokeWidth="2.5" />
                          <line x1="15" y1="13" x2="15" y2="27" stroke="#3c2a1a" strokeWidth="2" strokeLinecap="round" />
                        </g>

                        {/* LÅNGT, MÖRKT TJOCKT HÅR: Thick dark hair falling straight and sleek behind back (no hunch, no beard!) */}
                        <path
                          d="M 8,16 L 8,64 C 8,69 14,72 20,70 C 24,68 32,68 36,70 C 42,72 48,69 48,64 L 48,16 Z"
                          fill="#2a170d"
                          stroke="#3c2a1a"
                          strokeWidth="3.5"
                          strokeLinejoin="round"
                        />
                        <line x1="12" y1="26" x2="12" y2="60" stroke="#1d1008" strokeWidth="2" strokeLinecap="round" />
                        <line x1="44" y1="26" x2="44" y2="60" stroke="#1d1008" strokeWidth="2" strokeLinecap="round" />

                        {/* Clean Chubby Face - upright posture */}
                        <ellipse cx="28" cy="18" rx="18" ry="17" fill="#feddc7" stroke="#3c2a1a" strokeWidth="3.5" />

                        {/* Small ears */}
                        <circle cx="10" cy="18" r="3" fill="#feddc7" stroke="#3c2a1a" strokeWidth="1.8" />
                        <circle cx="46" cy="18" r="3" fill="#feddc7" stroke="#3c2a1a" strokeWidth="1.8" />

                        {/* Front hairline & bangs - sleek across top of forehead only (NO beard locks down cheeks/jaw!) */}
                        <path
                          d="M 11,16 C 10,2 19,-2 28,-2 C 37,-2 46,2 45,16 C 41,8 34,5 28,6 C 22,6 15,8 11,16 Z"
                          fill="#2a170d"
                          stroke="#3c2a1a"
                          strokeWidth="3.2"
                          strokeLinejoin="round"
                        />
                        <path d="M 15,11 Q 21,7 26,10" fill="none" stroke="#1d1008" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M 30,10 Q 35,7 41,11" fill="none" stroke="#1d1008" strokeWidth="1.6" strokeLinecap="round" />

                        {/* Cute teen eyes with subtle sparkle */}
                        <ellipse cx="23" cy="17" rx="2.2" ry="3" fill="#3c2a1a" />
                        <ellipse cx="33" cy="17" rx="2.2" ry="3" fill="#3c2a1a" />
                        <circle cx="24" cy="16" r="0.9" fill="#ffffff" />
                        <circle cx="34" cy="16" r="0.9" fill="#ffffff" />

                        {/* Gentle smile */}
                        <path d="M 25,24 Q 28,27 31,24" fill="none" stroke="#3c2a1a" strokeWidth="2.2" strokeLinecap="round" />

                        {/* Rosy cheeks */}
                        <ellipse cx="17" cy="20" rx="4" ry="2.5" fill="#fca5a5" opacity="0.8" />
                        <ellipse cx="39" cy="20" rx="4" ry="2.5" fill="#fca5a5" opacity="0.8" />
                      </g>
                    }
                  />

                  {/* Dynamic Speech bubble: Tilde on right side of table (shifted right, wide separation from Lisa) */}
                  <DynamicSpeechBubble
                    x={55}
                    y={-12}
                    headX={28}
                    headY={5}
                    text={memberQuotes.tilde.quote}
                    color="#BC6C25"
                    onClick={(e) => {
                      e.stopPropagation();
                      setInspectedItem({
                        title: `Tilde läser: ${memberQuotes.tilde.bookTitle || 'Fantasyroman'}`,
                        desc: `"${memberQuotes.tilde.quote}"${
                          memberQuotes.tilde.pages ? ` (${memberQuotes.tilde.pages} sidor lästa)` : ''
                        }`,
                        step: 12,
                        icon: '👧',
                      });
                    }}
                  />
                </g>
              )}

              {/* Table details: Bud vase & coffee cup (Step >= 14) */}
              <AssetItem
                id="table_decor_linen"
                x={25}
                y={15}
                width={50}
                height={30}
                fallback={
                  <g transform="translate(35, 20)">
                    {/* Bud vase */}
                    <rect x="0" y="0" width="10" height="15" rx="5" fill="#e76f51" stroke="#3c2a1a" strokeWidth="2.5" />
                    <line x1="5" y1="0" x2="2" y2="-12" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="2" cy="-12" r="4.5" fill="#f4a261" stroke="#3c2a1a" strokeWidth="1.5" />
                    {/* White cup and saucer (as in illustration) */}
                    <ellipse cx="26" cy="16" rx="10" ry="3.5" fill="#ffffff" stroke="#3c2a1a" strokeWidth="2" />
                    <rect x="20" y="5" width="12" height="10" rx="3.5" fill="#ffffff" stroke="#3c2a1a" strokeWidth="2" />
                    <path d="M 32,8 Q 36,10 32,13" fill="none" stroke="#3c2a1a" strokeWidth="1.8" />
                    <ellipse cx="26" cy="6" rx="5" ry="1.8" fill="#583101" />
                  </g>
                }
              />
            </g>
          )}

          {/* FALLBACK: LISA & TILDE SITTING ON WARM CAFÉ BENCH IF TABLE NOT YET UNLOCKED */}
          {!hasTableAndChairs && (presentMembers.lisa || presentMembers.tilde) && (
            <g transform="translate(360, 395)">
              {/* Rustic Wood Bench */}
              <rect x="-40" y="60" width="220" height="18" rx="8" fill="#8c5836" stroke="#3c2a1a" strokeWidth="4" />
              <line x1="-20" y1="78" x2="-22" y2="120" stroke="#3c2a1a" strokeWidth="8" strokeLinecap="round" />
              <line x1="160" y1="78" x2="162" y2="120" stroke="#3c2a1a" strokeWidth="8" strokeLinecap="round" />
              {/* Bench cushions */}
              <ellipse cx="20" cy="58" rx="45" ry="10" fill="#fcedd8" stroke="#3c2a1a" strokeWidth="3" />
              <ellipse cx="120" cy="58" rx="45" ry="10" fill="#fcedd8" stroke="#3c2a1a" strokeWidth="3" />

              {/* Lisa sitting on bench */}
              {presentMembers.lisa && (
                <g
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setInspectedItem({
                      title: 'Lisa på cafébänken',
                      desc: 'Lisa (Mamma) har en kort mörk page och stora glasögon, sitter bekvämt på cafébänken, läser och dricker sitt kaffe!',
                      step: 8,
                      icon: '👩',
                    });
                  }}
                  transform="translate(0, -35) scale(0.93)"
                >
                  {/* Legs & Clogs */}
                  <g>
                    <path d="M 12,68 L 8,114" fill="none" stroke="#3c2a1a" strokeWidth="14" strokeLinecap="round" />
                    <path d="M 12,68 L 8,114" fill="none" stroke="#4a5568" strokeWidth="10" strokeLinecap="round" />
                    <ellipse cx="7" cy="117" rx="9" ry="5.5" fill="#8c5836" stroke="#3c2a1a" strokeWidth="2.8" />

                    <path d="M 28,68 L 26,114" fill="none" stroke="#3c2a1a" strokeWidth="14" strokeLinecap="round" />
                    <path d="M 28,68 L 26,114" fill="none" stroke="#4a5568" strokeWidth="10" strokeLinecap="round" />
                    <ellipse cx="27" cy="117" rx="9" ry="5.5" fill="#8c5836" stroke="#3c2a1a" strokeWidth="2.8" />
                  </g>
                  <ellipse cx="20" cy="50" rx="20" ry="22" fill="#9c6644" stroke="#3c2a1a" strokeWidth="4" />
                  {/* Arms */}
                  <path d="M 6,46 Q -2,60 10,70" fill="none" stroke="#3c2a1a" strokeWidth="10" strokeLinecap="round" />
                  <path d="M 6,46 Q -2,60 10,70" fill="none" stroke="#9c6644" strokeWidth="7" strokeLinecap="round" />
                  <circle cx="10" cy="70" r="4.5" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2" />
                  <path d="M 34,46 Q 42,60 30,70" fill="none" stroke="#3c2a1a" strokeWidth="10" strokeLinecap="round" />
                  <path d="M 34,46 Q 42,60 30,70" fill="none" stroke="#9c6644" strokeWidth="7" strokeLinecap="round" />
                  <circle cx="30" cy="70" r="4.5" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2" />
                  {/* Book & mug in hands */}
                  <rect x="14" y="64" width="12" height="12" rx="3.5" fill="#e76f51" stroke="#3c2a1a" strokeWidth="2" />

                  {/* KORT MÖRKT HÅR I PAGE: Short dark page/bob back hair curving smoothly along jaw */}
                  <path
                    d="M 1,18 C 0,4 9,0 20,0 C 31,0 40,4 39,18 C 41,27 39,35 35,37 C 31,38 30,34 30,31 C 26,34 14,34 10,31 C 10,34 9,38 5,37 C 1,35 -1,27 1,18 Z"
                    fill="#342017"
                    stroke="#3c2a1a"
                    strokeWidth="3.2"
                    strokeLinejoin="round"
                  />

                  {/* Head */}
                  <ellipse cx="20" cy="20" rx="18" ry="17" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="3.5" />

                  {/* Front page bangs & side locks */}
                  <path
                    d="M 3,18 C 4,7 11,4 20,4 C 29,4 36,7 37,18 C 33,13 27,11 20,12 C 13,12 7,13 3,18 Z"
                    fill="#342017"
                    stroke="#3c2a1a"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  <path d="M 4,17 Q 0,27 4,34 Q 7,35 7,31" fill="#342017" stroke="#3c2a1a" strokeWidth="2.6" />
                  <path d="M 36,17 Q 40,27 36,34 Q 33,35 33,31" fill="#342017" stroke="#3c2a1a" strokeWidth="2.6" />

                  {/* RÄTT SÅ STORA GLASÖGON (Big stylish retro-round glasses) */}
                  <circle cx="13" cy="19" r="6.5" fill="rgba(255,255,255,0.45)" stroke="#3c2a1a" strokeWidth="2.4" />
                  <circle cx="27" cy="19" r="6.5" fill="rgba(255,255,255,0.45)" stroke="#3c2a1a" strokeWidth="2.4" />
                  <path d="M 19.5,19 Q 20,17 20.5,19" stroke="#3c2a1a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                  <line x1="6.5" y1="19" x2="3" y2="20" stroke="#3c2a1a" strokeWidth="2" strokeLinecap="round" />
                  <line x1="33.5" y1="19" x2="37" y2="20" stroke="#3c2a1a" strokeWidth="2" strokeLinecap="round" />

                  {/* Kind eyes behind big glasses */}
                  <circle cx="13" cy="19" r="1.8" fill="#3c2a1a" />
                  <circle cx="27" cy="19" r="1.8" fill="#3c2a1a" />
                  <circle cx="14" cy="18" r="0.7" fill="#ffffff" />
                  <circle cx="28" cy="18" r="0.7" fill="#ffffff" />

                  <path d="M 16,26 Q 20,30 24,26" fill="none" stroke="#3c2a1a" strokeWidth="2.5" strokeLinecap="round" />
                  <ellipse cx="6" cy="23" rx="3.5" ry="2" fill="#fca5a5" opacity="0.85" />
                  <ellipse cx="34" cy="23" rx="3.5" ry="2" fill="#fca5a5" opacity="0.85" />

                  <DynamicSpeechBubble
                    x={-5}
                    y={-22}
                    headX={20}
                    headY={5}
                    text={memberQuotes.lisa.quote}
                    color="#9C6644"
                    onClick={(e) => {
                      e.stopPropagation();
                      setInspectedItem({
                        title: `Lisa läser: ${memberQuotes.lisa.bookTitle || 'Feelgood-roman'}`,
                        desc: `"${memberQuotes.lisa.quote}"${
                          memberQuotes.lisa.pages ? ` (${memberQuotes.lisa.pages} sidor lästa)` : ''
                        }`,
                        step: 8,
                        icon: '👩',
                      });
                    }}
                  />
                </g>
              )}

              {/* Tilde sitting on bench */}
              {presentMembers.tilde && (
                <g
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setInspectedItem({
                      title: 'Tilde på cafébänken',
                      desc: 'Tilde (15 år, näststörst i familjen) har långt, mörkt tjockt hår, sitter i jeans och sneakers och läser sin fantasybok!',
                      step: 8,
                      icon: '👧',
                    });
                  }}
                  transform="translate(100, -35) scale(1.02)"
                >
                  {/* Legs & Sneakers */}
                  <g>
                    <path d="M 12,68 L 8,114" fill="none" stroke="#3c2a1a" strokeWidth="14" strokeLinecap="round" />
                    <path d="M 12,68 L 8,114" fill="none" stroke="#3a6073" strokeWidth="10" strokeLinecap="round" />
                    <ellipse cx="6" cy="117" rx="10" ry="5.5" fill="#ffffff" stroke="#3c2a1a" strokeWidth="2.8" />
                    <line x1="0" y1="117" x2="10" y2="117" stroke="#bc6c25" strokeWidth="2" strokeLinecap="round" />

                    <path d="M 28,68 L 26,114" fill="none" stroke="#3c2a1a" strokeWidth="14" strokeLinecap="round" />
                    <path d="M 28,68 L 26,114" fill="none" stroke="#3a6073" strokeWidth="10" strokeLinecap="round" />
                    <ellipse cx="27" cy="117" rx="10" ry="5.5" fill="#ffffff" stroke="#3c2a1a" strokeWidth="2.8" />
                    <line x1="21" y1="117" x2="31" y2="117" stroke="#bc6c25" strokeWidth="2" strokeLinecap="round" />
                  </g>
                  {/* Upright Torso */}
                  <ellipse cx="20" cy="50" rx="19" ry="21" fill="#bc6c25" stroke="#3c2a1a" strokeWidth="4" />
                  {/* Arms */}
                  <path d="M 6,46 Q -2,60 10,70" fill="none" stroke="#3c2a1a" strokeWidth="10" strokeLinecap="round" />
                  <path d="M 6,46 Q -2,60 10,70" fill="none" stroke="#bc6c25" strokeWidth="7" strokeLinecap="round" />
                  <circle cx="10" cy="70" r="4.5" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2" />
                  <path d="M 34,46 Q 42,60 30,70" fill="none" stroke="#3c2a1a" strokeWidth="10" strokeLinecap="round" />
                  <path d="M 34,46 Q 42,60 30,70" fill="none" stroke="#bc6c25" strokeWidth="7" strokeLinecap="round" />
                  <circle cx="30" cy="70" r="4.5" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2" />
                  {/* Novel in hand */}
                  <rect x="24" y="64" width="13" height="11" rx="2.5" fill="#52796f" stroke="#3c2a1a" strokeWidth="2" />

                  {/* LÅNGT, MÖRKT TJOCKT HÅR: Thick dark hair falling straight and sleek behind back (no hunch, no beard!) */}
                  <path
                    d="M 0,16 L 0,64 C 0,69 6,72 12,70 C 16,68 24,68 28,70 C 34,72 40,69 40,64 L 40,16 Z"
                    fill="#2a170d"
                    stroke="#3c2a1a"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />
                  <line x1="4" y1="26" x2="4" y2="60" stroke="#1d1008" strokeWidth="2" strokeLinecap="round" />
                  <line x1="36" y1="26" x2="36" y2="60" stroke="#1d1008" strokeWidth="2" strokeLinecap="round" />

                  {/* Clean Chubby Face - upright posture */}
                  <ellipse cx="20" cy="18" rx="18" ry="17" fill="#feddc7" stroke="#3c2a1a" strokeWidth="3.5" />

                  {/* Small ears */}
                  <circle cx="2" cy="18" r="3" fill="#feddc7" stroke="#3c2a1a" strokeWidth="1.8" />
                  <circle cx="38" cy="18" r="3" fill="#feddc7" stroke="#3c2a1a" strokeWidth="1.8" />

                  {/* Front hairline & bangs - sleek across top of forehead only (NO beard locks down cheeks/jaw!) */}
                  <path
                    d="M 3,16 C 2,2 11,-2 20,-2 C 29,-2 38,2 37,16 C 33,8 26,5 20,6 C 14,5 7,8 3,16 Z"
                    fill="#2a170d"
                    stroke="#3c2a1a"
                    strokeWidth="3.2"
                    strokeLinejoin="round"
                  />
                  <path d="M 7,11 Q 13,7 18,10" fill="none" stroke="#1d1008" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M 22,10 Q 27,7 33,11" fill="none" stroke="#1d1008" strokeWidth="1.6" strokeLinecap="round" />

                  {/* Eyes */}
                  <ellipse cx="15" cy="17" rx="2.2" ry="3" fill="#3c2a1a" />
                  <ellipse cx="25" cy="17" rx="2.2" ry="3" fill="#3c2a1a" />
                  <circle cx="16" cy="16" r="0.9" fill="#fff" />
                  <circle cx="26" cy="16" r="0.9" fill="#fff" />

                  {/* Gentle smile */}
                  <path d="M 17,24 Q 20,27 23,24" fill="none" stroke="#3c2a1a" strokeWidth="2.2" strokeLinecap="round" />

                  {/* Rosy cheeks */}
                  <ellipse cx="9" cy="20" rx="4" ry="2.5" fill="#fca5a5" opacity="0.8" />
                  <ellipse cx="31" cy="20" rx="4" ry="2.5" fill="#fca5a5" opacity="0.8" />

                  {/* Dynamic Speech bubble: Tilde on right of bench (shifted right, wide separation from Lisa) */}
                  <DynamicSpeechBubble
                    x={55}
                    y={-12}
                    headX={20}
                    headY={5}
                    text={memberQuotes.tilde.quote}
                    color="#BC6C25"
                    onClick={(e) => {
                      e.stopPropagation();
                      setInspectedItem({
                        title: `Tilde läser: ${memberQuotes.tilde.bookTitle || 'Fantasyroman'}`,
                        desc: `"${memberQuotes.tilde.quote}"${
                          memberQuotes.tilde.pages ? ` (${memberQuotes.tilde.pages} sidor lästa)` : ''
                        }`,
                        step: 8,
                        icon: '👧',
                      });
                    }}
                  />
                </g>
              )}
            </g>
          )}

          {/* CHUBBY MONSTERA IN BIG ROUND TERRACOTTA POT (Step >= 51) */}
          {hasMonstera && (
            <g
              className="cursor-pointer"
              onClick={() =>
                setInspectedItem({
                  title: 'Stor monstera i lerkruka',
                  desc: 'Mjuk och frodig planta med runda, glada blad i en bullig terrakottakruka.',
                  step: 51,
                  icon: '🪴',
                })
              }
              transform="translate(310, 290)"
            >
              <AssetItem
                id="plant_monstera_large"
                x={-15}
                y={0}
                width={105}
                height={115}
                fallback={
                  <g>
                    {/* Round chubby pot */}
                    <ellipse cx="35" cy="75" rx="20" ry="6" fill="#d97736" stroke="#3c2a1a" strokeWidth="3.5" />
                    <path
                      d="M 15,75 C 10,110 60,110 55,75 Z"
                      fill="#e76f51"
                      stroke="#3c2a1a"
                      strokeWidth="4"
                    />
                    {/* Chubby Monstera leaves */}
                    <path d="M 35,75 Q 15,40 -5,48" fill="none" stroke="#2d6a4f" strokeWidth="4" strokeLinecap="round" />
                    <ellipse cx="-5" cy="48" rx="22" ry="16" fill="#52b788" stroke="#3c2a1a" strokeWidth="3" transform="rotate(-15 -5 48)" />

                    <path d="M 35,75 Q 35,25 25,12" fill="none" stroke="#2d6a4f" strokeWidth="4" strokeLinecap="round" />
                    <ellipse cx="25" cy="12" rx="24" ry="18" fill="#40916c" stroke="#3c2a1a" strokeWidth="3" transform="rotate(10 25 12)" />

                    <path d="M 35,75 Q 55,45 75,55" fill="none" stroke="#2d6a4f" strokeWidth="4" strokeLinecap="round" />
                    <ellipse cx="75" cy="55" rx="22" ry="15" fill="#52b788" stroke="#3c2a1a" strokeWidth="3" transform="rotate(30 75 55)" />
                  </g>
                }
              />
            </g>
          )}

          {/* VINTAGE GRAMOPHONE (Step >= 60) */}
          {hasGramophone && (
            <g
              className="cursor-pointer"
              onClick={() =>
                setInspectedItem({
                  title: 'Vintage grammofon',
                  desc: 'Spelar mjuk akustisk jazz och mysig lo-fi musik.',
                  step: 60,
                  icon: '🎷',
                })
              }
              transform="translate(730, 420)"
            >
              <AssetItem
                id="gramophone_vintage"
                x={0}
                y={-10}
                width={70}
                height={65}
                fallback={
                  <g>
                    <rect x="0" y="20" width="44" height="28" rx="6" fill="#6f4e37" stroke="#3c2a1a" strokeWidth="3.5" />
                    <ellipse cx="22" cy="20" rx="18" ry="6" fill="#1a202c" stroke="#3c2a1a" strokeWidth="2.5" />
                    {/* Chubby Brass Horn */}
                    <path
                      d="M 30,18 Q 42,5 50,0 C 65,-12 75,5 55,18 Z"
                      fill="#e9c46a"
                      stroke="#3c2a1a"
                      strokeWidth="3.5"
                    />
                    <text x="58" y="-14" fontSize="14" fill="#3c2a1a" fontWeight="bold">♪</text>
                    <text x="72" y="-4" fontSize="12" fill="#3c2a1a" fontWeight="bold">♫</text>
                  </g>
                }
              />
            </g>
          )}

          {/* CHUBBY CAST IRON FIREPLACE (Step >= 71) */}
          {hasFireplace && (
            <g
              className="cursor-pointer"
              onClick={() =>
                setInspectedItem({
                  title: 'Sprakande kamin',
                  desc: 'Varm kamin med levande flammor bakom glasluckan som värmer hela caféet.',
                  step: 71,
                  icon: '🔥',
                })
              }
              transform="translate(35, 270)"
            >
              <AssetItem
                id="fireplace_castiron"
                x={0}
                y={-120}
                width={65}
                height={195}
                fallback={
                  <g>
                    <rect x="18" y="-120" width="16" height="130" fill="#2d3748" stroke="#3c2a1a" strokeWidth="3.5" />
                    <rect x="5" y="10" width="45" height="58" rx="10" fill="#2d3748" stroke="#3c2a1a" strokeWidth="4" />
                    {/* Glass door with fire */}
                    <rect x="12" y="20" width="31" height="32" rx="8" fill="#e76f51" stroke="#3c2a1a" strokeWidth="3" />
                    <circle cx="27" cy="38" r="9" fill="#f4a261" />
                    <circle cx="27" cy="38" r="5" fill="#ffeaa7" />
                  </g>
                }
              />
            </g>
          )}

          {/* 1000 PAGES CELEBRATION TROPHY OVERLAY */}
          {isCompleted && (
            <g transform="translate(480, 160)">
              <AssetItem
                id="trophy_1000_pages"
                x={-55}
                y={-55}
                width={110}
                height={110}
                fallback={
                  <g>
                    <circle cx="0" cy="0" r="55" fill="#ffeaa7" stroke="#3c2a1a" strokeWidth="5" />
                    <text x="0" y="16" textAnchor="middle" fontSize="42">🏆</text>
                  </g>
                }
              />
            </g>
          )}
        </svg>

        {/* Floating next-step indicator badge (bottom left) */}
        <div className="absolute bottom-3 left-4 bg-white/95 backdrop-blur-xs border-2 border-[#422e1b] shadow-sm px-3.5 py-2 rounded-2xl text-xs text-[#4a3b2c] flex items-center gap-2.5 max-w-[85%]">
          <span className="text-xl shrink-0">{nextMilestone.icon}</span>
          <div className="truncate">
            <span className="font-bold text-[#2f2216]">
              {totalPages >= TOTAL_GOAL_PAGES ? 'Caféet är 100 % fullbordat!' : `Nästa steg (${nextMilestone.step}/100): ${nextMilestone.title}`}
            </span>
            {totalPages < TOTAL_GOAL_PAGES && (
              <span className="text-[#8c7460] ml-1.5 font-semibold">
                ({pagesToNext} {pagesToNext === 1 ? 'sida' : 'sidor'} kvar)
              </span>
            )}
          </div>
        </div>

        {/* Inspected Item Popup */}
        {inspectedItem && (
          <div className="absolute top-4 right-4 z-20 max-w-xs bg-white border-2 border-[#422e1b] rounded-2xl p-4 shadow-xl text-xs animate-in fade-in duration-200">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#3b2b1e]">
                <span className="text-xl">{inspectedItem.icon}</span>
                <span>{inspectedItem.title}</span>
              </div>
              <button
                onClick={() => setInspectedItem(null)}
                className="text-[#998573] hover:text-[#3b2b1e] font-bold p-1 text-sm"
              >
                ✕
              </button>
            </div>
            <p className="text-[#594738] leading-relaxed mb-3">{inspectedItem.desc}</p>
            <div className="flex items-center justify-between text-[11px] text-[#8c7460] pt-2 border-t border-[#f0e6d8]">
              <span className="font-semibold">Byggsteg {inspectedItem.step} av 100</span>
              <span className="text-[#365942] font-bold">✓ Upplåst</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Progress Bar: 0 - 1000 Pages / 100 Steps */}
      <div className="p-4 sm:p-5 bg-[#fbf8f3] border-t-2 border-[#422e1b] flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-xs text-[#5c4a3b]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-[#2b2118] font-display tabular-nums">
              {totalPages.toLocaleString('sv-SE')} / {TOTAL_GOAL_PAGES.toLocaleString('sv-SE')} sidor
            </span>
            <span className="text-[#8c7866]">·</span>
            <span className="font-bold text-[#6e5a48] tabular-nums">
              Steg {currentStep} av 100 ({progressPercent.toFixed(1)}%)
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[#bc6c25] font-bold text-xs sm:text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Mål: Keramikverkstad</span>
          </div>
        </div>

        {/* 100-step progress bar */}
        <div className="w-full h-4 bg-[#e8dfd2] border-2 border-[#422e1b] rounded-full overflow-hidden p-0.5">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-[#84a98c] via-[#bc6c25] to-[#9c6644]"
            style={{ width: `${Math.min(100, Math.max(2, progressPercent))}%` }}
          />
        </div>

        {/* 4 Phases Indicators */}
        <div className="grid grid-cols-4 gap-1 text-[11px] font-bold text-[#7a6654] pt-1">
          <div className={`truncate ${currentPhase >= 1 ? 'text-[#52796f]' : 'opacity-50'}`}>
            1. Grunden (0–250)
          </div>
          <div className={`truncate text-center ${currentPhase >= 2 ? 'text-[#bc6c25]' : 'opacity-50'}`}>
            2. Böckerna (251–500)
          </div>
          <div className={`truncate text-center ${currentPhase >= 3 ? 'text-[#52796f]' : 'opacity-50'}`}>
            3. Grönskan (501–750)
          </div>
          <div className={`truncate text-right ${currentPhase >= 4 ? 'text-[#9c6644]' : 'opacity-50'}`}>
            4. Keramiken (751–1000)
          </div>
        </div>
      </div>
    </div>
  );
};
