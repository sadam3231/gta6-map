"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { categories, markers } from "../data/markers";

// Leaflet browser mein hi chalta hai, is liye server par load nahi karte
const MapView = dynamic(() => import("../components/MapView"), {
  ssr: false,
  loading: () => <p style={{ padding: 16 }}>Map load ho raha hai...</p>,
});

const STORAGE_KEY = "gta-map-found-v1";

export default function Home() {
  const [visible, setVisible] = useState(categories.map((c) => c.id));
  const [found, setFound] = useState({});
  const [loaded, setLoaded] = useState(false);

  // Browser mein saved progress wapas lao
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setFound(JSON.parse(saved));
    } catch (e) {}
    setLoaded(true);
  }, []);

  // Progress badle to save karo
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    } catch (e) {}
  }, [found, loaded]);

  const toggleCategory = (id) =>
    setVisible((v) => (v.includes(id) ? v.filter((x) => x !== id) : [...v, id]));

  const toggleFound = (id) =>
    setFound((f) => {
      const next = { ...f };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });

  const resetProgress = () => {
    if (window.confirm("Saara progress delete kar dein?")) setFound({});
  };

  const total = markers.length;
  const done = markers.filter((m) => found[m.id]).length;

  return (
    <div className="app">
      <header className="header">
        <h1>GTA Interactive Map (Starter)</h1>
        <span className="progress-text">
          Progress: {done} / {total}
        </span>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <h2>Categories</h2>
          {categories.map((c) => {
            const count = markers.filter((m) => m.category === c.id).length;
            const foundCount = markers.filter(
              (m) => m.category === c.id && found[m.id]
            ).length;
            return (
              <label key={c.id} className="cat">
                <input
                  type="checkbox"
                  checked={visible.includes(c.id)}
                  onChange={() => toggleCategory(c.id)}
                />
                <span className="dot" style={{ background: c.color }} />
                {c.label}
                <span className="count">
                  {foundCount}/{count}
                </span>
              </label>
            );
          })}

          <button className="reset-btn" onClick={resetProgress}>
            Progress reset karein
          </button>

          <p className="note">
            Yeh sirf placeholder map aur sample markers hain. Asli GTA data
            game release ke baad data/markers.js mein daalna hai.
          </p>
        </aside>

        <main className="map-wrap">
          <MapView
            visibleCategories={visible}
            found={found}
            onToggleFound={toggleFound}
          />
        </main>
      </div>
    </div>
  );
}
