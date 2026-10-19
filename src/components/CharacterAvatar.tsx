import React from 'react';
import { UserId } from '../types';

interface CharacterAvatarProps {
  userId: UserId;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBorder?: boolean;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  userId,
  size = 'md',
  className = '',
  showBorder = true,
}) => {
  // Proportioned dimensions to show the entire cute chubby character with arms, hands, legs and shoes
  const sizeMap = {
    xs: 'w-7 h-8',
    sm: 'w-9 h-11',
    md: 'w-14 h-16',
    lg: 'w-20 h-24',
    xl: 'w-28 h-32',
  };

  const currentSize = sizeMap[size];

  // Cozy coloring book / Bobbie Goods aesthetic:
  // Warm rounded outlines (#3c2a1a, strokeWidth 3.5), soft blush cheeks (#fca5a5),
  // cute full chibi bodies with visible arms, hands holding books/coffee, and legs with shoes!
  return (
    <div
      className={`relative rounded-2xl overflow-hidden shrink-0 select-none flex items-center justify-center p-1 ${currentSize} ${
        showBorder ? 'border-2 border-[#422e1b] shadow-xs' : ''
      } ${className}`}
      style={{
        backgroundColor:
          userId === 'ellen'
            ? '#eaf2ec'
            : userId === 'tilde'
            ? '#fdf4e8'
            : userId === 'lisa'
            ? '#f9ede7'
            : '#f4ece4',
      }}
    >
      <svg viewBox="0 0 100 115" className="w-full h-full block overflow-visible">
        {/* Soft ground shadow for grounded figurine feel */}
        <ellipse cx="50" cy="107" rx="30" ry="5" fill="#3c2a1a" opacity="0.12" />

        {/* =========================================================================
            ELLEN (13 år) - MINST (Smallest chibi size)
            - Blont vågigt hår utsläppt till axlarna (Loose, shoulder-length gently wavy blonde hair)
            - Sage green chunky knit turtleneck & leggings
            - Visible arms holding book, legs & cozy slip-ons
           ========================================================================= */}
        {userId === 'ellen' && (
          <g transform="translate(7.5, 15) scale(0.85)">
            {/* Blont vågigt hår utsläppt till axlarna (shoulder-length loose waves behind head) */}
            <path
              d="M 28,30 C 24,18 34,7 50,7 C 66,7 76,18 72,30 C 77,40 78,52 74,63 C 71,67 66,65 64,59 C 62,52 59,48 50,48 C 41,48 38,52 36,59 C 34,65 29,67 26,63 C 22,52 23,40 28,30 Z"
              fill="#f5d061"
              stroke="#3c2a1a"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            {/* Subtle soft wave lines */}
            <path d="M 27,38 Q 32,48 29,58" fill="none" stroke="#d49b22" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 73,38 Q 68,48 71,58" fill="none" stroke="#d49b22" strokeWidth="1.8" strokeLinecap="round" />

            {/* LEGS & SHOES */}
            {/* Left Leg */}
            <path
              d="M 40,82 L 37,99"
              fill="none"
              stroke="#3c2a1a"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d="M 40,82 L 37,99"
              fill="none"
              stroke="#45645b"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Left Shoe: warm slip-on */}
            <ellipse cx="35" cy="102" rx="7.5" ry="4.5" fill="#8c5836" stroke="#3c2a1a" strokeWidth="2.5" />
            <ellipse cx="36" cy="99" rx="4" ry="2" fill="#fcedd8" stroke="#3c2a1a" strokeWidth="1.5" />

            {/* Right Leg */}
            <path
              d="M 60,82 L 63,99"
              fill="none"
              stroke="#3c2a1a"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d="M 60,82 L 63,99"
              fill="none"
              stroke="#45645b"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Right Shoe */}
            <ellipse cx="65" cy="102" rx="7.5" ry="4.5" fill="#8c5836" stroke="#3c2a1a" strokeWidth="2.5" />
            <ellipse cx="64" cy="99" rx="4" ry="2" fill="#fcedd8" stroke="#3c2a1a" strokeWidth="1.5" />

            {/* Chubby Sweater Torso */}
            <ellipse cx="50" cy="68" rx="22" ry="18" fill="#52796f" stroke="#3c2a1a" strokeWidth="3.5" />
            <path d="M 32,78 Q 50,84 68,78" fill="none" stroke="#3c2a1a" strokeWidth="2.8" strokeLinecap="round" />

            {/* VISIBLE ARMS & HANDS */}
            {/* Left Arm & Sleeve */}
            <path
              d="M 30,60 Q 20,72 34,75"
              fill="none"
              stroke="#3c2a1a"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M 30,60 Q 20,72 34,75"
              fill="none"
              stroke="#52796f"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle cx="34" cy="75" r="4" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2" />

            {/* Right Arm & Sleeve */}
            <path
              d="M 70,60 Q 80,72 66,75"
              fill="none"
              stroke="#3c2a1a"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M 70,60 Q 80,72 66,75"
              fill="none"
              stroke="#52796f"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle cx="66" cy="75" r="4" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2" />

            {/* Open Book held in hands */}
            <polygon points="36,73 50,68 64,73 50,78" fill="#ffffff" stroke="#3c2a1a" strokeWidth="2" />
            <polygon points="36,73 36,76 50,81 64,76 64,73" fill="#bc6c25" stroke="#3c2a1a" strokeWidth="2" />
            <line x1="50" y1="69" x2="50" y2="80" stroke="#e76f51" strokeWidth="1.5" />

            {/* Chunky Knit Turtleneck Collar */}
            <rect
              x="38"
              y="48"
              width="24"
              height="11"
              rx="5"
              fill="#84a98c"
              stroke="#3c2a1a"
              strokeWidth="3"
            />
            <line x1="44" y1="49" x2="44" y2="58" stroke="#3c2a1a" strokeWidth="1.8" />
            <line x1="50" y1="49" x2="50" y2="58" stroke="#3c2a1a" strokeWidth="1.8" />
            <line x1="56" y1="49" x2="56" y2="58" stroke="#3c2a1a" strokeWidth="1.8" />

            {/* Round Chubby Head */}
            <ellipse
              cx="50"
              cy="34"
              rx="20"
              ry="19"
              fill="#fedcc5"
              stroke="#3c2a1a"
              strokeWidth="3.5"
            />

            {/* Ears */}
            <circle cx="30" cy="35" r="4" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2.5" />
            <circle cx="70" cy="35" r="4" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2.5" />

            {/* Front golden wavy bangs - soft, natural and loose */}
            <path
              d="M 30,27 C 32,16 40,13 50,13 C 60,13 68,16 70,27 C 65,20 58,19 50,20 C 42,19 35,20 30,27 Z"
              fill="#f5d061"
              stroke="#3c2a1a"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            {/* Soft wave fringe lines */}
            <path d="M 34,24 Q 41,20 48,24" fill="none" stroke="#3c2a1a" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 52,24 Q 59,20 66,24" fill="none" stroke="#3c2a1a" strokeWidth="1.8" strokeLinecap="round" />

            {/* Bobbie Goods style Eyes */}
            <ellipse cx="42" cy="34" rx="2.4" ry="3.2" fill="#3c2a1a" />
            <ellipse cx="58" cy="34" rx="2.4" ry="3.2" fill="#3c2a1a" />
            <circle cx="43" cy="33" r="1" fill="#ffffff" />
            <circle cx="59" cy="33" r="1" fill="#ffffff" />

            {/* Sweet smile */}
            <path
              d="M 46,41 Q 50,44 54,41"
              fill="none"
              stroke="#3c2a1a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Rosy cheeks */}
            <ellipse cx="36" cy="37" rx="4.5" ry="2.5" fill="#fca5a5" opacity="0.85" />
            <ellipse cx="64" cy="37" rx="4.5" ry="2.5" fill="#fca5a5" opacity="0.85" />
          </g>
        )}

        {/* =========================================================================
            TILDE (15 år) - NÄSTSTÖRST (Second largest, tall teen)
            - RÄT OCH FIN HÅLLNING (Straight, upright spine and posture - not hunchbacked!)
            - Långt, mörkt tjockt hår som faller bakom axlarna och längs ryggen (INGET SKÄGG!)
            - Caramel headphones around neck
            - Terracotta hoodie, jeans & sneakers, holding iced latte & book
           ========================================================================= */}
        {userId === 'tilde' && (
          <g transform="scale(1.0)">
            {/* LÅNGT, MÖRKT TJOCKT HÅR: Thick dark hair falling down behind shoulders along straight back */}
            <path
              d="M 24,28 L 22,82 C 22,88 28,91 35,89 C 42,87 50,90 58,89 C 65,87 72,91 78,88 L 76,28 Z"
              fill="#2a170d"
              stroke="#3c2a1a"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Straight vertical hair strands */}
            <line x1="28" y1="42" x2="28" y2="82" stroke="#1d1008" strokeWidth="2" strokeLinecap="round" />
            <line x1="72" y1="42" x2="72" y2="82" stroke="#1d1008" strokeWidth="2" strokeLinecap="round" />

            {/* LEGS & SNEAKERS */}
            {/* Left Leg */}
            <path
              d="M 41,82 L 39,99"
              fill="none"
              stroke="#3c2a1a"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d="M 41,82 L 39,99"
              fill="none"
              stroke="#3a6073"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Left Sneaker */}
            <ellipse cx="36" cy="102" rx="8" ry="4.5" fill="#ffffff" stroke="#3c2a1a" strokeWidth="2.5" />
            <line x1="32" y1="102" x2="40" y2="102" stroke="#bc6c25" strokeWidth="2" strokeLinecap="round" />

            {/* Right Leg */}
            <path
              d="M 59,82 L 61,99"
              fill="none"
              stroke="#3c2a1a"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d="M 59,82 L 61,99"
              fill="none"
              stroke="#3a6073"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Right Sneaker */}
            <ellipse cx="64" cy="102" rx="8" ry="4.5" fill="#ffffff" stroke="#3c2a1a" strokeWidth="2.5" />
            <line x1="60" y1="102" x2="68" y2="102" stroke="#bc6c25" strokeWidth="2" strokeLinecap="round" />

            {/* Upright Straight Hoodie Torso (Straight posture) */}
            <ellipse cx="50" cy="65" rx="21" ry="19" fill="#bc6c25" stroke="#3c2a1a" strokeWidth="3.5" />
            {/* Hoodie pocket */}
            <path d="M 40,67 Q 50,72 60,67 L 58,74 Q 50,76 42,74 Z" fill="#9c5417" stroke="#3c2a1a" strokeWidth="2" />

            {/* VISIBLE ARMS & HANDS */}
            {/* Left Arm: holding iced latte */}
            <path
              d="M 31,56 Q 20,66 29,73"
              fill="none"
              stroke="#3c2a1a"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M 31,56 Q 20,66 29,73"
              fill="none"
              stroke="#bc6c25"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle cx="29" cy="73" r="4" fill="#feddc7" stroke="#3c2a1a" strokeWidth="2" />
            <rect x="21" y="66" width="8" height="12" rx="2.5" fill="rgba(255,255,255,0.85)" stroke="#3c2a1a" strokeWidth="1.8" />
            <line x1="25" y1="62" x2="27" y2="75" stroke="#e76f51" strokeWidth="1.6" strokeLinecap="round" />

            {/* Right Arm: holding fantasy novel */}
            <path
              d="M 69,56 Q 80,66 71,73"
              fill="none"
              stroke="#3c2a1a"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M 69,56 Q 80,66 71,73"
              fill="none"
              stroke="#bc6c25"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle cx="71" cy="73" r="4" fill="#feddc7" stroke="#3c2a1a" strokeWidth="2" />
            <rect x="72" y="65" width="10" height="13" rx="2.5" fill="#52796f" stroke="#3c2a1a" strokeWidth="1.8" />

            {/* Neckline */}
            <path d="M 41,51 Q 50,56 59,51" fill="none" stroke="#3c2a1a" strokeWidth="2.8" strokeLinecap="round" />

            {/* Headphones around neck */}
            <path d="M 33,46 Q 50,53 67,46" fill="none" stroke="#dda15e" strokeWidth="4.5" strokeLinecap="round" />
            <ellipse cx="33" cy="46" rx="4" ry="5.5" fill="#4d321d" stroke="#3c2a1a" strokeWidth="2" />
            <ellipse cx="67" cy="46" rx="4" ry="5.5" fill="#4d321d" stroke="#3c2a1a" strokeWidth="2" />

            {/* Straight Upright Chubby Face */}
            <ellipse
              cx="50"
              cy="31"
              rx="20"
              ry="19"
              fill="#feddc7"
              stroke="#3c2a1a"
              strokeWidth="3.5"
            />

            {/* Ears */}
            <circle cx="30" cy="32" r="3.5" fill="#feddc7" stroke="#3c2a1a" strokeWidth="2" />
            <circle cx="70" cy="32" r="3.5" fill="#feddc7" stroke="#3c2a1a" strokeWidth="2" />

            {/* Front & side hairline framing forehead - sleek and clean (NO beard-like locks down jaw/chin!) */}
            <path
              d="M 28,26 C 27,11 38,5 50,5 C 62,5 73,11 72,26 C 66,16 58,14 50,15 C 42,14 34,16 28,26 Z"
              fill="#2a170d"
              stroke="#3c2a1a"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <path d="M 33,21 Q 42,16 48,20" fill="none" stroke="#1d1008" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 52,20 Q 58,16 67,21" fill="none" stroke="#1d1008" strokeWidth="1.8" strokeLinecap="round" />

            {/* Cute eyes with tiny lash */}
            <ellipse cx="43" cy="31" rx="2.4" ry="3.2" fill="#3c2a1a" />
            <ellipse cx="57" cy="31" rx="2.4" ry="3.2" fill="#3c2a1a" />
            <circle cx="44" cy="30" r="1" fill="#ffffff" />
            <circle cx="58" cy="30" r="1" fill="#ffffff" />
            <line x1="45" y1="28" x2="47" y2="26" stroke="#3c2a1a" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="55" y1="28" x2="53" y2="26" stroke="#3c2a1a" strokeWidth="1.8" strokeLinecap="round" />

            {/* Gentle smile */}
            <path
              d="M 46,38 Q 50,41 54,38"
              fill="none"
              stroke="#3c2a1a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Rosy cheeks */}
            <ellipse cx="36" cy="34" rx="4.5" ry="2.5" fill="#fca5a5" opacity="0.8" />
            <ellipse cx="64" cy="34" rx="4.5" ry="2.5" fill="#fca5a5" opacity="0.8" />
          </g>
        )}


        {/* =========================================================================
            LISA (Mamma) - MELLANSTOR (Smaller than Tilde, larger than Ellen)
            - Kort mörkt hår i page (Short dark bob/page haircut)
            - Rätt så stora glasögon (Stylish oversized glasses)
            - Cocoa cardigan, novel & warm coffee mug, clogs
           ========================================================================= */}
        {userId === 'lisa' && (
          <g transform="translate(3.5, 7) scale(0.93)">
            {/* Short dark page/bob back hair curving smoothly at jawline */}
            <path
              d="M 27,28 C 24,12 36,8 50,8 C 64,8 76,12 73,28 C 76,38 74,47 68,49 C 64,50 62,46 62,43 C 58,46 42,46 38,43 C 38,46 36,50 32,49 C 26,47 24,38 27,28 Z"
              fill="#342017"
              stroke="#3c2a1a"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />

            {/* LEGS & SHOES */}
            {/* Left Leg */}
            <path
              d="M 40,82 L 37,99"
              fill="none"
              stroke="#3c2a1a"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d="M 40,82 L 37,99"
              fill="none"
              stroke="#4a5568"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Left Clog */}
            <ellipse cx="35" cy="102" rx="7.5" ry="4.5" fill="#8c5836" stroke="#3c2a1a" strokeWidth="2.5" />

            {/* Right Leg */}
            <path
              d="M 60,82 L 63,99"
              fill="none"
              stroke="#3c2a1a"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d="M 60,82 L 63,99"
              fill="none"
              stroke="#4a5568"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Right Clog */}
            <ellipse cx="65" cy="102" rx="7.5" ry="4.5" fill="#8c5836" stroke="#3c2a1a" strokeWidth="2.5" />

            {/* Cardigan Torso */}
            <ellipse cx="50" cy="67" rx="22" ry="18" fill="#9c6644" stroke="#3c2a1a" strokeWidth="3.5" />
            <polygon points="50,68 44,52 56,52" fill="#fffdfa" stroke="#3c2a1a" strokeWidth="2.2" />
            <circle cx="50" cy="72" r="1.8" fill="#583101" />

            {/* VISIBLE ARMS & HANDS */}
            {/* Left Arm: holding open novel */}
            <path
              d="M 30,58 Q 20,70 34,74"
              fill="none"
              stroke="#3c2a1a"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M 30,58 Q 20,70 34,74"
              fill="none"
              stroke="#9c6644"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle cx="34" cy="74" r="4" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2" />
            <polygon points="26,73 34,70 42,73 34,76" fill="#ffffff" stroke="#3c2a1a" strokeWidth="1.8" />

            {/* Right Arm: holding ceramic coffee cup */}
            <path
              d="M 70,58 Q 80,70 66,74"
              fill="none"
              stroke="#3c2a1a"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M 70,58 Q 80,70 66,74"
              fill="none"
              stroke="#9c6644"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle cx="66" cy="74" r="4" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2" />
            <rect x="64" y="69" width="9" height="9" rx="2.5" fill="#e76f51" stroke="#3c2a1a" strokeWidth="1.8" />
            <ellipse cx="68.5" cy="69.5" rx="3.5" ry="1.5" fill="#fffdfa" />

            {/* Round Chubby Face */}
            <ellipse
              cx="50"
              cy="34"
              rx="20"
              ry="19"
              fill="#fedcc5"
              stroke="#3c2a1a"
              strokeWidth="3.5"
            />

            {/* Ears */}
            <circle cx="30" cy="35" r="4" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2.5" />
            <circle cx="70" cy="35" r="4" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2.5" />

            {/* Front page/bob fringe & sleek rounded bangs */}
            <path
              d="M 29,28 C 30,16 38,13 50,13 C 62,13 70,16 71,28 C 66,22 58,21 50,21 C 42,21 34,22 29,28 Z"
              fill="#342017"
              stroke="#3c2a1a"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Side page hair curving inward along cheeks */}
            <path d="M 29,26 Q 26,38 31,45 Q 34,46 34,41" fill="#342017" stroke="#3c2a1a" strokeWidth="2.8" />
            <path d="M 71,26 Q 74,38 69,45 Q 66,46 66,41" fill="#342017" stroke="#3c2a1a" strokeWidth="2.8" />

            {/* RÄTT SÅ STORA GLASÖGON (Big stylish retro-round glasses) */}
            <circle cx="41" cy="33" r="7.5" fill="rgba(240,248,255,0.45)" stroke="#3c2a1a" strokeWidth="2.4" />
            <circle cx="59" cy="33" r="7.5" fill="rgba(240,248,255,0.45)" stroke="#3c2a1a" strokeWidth="2.4" />
            <path d="M 48.5,33 Q 50,31 51.5,33" stroke="#3c2a1a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            {/* Temple pieces connecting to sides */}
            <line x1="33.5" y1="33" x2="29" y2="34" stroke="#3c2a1a" strokeWidth="2" strokeLinecap="round" />
            <line x1="66.5" y1="33" x2="71" y2="34" stroke="#3c2a1a" strokeWidth="2" strokeLinecap="round" />

            {/* Kind happy eyes behind big glasses */}
            <circle cx="41" cy="33" r="1.8" fill="#3c2a1a" />
            <circle cx="59" cy="33" r="1.8" fill="#3c2a1a" />
            <circle cx="42" cy="32" r="0.7" fill="#ffffff" />
            <circle cx="60" cy="32" r="0.7" fill="#ffffff" />
            {/* Friendly eyebrows */}
            <path d="M 37,24 Q 41,22 45,24" fill="none" stroke="#3c2a1a" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 55,24 Q 59,22 63,24" fill="none" stroke="#3c2a1a" strokeWidth="1.8" strokeLinecap="round" />

            {/* Maternal smile */}
            <path
              d="M 45,41 Q 50,45 55,41"
              fill="none"
              stroke="#3c2a1a"
              strokeWidth="2.6"
              strokeLinecap="round"
            />

            {/* Rosy cheeks */}
            <ellipse cx="36" cy="37" rx="4.5" ry="2.5" fill="#fba190" opacity="0.85" />
            <ellipse cx="64" cy="37" rx="4.5" ry="2.5" fill="#fba190" opacity="0.85" />
          </g>
        )}

        {/* =========================================================================
            MANGE (Pappa) - STÖRST (Largest, tallest & broadest figure)
            - Kort mörkt hår (Short dark hair)
            - Fyrkantiga glasögon (Modern square glasses with rounded corners)
            - Mocha sweater, espresso cup with steam, chinos & leather shoes
           ========================================================================= */}
        {userId === 'mange' && (
          <g transform="translate(-4, -8) scale(1.08)">
            {/* LEGS & SHOES */}
            {/* Left Leg */}
            <path
              d="M 39,82 L 36,99"
              fill="none"
              stroke="#3c2a1a"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M 39,82 L 36,99"
              fill="none"
              stroke="#344e41"
              strokeWidth="9"
              strokeLinecap="round"
            />
            {/* Left Leather Shoe */}
            <ellipse cx="34" cy="102" rx="8" ry="4.5" fill="#4a2e1b" stroke="#3c2a1a" strokeWidth="2.5" />

            {/* Right Leg */}
            <path
              d="M 61,82 L 64,99"
              fill="none"
              stroke="#3c2a1a"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M 61,82 L 64,99"
              fill="none"
              stroke="#344e41"
              strokeWidth="9"
              strokeLinecap="round"
            />
            {/* Right Leather Shoe */}
            <ellipse cx="66" cy="102" rx="8" ry="4.5" fill="#4a2e1b" stroke="#3c2a1a" strokeWidth="2.5" />

            {/* Broad Sweater Torso */}
            <ellipse cx="50" cy="67" rx="23" ry="19" fill="#6f4e37" stroke="#3c2a1a" strokeWidth="3.5" />
            <path d="M 31,79 Q 50,85 69,79" fill="none" stroke="#3c2a1a" strokeWidth="2.8" strokeLinecap="round" />

            {/* VISIBLE ARMS & HANDS */}
            {/* Left Arm: resting relaxed on hip */}
            <path
              d="M 28,58 Q 17,68 28,75"
              fill="none"
              stroke="#3c2a1a"
              strokeWidth="9.5"
              strokeLinecap="round"
            />
            <path
              d="M 28,58 Q 17,68 28,75"
              fill="none"
              stroke="#6f4e37"
              strokeWidth="6.5"
              strokeLinecap="round"
            />
            <circle cx="28" cy="75" r="4" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2" />

            {/* Right Arm: holding espresso cup with steam */}
            <path
              d="M 72,58 Q 84,68 70,75"
              fill="none"
              stroke="#3c2a1a"
              strokeWidth="9.5"
              strokeLinecap="round"
            />
            <path
              d="M 72,58 Q 84,68 70,75"
              fill="none"
              stroke="#6f4e37"
              strokeWidth="6.5"
              strokeLinecap="round"
            />
            <circle cx="70" cy="75" r="4" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2" />
            {/* Little Espresso Cup & saucer */}
            <g transform="translate(68, 69)">
              <rect x="0" y="2" width="10" height="8" rx="2.5" fill="#ffffff" stroke="#3c2a1a" strokeWidth="1.8" />
              <ellipse cx="5" cy="2" rx="4" ry="1.5" fill="#583101" />
              <ellipse cx="5" cy="10" rx="7" ry="1.8" fill="#ffffff" stroke="#3c2a1a" strokeWidth="1.6" />
              <path d="M 4,-2 Q 2,-6 5,-8" fill="none" stroke="#bc6c25" strokeWidth="1.4" strokeLinecap="round" />
            </g>

            {/* Crew neck collar */}
            <rect x="39" y="49" width="22" height="8" rx="4" fill="#8c5836" stroke="#3c2a1a" strokeWidth="2.5" />

            {/* Round Chubby Face */}
            <ellipse
              cx="50"
              cy="34"
              rx="20"
              ry="20"
              fill="#fedcc5"
              stroke="#3c2a1a"
              strokeWidth="3.5"
            />

            {/* Ears */}
            <circle cx="29" cy="35" r="4" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2.5" />
            <circle cx="71" cy="35" r="4" fill="#fedcc5" stroke="#3c2a1a" strokeWidth="2.5" />

            {/* Short dark hair */}
            <path
              d="M 28,29 C 27,11 39,8 50,8 C 62,8 73,11 72,29 C 67,19 58,16 50,16 C 41,16 33,20 28,29 Z"
              fill="#22160f"
              stroke="#3c2a1a"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <path d="M 38,12 Q 44,8 50,9 Q 56,8 62,12" fill="none" stroke="#3c2a1a" strokeWidth="2" strokeLinecap="round" />

            {/* FYRKANTIGA GLASÖGON (Modern square frames with slightly rounded corners) */}
            <rect x="36" y="27" width="12" height="11" rx="2.5" fill="rgba(240,248,255,0.45)" stroke="#3c2a1a" strokeWidth="2.6" />
            <rect x="52" y="27" width="12" height="11" rx="2.5" fill="rgba(240,248,255,0.45)" stroke="#3c2a1a" strokeWidth="2.6" />
            <line x1="48" y1="32" x2="52" y2="32" stroke="#3c2a1a" strokeWidth="2.6" strokeLinecap="round" />
            {/* Temple arms connecting to ears */}
            <line x1="36" y1="31" x2="31" y2="33" stroke="#3c2a1a" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="64" y1="31" x2="69" y2="33" stroke="#3c2a1a" strokeWidth="2.2" strokeLinecap="round" />

            {/* Eyes behind square glasses */}
            <circle cx="42" cy="32.5" r="1.8" fill="#3c2a1a" />
            <circle cx="58" cy="32.5" r="1.8" fill="#3c2a1a" />
            <circle cx="43" cy="31.5" r="0.7" fill="#ffffff" />
            <circle cx="59" cy="31.5" r="0.7" fill="#ffffff" />

            {/* Subtle cozy stubble dots */}
            <circle cx="46" cy="46" r="0.7" fill="#583101" opacity="0.6" />
            <circle cx="50" cy="47" r="0.7" fill="#583101" opacity="0.6" />
            <circle cx="54" cy="46" r="0.7" fill="#583101" opacity="0.6" />

            {/* Warm smile */}
            <path
              d="M 45,41 Q 50,45 55,41"
              fill="none"
              stroke="#3c2a1a"
              strokeWidth="2.6"
              strokeLinecap="round"
            />

            {/* Rosy cheeks */}
            <ellipse cx="35" cy="37" rx="4.5" ry="2.5" fill="#fca5a5" opacity="0.75" />
            <ellipse cx="65" cy="37" rx="4.5" ry="2.5" fill="#fca5a5" opacity="0.75" />
          </g>
        )}
      </svg>
    </div>
  );
};
