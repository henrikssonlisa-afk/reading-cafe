/**
 * Cozy Café Visual Assets Registry
 * 
 * Här kan du klistra in riktiga illustrerade PNG-bilder (med transparent bakgrund)
 * för caféet! Bilderna kan anges som antingen:
 * 1. Base64 Data URL (t.ex. "data:image/png;base64,iVBORw0KGgo...")
 * 2. URL till bild (t.ex. "/images/cafe/char_lisa.png" eller "https://...")
 * 
 * Om ett objekt lämnas tomt ("") används caféets fina kodade SVG-vektorgrafik som fallback!
 * 
 * Baserat på Canvas-upplösning: 960 x 540 px (16:9).
 * För skarpast resultat (Retina / 2x): Generera bilderna i 2x upplösning (1920 x 1080 px).
 */

export interface CafeAssetDefinition {
  id: string;
  name: string;
  category: 'background' | 'structure' | 'furniture' | 'character' | 'decor' | 'plants' | 'coffee' | 'ceramic';
  unlockedAtPages: number;
  unlockedAtStep: number;
  description: string;
  defaultPlacement: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

/**
 * Komplett specifikation över alla caféets grafikdelar
 */
export const CAFE_ASSET_DEFINITIONS: Record<string, CafeAssetDefinition> = {
  // ==========================================
  // RUM & BAKGRUND
  // ==========================================
  bg_room_empty: {
    id: 'bg_room_empty',
    name: 'Tomt café-rum (Bas)',
    category: 'background',
    unlockedAtPages: 0,
    unlockedAtStep: 0,
    description: 'Grundläggande väggar, takbjälke och rummets perspektiv före inredning.',
    defaultPlacement: { x: 0, y: 0, width: 960, height: 540 },
  },
  room_wood_floor: {
    id: 'room_wood_floor',
    name: 'Rustikt trägolv',
    category: 'structure',
    unlockedAtPages: 30,
    unlockedAtStep: 3,
    description: 'Varmt, slipat och linoljat furugolv med synliga plankor och skarvar.',
    defaultPlacement: { x: 0, y: 355, width: 960, height: 185 },
  },
  bg_wall_paint: {
    id: 'bg_wall_paint',
    name: 'Salviagrön accentvägg / bröstpanel',
    category: 'structure',
    unlockedAtPages: 50,
    unlockedAtStep: 5,
    description: 'Salviagrön träpanel med rundade speglar på vänstra vägghalvan.',
    defaultPlacement: { x: 0, y: 35, width: 360, height: 320 },
  },
  room_window_frame: {
    id: 'room_window_frame',
    name: 'Välvt caféfönster mot gatan',
    category: 'structure',
    unlockedAtPages: 70,
    unlockedAtStep: 7,
    description: 'Stort välvt spröjsat träfönster i ek med djup fönsterbänk och utsikt mot takåsar och himmel.',
    defaultPlacement: { x: 375, y: 60, width: 310, height: 235 },
  },
  room_window_rain: {
    id: 'room_window_rain',
    name: 'Mjukt regn mot rutan',
    category: 'decor',
    unlockedAtPages: 90,
    unlockedAtStep: 9,
    description: 'Mysiga regndroppar som pärlar sig på fönsterrutan mot utomhusmiljön.',
    defaultPlacement: { x: 395, y: 65, width: 270, height: 215 },
  },
  decor_fairy_lights: {
    id: 'decor_fairy_lights',
    name: 'Glödande ljusslingor',
    category: 'decor',
    unlockedAtPages: 540,
    unlockedAtStep: 54,
    description: 'Varma, glödande ljusslingor som hänger i mjuka bågar under takbjälkarna.',
    defaultPlacement: { x: 0, y: 10, width: 960, height: 60 },
  },
  decor_art_gallery: {
    id: 'decor_art_gallery',
    name: 'Gallerivägg med ramar i ek',
    category: 'decor',
    unlockedAtPages: 760,
    unlockedAtStep: 76,
    description: 'Inramad bokkonst, hjärta och mysiga kaffecitat på salviaväggen.',
    defaultPlacement: { x: 45, y: 65, width: 180, height: 110 },
  },

  // ==========================================
  // VÄNSTERZONEN: LÄSHÖRNAN & BOKHYLLA 1
  // ==========================================
  bookshelf_left: {
    id: 'bookshelf_left',
    name: 'Vänster bokhylla i ek (Stomme)',
    category: 'furniture',
    unlockedAtPages: 260,
    unlockedAtStep: 26,
    description: 'Golv-till-tak välvd bokhylla i massiv ek med djupa hyllplan.',
    defaultPlacement: { x: 15, y: 70, width: 200, height: 285 },
  },
  bookshelf_left_books: {
    id: 'bookshelf_left_books',
    name: 'Böcker & detaljer i vänster bokhylla',
    category: 'furniture',
    unlockedAtPages: 280,
    unlockedAtStep: 28,
    description: 'Färgglada böcker, klassiska ugglor som bokstöd och hängande murgröna.',
    defaultPlacement: { x: 25, y: 90, width: 180, height: 250 },
  },
  rug_round_reading: {
    id: 'rug_round_reading',
    name: 'Mönstrad orientalisk matta',
    category: 'furniture',
    unlockedAtPages: 330,
    unlockedAtStep: 33,
    description: 'Pösig, rund och mjuk vintagematta under läshörnan och fåtöljen.',
    defaultPlacement: { x: 50, y: 410, width: 300, height: 110 },
  },
  chair_armchair_green: {
    id: 'chair_armchair_green',
    name: 'Bullig sammetsfåtölj med senapsgul pläd',
    category: 'furniture',
    unlockedAtPages: 290,
    unlockedAtStep: 29,
    description: 'Djup, fluffig läsfåtölj i salviagrön sammet med knappar och en varm senapsgul stickad ullpläd.',
    defaultPlacement: { x: 120, y: 320, width: 170, height: 175 },
  },
  lamp_reading_floor: {
    id: 'lamp_reading_floor',
    name: 'Varm mässingsgolvlampa',
    category: 'furniture',
    unlockedAtPages: 320,
    unlockedAtStep: 32,
    description: 'Böjd mässingsarm med bärnstensfärgad kupa och mjukt varmvitt läsljus.',
    defaultPlacement: { x: 95, y: 255, width: 95, height: 225 },
  },
  fireplace_castiron: {
    id: 'fireplace_castiron',
    name: 'Gjutjärnskamin med sprakande brasa',
    category: 'structure',
    unlockedAtPages: 710,
    unlockedAtStep: 71,
    description: 'Mysig svart gjutjärnskamin med skorsten och levande flammor bakom glasluckan.',
    defaultPlacement: { x: 35, y: 150, width: 60, height: 180 },
  },
  cat_sleeping_tabby: {
    id: 'cat_sleeping_tabby',
    name: 'Sovande tabby-katt (Misse)',
    category: 'decor',
    unlockedAtPages: 790,
    unlockedAtStep: 79,
    description: 'Rund, bullig tabby-katt som sover sött ihoprullad som en kanelbulle med små z-tecken.',
    defaultPlacement: { x: 175, y: 410, width: 65, height: 45 },
  },

  // ==========================================
  // MITTZONEN: FÖNSTRET & BISTROBORDET
  // ==========================================
  plant_succulents_window: {
    id: 'plant_succulents_window',
    name: 'Suckulenter på fönsterbrädan',
    category: 'plants',
    unlockedAtPages: 630,
    unlockedAtStep: 63,
    description: 'Söta små suckulenter och kaktusar i terrakottakrukor på ekfönsterbrädan.',
    defaultPlacement: { x: 415, y: 245, width: 80, height: 35 },
  },
  sign_open_window: {
    id: 'sign_open_window',
    name: 'Träskylt "ÖPPET" i fönstret',
    category: 'decor',
    unlockedAtPages: 780,
    unlockedAtStep: 78,
    description: 'Snidad vit och ockragul träskylt upphängd i snören mot fönstret.',
    defaultPlacement: { x: 580, y: 175, width: 65, height: 45 },
  },
  plant_monstera_large: {
    id: 'plant_monstera_large',
    name: 'Stor monstera i terrakottakruka',
    category: 'plants',
    unlockedAtPages: 510,
    unlockedAtStep: 51,
    description: 'Frodig inomhusväxt med flikiga runda blad i en bullig röd lerkruka.',
    defaultPlacement: { x: 295, y: 290, width: 100, height: 120 },
  },
  chair_bentwood_left: {
    id: 'chair_bentwood_left',
    name: 'Böjträstol vänster (Thonet)',
    category: 'furniture',
    unlockedAtPages: 130,
    unlockedAtStep: 13,
    description: 'Klassisk mörk böjträstol med rundad ryggbåge för Lisas sittplats.',
    defaultPlacement: { x: 315, y: 375, width: 45, height: 80 },
  },
  chair_bentwood_right: {
    id: 'chair_bentwood_right',
    name: 'Böjträstol höger (Thonet)',
    category: 'furniture',
    unlockedAtPages: 130,
    unlockedAtStep: 13,
    description: 'Klassisk mörk böjträstol med rundad ryggbåge för Tildes sittplats.',
    defaultPlacement: { x: 445, y: 375, width: 45, height: 80 },
  },
  table_bistro_round: {
    id: 'table_bistro_round',
    name: 'Runt bistro-cafébord',
    category: 'furniture',
    unlockedAtPages: 120,
    unlockedAtStep: 12,
    description: 'Runt cafébord i ek med gjutjärnsfot.',
    defaultPlacement: { x: 390, y: 410, width: 130, height: 100 },
  },
  table_decor_linen: {
    id: 'table_decor_linen',
    name: 'Linneduk & blomvas på bordet',
    category: 'decor',
    unlockedAtPages: 140,
    unlockedAtStep: 14,
    description: 'Grov ljusbeige linneduk och en liten keramikvas med torkade strån och blommor.',
    defaultPlacement: { x: 395, y: 405, width: 120, height: 45 },
  },

  // ==========================================
  // HÖGERZONEN: DISKEN, KAFFEBAREN & HYLLA 2
  // ==========================================
  menu_chalkboard: {
    id: 'menu_chalkboard',
    name: 'Kritad menytavla',
    category: 'decor',
    unlockedAtPages: 190,
    unlockedAtStep: 19,
    description: 'Svart griffeltavla med handskriven cafémeny i krita.',
    defaultPlacement: { x: 505, y: 90, width: 140, height: 75 },
  },
  counter_wood_bar: {
    id: 'counter_wood_bar',
    name: 'Kassadisk i furu med vit toppskiva',
    category: 'furniture',
    unlockedAtPages: 180,
    unlockedAtStep: 18,
    description: 'Rejäl trädisk med träribbor och mjuk avrundad vit toppskiva.',
    defaultPlacement: { x: 480, y: 315, width: 265, height: 155 },
  },
  coffee_espresso_copper: {
    id: 'coffee_espresso_copper',
    name: 'Espressomaskin i koppar & ånga',
    category: 'coffee',
    unlockedAtPages: 350,
    unlockedAtStep: 35,
    description: 'Klassisk glänsande espressomaskin i koppar med tryckmätare, vita koppar och ett litet ångmoln.',
    defaultPlacement: { x: 495, y: 250, width: 75, height: 70 },
  },
  pastry_glass_dome: {
    id: 'pastry_glass_dome',
    name: 'Konditormonter med kanelbulle & croissant',
    category: 'coffee',
    unlockedAtPages: 560,
    unlockedAtStep: 56,
    description: 'Klar glaskupa på träfat med nystötta kardemummabullar och smörig croissant.',
    defaultPlacement: { x: 580, y: 270, width: 65, height: 50 },
  },
  gramophone_vintage: {
    id: 'gramophone_vintage',
    name: 'Vintage grammofon med mässingstratt',
    category: 'decor',
    unlockedAtPages: 600,
    unlockedAtStep: 60,
    description: 'Gammaldags skivspelare i mörkt trä med svängd mässingstratt och svävande musiknoter.',
    defaultPlacement: { x: 730, y: 420, width: 65, height: 55 },
  },
  bookshelf_right: {
    id: 'bookshelf_right',
    name: 'Höger bokhylla i ek (Stomme)',
    category: 'furniture',
    unlockedAtPages: 390,
    unlockedAtStep: 39,
    description: 'Välvd bokhylla i ek längs högra väggen med böcker och poesi.',
    defaultPlacement: { x: 760, y: 70, width: 185, height: 285 },
  },
  shelf_ceramic_tribute: {
    id: 'shelf_ceramic_tribute',
    name: 'KERAMIK-HEDERSHYLLAN (Upplyst)',
    category: 'ceramic',
    unlockedAtPages: 900,
    unlockedAtStep: 90,
    description: 'Upplyst hedershylla med guldsken: 4 personliga keramikmuggar med initialerna E, T, L, M, handmålad skål, blomvas och målarpalett med penslar!',
    defaultPlacement: { x: 765, y: 150, width: 175, height: 120 },
  },
  trophy_1000_pages: {
    id: 'trophy_1000_pages',
    name: 'Firande-pokal (1 000 sidor uppnått)',
    category: 'ceramic',
    unlockedAtPages: 1000,
    unlockedAtStep: 100,
    description: 'Gyllene pokal och festlig konfetti/medalj för att hela utmaningen är klar!',
    defaultPlacement: { x: 425, y: 105, width: 110, height: 110 },
  },

  // ==========================================
  // DE 4 FIGURERNA (CAFÉ-POSER, TRANSPARENT PNG)
  // ==========================================
  char_ellen_reading: {
    id: 'char_ellen_reading',
    name: 'Ellen läser i fåtöljen',
    category: 'character',
    unlockedAtPages: 0,
    unlockedAtStep: 0,
    description: 'Ellen (13 år, minst i familjen): Blont vågigt hår utsläppt till axlarna (mjuka vågor), oversized salviagrön stickad polotröja, mörkgröna byxor, randiga mysstrumpor och tofflor. Sitter ihoprullad med benen i fåtöljen och håller sin bok med båda händerna.',
    defaultPlacement: { x: 155, y: 360, width: 95, height: 115 },
  },
  char_lisa_bistro: {
    id: 'char_lisa_bistro',
    name: 'Lisa vid runda cafébordet',
    category: 'character',
    unlockedAtPages: 0,
    unlockedAtStep: 0,
    description: 'Lisa (Mamma): Kort mörkt hår i prydlig page, stora runda glasögon, varm brun kofta, vita manschetter och mörka byxor. Sitter på vänstra stolen vid runda bordet med en kaffekopp och en öppen bok.',
    defaultPlacement: { x: 285, y: 320, width: 90, height: 135 },
  },
  char_tilde_bistro: {
    id: 'char_tilde_bistro',
    name: 'Tilde vid fönstret / cafébordet',
    category: 'character',
    unlockedAtPages: 0,
    unlockedAtStep: 0,
    description: 'Tilde (15 år, näststörst): Långt mörkt tjockt hår som faller bakom axlarna och ryggen (ren panna, rena kinder och käke – inget skägg!). Sitter rak i ryggen på högra stolen, terrakotta hoodie, blå jeans, vita sneakers med orange detaljer. Håller ett högt glas islatte med sugrör och en fantasybok.',
    defaultPlacement: { x: 460, y: 320, width: 95, height: 135 },
  },
  char_mange_bar: {
    id: 'char_mange_bar',
    name: 'Mange vid espressobaren',
    category: 'character',
    unlockedAtPages: 0,
    unlockedAtStep: 0,
    description: 'Mange (Pappa, störst i familjen): Kort mörkt hår, fyrkantiga glasögon, varm mockabrun tröja, skogsgröna chinos och bruna läderskor. Står avslappnat vid espressobaren med en rykande nylagad espresso i en vit porslinskopp.',
    defaultPlacement: { x: 635, y: 195, width: 110, height: 175 },
  },
};

/**
 * =========================================================================
 * BILDARKIV / ASSET DICTIONARY
 * =========================================================================
 * Klistra in dina PNG-filer (som Base64 data URLs eller bild-URL:er) här!
 * 
 * Exempel:
 *   char_ellen_reading: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
 *   char_lisa_bistro: "/assets/cafe/lisa.png",
 * 
 * När en bild har klistrats in ersätts motsvarande kodade grafik automatiskt.
 * Alla tomma strängar ("") faller automatiskt tillbaka på den fina SVG-grafiken.
 */
export const CAFE_ASSETS: Record<string, string> = {
  // Bakgrund & Rum
  bg_room_empty: "",
  room_wood_floor: "",
  bg_wall_paint: "",
  room_window_frame: "",
  room_window_rain: "",
  decor_fairy_lights: "",
  decor_art_gallery: "",

  // Vänsterzonen
  bookshelf_left: "",
  bookshelf_left_books: "",
  rug_round_reading: "",
  chair_armchair_green: "",
  lamp_reading_floor: "",
  fireplace_castiron: "",
  cat_sleeping_tabby: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgOTAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTUsIDE1KSI+CiAgICAgIDwhLS0gUm91bmQgQ2h1YmJ5IFNsZWVwaW5nIENhdCBCb2R5IC0tPgogICAgICA8ZWxsaXBzZSBjeD0iNDUiIGN5PSIzMCIgcng9IjM2IiByeT0iMjYiIGZpbGw9IiNmNGEyNjEiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSI0LjUiIC8+CiAgICAgIDwhLS0gVGFiYnkgc3RyaXBlcyAtLT4KICAgICAgPHBhdGggZD0iTSAzMiwxNSBRIDM4LDI2IDMyLDM4IiBzdHJva2U9IiNiYzZjMjUiIHN0cm9rZS13aWR0aD0iMy41IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICAgIDxwYXRoIGQ9Ik0gNDYsMTQgUSA1MiwyNiA0Niw0MCIgc3Ryb2tlPSIjYmM2YzI1IiBzdHJva2Utd2lkdGg9IjMuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgICA8cGF0aCBkPSJNIDYwLDE2IFEgNjYsMjggNjAsMzgiIHN0cm9rZT0iI2JjNmMyNSIgc3Ryb2tlLXdpZHRoPSIzLjUiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KICAgICAgPCEtLSBSb3VuZCBIZWFkIC0tPgogICAgICA8Y2lyY2xlIGN4PSI2OCIgY3k9IjIyIiByPSIxOCIgZmlsbD0iI2Y0YTI2MSIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjQiIC8+CiAgICAgIDxwb2x5Z29uIHBvaW50cz0iNjIsNiA3MCwtMiA3NSw4IiBmaWxsPSIjYmM2YzI1IiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iMi41IiAvPgogICAgICA8cG9seWdvbiBwb2ludHM9IjczLDggODEsLTEgODMsMTEiIGZpbGw9IiNiYzZjMjUiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIyLjUiIC8+CiAgICAgIDwhLS0gU2xlZXBpbmcgY3VydmVkIGV5ZXMgLS0+CiAgICAgIDxwYXRoIGQ9Ik0gNjQsMjIgUSA2OCwyNiA3MiwyMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgICA8IS0tIEN1cmxlZCB0YWlsIC0tPgogICAgICA8cGF0aCBkPSJNIDE4LDM2IFEgMCwyNSA4LDEwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmNGEyNjEiIHN0cm9rZS13aWR0aD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KICAgICAgPHBhdGggZD0iTSAxOCwzNiBRIDAsMjUgOCwxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KICAgICAgPCEtLSBTbm9yZSBaenogLS0+CiAgICAgIDx0ZXh0IHg9Ijc2IiB5PSItNCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzhjNTgzNiIgZm9udC13ZWlnaHQ9ImJvbGQiPno8L3RleHQ+CiAgICAgIDx0ZXh0IHg9Ijg2IiB5PSItMTIiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM4YzU4MzYiIGZvbnQtd2VpZ2h0PSJib2xkIj5aPC90ZXh0PgogICAgPC9nPgogIDwvc3ZnPg==",

  // Mittzonen
  plant_succulents_window: "",
  sign_open_window: "",
  plant_monstera_large: "",
  chair_bentwood_left: "",
  chair_bentwood_right: "",
  table_bistro_round: "",
  table_decor_linen: "",

  // Högerzonen
  menu_chalkboard: "",
  counter_wood_bar: "",
  coffee_espresso_copper: "",
  pastry_glass_dome: "",
  gramophone_vintage: "",
  bookshelf_right: "",
  shelf_ceramic_tribute: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTYwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj4KICAgIDwhLS0gU2hlbGYgd29vZGVuIGJlYW0gLS0+CiAgICA8cmVjdCB4PSIxMCIgeT0iOTAiIHdpZHRoPSIyMjAiIGhlaWdodD0iMTYiIHJ4PSI0IiBmaWxsPSIjYTQ3MTQ4IiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iMy41IiAvPgogICAgPHBvbHlnb24gcG9pbnRzPSIzMCwxMDYgMzAsMTMwIDQ1LDEwNiIgZmlsbD0iIzNjMmExYSIgLz4KICAgIDxwb2x5Z29uIHBvaW50cz0iMjEwLDEwNiAyMTAsMTMwIDE5NSwxMDYiIGZpbGw9IiMzYzJhMWEiIC8+CgogICAgPCEtLSA0IFBlcnNvbmFsaXplZCBGYW1pbHkgTXVnczogRWxsZW4sIFRpbGRlLCBMaXNhLCBNYW5nZSAtLT4KICAgIDwhLS0gRWxsZW4ncyBNdWcgKFNhZ2UgZ3JlZW4gd2l0aCAnRScpIC0tPgogICAgPHJlY3QgeD0iMjUiIHk9IjU1IiB3aWR0aD0iMjgiIGhlaWdodD0iMzUiIHJ4PSI1IiBmaWxsPSIjODRhOThjIiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iMyIgLz4KICAgIDxwYXRoIGQ9Ik0gMjUsNjUgUSAxNiw2NSAxNiw3MiBRIDE2LDgwIDI1LDgwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iMi41IiAvPgogICAgPHRleHQgeD0iMzkiIHk9Ijc5IiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI2ZmZmRmYSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RTwvdGV4dD4KCiAgICA8IS0tIFRpbGRlJ3MgTXVnIChXYXJtIHRlcnJhY290dGEgd2l0aCAnVCcpIC0tPgogICAgPHJlY3QgeD0iNjUiIHk9IjU1IiB3aWR0aD0iMjgiIGhlaWdodD0iMzUiIHJ4PSI1IiBmaWxsPSIjZTc2ZjUxIiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iMyIgLz4KICAgIDxwYXRoIGQ9Ik0gNjUsNjUgUSA1Niw2NSA1Niw3MiBRIDU2LDgwIDY1LDgwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iMi41IiAvPgogICAgPHRleHQgeD0iNzkiIHk9Ijc5IiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI2ZmZmRmYSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VDwvdGV4dD4KCiAgICA8IS0tIExpc2EncyBNdWcgKENvenkgT2NocmUgd2l0aCAnTCcpIC0tPgogICAgPHJlY3QgeD0iMTA1IiB5PSI1NSIgd2lkdGg9IjI4IiBoZWlnaHQ9IjM1IiByeD0iNSIgZmlsbD0iI2U5YzQ2YSIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjMiIC8+CiAgICA8cGF0aCBkPSJNIDEzMyw2NSBRIDE0Miw2NSAxNDIsNzIgUSAxNDIsODAgMTMzLDgwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iMi41IiAvPgogICAgPHRleHQgeD0iMTE5IiB5PSI3OSIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiNmZmZkZmEiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkw8L3RleHQ+CgogICAgPCEtLSBNYW5nZSdzIE11ZyAoRXNwcmVzc28gTW9jaGEgd2l0aCAnTScpIC0tPgogICAgPHJlY3QgeD0iMTQ1IiB5PSI1NSIgd2lkdGg9IjI4IiBoZWlnaHQ9IjM1IiByeD0iNSIgZmlsbD0iIzZmNGUzNyIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjMiIC8+CiAgICA8cGF0aCBkPSJNIDE3Myw2NSBRIDE4Miw2NSAxODIsNzIgUSAxODIsODAgMTczLDgwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iMi41IiAvPgogICAgPHRleHQgeD0iMTU5IiB5PSI3OSIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiNmZmZkZmEiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk08L3RleHQ+CgogICAgPCEtLSBIYW5kcGFpbnRlZCBDZXJhbWljIFZhc2UgJiBCcnVzaCBvbiByaWdodCAtLT4KICAgIDxlbGxpcHNlIGN4PSIyMDAiIGN5PSI3MiIgcng9IjE0IiByeT0iMTgiIGZpbGw9IiNmNGEyNjEiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIzIiAvPgogICAgPHJlY3QgeD0iMTk1IiB5PSI0NCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjE0IiByeD0iMiIgZmlsbD0iI2Y0YTI2MSIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjIuNSIgLz4KICAgIDwhLS0gRnJlc2ggY2xheSBicnVzaGVzIC0tPgogICAgPGxpbmUgeDE9IjIwMCIgeTE9IjQ0IiB4Mj0iMjA4IiB5Mj0iMjIiIHN0cm9rZT0iIzhjNTgzNiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICA8cG9seWdvbiBwb2ludHM9IjIwNywyMiAyMTEsMTYgMjA5LDI0IiBmaWxsPSIjM2MyYTFhIiAvPgoKICAgIDwhLS0gR29sZGVuIGdsb3cgc3BhcmtsZSAtLT4KICAgIDx0ZXh0IHg9IjEyMCIgeT0iMzIiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuKcqDwvdGV4dD4KICA8L3N2Zz4=",
  trophy_1000_pages: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTYwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj4KICAgIDwhLS0gR2xvd2luZyBiYWNrZHJvcCAtLT4KICAgIDxjaXJjbGUgY3g9IjgwIiBjeT0iODAiIHI9IjcwIiBmaWxsPSJyZ2JhKDI0NCwxNjIsOTcsMC4yKSIgLz4KICAgIDwhLS0gQmFzZSBwZWRlc3RhbCAtLT4KICAgIDxyZWN0IHg9IjUwIiB5PSIxMTUiIHdpZHRoPSI2MCIgaGVpZ2h0PSIyMCIgcng9IjQiIGZpbGw9IiMzYzJhMWEiIHN0cm9rZT0iIzI1MTcwZCIgc3Ryb2tlLXdpZHRoPSIzIiAvPgogICAgPHJlY3QgeD0iNTYiIHk9IjEyMCIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjEwIiByeD0iMiIgZmlsbD0iI2U5YzQ2YSIgLz4KICAgIDx0ZXh0IHg9IjgwIiB5PSIxMjgiIGZvbnQtc2l6ZT0iOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMzYzJhMWEiIHRleHQtYW5jaG9yPSJtaWRkbGUiPjEwMDAgU0lET1I8L3RleHQ+CgogICAgPCEtLSBHb2xkZW4gQ2hhbGljZSAvIFRyb3BoeSAtLT4KICAgIDxwYXRoIGQ9Ik0gNjAsNjUgTCA3NSwxMTUgTCA4NSwxMTUgTCAxMDAsNjUgWiIgZmlsbD0iI2U5YzQ2YSIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjMuNSIgLz4KICAgIDxlbGxpcHNlIGN4PSI4MCIgY3k9IjY1IiByeD0iMzUiIHJ5PSIyNCIgZmlsbD0iI2Y0YTI2MSIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjQiIC8+CiAgICA8ZWxsaXBzZSBjeD0iODAiIGN5PSI1MCIgcng9IjMwIiByeT0iMTIiIGZpbGw9IiNmZmQxNjYiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIzIiAvPgoKICAgIDwhLS0gSGFuZGxlcyAtLT4KICAgIDxwYXRoIGQ9Ik0gNTAsNTUgUSAzMCw1NSAzNSw3NSBRIDQwLDkwIDY0LDgwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iNC41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICA8cGF0aCBkPSJNIDExMCw1NSBRIDEzMCw1NSAxMjUsNzUgUSAxMjAsOTAgOTYsODAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSI0LjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KCiAgICA8IS0tIFN0YXIgJiBTcGFya2xlcyAtLT4KICAgIDx0ZXh0IHg9IjgwIiB5PSI3NCIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiNmZmZkZmEiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuKtkDwvdGV4dD4KICAgIDx0ZXh0IHg9IjQwIiB5PSIzNSIgZm9udC1zaXplPSIxNiI+4pyoPC90ZXh0PgogICAgPHRleHQgeD0iMTE1IiB5PSIzNSIgZm9udC1zaXplPSIxNiI+8J+OiTwvdGV4dD4KICA8L3N2Zz4=",

  // Figurerna (Ellen, Lisa, Tilde, Mange)
  char_ellen_reading: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMjEwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj4KICAgIDwhLS0gU3VidGxlIHNvZnQgc2hhZG93IC0tPgogICAgPGVsbGlwc2UgY3g9IjgwIiBjeT0iMTk1IiByeD0iNTUiIHJ5PSIxMCIgZmlsbD0icmdiYSg2MCw0MiwyNiwwLjEyKSIgLz4KCiAgICA8IS0tIExlZ3MgY3VybGVkIGNvemlseSBmb3J3YXJkIHdpdGggc3RyaXBlZCB3YXJtIHNvY2tzIGFuZCBob3VzZSBzbGlwcGVycyAtLT4KICAgIDxnPgogICAgICA8IS0tIExlZnQgbGVnICYgZm9vdCAtLT4KICAgICAgPHBhdGggZD0iTSA1MCwxMzUgUSAzNSwxNjAgMzgsMTgyIFEgNDgsMTg4IDYyLDE4NCBRIDY4LDE2MiA2OCwxNDAgWiIgZmlsbD0iIzFlM2ExZSIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIC8+CiAgICAgIDwhLS0gU3RyaXBlZCBzb2NrIGxlZnQgLS0+CiAgICAgIDxwYXRoIGQ9Ik0gMzgsMTcyIFEgNDQsMTc4IDU4LDE3NSIgc3Ryb2tlPSIjZTljNDZhIiBzdHJva2Utd2lkdGg9IjMuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgICA8cGF0aCBkPSJNIDQwLDE2NSBRIDQ2LDE3MCA2MCwxNjciIHN0cm9rZT0iI2ZmZmRmYSIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICAgIDwhLS0gTGVmdCBjb3p5IHNsaXBwZXIgLS0+CiAgICAgIDxlbGxpcHNlIGN4PSI0NCIgY3k9IjE4NCIgcng9IjEzIiByeT0iOCIgZmlsbD0iIzhjNTgzNiIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjMuNSIgLz4KICAgICAgPGNpcmNsZSBjeD0iMzYiIGN5PSIxODIiIHI9IjMiIGZpbGw9IiNmZWZhZTAiIC8+CgogICAgICA8IS0tIFJpZ2h0IGxlZyAmIGZvb3QgY3VybGVkIG92ZXIgLS0+CiAgICAgIDxwYXRoIGQ9Ik0gNzUsMTM4IFEgOTUsMTU1IDEwNiwxNzUgUSA5OCwxODYgODIsMTg2IFEgNzIsMTY4IDY2LDE0MCBaIiBmaWxsPSIjMWUzYTFlIiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz4KICAgICAgPCEtLSBTdHJpcGVkIHNvY2sgcmlnaHQgLS0+CiAgICAgIDxwYXRoIGQ9Ik0gODgsMTcwIFEgOTYsMTc2IDEwMiwxNzQiIHN0cm9rZT0iI2U5YzQ2YSIgc3Ryb2tlLXdpZHRoPSIzLjUiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KICAgICAgPHBhdGggZD0iTSA4MiwxNjMgUSA5MCwxNjkgOTgsMTY3IiBzdHJva2U9IiNmZmZkZmEiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgICA8IS0tIFJpZ2h0IGNvenkgc2xpcHBlciAtLT4KICAgICAgPGVsbGlwc2UgY3g9IjEwMCIgY3k9IjE4MCIgcng9IjE0IiByeT0iOCIgZmlsbD0iIzhjNTgzNiIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjMuNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyIDEwMCAxODApIiAvPgogICAgICA8Y2lyY2xlIGN4PSIxMDgiIGN5PSIxNzciIHI9IjMiIGZpbGw9IiNmZWZhZTAiIC8+CiAgICA8L2c+CgogICAgPCEtLSBUb3JzbzogT3ZlcnNpemVkIGNvenkgZGFyayBmb3Jlc3QtZ3JlZW4ga25pdCBzd2VhdGVyIHdpdGggdGV4dHVyZWQgY2FibGUga25pdCAtLT4KICAgIDxnPgogICAgICA8ZWxsaXBzZSBjeD0iNzgiIGN5PSIxMTUiIHJ4PSIzNiIgcnk9IjM0IiBmaWxsPSIjMmQ1YTI3IiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iNC41IiAvPgogICAgICA8IS0tIENhYmxlIGtuaXQgcmliYmVkIGRldGFpbHMgLS0+CiAgICAgIDxwYXRoIGQ9Ik0gNzAsOTUgUSA2OCwxMTggNzAsMTQwIiBzdHJva2U9IiMyMzQ5MWYiIHN0cm9rZS13aWR0aD0iMi41IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICAgIDxwYXRoIGQ9Ik0gNzgsOTIgUSA3OCwxMTggNzgsMTQyIiBzdHJva2U9IiMyMzQ5MWYiIHN0cm9rZS13aWR0aD0iMi41IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICAgIDxwYXRoIGQ9Ik0gODYsOTUgUSA4OCwxMTggODYsMTQwIiBzdHJva2U9IiMyMzQ5MWYiIHN0cm9rZS13aWR0aD0iMi41IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICAgIDwhLS0gQ2h1bmt5IHR1cnRsZW5lY2sgY29sbGFyIC0tPgogICAgICA8ZWxsaXBzZSBjeD0iNzgiIGN5PSI4MiIgcng9IjE5IiByeT0iOSIgZmlsbD0iIzJkNWEyNyIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjQiIC8+CiAgICAgIDxwYXRoIGQ9Ik0gNjQsODIgUSA3OCw4NiA5Miw4MiIgc3Ryb2tlPSIjMjM0OTFmIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiIC8+CiAgICA8L2c+CgogICAgPCEtLSBMZWZ0IEFybSAmIFNsZWV2ZSBob2xkaW5nIG9wZW4gYm9vayAtLT4KICAgIDxnPgogICAgICA8cGF0aCBkPSJNIDUyLDEwMCBRIDQyLDEyNSA1NiwxMzgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIxNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiAvPgogICAgICA8cGF0aCBkPSJNIDUyLDEwMCBRIDQyLDEyNSA1NiwxMzgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJkNWEyNyIgc3Ryb2tlLXdpZHRoPSIxMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiAvPgogICAgICA8IS0tIFJpYmJlZCBjdWZmIC0tPgogICAgICA8ZWxsaXBzZSBjeD0iNTYiIGN5PSIxMzgiIHJ4PSI2IiByeT0iNCIgZmlsbD0iIzIzNDkxZiIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjIiIC8+CiAgICAgIDwhLS0gQ2h1YmJ5IGN1dGUgaGFuZCAtLT4KICAgICAgPGNpcmNsZSBjeD0iNjEiIGN5PSIxNDAiIHI9IjYiIGZpbGw9IiNmZWRkYzciIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIyLjUiIC8+CiAgICA8L2c+CgogICAgPCEtLSBSaWdodCBBcm0gJiBTbGVldmUgaG9sZGluZyBvcGVuIGJvb2sgLS0+CiAgICA8Zz4KICAgICAgPHBhdGggZD0iTSAxMDQsMTAwIFEgMTE0LDEyNSAxMDAsMTM4IiBmaWxsPSJub25lIiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iMTUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz4KICAgICAgPHBhdGggZD0iTSAxMDQsMTAwIFEgMTE0LDEyNSAxMDAsMTM4IiBmaWxsPSJub25lIiBzdHJva2U9IiMyZDVhMjciIHN0cm9rZS13aWR0aD0iMTEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz4KICAgICAgPCEtLSBSaWJiZWQgY3VmZiAtLT4KICAgICAgPGVsbGlwc2UgY3g9IjEwMCIgY3k9IjEzOCIgcng9IjYiIHJ5PSI0IiBmaWxsPSIjMjM0OTFmIiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iMiIgLz4KICAgICAgPCEtLSBDaHViYnkgaGFuZCAtLT4KICAgICAgPGNpcmNsZSBjeD0iOTUiIGN5PSIxNDAiIHI9IjYiIGZpbGw9IiNmZWRkYzciIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIyLjUiIC8+CiAgICA8L2c+CgogICAgPCEtLSBPcGVuIEJvb2sgaW4gSGFuZHMgLS0+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1NiwgMTIyKSI+CiAgICAgIDxwb2x5Z29uIHBvaW50cz0iMCwyMiAyMiwxNCA0NCwyMiAyMiwzMCIgZmlsbD0iI2ZmZmRmYSIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjMiIC8+CiAgICAgIDxwb2x5Z29uIHBvaW50cz0iMCwyMiAwLDI3IDIyLDM1IDQ0LDI3IDQ0LDIyIiBmaWxsPSIjYzg1YTMyIiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iMyIgLz4KICAgICAgPGxpbmUgeDE9IjIyIiB5MT0iMTUiIHgyPSIyMiIgeTI9IjM0IiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iMi41IiAvPgogICAgICA8IS0tIFRpbnkgcHJpbnRlZCBwYWdlIGxpbmVzIC0tPgogICAgICA8bGluZSB4MT0iNiIgeTE9IjIxIiB4Mj0iMTgiIHkyPSIxOCIgc3Ryb2tlPSIjZDVjNGIxIiBzdHJva2Utd2lkdGg9IjEuNSIgLz4KICAgICAgPGxpbmUgeDE9IjYiIHkxPSIyNCIgeDI9IjE4IiB5Mj0iMjEiIHN0cm9rZT0iI2Q1YzRiMSIgc3Ryb2tlLXdpZHRoPSIxLjUiIC8+CiAgICAgIDxsaW5lIHgxPSIyNiIgeTE9IjE4IiB4Mj0iMzgiIHkyPSIyMSIgc3Ryb2tlPSIjZDVjNGIxIiBzdHJva2Utd2lkdGg9IjEuNSIgLz4KICAgICAgPGxpbmUgeDE9IjI2IiB5MT0iMjEiIHgyPSIzOCIgeTI9IjI0IiBzdHJva2U9IiNkNWM0YjEiIHN0cm9rZS13aWR0aD0iMS41IiAvPgogICAgPC9nPgoKICAgIDwhLS0gQmFjayBCbG9uZGUgV2F2eSBIYWlyIGZhbGxpbmcgc29mdGx5IGFyb3VuZCBzaG91bGRlcnMgLS0+CiAgICA8cGF0aCBkPSJNIDQ0LDQ4IEMgMzYsNzUgNDIsOTUgNTAsMTA1IEMgNjAsMTEwIDk2LDExMCAxMDYsMTA1IEMgMTE0LDk1IDEyMCw3NSAxMTIsNDggWiIKICAgICAgICAgIGZpbGw9IiNmMWM0MGYiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSI0LjUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIC8+CiAgICA8cGF0aCBkPSJNIDQ2LDc1IFEgNDAsOTAgNDgsMTAyIiBzdHJva2U9IiNkNGEwMTciIHN0cm9rZS13aWR0aD0iMi41IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICA8cGF0aCBkPSJNIDExMCw3NSBRIDExNiw5MCAxMDgsMTAyIiBzdHJva2U9IiNkNGEwMTciIHN0cm9rZS13aWR0aD0iMi41IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CgogICAgPCEtLSBDdXRlIFJvdW5kIEZhY2UgLS0+CiAgICA8ZWxsaXBzZSBjeD0iNzgiIGN5PSI1MiIgcng9IjI3IiByeT0iMjYiIGZpbGw9IiNmZWRkYzciIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSI0IiAvPgoKICAgIDwhLS0gUm9zeSBibHVzaCBjaGVla3MgLS0+CiAgICA8ZWxsaXBzZSBjeD0iNTkiIGN5PSI1OCIgcng9IjYiIHJ5PSI0IiBmaWxsPSIjZmNhNWE1IiBvcGFjaXR5PSIwLjg1IiAvPgogICAgPGVsbGlwc2UgY3g9Ijk3IiBjeT0iNTgiIHJ4PSI2IiByeT0iNCIgZmlsbD0iI2ZjYTVhNSIgb3BhY2l0eT0iMC44NSIgLz4KCiAgICA8IS0tIEN1dGUgRXllczogSGFwcHksIGF0dGVudGl2ZSByZWFkaW5nIGV5ZXMgd2l0aCBzcGFya2xlcyAtLT4KICAgIDxlbGxpcHNlIGN4PSI2NyIgY3k9IjUwIiByeD0iMy41IiByeT0iNC41IiBmaWxsPSIjM2MyYTFhIiAvPgogICAgPGNpcmNsZSBjeD0iNjguNSIgY3k9IjQ4LjUiIHI9IjEuNSIgZmlsbD0iI2ZmZmZmZiIgLz4KICAgIDxlbGxpcHNlIGN4PSI4OSIgY3k9IjUwIiByeD0iMy41IiByeT0iNC41IiBmaWxsPSIjM2MyYTFhIiAvPgogICAgPGNpcmNsZSBjeD0iOTAuNSIgY3k9IjQ4LjUiIHI9IjEuNSIgZmlsbD0iI2ZmZmZmZiIgLz4KCiAgICA8IS0tIEN1dGUgbm9zZSAmIGdlbnRsZSBoYXBweSBzbWlsZSAtLT4KICAgIDxjaXJjbGUgY3g9Ijc4IiBjeT0iNTQiIHI9IjEuNSIgZmlsbD0iI2UwYTk4YiIgLz4KICAgIDxwYXRoIGQ9Ik0gNzMsNjEgUSA3OCw2NiA4Myw2MSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgoKICAgIDwhLS0gRnJvbnQgQmxvbmRlIEZyaW5nZSAvIEJhbmdzIC0tPgogICAgPHBhdGggZD0iTSA1Miw0MiBDIDU0LDI2IDY2LDIwIDc4LDIwIEMgOTAsMjAgMTAyLDI2IDEwNCw0MiBDIDk4LDM0IDg4LDMyIDc4LDM0IEMgNjgsMzIgNTgsMzQgNTIsNDIgWiIKICAgICAgICAgIGZpbGw9IiNmMWM0MGYiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIzLjgiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIC8+CiAgICA8cGF0aCBkPSJNIDY0LDI4IFEgNzIsMjUgNzgsMzEiIHN0cm9rZT0iI2Q0YTAxNyIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIiAvPgogICAgPHBhdGggZD0iTSA5MiwyOCBRIDg0LDI1IDc4LDMxIiBzdHJva2U9IiNkNGEwMTciIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIgLz4KCiAgICA8IS0tIERJU1RJTkNUIEdPTERFTiBZRUxMT1cgSEVBREJBTkQgKCNmNGEyNjEgLyAjZTljNDZhKSBvbiB0b3Agb2YgaGFpciAtLT4KICAgIDxwYXRoIGQ9Ik0gNTEsMzYgQyA1MywxNiA2NCwxMiA3OCwxMiBDIDkyLDEyIDEwMywxNiAxMDUsMzYiCiAgICAgICAgICBmaWxsPSJub25lIiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgPHBhdGggZD0iTSA1MSwzNiBDIDUzLDE2IDY0LDEyIDc4LDEyIEMgOTIsMTIgMTAzLDE2IDEwNSwzNiIKICAgICAgICAgIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2Y0YTI2MSIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICA8cGF0aCBkPSJNIDU1LDI2IEMgNjMsMTYgNzMsMTQgNzgsMTQiCiAgICAgICAgICBmaWxsPSJub25lIiBzdHJva2U9IiNmZmUzYTgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgoKICAgIDwhLS0gV2FybSBzdGVhbSBtdWcgYmVzaWRlIGhlciAtLT4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDExMiwgMTQ4KSI+CiAgICAgIDxyZWN0IHg9IjAiIHk9IjQiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNSIgcng9IjQiIGZpbGw9IiNlNzZmNTEiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIyLjUiIC8+CiAgICAgIDxwYXRoIGQ9Ik0gMTYsNyBRIDIxLDcgMjEsMTEgUSAyMSwxNSAxNiwxNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjIuMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgICA8ZWxsaXBzZSBjeD0iOCIgY3k9IjQiIHJ4PSI4IiByeT0iMi41IiBmaWxsPSIjZmRmYWY2IiAvPgogICAgICA8cGF0aCBkPSJNIDYsMSBRIDgsLTMgNiwtNiIgc3Ryb2tlPSIjYmM2YzI1IiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSIgb3BhY2l0eT0iMC43IiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICA8L2c+CiAgPC9zdmc+",
  char_lisa_bistro: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNzAgMjMwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj4KICAgIDwhLS0gU2hhZG93IC0tPgogICAgPGVsbGlwc2UgY3g9Ijg1IiBjeT0iMjE4IiByeD0iNTUiIHJ5PSI5IiBmaWxsPSJyZ2JhKDYwLDQyLDI2LDAuMTIpIiAvPgoKICAgIDwhLS0gU2xhY2tzICYgQ2xvZ3MgKFNpdHRpbmcgY29tZm9ydGFibHkpIC0tPgogICAgPGc+CiAgICAgIDwhLS0gTGVmdCBMZWcgaW4gZGFyayBzbGF0ZSBuYXZ5IHNsYWNrcyAtLT4KICAgICAgPHBhdGggZD0iTSA2NSwxNDUgTCA1NiwxOTgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIxNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgICA8cGF0aCBkPSJNIDY1LDE0NSBMIDU2LDE5OCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzc0MTUxIiBzdHJva2Utd2lkdGg9IjExIiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICAgIDwhLS0gTGVmdCBicm93biBsZWF0aGVyIGNsb2cgLS0+CiAgICAgIDxlbGxpcHNlIGN4PSI1MiIgY3k9IjIwNCIgcng9IjEyIiByeT0iNyIgZmlsbD0iIzhjNTgzNiIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjMuNSIgLz4KICAgICAgPHJlY3QgeD0iNTIiIHk9IjE5OCIgd2lkdGg9IjgiIGhlaWdodD0iNSIgcng9IjIiIGZpbGw9IiMzYzJhMWEiIC8+CgogICAgICA8IS0tIFJpZ2h0IExlZyAtLT4KICAgICAgPHBhdGggZD0iTSA5NSwxNDUgTCA5OCwxOTgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIxNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgICA8cGF0aCBkPSJNIDk1LDE0NSBMIDk4LDE5OCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzc0MTUxIiBzdHJva2Utd2lkdGg9IjExIiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICAgIDwhLS0gUmlnaHQgY2xvZyAtLT4KICAgICAgPGVsbGlwc2UgY3g9IjEwMiIgY3k9IjIwNCIgcng9IjEyIiByeT0iNyIgZmlsbD0iIzhjNTgzNiIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjMuNSIgLz4KICAgICAgPHJlY3QgeD0iOTQiIHk9IjE5OCIgd2lkdGg9IjgiIGhlaWdodD0iNSIgcng9IjIiIGZpbGw9IiMzYzJhMWEiIC8+CiAgICA8L2c+CgogICAgPCEtLSBUb3JzbzogV2FybSBDYW1lbCBCcm93biBDYXJkaWdhbiBvdmVyIFdoaXRlIENvbGxhciAtLT4KICAgIDxnPgogICAgICA8ZWxsaXBzZSBjeD0iODUiIGN5PSIxMjAiIHJ4PSIzNiIgcnk9IjM0IiBmaWxsPSIjOWM2NjQ0IiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iNC41IiAvPgogICAgICA8IS0tIFdoaXRlIGJsb3VzZSBWLW5lY2sgY29sbGFyIC0tPgogICAgICA8cG9seWdvbiBwb2ludHM9Ijg1LDk2IDczLDgyIDk3LDgyIiBmaWxsPSIjZmZmZGZhIiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz4KICAgICAgPCEtLSBDYXJkaWdhbiBidXR0b25zIC0tPgogICAgICA8bGluZSB4MT0iODUiIHkxPSIxMDIiIHgyPSI4NSIgeTI9IjE0OCIgc3Ryb2tlPSIjN2Y0ZjI3IiBzdHJva2Utd2lkdGg9IjIuNSIgLz4KICAgICAgPGNpcmNsZSBjeD0iODUiIGN5PSIxMTAiIHI9IjIiIGZpbGw9IiMzYzJhMWEiIC8+CiAgICAgIDxjaXJjbGUgY3g9Ijg1IiBjeT0iMTI0IiByPSIyIiBmaWxsPSIjM2MyYTFhIiAvPgogICAgICA8Y2lyY2xlIGN4PSI4NSIgY3k9IjEzOCIgcj0iMiIgZmlsbD0iIzNjMmExYSIgLz4KICAgIDwvZz4KCiAgICA8IS0tIExlZnQgQXJtOiByZXN0aW5nIG9uIGJpc3RybyB0YWJsZSBob2xkaW5nIG9wZW4gZmVlbGdvb2Qgbm92ZWwgLS0+CiAgICA8Zz4KICAgICAgPHBhdGggZD0iTSA1OCwxMDggUSA0MiwxMzAgNjAsMTQ2IiBmaWxsPSJub25lIiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iMTQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KICAgICAgPHBhdGggZD0iTSA1OCwxMDggUSA0MiwxMzAgNjAsMTQ2IiBmaWxsPSJub25lIiBzdHJva2U9IiM5YzY2NDQiIHN0cm9rZS13aWR0aD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KICAgICAgPGNpcmNsZSBjeD0iNjIiIGN5PSIxNDgiIHI9IjYiIGZpbGw9IiNmZWRkYzciIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIyLjUiIC8+CiAgICA8L2c+CgogICAgPCEtLSBSaWdodCBBcm06IGhvbGRpbmcgd2FybSBjZXJhbWljIG11ZyAtLT4KICAgIDxnPgogICAgICA8cGF0aCBkPSJNIDExMiwxMDggUSAxMjgsMTMwIDExMCwxNDQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIxNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgICA8cGF0aCBkPSJNIDExMiwxMDggUSAxMjgsMTMwIDExMCwxNDQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzljNjY0NCIgc3Ryb2tlLXdpZHRoPSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgICA8Y2lyY2xlIGN4PSIxMDYiIGN5PSIxNDYiIHI9IjYiIGZpbGw9IiNmZWRkYzciIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIyLjUiIC8+CiAgICAgIDwhLS0gQ2VyYW1pYyBDb2ZmZWUgTXVnIGluIGhhbmRzIC0tPgogICAgICA8cmVjdCB4PSI5OCIgeT0iMTM4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTUiIHJ4PSI0IiBmaWxsPSIjZTc2ZjUxIiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iMi41IiAvPgogICAgICA8cGF0aCBkPSJNIDExNCwxNDIgUSAxMTksMTQyIDExOSwxNDYgUSAxMTksMTUwIDExNCwxNTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICAgIDxlbGxpcHNlIGN4PSIxMDYiIGN5PSIxMzgiIHJ4PSI4IiByeT0iMi41IiBmaWxsPSIjZmRmYWY2IiAvPgogICAgPC9nPgoKICAgIDwhLS0gT3BlbiBib29rIHJlc3RpbmcgaW4gbGFwIC8gdGFibGUgLS0+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0OCwgMTQ0KSI+CiAgICAgIDxwb2x5Z29uIHBvaW50cz0iMCwxOCAxOCwxMiAzNiwxOCAxOCwyNCIgZmlsbD0iI2ZmZmRmYSIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjIuOCIgLz4KICAgICAgPHBvbHlnb24gcG9pbnRzPSIwLDE4IDAsMjIgMTgsMjggMzYsMjIgMzYsMTgiIGZpbGw9IiM4YzU4MzYiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIyLjgiIC8+CiAgICAgIDxsaW5lIHgxPSIxOCIgeTE9IjEzIiB4Mj0iMTgiIHkyPSIyNyIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KICAgIDwvZz4KCiAgICA8IS0tIFNIT1JUIERBUksgUEFHRSBCT0IgSEFJUkNVVDogQ3VydmluZyBzbW9vdGhseSBhcm91bmQgY2hpbiAtLT4KICAgIDxwYXRoIGQ9Ik0gNTIsNDggQyA1MCwyMiA2NSwxNCA4NSwxNCBDIDEwNSwxNCAxMjAsMjIgMTE4LDQ4IEMgMTIyLDY1IDExNiw3OCAxMDgsODIgQyAxMDAsODQgOTgsNzggOTgsNzQgQyA5Miw3OCA3OCw3OCA3Miw3NCBDIDcyLDc4IDcwLDg0IDYyLDgyIEMgNTQsNzggNDgsNjUgNTIsNDggWiIKICAgICAgICAgIGZpbGw9IiMzNDIwMTciIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSI0LjUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIC8+CiAgICA8cGF0aCBkPSJNIDU1LDUwIFEgNTIsNjUgNTYsNzYiIHN0cm9rZT0iIzIyMTMwYyIgc3Ryb2tlLXdpZHRoPSIyLjIiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KICAgIDxwYXRoIGQ9Ik0gMTE1LDUwIFEgMTE4LDY1IDExNCw3NiIgc3Ryb2tlPSIjMjIxMzBjIiBzdHJva2Utd2lkdGg9IjIuMiIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgoKICAgIDwhLS0gQ2h1YmJ5IGtpbmQgZmFjZSAtLT4KICAgIDxlbGxpcHNlIGN4PSI4NSIgY3k9IjUwIiByeD0iMjciIHJ5PSIyNiIgZmlsbD0iI2ZlZGRjNyIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjQiIC8+CgogICAgPCEtLSBCYW5ncyBjdXJ2aW5nIGFjcm9zcyBmb3JlaGVhZCAtLT4KICAgIDxwYXRoIGQ9Ik0gNTYsNDQgQyA2MCwyOCA3MiwyMiA4NSwyMiBDIDk4LDIyIDExMCwyOCAxMTQsNDQgQyAxMDYsMzYgOTYsMzQgODUsMzUgQyA3NCwzNCA2NCwzNiA1Niw0NCBaIgogICAgICAgICAgZmlsbD0iIzM0MjAxNyIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjMuNSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz4KCiAgICA8IS0tIExBUkdFIFNUWUxJU0ggUkVUUk8gUk9VTkQgR0xBU1NFUyAtLT4KICAgIDxnPgogICAgICA8IS0tIEdsYXNzIGxlbnNlcyB3aXRoIHdhcm0gcmVmbGVjdGlvbiAtLT4KICAgICAgPGNpcmNsZSBjeD0iNzMiIGN5PSI0OSIgcj0iMTEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC40KSIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjMuNSIgLz4KICAgICAgPGNpcmNsZSBjeD0iOTciIGN5PSI0OSIgcj0iMTEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC40KSIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjMuNSIgLz4KICAgICAgPCEtLSBCcmlkZ2UgJiB0ZW1wbGUgYXJtcyAtLT4KICAgICAgPHBhdGggZD0iTSA4NCw0OSBRIDg1LDQ2IDg2LDQ5IiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iMy41IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICAgIDxsaW5lIHgxPSI2MiIgeTE9IjQ5IiB4Mj0iNTYiIHkyPSI1MCIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KICAgICAgPGxpbmUgeDE9IjEwOCIgeTE9IjQ5IiB4Mj0iMTE0IiB5Mj0iNTAiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CgogICAgICA8IS0tIEV5ZXMgYmVoaW5kIGdsYXNzZXMgLS0+CiAgICAgIDxjaXJjbGUgY3g9IjczIiBjeT0iNDkiIHI9IjIuOCIgZmlsbD0iIzNjMmExYSIgLz4KICAgICAgPGNpcmNsZSBjeD0iNzQuNSIgY3k9IjQ3LjUiIHI9IjEiIGZpbGw9IiNmZmZmZmYiIC8+CiAgICAgIDxjaXJjbGUgY3g9Ijk3IiBjeT0iNDkiIHI9IjIuOCIgZmlsbD0iIzNjMmExYSIgLz4KICAgICAgPGNpcmNsZSBjeD0iOTguNSIgY3k9IjQ3LjUiIHI9IjEiIGZpbGw9IiNmZmZmZmYiIC8+CiAgICA8L2c+CgogICAgPCEtLSBXYXJtIHNtaWxlICYgYmx1c2ggY2hlZWtzIC0tPgogICAgPHBhdGggZD0iTSA3OSw2MSBRIDg1LDY3IDkxLDYxIiBmaWxsPSJub25lIiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iMi44IiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICA8ZWxsaXBzZSBjeD0iNjMiIGN5PSI1OCIgcng9IjYiIHJ5PSIzLjUiIGZpbGw9IiNmY2E1YTUiIG9wYWNpdHk9IjAuODUiIC8+CiAgICA8ZWxsaXBzZSBjeD0iMTA3IiBjeT0iNTgiIHJ4PSI2IiByeT0iMy41IiBmaWxsPSIjZmNhNWE1IiBvcGFjaXR5PSIwLjg1IiAvPgogIDwvc3ZnPg==",
  char_tilde_bistro: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNzAgMjM1IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj4KICAgIDwhLS0gU2hhZG93IC0tPgogICAgPGVsbGlwc2UgY3g9Ijg1IiBjeT0iMjIyIiByeD0iNTUiIHJ5PSI5IiBmaWxsPSJyZ2JhKDYwLDQyLDI2LDAuMTIpIiAvPgoKICAgIDwhLS0gTE9ORyBTTEVFSyBEQVJLIEhBSVIgRkFMTElORyBCRUhJTkQgQkFDSyBBTkQgU0hPVUxERVJTIC0tPgogICAgPHBhdGggZD0iTSA1Niw0NiBMIDU0LDE0MiBDIDU0LDE1MiA2NCwxNTggNzQsMTU0IEMgODAsMTUwIDkwLDE1MCA5NiwxNTQgQyAxMDYsMTU4IDExNiwxNTIgMTE2LDE0MiBMIDExNCw0NiBaIgogICAgICAgICAgZmlsbD0iIzJhMTcwZCIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjQuNSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz4KICAgIDxsaW5lIHgxPSI2MiIgeTE9IjY1IiB4Mj0iNjIiIHkyPSIxMzUiIHN0cm9rZT0iIzFjMGYwOCIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KICAgIDxsaW5lIHgxPSIxMDgiIHkxPSI2NSIgeDI9IjEwOCIgeTI9IjEzNSIgc3Ryb2tlPSIjMWMwZjA4IiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgoKICAgIDwhLS0gTGVncyBpbiBCbHVlIERlbmltIEplYW5zICYgU25lYWtlcnMgLS0+CiAgICA8Zz4KICAgICAgPCEtLSBMZWZ0IExlZyAtLT4KICAgICAgPHBhdGggZD0iTSA3MCwxNDUgUSA2MCwxNjUgNTYsMTk4IiBmaWxsPSJub25lIiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iMTYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KICAgICAgPHBhdGggZD0iTSA3MCwxNDUgUSA2MCwxNjUgNTYsMTk4IiBmaWxsPSJub25lIiBzdHJva2U9IiMyYjZjYjAiIHN0cm9rZS13aWR0aD0iMTEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KICAgICAgPCEtLSBMZWZ0IEJsdWUgU25lYWtlciB3aXRoIHdoaXRlIHRvZSAmIHNvbGUgLS0+CiAgICAgIDxlbGxpcHNlIGN4PSI1MCIgY3k9IjIwNCIgcng9IjEzIiByeT0iNyIgZmlsbD0iIzFlNDBhZiIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjMuNSIgLz4KICAgICAgPGVsbGlwc2UgY3g9IjQ0IiBjeT0iMjA0IiByeD0iNCIgcnk9IjUiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIyIiAvPgogICAgICA8bGluZSB4MT0iNDIiIHkxPSIyMDgiIHgyPSI2MiIgeTI9IjIwOCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgoKICAgICAgPCEtLSBSaWdodCBMZWcgLS0+CiAgICAgIDxwYXRoIGQ9Ik0gMTAwLDE0NSBRIDExMCwxNjUgMTE0LDE5OCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjE2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICAgIDxwYXRoIGQ9Ik0gMTAwLDE0NSBRIDExMCwxNjUgMTE0LDE5OCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMmI2Y2IwIiBzdHJva2Utd2lkdGg9IjExIiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICAgIDwhLS0gUmlnaHQgQmx1ZSBTbmVha2VyIC0tPgogICAgICA8ZWxsaXBzZSBjeD0iMTIwIiBjeT0iMjA0IiByeD0iMTMiIHJ5PSI3IiBmaWxsPSIjMWU0MGFmIiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iMy41IiAvPgogICAgICA8ZWxsaXBzZSBjeD0iMTI2IiBjeT0iMjA0IiByeD0iNCIgcnk9IjUiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIyIiAvPgogICAgICA8bGluZSB4MT0iMTA4IiB5MT0iMjA4IiB4Mj0iMTI4IiB5Mj0iMjA4IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICA8L2c+CgogICAgPCEtLSBVcHJpZ2h0IFRvcnNvIGluIFNsYXRlIEJsdWUvR3JleSBTd2VhdGVyIC0tPgogICAgPGc+CiAgICAgIDxlbGxpcHNlIGN4PSI4NSIgY3k9IjExNSIgcng9IjM0IiByeT0iMzQiIGZpbGw9IiMzZDVhODAiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSI0LjUiIC8+CiAgICAgIDwhLS0gUmliYmVkIGNvbGxhciAtLT4KICAgICAgPGVsbGlwc2UgY3g9Ijg1IiBjeT0iODQiIHJ4PSIxNiIgcnk9IjciIGZpbGw9IiMzMjQ5NjciIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIzLjUiIC8+CiAgICA8L2c+CgogICAgPCEtLSBMZWZ0IEFybSAmIEhhbmQgaG9sZGluZyBvcGVuIGZhbnRhc3kgYm9vayAtLT4KICAgIDxnPgogICAgICA8cGF0aCBkPSJNIDYwLDEwNSBRIDQ2LDEyOCA2NiwxNDIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIxNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgICA8cGF0aCBkPSJNIDYwLDEwNSBRIDQ2LDEyOCA2NiwxNDIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNkNWE4MCIgc3Ryb2tlLXdpZHRoPSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgICA8Y2lyY2xlIGN4PSI2OCIgY3k9IjE0MiIgcj0iNS41IiBmaWxsPSIjZmVkZGM3IiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iMi41IiAvPgogICAgPC9nPgoKICAgIDwhLS0gUmlnaHQgQXJtICYgSGFuZCBob2xkaW5nIG9wZW4gYm9vayAtLT4KICAgIDxnPgogICAgICA8cGF0aCBkPSJNIDExMCwxMDUgUSAxMjQsMTI4IDEwNCwxNDIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIxNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgICA8cGF0aCBkPSJNIDExMCwxMDUgUSAxMjQsMTI4IDEwNCwxNDIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNkNWE4MCIgc3Ryb2tlLXdpZHRoPSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgICA8Y2lyY2xlIGN4PSIxMDIiIGN5PSIxNDIiIHI9IjUuNSIgZmlsbD0iI2ZlZGRjNyIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjIuNSIgLz4KICAgIDwvZz4KCiAgICA8IS0tIE9wZW4gRmFudGFzeSBCb29rIHdpdGggVGVycmFjb3R0YSBDcmltc29uIENvdmVyIC0tPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjIsIDEyMikiPgogICAgICA8cG9seWdvbiBwb2ludHM9IjAsMjIgMjMsMTUgNDYsMjIgMjMsMjkiIGZpbGw9IiNmZmZkZmEiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIzIiAvPgogICAgICA8cG9seWdvbiBwb2ludHM9IjAsMjIgMCwyNyAyMywzNCA0NiwyNyA0NiwyMiIgZmlsbD0iI2E0NGEyYSIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjMiIC8+CiAgICAgIDxsaW5lIHgxPSIyMyIgeTE9IjE2IiB4Mj0iMjMiIHkyPSIzMyIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgICA8Y2lyY2xlIGN4PSIyMyIgY3k9IjI0IiByPSIzIiBmaWxsPSIjZTljNDZhIiAvPgogICAgPC9nPgoKICAgIDwhLS0gVGFsbCBJY2VkIFZhbmlsbGEgTGF0dGUgZ2xhc3Mgd2l0aCBzdHJhdyBvbiBzaWRlIC0tPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIyLCAxMjYpIj4KICAgICAgPHBvbHlnb24gcG9pbnRzPSIyLDQgMTYsNCAxNCwyOCA0LDI4IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNykiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIyIiAvPgogICAgICA8IS0tIExhdHRlIGxheWVycyAtLT4KICAgICAgPHBvbHlnb24gcG9pbnRzPSI0LDEyIDE0LDEyIDEzLDI2IDUsMjYiIGZpbGw9IiNkNGEzNzMiIC8+CiAgICAgIDxwb2x5Z29uIHBvaW50cz0iMyw2IDE1LDYgMTQsMTIgNCwxMiIgZmlsbD0iI2ZmZmRmYSIgLz4KICAgICAgPCEtLSBTdHJpcGVkIHN0cmF3IC0tPgogICAgICA8bGluZSB4MT0iOSIgeTE9Ii0yIiB4Mj0iMTEiIHkyPSIyMCIgc3Ryb2tlPSIjZTc2ZjUxIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgPC9nPgoKICAgIDwhLS0gQ2xlYW4gQ2h1YmJ5IFRlZW4gRmFjZTogdXByaWdodCBwb3N0dXJlLCBjbGVhbiBqYXcgJiBjaGVla3MgKE5PIGJlYXJkISkgLS0+CiAgICA8ZWxsaXBzZSBjeD0iODUiIGN5PSI1MCIgcng9IjI2IiByeT0iMjUiIGZpbGw9IiNmZWRkYzciIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSI0IiAvPgoKICAgIDwhLS0gQ3V0ZSBlYXJzIC0tPgogICAgPGNpcmNsZSBjeD0iNTkiIGN5PSI1MCIgcj0iNCIgZmlsbD0iI2ZlZGRjNyIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjIiIC8+CiAgICA8Y2lyY2xlIGN4PSIxMTEiIGN5PSI1MCIgcj0iNCIgZmlsbD0iI2ZlZGRjNyIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjIiIC8+CgogICAgPCEtLSBGcm9udCBoYWlybGluZSAmIGJhbmdzIC0gc2xlZWsgYWNyb3NzIGZvcmVoZWFkIG9ubHkgLS0+CiAgICA8cGF0aCBkPSJNIDYwLDQ2IEMgNTgsMjYgNzEsMjAgODUsMjAgQyA5OSwyMCAxMTIsMjYgMTEwLDQ2IEMgMTA0LDM2IDk0LDMyIDg1LDM0IEMgNzYsMzIgNjYsMzYgNjAsNDYgWiIKICAgICAgICAgIGZpbGw9IiMyYTE3MGQiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWpvaW49InJvdW5kIiAvPgogICAgPHBhdGggZD0iTSA2NiwzOCBRIDc0LDMyIDgyLDM3IiBzdHJva2U9IiMxYzBmMDgiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIgLz4KICAgIDxwYXRoIGQ9Ik0gODgsMzcgUSA5NiwzMiAxMDQsMzgiIHN0cm9rZT0iIzFjMGYwOCIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIiAvPgoKICAgIDwhLS0gQ3V0ZSB0ZWVuIGV5ZXMgd2l0aCBzdWJ0bGUgc3BhcmtsZSAtLT4KICAgIDxlbGxpcHNlIGN4PSI3NiIgY3k9IjQ4IiByeD0iMy4yIiByeT0iNC4yIiBmaWxsPSIjM2MyYTFhIiAvPgogICAgPGNpcmNsZSBjeD0iNzcuNSIgY3k9IjQ2LjUiIHI9IjEuMyIgZmlsbD0iI2ZmZmZmZiIgLz4KICAgIDxlbGxpcHNlIGN4PSI5NCIgY3k9IjQ4IiByeD0iMy4yIiByeT0iNC4yIiBmaWxsPSIjM2MyYTFhIiAvPgogICAgPGNpcmNsZSBjeD0iOTUuNSIgY3k9IjQ2LjUiIHI9IjEuMyIgZmlsbD0iI2ZmZmZmZiIgLz4KCiAgICA8IS0tIEdlbnRsZSB0ZWVuIHNtaWxlICYgc29mdCByb3N5IGNoZWVrcyAtLT4KICAgIDxwYXRoIGQ9Ik0gODAsNTkgUSA4NSw2NCA5MCw1OSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgPGVsbGlwc2UgY3g9IjY3IiBjeT0iNTUiIHJ4PSI1LjUiIHJ5PSIzLjUiIGZpbGw9IiNmY2E1YTUiIG9wYWNpdHk9IjAuOCIgLz4KICAgIDxlbGxpcHNlIGN4PSIxMDMiIGN5PSI1NSIgcng9IjUuNSIgcnk9IjMuNSIgZmlsbD0iI2ZjYTVhNSIgb3BhY2l0eT0iMC44IiAvPgogIDwvc3ZnPg==",
  char_mange_bar: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxODAgMjgwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj4KICAgIDwhLS0gU2hhZG93IC0tPgogICAgPGVsbGlwc2UgY3g9IjkwIiBjeT0iMjY4IiByeD0iNjAiIHJ5PSI5IiBmaWxsPSJyZ2JhKDYwLDQyLDI2LDAuMTIpIiAvPgoKICAgIDwhLS0gU3R1cmR5IExlZ3MgaW4gRm9yZXN0IEdyZWVuIENoaW5vcyAmIERhcmsgTGVhdGhlciBTaG9lcyAtLT4KICAgIDxnPgogICAgICA8IS0tIExlZnQgTGVnIC0tPgogICAgICA8cGF0aCBkPSJNIDcyLDE2NSBMIDY4LDI0NSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjE4IiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICAgIDxwYXRoIGQ9Ik0gNzIsMTY1IEwgNjgsMjQ1IiBmaWxsPSJub25lIiBzdHJva2U9IiMzNDRlNDEiIHN0cm9rZS13aWR0aD0iMTMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KICAgICAgPCEtLSBMZWZ0IHN0dXJkeSBsZWF0aGVyIHNob2UgLS0+CiAgICAgIDxlbGxpcHNlIGN4PSI2NCIgY3k9IjI1MiIgcng9IjE0IiByeT0iOCIgZmlsbD0iIzRhMmUxYiIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjMuNSIgLz4KICAgICAgPHJlY3QgeD0iNjgiIHk9IjI0NiIgd2lkdGg9IjkiIGhlaWdodD0iNyIgcng9IjIiIGZpbGw9IiMzYzJhMWEiIC8+CgogICAgICA8IS0tIFJpZ2h0IExlZyAtLT4KICAgICAgPHBhdGggZD0iTSAxMDgsMTY1IEwgMTEyLDI0NSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjE4IiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICAgIDxwYXRoIGQ9Ik0gMTA4LDE2NSBMIDExMiwyNDUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzM0NGU0MSIgc3Ryb2tlLXdpZHRoPSIxMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgICA8IS0tIFJpZ2h0IHNob2UgLS0+CiAgICAgIDxlbGxpcHNlIGN4PSIxMTYiIGN5PSIyNTIiIHJ4PSIxNCIgcnk9IjgiIGZpbGw9IiM0YTJlMWIiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIzLjUiIC8+CiAgICAgIDxyZWN0IHg9IjEwMyIgeT0iMjQ2IiB3aWR0aD0iOSIgaGVpZ2h0PSI3IiByeD0iMiIgZmlsbD0iIzNjMmExYSIgLz4KICAgIDwvZz4KCiAgICA8IS0tIFRvcnNvOiBXYXJtIE1vY2hhIEJyb3duIEtuaXQgU3dlYXRlciAtLT4KICAgIDxnPgogICAgICA8ZWxsaXBzZSBjeD0iOTAiIGN5PSIxMjUiIHJ4PSI0MiIgcnk9IjQ2IiBmaWxsPSIjNmY0ZTM3IiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iNSIgLz4KICAgICAgPCEtLSBSaWJiZWQgY29sbGFyIC0tPgogICAgICA8ZWxsaXBzZSBjeD0iOTAiIGN5PSI4MiIgcng9IjE4IiByeT0iOCIgZmlsbD0iIzU4M2MyYSIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjMuOCIgLz4KICAgICAgPCEtLSBLbml0IHRleHR1cmUgbGluZXMgLS0+CiAgICAgIDxwYXRoIGQ9Ik0gODIsOTUgTCA4MiwxNTgiIHN0cm9rZT0iIzU4M2MyYSIgc3Ryb2tlLXdpZHRoPSIyLjUiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KICAgICAgPHBhdGggZD0iTSA5OCw5NSBMIDk4LDE1OCIgc3Ryb2tlPSIjNTgzYzJhIiBzdHJva2Utd2lkdGg9IjIuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgPC9nPgoKICAgIDwhLS0gTGVmdCBBcm06IHJlc3RpbmcgY29tZm9ydGFibHkgb24gZXNwcmVzc28gY291bnRlciAtLT4KICAgIDxnPgogICAgICA8cGF0aCBkPSJNIDU4LDEwNSBRIDQwLDEzNSA2MiwxNTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIxNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgICA8cGF0aCBkPSJNIDU4LDEwNSBRIDQwLDEzNSA2MiwxNTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZmNGUzNyIgc3Ryb2tlLXdpZHRoPSIxMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgICA8Y2lyY2xlIGN4PSI2NiIgY3k9IjE1NCIgcj0iNi41IiBmaWxsPSIjZmVkY2M1IiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iMi44IiAvPgogICAgPC9nPgoKICAgIDwhLS0gUmlnaHQgQXJtOiBob2xkaW5nIGZyZXNobHkgYnJld2VkIGVzcHJlc3NvIGN1cCAtLT4KICAgIDxnPgogICAgICA8cGF0aCBkPSJNIDEyMiwxMDUgUSAxNDAsMTM1IDExNiwxNTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIxNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgICA8cGF0aCBkPSJNIDEyMiwxMDUgUSAxNDAsMTM1IDExNiwxNTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZmNGUzNyIgc3Ryb2tlLXdpZHRoPSIxMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgICA8Y2lyY2xlIGN4PSIxMTIiIGN5PSIxNTAiIHI9IjYuNSIgZmlsbD0iI2ZlZGNjNSIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjIuOCIgLz4KCiAgICAgIDwhLS0gV2hpdGUgY2VyYW1pYyBlc3ByZXNzbyBjdXAgd2l0aCBzYXVjZXIgJiBzdGVhbSAtLT4KICAgICAgPGVsbGlwc2UgY3g9IjExOCIgY3k9IjE0OCIgcng9IjExIiByeT0iMy41IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiMzYzJhMWEiIHN0cm9rZS13aWR0aD0iMi41IiAvPgogICAgICA8cmVjdCB4PSIxMTAiIHk9IjEzOCIgd2lkdGg9IjE0IiBoZWlnaHQ9IjEwIiByeD0iMyIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjIuNSIgLz4KICAgICAgPGVsbGlwc2UgY3g9IjExNyIgY3k9IjEzOCIgcng9IjciIHJ5PSIyIiBmaWxsPSIjNGEyZTFiIiAvPgogICAgICA8cGF0aCBkPSJNIDEyNCwxNDAgUSAxMjgsMTQwIDEyOCwxNDMgUSAxMjgsMTQ2IDEyNCwxNDYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIyIiAvPgogICAgICA8IS0tIFJpc2luZyBzdGVhbSAtLT4KICAgICAgPHBhdGggZD0iTSAxMTUsMTMzIFEgMTE4LDEyNyAxMTUsMTIyIiBzdHJva2U9IiNkNWM0YjEiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgICA8cGF0aCBkPSJNIDExOSwxMzEgUSAxMjIsMTI1IDExOSwxMjAiIHN0cm9rZT0iI2Q1YzRiMSIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICA8L2c+CgogICAgPCEtLSBTSE9SVCBORUFUIERBUksgQlJPV04gSEFJUiAtLT4KICAgIDxwYXRoIGQ9Ik0gNjAsNDIgQyA1OCwxNiA3MiwxMCA5MCwxMCBDIDEwOCwxMCAxMjIsMTYgMTIwLDQyIEMgMTIyLDUwIDEyMCw2MCAxMTYsNjIgQyAxMTIsNjIgMTEwLDU2IDEwOCw1MiBDIDEwMiw1NiA3OCw1NiA3Miw1MiBDIDcwLDU2IDY4LDYyIDY0LDYyIEMgNjAsNjAgNTgsNTAgNjAsNDIgWiIKICAgICAgICAgIGZpbGw9IiMyYzFiMTIiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSI0LjUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIC8+CiAgICA8cGF0aCBkPSJNIDYyLDM4IFEgNzQsMzAgOTAsMzIgUSAxMDYsMzAgMTE4LDM4IiBzdHJva2U9IiMxZDExMGEiIHN0cm9rZS13aWR0aD0iMi41IiBmaWxsPSJub25lIiAvPgoKICAgIDwhLS0gRnJpZW5kbHkgRGFkIEZhY2UgLS0+CiAgICA8ZWxsaXBzZSBjeD0iOTAiIGN5PSI1MCIgcng9IjI4IiByeT0iMjciIGZpbGw9IiNmZWRjYzUiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSI0IiAvPgoKICAgIDwhLS0gRWFycyAtLT4KICAgIDxjaXJjbGUgY3g9IjYyIiBjeT0iNTAiIHI9IjQuNSIgZmlsbD0iI2ZlZGNjNSIgc3Ryb2tlPSIjM2MyYTFhIiBzdHJva2Utd2lkdGg9IjIuNSIgLz4KICAgIDxjaXJjbGUgY3g9IjExOCIgY3k9IjUwIiByPSI0LjUiIGZpbGw9IiNmZWRjYzUiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIyLjUiIC8+CgogICAgPCEtLSBNT0RFUk4gU1FVQVJFIERBUkstUklNTUVEIEdMQVNTRVMgLS0+CiAgICA8Zz4KICAgICAgPCEtLSBMZWZ0IHJlY3Rhbmd1bGFyIGZyYW1lIC0tPgogICAgICA8cmVjdCB4PSI2NyIgeT0iNDAiIHdpZHRoPSIxOSIgaGVpZ2h0PSIxNyIgcng9IjQiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC40KSIgc3Ryb2tlPSIjMmExYTEwIiBzdHJva2Utd2lkdGg9IjMuNSIgLz4KICAgICAgPCEtLSBSaWdodCByZWN0YW5ndWxhciBmcmFtZSAtLT4KICAgICAgPHJlY3QgeD0iOTQiIHk9IjQwIiB3aWR0aD0iMTkiIGhlaWdodD0iMTciIHJ4PSI0IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNCkiIHN0cm9rZT0iIzJhMWExMCIgc3Ryb2tlLXdpZHRoPSIzLjUiIC8+CiAgICAgIDwhLS0gQnJpZGdlICYgdGVtcGxlIGFybXMgLS0+CiAgICAgIDxsaW5lIHgxPSI4NiIgeTE9IjQ4IiB4Mj0iOTQiIHkyPSI0OCIgc3Ryb2tlPSIjMmExYTEwIiBzdHJva2Utd2lkdGg9IjMuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgICA8bGluZSB4MT0iNjciIHkxPSI0NiIgeDI9IjYyIiB5Mj0iNDciIHN0cm9rZT0iIzJhMWExMCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICAgIDxsaW5lIHgxPSIxMTMiIHkxPSI0NiIgeDI9IjExOCIgeTI9IjQ3IiBzdHJva2U9IiMyYTFhMTAiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgoKICAgICAgPCEtLSBGcmllbmRseSBleWVzIGJlaGluZCBnbGFzc2VzIC0tPgogICAgICA8Y2lyY2xlIGN4PSI3Ni41IiBjeT0iNDguNSIgcj0iMi44IiBmaWxsPSIjM2MyYTFhIiAvPgogICAgICA8Y2lyY2xlIGN4PSI3OCIgY3k9IjQ3IiByPSIxIiBmaWxsPSIjZmZmZmZmIiAvPgogICAgICA8Y2lyY2xlIGN4PSIxMDMuNSIgY3k9IjQ4LjUiIHI9IjIuOCIgZmlsbD0iIzNjMmExYSIgLz4KICAgICAgPGNpcmNsZSBjeD0iMTA1IiBjeT0iNDciIHI9IjEiIGZpbGw9IiNmZmZmZmYiIC8+CiAgICA8L2c+CgogICAgPCEtLSBXYXJtIGZyaWVuZGx5IHNtaWxlLCBzbGlnaHQgbmVhdCBzdHViYmxlICYgYmx1c2ggLS0+CiAgICA8cGF0aCBkPSJNIDgzLDYyIFEgOTAsNjggOTcsNjIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNjMmExYSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICA8ZWxsaXBzZSBjeD0iNjgiIGN5PSI1OCIgcng9IjUiIHJ5PSIzIiBmaWxsPSIjZmNhNWE1IiBvcGFjaXR5PSIwLjciIC8+CiAgICA8ZWxsaXBzZSBjeD0iMTEyIiBjeT0iNTgiIHJ4PSI1IiByeT0iMyIgZmlsbD0iI2ZjYTVhNSIgb3BhY2l0eT0iMC43IiAvPgogIDwvc3ZnPg==",
};

/**
 * Hämtar en tillgång om den är definierad och inte är tom
 */
export function getCafeAsset(id: string): string | null {
  if (typeof window !== 'undefined') {
    try {
      const custom = localStorage.getItem('cafe_custom_asset_' + id);
      if (custom && custom.trim().length > 0) {
        return custom.trim();
      }
    } catch {
      // ignore localStorage errors
    }
  }
  const asset = CAFE_ASSETS[id];
  if (asset && asset.trim().length > 0) {
    return asset.trim();
  }
  return null;
}

export function setCustomCafeAsset(id: string, dataUrl: string): void {
  if (typeof window !== 'undefined') {
    try {
      if (dataUrl && dataUrl.trim().length > 0) {
        localStorage.setItem('cafe_custom_asset_' + id, dataUrl.trim());
      } else {
        localStorage.removeItem('cafe_custom_asset_' + id);
      }
      window.dispatchEvent(new CustomEvent('cafe-assets-updated', { detail: { id, dataUrl } }));
    } catch (e) {
      console.warn('Could not save custom cafe asset', e);
    }
  }
}

export function clearCustomCafeAsset(id: string): void {
  setCustomCafeAsset(id, '');
}

export function clearAllCustomCafeAssets(): void {
  if (typeof window !== 'undefined') {
    try {
      Object.keys(CAFE_ASSETS).forEach((k) => {
        localStorage.removeItem('cafe_custom_asset_' + k);
      });
      window.dispatchEvent(new CustomEvent('cafe-assets-updated'));
    } catch (e) {
      console.warn('Could not clear custom assets', e);
    }
  }
}

export function hasCustomCafeAsset(id: string): boolean {
  if (typeof window !== 'undefined') {
    try {
      const v = localStorage.getItem('cafe_custom_asset_' + id);
      return Boolean(v && v.trim().length > 0);
    } catch {
      return false;
    }
  }
  return false;
}
