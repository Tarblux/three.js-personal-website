export const sections = [
  { title: 'INTRODUCTION', range: [0, 0.75] },
  { title: 'CAREER', range: [0.75, 2.5] },
  { title: 'PROJECTS', range: [2.5, 5.0] },
  { title: 'EDUCATION', range: [5.01, 7.3] },
  { title: 'LANGUAGES', range: [7.31, 8.0] },
  { title: 'HOBBIES', range: [8.0, 12.4] },
  { title: 'CONTACT', range: [11.6, 13.2] },
  { title: 'THE END :)', range: [13.2, 13.2] }
];

// Freeze points

export const FREEZE_VH = [
  { id: 'INTRODUCTION', vh: 44 },
  { id: 'FLEXTRADE', vh: 113 },
  { id: 'EAGLE_MED', vh: 212 },
  { id: 'PROJECTS_OVERVIEW', vh: 291 },
  { id: 'PROJECTS_WAREHOUSE', vh: 367 },
  { id: 'PROJECTS_CONSTRUCTION', vh: 461 },
  { id: 'EDUCATION', vh: 573 },
  { id: 'COLLEGE_JOBS', vh: 616 },
  { id: 'COLLEGE_CLUBS', vh: 663 },
  { id: 'EDUCATION_YONSEI', vh: 724 },
  { id: 'LANGUAGES', vh: 785 },
  { id: 'FOOTBALL_WATCH', vh: 832 },
  { id: 'FOOTBALL_MEMORIES', vh: 888 },
  { id: 'FOOTBALL_PLAY', vh: 973 },
  { id: 'CHESS_PLAY', vh: 1053 },
  { id: 'CHESS_DASHBOARD', vh: 1104 },
  { id: 'KOMBUCHA', vh: 1151 },
  { id: 'KOMBUCHA_MENU', vh: 1208 },
  { id: 'CONTACT', vh: 1274 },
  { id: 'CREDITS', vh: 1305 },
  { id: 'THE_END', vh: 1350 },
]

export const FREEZE_POINTS = FREEZE_VH.map((p) => ({ id: p.id, offset: p.vh / 1500 }))