// ============================================================
// YEH FILE DATA HAI. Sirf yahan marker add/change karne hain.
// Abhi sab kuch SAMPLE (jhoota) data hai, asli GTA data nahi.
//
// Map ka size 1000 x 1000 hai.
//   x = left se right (0 se 1000)
//   y = neeche se upar (0 = sab se neeche, 1000 = sab se upar)
// ============================================================

export const MAP_SIZE = 1000;

export const categories = [
  { id: "collectible", label: "Collectibles", color: "#f5c542" },
  { id: "mission", label: "Missions", color: "#4f8cff" },
  { id: "shop", label: "Shops", color: "#3ecf8e" },
  { id: "secret", label: "Secrets", color: "#c77dff" },
];

export const markers = [
  { id: "c1", category: "collectible", x: 200, y: 750, title: "Sample Collectible 1", description: "Yeh sirf example hai." },
  { id: "c2", category: "collectible", x: 420, y: 620, title: "Sample Collectible 2", description: "Yeh sirf example hai." },
  { id: "c3", category: "collectible", x: 780, y: 300, title: "Sample Collectible 3", description: "Yeh sirf example hai." },
  { id: "m1", category: "mission", x: 500, y: 850, title: "Sample Mission 1", description: "Pehla placeholder mission." },
  { id: "m2", category: "mission", x: 650, y: 520, title: "Sample Mission 2", description: "Doosra placeholder mission." },
  { id: "s1", category: "shop", x: 300, y: 400, title: "Sample Shop 1", description: "Placeholder dukaan." },
  { id: "s2", category: "shop", x: 880, y: 700, title: "Sample Shop 2", description: "Placeholder dukaan." },
  { id: "x1", category: "secret", x: 120, y: 180, title: "Sample Secret 1", description: "Placeholder secret jagah." },
  { id: "x2", category: "secret", x: 700, y: 120, title: "Sample Secret 2", description: "Placeholder secret jagah." },
];
