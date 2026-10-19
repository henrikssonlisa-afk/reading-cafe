const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public/images/cafe');
fs.mkdirSync(publicDir, { recursive: true });

// Standalone transparent illustrated SVG files
const assets = {
  // ELLEN: 13 years old, small blonde girl, golden headband, wavy blonde hair, forest green chunky turtleneck knit, curled up in reading armchair with socks and book
  char_ellen_reading: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 210" width="100%" height="100%">
    <!-- Subtle soft shadow -->
    <ellipse cx="80" cy="195" rx="55" ry="10" fill="rgba(60,42,26,0.12)" />

    <!-- Legs curled cozily forward with striped warm socks and house slippers -->
    <g>
      <!-- Left leg & foot -->
      <path d="M 50,135 Q 35,160 38,182 Q 48,188 62,184 Q 68,162 68,140 Z" fill="#1e3a1e" stroke="#3c2a1a" stroke-width="4" stroke-linejoin="round" />
      <!-- Striped sock left -->
      <path d="M 38,172 Q 44,178 58,175" stroke="#e9c46a" stroke-width="3.5" fill="none" stroke-linecap="round" />
      <path d="M 40,165 Q 46,170 60,167" stroke="#fffdfa" stroke-width="3" fill="none" stroke-linecap="round" />
      <!-- Left cozy slipper -->
      <ellipse cx="44" cy="184" rx="13" ry="8" fill="#8c5836" stroke="#3c2a1a" stroke-width="3.5" />
      <circle cx="36" cy="182" r="3" fill="#fefae0" />

      <!-- Right leg & foot curled over -->
      <path d="M 75,138 Q 95,155 106,175 Q 98,186 82,186 Q 72,168 66,140 Z" fill="#1e3a1e" stroke="#3c2a1a" stroke-width="4" stroke-linejoin="round" />
      <!-- Striped sock right -->
      <path d="M 88,170 Q 96,176 102,174" stroke="#e9c46a" stroke-width="3.5" fill="none" stroke-linecap="round" />
      <path d="M 82,163 Q 90,169 98,167" stroke="#fffdfa" stroke-width="3" fill="none" stroke-linecap="round" />
      <!-- Right cozy slipper -->
      <ellipse cx="100" cy="180" rx="14" ry="8" fill="#8c5836" stroke="#3c2a1a" stroke-width="3.5" transform="rotate(-12 100 180)" />
      <circle cx="108" cy="177" r="3" fill="#fefae0" />
    </g>

    <!-- Torso: Oversized cozy dark forest-green knit sweater with textured cable knit -->
    <g>
      <ellipse cx="78" cy="115" rx="36" ry="34" fill="#2d5a27" stroke="#3c2a1a" stroke-width="4.5" />
      <!-- Cable knit ribbed details -->
      <path d="M 70,95 Q 68,118 70,140" stroke="#23491f" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <path d="M 78,92 Q 78,118 78,142" stroke="#23491f" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <path d="M 86,95 Q 88,118 86,140" stroke="#23491f" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <!-- Chunky turtleneck collar -->
      <ellipse cx="78" cy="82" rx="19" ry="9" fill="#2d5a27" stroke="#3c2a1a" stroke-width="4" />
      <path d="M 64,82 Q 78,86 92,82" stroke="#23491f" stroke-width="2" fill="none" />
    </g>

    <!-- Left Arm & Sleeve holding open book -->
    <g>
      <path d="M 52,100 Q 42,125 56,138" fill="none" stroke="#3c2a1a" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M 52,100 Q 42,125 56,138" fill="none" stroke="#2d5a27" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Ribbed cuff -->
      <ellipse cx="56" cy="138" rx="6" ry="4" fill="#23491f" stroke="#3c2a1a" stroke-width="2" />
      <!-- Chubby cute hand -->
      <circle cx="61" cy="140" r="6" fill="#feddc7" stroke="#3c2a1a" stroke-width="2.5" />
    </g>

    <!-- Right Arm & Sleeve holding open book -->
    <g>
      <path d="M 104,100 Q 114,125 100,138" fill="none" stroke="#3c2a1a" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M 104,100 Q 114,125 100,138" fill="none" stroke="#2d5a27" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Ribbed cuff -->
      <ellipse cx="100" cy="138" rx="6" ry="4" fill="#23491f" stroke="#3c2a1a" stroke-width="2" />
      <!-- Chubby hand -->
      <circle cx="95" cy="140" r="6" fill="#feddc7" stroke="#3c2a1a" stroke-width="2.5" />
    </g>

    <!-- Open Book in Hands -->
    <g transform="translate(56, 122)">
      <polygon points="0,22 22,14 44,22 22,30" fill="#fffdfa" stroke="#3c2a1a" stroke-width="3" />
      <polygon points="0,22 0,27 22,35 44,27 44,22" fill="#c85a32" stroke="#3c2a1a" stroke-width="3" />
      <line x1="22" y1="15" x2="22" y2="34" stroke="#3c2a1a" stroke-width="2.5" />
      <!-- Tiny printed page lines -->
      <line x1="6" y1="21" x2="18" y2="18" stroke="#d5c4b1" stroke-width="1.5" />
      <line x1="6" y1="24" x2="18" y2="21" stroke="#d5c4b1" stroke-width="1.5" />
      <line x1="26" y1="18" x2="38" y2="21" stroke="#d5c4b1" stroke-width="1.5" />
      <line x1="26" y1="21" x2="38" y2="24" stroke="#d5c4b1" stroke-width="1.5" />
    </g>

    <!-- Back Blonde Wavy Hair falling softly around shoulders -->
    <path d="M 44,48 C 36,75 42,95 50,105 C 60,110 96,110 106,105 C 114,95 120,75 112,48 Z"
          fill="#f1c40f" stroke="#3c2a1a" stroke-width="4.5" stroke-linejoin="round" />
    <path d="M 46,75 Q 40,90 48,102" stroke="#d4a017" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <path d="M 110,75 Q 116,90 108,102" stroke="#d4a017" stroke-width="2.5" fill="none" stroke-linecap="round" />

    <!-- Cute Round Face -->
    <ellipse cx="78" cy="52" rx="27" ry="26" fill="#feddc7" stroke="#3c2a1a" stroke-width="4" />

    <!-- Rosy blush cheeks -->
    <ellipse cx="59" cy="58" rx="6" ry="4" fill="#fca5a5" opacity="0.85" />
    <ellipse cx="97" cy="58" rx="6" ry="4" fill="#fca5a5" opacity="0.85" />

    <!-- Cute Eyes: Happy, attentive reading eyes with sparkles -->
    <ellipse cx="67" cy="50" rx="3.5" ry="4.5" fill="#3c2a1a" />
    <circle cx="68.5" cy="48.5" r="1.5" fill="#ffffff" />
    <ellipse cx="89" cy="50" rx="3.5" ry="4.5" fill="#3c2a1a" />
    <circle cx="90.5" cy="48.5" r="1.5" fill="#ffffff" />

    <!-- Cute nose & gentle happy smile -->
    <circle cx="78" cy="54" r="1.5" fill="#e0a98b" />
    <path d="M 73,61 Q 78,66 83,61" fill="none" stroke="#3c2a1a" stroke-width="2.8" stroke-linecap="round" />

    <!-- Front Blonde Fringe / Bangs -->
    <path d="M 52,42 C 54,26 66,20 78,20 C 90,20 102,26 104,42 C 98,34 88,32 78,34 C 68,32 58,34 52,42 Z"
          fill="#f1c40f" stroke="#3c2a1a" stroke-width="3.8" stroke-linejoin="round" />
    <path d="M 64,28 Q 72,25 78,31" stroke="#d4a017" stroke-width="2" fill="none" />
    <path d="M 92,28 Q 84,25 78,31" stroke="#d4a017" stroke-width="2" fill="none" />

    <!-- DISTINCT GOLDEN YELLOW HEADBAND (#f4a261 / #e9c46a) on top of hair -->
    <path d="M 51,36 C 53,16 64,12 78,12 C 92,12 103,16 105,36"
          fill="none" stroke="#3c2a1a" stroke-width="7" stroke-linecap="round" />
    <path d="M 51,36 C 53,16 64,12 78,12 C 92,12 103,16 105,36"
          fill="none" stroke="#f4a261" stroke-width="5" stroke-linecap="round" />
    <path d="M 55,26 C 63,16 73,14 78,14"
          fill="none" stroke="#ffe3a8" stroke-width="2" stroke-linecap="round" />

    <!-- Warm steam mug beside her -->
    <g transform="translate(112, 148)">
      <rect x="0" y="4" width="16" height="15" rx="4" fill="#e76f51" stroke="#3c2a1a" stroke-width="2.5" />
      <path d="M 16,7 Q 21,7 21,11 Q 21,15 16,15" fill="none" stroke="#3c2a1a" stroke-width="2.2" stroke-linecap="round" />
      <ellipse cx="8" cy="4" rx="8" ry="2.5" fill="#fdfaf6" />
      <path d="M 6,1 Q 8,-3 6,-6" stroke="#bc6c25" stroke-width="1.5" fill="none" opacity="0.7" stroke-linecap="round" />
    </g>
  </svg>`,

  // LISA: Mom, short neat dark page bob, stylish large glasses, warm camel knit cardigan, slacks, resting at round table with novel and mug
  char_lisa_bistro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 230" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="85" cy="218" rx="55" ry="9" fill="rgba(60,42,26,0.12)" />

    <!-- Slacks & Clogs (Sitting comfortably) -->
    <g>
      <!-- Left Leg in dark slate navy slacks -->
      <path d="M 65,145 L 56,198" fill="none" stroke="#3c2a1a" stroke-width="16" stroke-linecap="round" />
      <path d="M 65,145 L 56,198" fill="none" stroke="#374151" stroke-width="11" stroke-linecap="round" />
      <!-- Left brown leather clog -->
      <ellipse cx="52" cy="204" rx="12" ry="7" fill="#8c5836" stroke="#3c2a1a" stroke-width="3.5" />
      <rect x="52" y="198" width="8" height="5" rx="2" fill="#3c2a1a" />

      <!-- Right Leg -->
      <path d="M 95,145 L 98,198" fill="none" stroke="#3c2a1a" stroke-width="16" stroke-linecap="round" />
      <path d="M 95,145 L 98,198" fill="none" stroke="#374151" stroke-width="11" stroke-linecap="round" />
      <!-- Right clog -->
      <ellipse cx="102" cy="204" rx="12" ry="7" fill="#8c5836" stroke="#3c2a1a" stroke-width="3.5" />
      <rect x="94" y="198" width="8" height="5" rx="2" fill="#3c2a1a" />
    </g>

    <!-- Torso: Warm Camel Brown Cardigan over White Collar -->
    <g>
      <ellipse cx="85" cy="120" rx="36" ry="34" fill="#9c6644" stroke="#3c2a1a" stroke-width="4.5" />
      <!-- White blouse V-neck collar -->
      <polygon points="85,96 73,82 97,82" fill="#fffdfa" stroke="#3c2a1a" stroke-width="3" stroke-linejoin="round" />
      <!-- Cardigan buttons -->
      <line x1="85" y1="102" x2="85" y2="148" stroke="#7f4f27" stroke-width="2.5" />
      <circle cx="85" cy="110" r="2" fill="#3c2a1a" />
      <circle cx="85" cy="124" r="2" fill="#3c2a1a" />
      <circle cx="85" cy="138" r="2" fill="#3c2a1a" />
    </g>

    <!-- Left Arm: resting on bistro table holding open feelgood novel -->
    <g>
      <path d="M 58,108 Q 42,130 60,146" fill="none" stroke="#3c2a1a" stroke-width="14" stroke-linecap="round" />
      <path d="M 58,108 Q 42,130 60,146" fill="none" stroke="#9c6644" stroke-width="10" stroke-linecap="round" />
      <circle cx="62" cy="148" r="6" fill="#feddc7" stroke="#3c2a1a" stroke-width="2.5" />
    </g>

    <!-- Right Arm: holding warm ceramic mug -->
    <g>
      <path d="M 112,108 Q 128,130 110,144" fill="none" stroke="#3c2a1a" stroke-width="14" stroke-linecap="round" />
      <path d="M 112,108 Q 128,130 110,144" fill="none" stroke="#9c6644" stroke-width="10" stroke-linecap="round" />
      <circle cx="106" cy="146" r="6" fill="#feddc7" stroke="#3c2a1a" stroke-width="2.5" />
      <!-- Ceramic Coffee Mug in hands -->
      <rect x="98" y="138" width="16" height="15" rx="4" fill="#e76f51" stroke="#3c2a1a" stroke-width="2.5" />
      <path d="M 114,142 Q 119,142 119,146 Q 119,150 114,150" fill="none" stroke="#3c2a1a" stroke-width="2" stroke-linecap="round" />
      <ellipse cx="106" cy="138" rx="8" ry="2.5" fill="#fdfaf6" />
    </g>

    <!-- Open book resting in lap / table -->
    <g transform="translate(48, 144)">
      <polygon points="0,18 18,12 36,18 18,24" fill="#fffdfa" stroke="#3c2a1a" stroke-width="2.8" />
      <polygon points="0,18 0,22 18,28 36,22 36,18" fill="#8c5836" stroke="#3c2a1a" stroke-width="2.8" />
      <line x1="18" y1="13" x2="18" y2="27" stroke="#3c2a1a" stroke-width="2" stroke-linecap="round" />
    </g>

    <!-- SHORT DARK PAGE BOB HAIRCUT: Curving smoothly around chin -->
    <path d="M 52,48 C 50,22 65,14 85,14 C 105,14 120,22 118,48 C 122,65 116,78 108,82 C 100,84 98,78 98,74 C 92,78 78,78 72,74 C 72,78 70,84 62,82 C 54,78 48,65 52,48 Z"
          fill="#342017" stroke="#3c2a1a" stroke-width="4.5" stroke-linejoin="round" />
    <path d="M 55,50 Q 52,65 56,76" stroke="#22130c" stroke-width="2.2" fill="none" stroke-linecap="round" />
    <path d="M 115,50 Q 118,65 114,76" stroke="#22130c" stroke-width="2.2" fill="none" stroke-linecap="round" />

    <!-- Chubby kind face -->
    <ellipse cx="85" cy="50" rx="27" ry="26" fill="#feddc7" stroke="#3c2a1a" stroke-width="4" />

    <!-- Bangs curving across forehead -->
    <path d="M 56,44 C 60,28 72,22 85,22 C 98,22 110,28 114,44 C 106,36 96,34 85,35 C 74,34 64,36 56,44 Z"
          fill="#342017" stroke="#3c2a1a" stroke-width="3.5" stroke-linejoin="round" />

    <!-- LARGE STYLISH RETRO ROUND GLASSES -->
    <g>
      <!-- Glass lenses with warm reflection -->
      <circle cx="73" cy="49" r="11" fill="rgba(255,255,255,0.4)" stroke="#3c2a1a" stroke-width="3.5" />
      <circle cx="97" cy="49" r="11" fill="rgba(255,255,255,0.4)" stroke="#3c2a1a" stroke-width="3.5" />
      <!-- Bridge & temple arms -->
      <path d="M 84,49 Q 85,46 86,49" stroke="#3c2a1a" stroke-width="3.5" fill="none" stroke-linecap="round" />
      <line x1="62" y1="49" x2="56" y2="50" stroke="#3c2a1a" stroke-width="3" stroke-linecap="round" />
      <line x1="108" y1="49" x2="114" y2="50" stroke="#3c2a1a" stroke-width="3" stroke-linecap="round" />

      <!-- Eyes behind glasses -->
      <circle cx="73" cy="49" r="2.8" fill="#3c2a1a" />
      <circle cx="74.5" cy="47.5" r="1" fill="#ffffff" />
      <circle cx="97" cy="49" r="2.8" fill="#3c2a1a" />
      <circle cx="98.5" cy="47.5" r="1" fill="#ffffff" />
    </g>

    <!-- Warm smile & blush cheeks -->
    <path d="M 79,61 Q 85,67 91,61" fill="none" stroke="#3c2a1a" stroke-width="2.8" stroke-linecap="round" />
    <ellipse cx="63" cy="58" rx="6" ry="3.5" fill="#fca5a5" opacity="0.85" />
    <ellipse cx="107" cy="58" rx="6" ry="3.5" fill="#fca5a5" opacity="0.85" />
  </svg>`,

  // TILDE: 15 years old, tall, sleek long dark hair behind back (clean face, no hunch), slate blue sweater, denim jeans, sneakers, holding open fantasy book and iced latte
  char_tilde_bistro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 235" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="85" cy="222" rx="55" ry="9" fill="rgba(60,42,26,0.12)" />

    <!-- LONG SLEEK DARK HAIR FALLING BEHIND BACK AND SHOULDERS -->
    <path d="M 56,46 L 54,142 C 54,152 64,158 74,154 C 80,150 90,150 96,154 C 106,158 116,152 116,142 L 114,46 Z"
          fill="#2a170d" stroke="#3c2a1a" stroke-width="4.5" stroke-linejoin="round" />
    <line x1="62" y1="65" x2="62" y2="135" stroke="#1c0f08" stroke-width="2.5" stroke-linecap="round" />
    <line x1="108" y1="65" x2="108" y2="135" stroke="#1c0f08" stroke-width="2.5" stroke-linecap="round" />

    <!-- Legs in Blue Denim Jeans & Sneakers -->
    <g>
      <!-- Left Leg -->
      <path d="M 70,145 Q 60,165 56,198" fill="none" stroke="#3c2a1a" stroke-width="16" stroke-linecap="round" />
      <path d="M 70,145 Q 60,165 56,198" fill="none" stroke="#2b6cb0" stroke-width="11" stroke-linecap="round" />
      <!-- Left Blue Sneaker with white toe & sole -->
      <ellipse cx="50" cy="204" rx="13" ry="7" fill="#1e40af" stroke="#3c2a1a" stroke-width="3.5" />
      <ellipse cx="44" cy="204" rx="4" ry="5" fill="#ffffff" stroke="#3c2a1a" stroke-width="2" />
      <line x1="42" y1="208" x2="62" y2="208" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" />

      <!-- Right Leg -->
      <path d="M 100,145 Q 110,165 114,198" fill="none" stroke="#3c2a1a" stroke-width="16" stroke-linecap="round" />
      <path d="M 100,145 Q 110,165 114,198" fill="none" stroke="#2b6cb0" stroke-width="11" stroke-linecap="round" />
      <!-- Right Blue Sneaker -->
      <ellipse cx="120" cy="204" rx="13" ry="7" fill="#1e40af" stroke="#3c2a1a" stroke-width="3.5" />
      <ellipse cx="126" cy="204" rx="4" ry="5" fill="#ffffff" stroke="#3c2a1a" stroke-width="2" />
      <line x1="108" y1="208" x2="128" y2="208" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" />
    </g>

    <!-- Upright Torso in Slate Blue/Grey Sweater -->
    <g>
      <ellipse cx="85" cy="115" rx="34" ry="34" fill="#3d5a80" stroke="#3c2a1a" stroke-width="4.5" />
      <!-- Ribbed collar -->
      <ellipse cx="85" cy="84" rx="16" ry="7" fill="#324967" stroke="#3c2a1a" stroke-width="3.5" />
    </g>

    <!-- Left Arm & Hand holding open fantasy book -->
    <g>
      <path d="M 60,105 Q 46,128 66,142" fill="none" stroke="#3c2a1a" stroke-width="14" stroke-linecap="round" />
      <path d="M 60,105 Q 46,128 66,142" fill="none" stroke="#3d5a80" stroke-width="10" stroke-linecap="round" />
      <circle cx="68" cy="142" r="5.5" fill="#feddc7" stroke="#3c2a1a" stroke-width="2.5" />
    </g>

    <!-- Right Arm & Hand holding open book -->
    <g>
      <path d="M 110,105 Q 124,128 104,142" fill="none" stroke="#3c2a1a" stroke-width="14" stroke-linecap="round" />
      <path d="M 110,105 Q 124,128 104,142" fill="none" stroke="#3d5a80" stroke-width="10" stroke-linecap="round" />
      <circle cx="102" cy="142" r="5.5" fill="#feddc7" stroke="#3c2a1a" stroke-width="2.5" />
    </g>

    <!-- Open Fantasy Book with Terracotta Crimson Cover -->
    <g transform="translate(62, 122)">
      <polygon points="0,22 23,15 46,22 23,29" fill="#fffdfa" stroke="#3c2a1a" stroke-width="3" />
      <polygon points="0,22 0,27 23,34 46,27 46,22" fill="#a44a2a" stroke="#3c2a1a" stroke-width="3" />
      <line x1="23" y1="16" x2="23" y2="33" stroke="#3c2a1a" stroke-width="2.5" stroke-linecap="round" />
      <circle cx="23" cy="24" r="3" fill="#e9c46a" />
    </g>

    <!-- Tall Iced Vanilla Latte glass with straw on side -->
    <g transform="translate(122, 126)">
      <polygon points="2,4 16,4 14,28 4,28" fill="rgba(255,255,255,0.7)" stroke="#3c2a1a" stroke-width="2" />
      <!-- Latte layers -->
      <polygon points="4,12 14,12 13,26 5,26" fill="#d4a373" />
      <polygon points="3,6 15,6 14,12 4,12" fill="#fffdfa" />
      <!-- Striped straw -->
      <line x1="9" y1="-2" x2="11" y2="20" stroke="#e76f51" stroke-width="2.5" stroke-linecap="round" />
    </g>

    <!-- Clean Chubby Teen Face: upright posture, clean jaw & cheeks (NO beard!) -->
    <ellipse cx="85" cy="50" rx="26" ry="25" fill="#feddc7" stroke="#3c2a1a" stroke-width="4" />

    <!-- Cute ears -->
    <circle cx="59" cy="50" r="4" fill="#feddc7" stroke="#3c2a1a" stroke-width="2" />
    <circle cx="111" cy="50" r="4" fill="#feddc7" stroke="#3c2a1a" stroke-width="2" />

    <!-- Front hairline & bangs - sleek across forehead only -->
    <path d="M 60,46 C 58,26 71,20 85,20 C 99,20 112,26 110,46 C 104,36 94,32 85,34 C 76,32 66,36 60,46 Z"
          fill="#2a170d" stroke="#3c2a1a" stroke-width="4" stroke-linejoin="round" />
    <path d="M 66,38 Q 74,32 82,37" stroke="#1c0f08" stroke-width="2" fill="none" />
    <path d="M 88,37 Q 96,32 104,38" stroke="#1c0f08" stroke-width="2" fill="none" />

    <!-- Cute teen eyes with subtle sparkle -->
    <ellipse cx="76" cy="48" rx="3.2" ry="4.2" fill="#3c2a1a" />
    <circle cx="77.5" cy="46.5" r="1.3" fill="#ffffff" />
    <ellipse cx="94" cy="48" rx="3.2" ry="4.2" fill="#3c2a1a" />
    <circle cx="95.5" cy="46.5" r="1.3" fill="#ffffff" />

    <!-- Gentle teen smile & soft rosy cheeks -->
    <path d="M 80,59 Q 85,64 90,59" fill="none" stroke="#3c2a1a" stroke-width="2.8" stroke-linecap="round" />
    <ellipse cx="67" cy="55" rx="5.5" ry="3.5" fill="#fca5a5" opacity="0.8" />
    <ellipse cx="103" cy="55" rx="5.5" ry="3.5" fill="#fca5a5" opacity="0.8" />
  </svg>`,

  // MANGE: Dad, tall, friendly, short dark hair, square glasses, mocha brown sweater, forest green chinos, leather shoes, holding espresso
  char_mange_bar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 280" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="90" cy="268" rx="60" ry="9" fill="rgba(60,42,26,0.12)" />

    <!-- Sturdy Legs in Forest Green Chinos & Dark Leather Shoes -->
    <g>
      <!-- Left Leg -->
      <path d="M 72,165 L 68,245" fill="none" stroke="#3c2a1a" stroke-width="18" stroke-linecap="round" />
      <path d="M 72,165 L 68,245" fill="none" stroke="#344e41" stroke-width="13" stroke-linecap="round" />
      <!-- Left sturdy leather shoe -->
      <ellipse cx="64" cy="252" rx="14" ry="8" fill="#4a2e1b" stroke="#3c2a1a" stroke-width="3.5" />
      <rect x="68" y="246" width="9" height="7" rx="2" fill="#3c2a1a" />

      <!-- Right Leg -->
      <path d="M 108,165 L 112,245" fill="none" stroke="#3c2a1a" stroke-width="18" stroke-linecap="round" />
      <path d="M 108,165 L 112,245" fill="none" stroke="#344e41" stroke-width="13" stroke-linecap="round" />
      <!-- Right shoe -->
      <ellipse cx="116" cy="252" rx="14" ry="8" fill="#4a2e1b" stroke="#3c2a1a" stroke-width="3.5" />
      <rect x="103" y="246" width="9" height="7" rx="2" fill="#3c2a1a" />
    </g>

    <!-- Torso: Warm Mocha Brown Knit Sweater -->
    <g>
      <ellipse cx="90" cy="125" rx="42" ry="46" fill="#6f4e37" stroke="#3c2a1a" stroke-width="5" />
      <!-- Ribbed collar -->
      <ellipse cx="90" cy="82" rx="18" ry="8" fill="#583c2a" stroke="#3c2a1a" stroke-width="3.8" />
      <!-- Knit texture lines -->
      <path d="M 82,95 L 82,158" stroke="#583c2a" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <path d="M 98,95 L 98,158" stroke="#583c2a" stroke-width="2.5" fill="none" stroke-linecap="round" />
    </g>

    <!-- Left Arm: resting comfortably on espresso counter -->
    <g>
      <path d="M 58,105 Q 40,135 62,152" fill="none" stroke="#3c2a1a" stroke-width="16" stroke-linecap="round" />
      <path d="M 58,105 Q 40,135 62,152" fill="none" stroke="#6f4e37" stroke-width="12" stroke-linecap="round" />
      <circle cx="66" cy="154" r="6.5" fill="#fedcc5" stroke="#3c2a1a" stroke-width="2.8" />
    </g>

    <!-- Right Arm: holding freshly brewed espresso cup -->
    <g>
      <path d="M 122,105 Q 140,135 116,150" fill="none" stroke="#3c2a1a" stroke-width="16" stroke-linecap="round" />
      <path d="M 122,105 Q 140,135 116,150" fill="none" stroke="#6f4e37" stroke-width="12" stroke-linecap="round" />
      <circle cx="112" cy="150" r="6.5" fill="#fedcc5" stroke="#3c2a1a" stroke-width="2.8" />

      <!-- White ceramic espresso cup with saucer & steam -->
      <ellipse cx="118" cy="148" rx="11" ry="3.5" fill="#ffffff" stroke="#3c2a1a" stroke-width="2.5" />
      <rect x="110" y="138" width="14" height="10" rx="3" fill="#ffffff" stroke="#3c2a1a" stroke-width="2.5" />
      <ellipse cx="117" cy="138" rx="7" ry="2" fill="#4a2e1b" />
      <path d="M 124,140 Q 128,140 128,143 Q 128,146 124,146" fill="none" stroke="#3c2a1a" stroke-width="2" />
      <!-- Rising steam -->
      <path d="M 115,133 Q 118,127 115,122" stroke="#d5c4b1" stroke-width="2" fill="none" stroke-linecap="round" />
      <path d="M 119,131 Q 122,125 119,120" stroke="#d5c4b1" stroke-width="2" fill="none" stroke-linecap="round" />
    </g>

    <!-- SHORT NEAT DARK BROWN HAIR -->
    <path d="M 60,42 C 58,16 72,10 90,10 C 108,10 122,16 120,42 C 122,50 120,60 116,62 C 112,62 110,56 108,52 C 102,56 78,56 72,52 C 70,56 68,62 64,62 C 60,60 58,50 60,42 Z"
          fill="#2c1b12" stroke="#3c2a1a" stroke-width="4.5" stroke-linejoin="round" />
    <path d="M 62,38 Q 74,30 90,32 Q 106,30 118,38" stroke="#1d110a" stroke-width="2.5" fill="none" />

    <!-- Friendly Dad Face -->
    <ellipse cx="90" cy="50" rx="28" ry="27" fill="#fedcc5" stroke="#3c2a1a" stroke-width="4" />

    <!-- Ears -->
    <circle cx="62" cy="50" r="4.5" fill="#fedcc5" stroke="#3c2a1a" stroke-width="2.5" />
    <circle cx="118" cy="50" r="4.5" fill="#fedcc5" stroke="#3c2a1a" stroke-width="2.5" />

    <!-- MODERN SQUARE DARK-RIMMED GLASSES -->
    <g>
      <!-- Left rectangular frame -->
      <rect x="67" y="40" width="19" height="17" rx="4" fill="rgba(255,255,255,0.4)" stroke="#2a1a10" stroke-width="3.5" />
      <!-- Right rectangular frame -->
      <rect x="94" y="40" width="19" height="17" rx="4" fill="rgba(255,255,255,0.4)" stroke="#2a1a10" stroke-width="3.5" />
      <!-- Bridge & temple arms -->
      <line x1="86" y1="48" x2="94" y2="48" stroke="#2a1a10" stroke-width="3.5" stroke-linecap="round" />
      <line x1="67" y1="46" x2="62" y2="47" stroke="#2a1a10" stroke-width="3" stroke-linecap="round" />
      <line x1="113" y1="46" x2="118" y2="47" stroke="#2a1a10" stroke-width="3" stroke-linecap="round" />

      <!-- Friendly eyes behind glasses -->
      <circle cx="76.5" cy="48.5" r="2.8" fill="#3c2a1a" />
      <circle cx="78" cy="47" r="1" fill="#ffffff" />
      <circle cx="103.5" cy="48.5" r="2.8" fill="#3c2a1a" />
      <circle cx="105" cy="47" r="1" fill="#ffffff" />
    </g>

    <!-- Warm friendly smile, slight neat stubble & blush -->
    <path d="M 83,62 Q 90,68 97,62" fill="none" stroke="#3c2a1a" stroke-width="3" stroke-linecap="round" />
    <ellipse cx="68" cy="58" rx="5" ry="3" fill="#fca5a5" opacity="0.7" />
    <ellipse cx="112" cy="58" rx="5" ry="3" fill="#fca5a5" opacity="0.7" />
  </svg>`,

  // SLEEPING TABBY CAT
  cat_sleeping_tabby: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 90" width="100%" height="100%">
    <g transform="translate(15, 15)">
      <!-- Round Chubby Sleeping Cat Body -->
      <ellipse cx="45" cy="30" rx="36" ry="26" fill="#f4a261" stroke="#3c2a1a" stroke-width="4.5" />
      <!-- Tabby stripes -->
      <path d="M 32,15 Q 38,26 32,38" stroke="#bc6c25" stroke-width="3.5" fill="none" stroke-linecap="round" />
      <path d="M 46,14 Q 52,26 46,40" stroke="#bc6c25" stroke-width="3.5" fill="none" stroke-linecap="round" />
      <path d="M 60,16 Q 66,28 60,38" stroke="#bc6c25" stroke-width="3.5" fill="none" stroke-linecap="round" />
      <!-- Round Head -->
      <circle cx="68" cy="22" r="18" fill="#f4a261" stroke="#3c2a1a" stroke-width="4" />
      <polygon points="62,6 70,-2 75,8" fill="#bc6c25" stroke="#3c2a1a" stroke-width="2.5" />
      <polygon points="73,8 81,-1 83,11" fill="#bc6c25" stroke="#3c2a1a" stroke-width="2.5" />
      <!-- Sleeping curved eyes -->
      <path d="M 64,22 Q 68,26 72,22" fill="none" stroke="#3c2a1a" stroke-width="2.8" stroke-linecap="round" />
      <!-- Curled tail -->
      <path d="M 18,36 Q 0,25 8,10" fill="none" stroke="#f4a261" stroke-width="10" stroke-linecap="round" />
      <path d="M 18,36 Q 0,25 8,10" fill="none" stroke="#3c2a1a" stroke-width="4" stroke-linecap="round" />
      <!-- Snore Zzz -->
      <text x="76" y="-4" font-size="14" fill="#8c5836" font-weight="bold">z</text>
      <text x="86" y="-12" font-size="18" fill="#8c5836" font-weight="bold">Z</text>
    </g>
  </svg>`,

  // KERAMIK-HEDERSHYLLAN (900 sidor)
  shelf_ceramic_tribute: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160" width="100%" height="100%">
    <!-- Shelf wooden beam -->
    <rect x="10" y="90" width="220" height="16" rx="4" fill="#a47148" stroke="#3c2a1a" stroke-width="3.5" />
    <polygon points="30,106 30,130 45,106" fill="#3c2a1a" />
    <polygon points="210,106 210,130 195,106" fill="#3c2a1a" />

    <!-- 4 Personalized Family Mugs: Ellen, Tilde, Lisa, Mange -->
    <!-- Ellen's Mug (Sage green with 'E') -->
    <rect x="25" y="55" width="28" height="35" rx="5" fill="#84a98c" stroke="#3c2a1a" stroke-width="3" />
    <path d="M 25,65 Q 16,65 16,72 Q 16,80 25,80" fill="none" stroke="#3c2a1a" stroke-width="2.5" />
    <text x="39" y="79" font-size="16" font-weight="bold" fill="#fffdfa" text-anchor="middle">E</text>

    <!-- Tilde's Mug (Warm terracotta with 'T') -->
    <rect x="65" y="55" width="28" height="35" rx="5" fill="#e76f51" stroke="#3c2a1a" stroke-width="3" />
    <path d="M 65,65 Q 56,65 56,72 Q 56,80 65,80" fill="none" stroke="#3c2a1a" stroke-width="2.5" />
    <text x="79" y="79" font-size="16" font-weight="bold" fill="#fffdfa" text-anchor="middle">T</text>

    <!-- Lisa's Mug (Cozy Ochre with 'L') -->
    <rect x="105" y="55" width="28" height="35" rx="5" fill="#e9c46a" stroke="#3c2a1a" stroke-width="3" />
    <path d="M 133,65 Q 142,65 142,72 Q 142,80 133,80" fill="none" stroke="#3c2a1a" stroke-width="2.5" />
    <text x="119" y="79" font-size="16" font-weight="bold" fill="#fffdfa" text-anchor="middle">L</text>

    <!-- Mange's Mug (Espresso Mocha with 'M') -->
    <rect x="145" y="55" width="28" height="35" rx="5" fill="#6f4e37" stroke="#3c2a1a" stroke-width="3" />
    <path d="M 173,65 Q 182,65 182,72 Q 182,80 173,80" fill="none" stroke="#3c2a1a" stroke-width="2.5" />
    <text x="159" y="79" font-size="16" font-weight="bold" fill="#fffdfa" text-anchor="middle">M</text>

    <!-- Handpainted Ceramic Vase & Brush on right -->
    <ellipse cx="200" cy="72" rx="14" ry="18" fill="#f4a261" stroke="#3c2a1a" stroke-width="3" />
    <rect x="195" y="44" width="10" height="14" rx="2" fill="#f4a261" stroke="#3c2a1a" stroke-width="2.5" />
    <!-- Fresh clay brushes -->
    <line x1="200" y1="44" x2="208" y2="22" stroke="#8c5836" stroke-width="3" stroke-linecap="round" />
    <polygon points="207,22 211,16 209,24" fill="#3c2a1a" />

    <!-- Golden glow sparkle -->
    <text x="120" y="32" font-size="20" text-anchor="middle">✨</text>
  </svg>`,

  // TROPHY 1000 PAGES (Final reward)
  trophy_1000_pages: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
    <!-- Glowing backdrop -->
    <circle cx="80" cy="80" r="70" fill="rgba(244,162,97,0.2)" />
    <!-- Base pedestal -->
    <rect x="50" y="115" width="60" height="20" rx="4" fill="#3c2a1a" stroke="#25170d" stroke-width="3" />
    <rect x="56" y="120" width="48" height="10" rx="2" fill="#e9c46a" />
    <text x="80" y="128" font-size="8" font-weight="bold" fill="#3c2a1a" text-anchor="middle">1000 SIDOR</text>

    <!-- Golden Chalice / Trophy -->
    <path d="M 60,65 L 75,115 L 85,115 L 100,65 Z" fill="#e9c46a" stroke="#3c2a1a" stroke-width="3.5" />
    <ellipse cx="80" cy="65" rx="35" ry="24" fill="#f4a261" stroke="#3c2a1a" stroke-width="4" />
    <ellipse cx="80" cy="50" rx="30" ry="12" fill="#ffd166" stroke="#3c2a1a" stroke-width="3" />

    <!-- Handles -->
    <path d="M 50,55 Q 30,55 35,75 Q 40,90 64,80" fill="none" stroke="#3c2a1a" stroke-width="4.5" stroke-linecap="round" />
    <path d="M 110,55 Q 130,55 125,75 Q 120,90 96,80" fill="none" stroke="#3c2a1a" stroke-width="4.5" stroke-linecap="round" />

    <!-- Star & Sparkles -->
    <text x="80" y="74" font-size="22" font-weight="bold" fill="#fffdfa" text-anchor="middle">⭐</text>
    <text x="40" y="35" font-size="16">✨</text>
    <text x="115" y="35" font-size="16">🎉</text>
  </svg>`,
};

// Generate Base64 Data URLs and save files
const base64Map = {};

for (const [id, svg] of Object.entries(assets)) {
  const cleanSvg = svg.trim();
  const filePath = path.join(publicDir, id + '.svg');
  fs.writeFileSync(filePath, cleanSvg, 'utf-8');

  const base64 = 'data:image/svg+xml;base64,' + Buffer.from(cleanSvg).toString('base64');
  base64Map[id] = base64;
  console.log(`Generated: ${id} -> ${filePath} (Base64 length: ${base64.length})`);
}

// Write the Base64 JSON output for inclusion in cafeAssets.ts
const outputPath = path.join(__dirname, 'generated_assets.json');
fs.writeFileSync(outputPath, JSON.stringify(base64Map, null, 2), 'utf-8');
console.log('Saved all generated assets to', outputPath);
