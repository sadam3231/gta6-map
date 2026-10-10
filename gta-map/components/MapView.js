"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MAP_SIZE, categories, markers } from "../data/markers";

const colorOf = (catId) =>
  categories.find((c) => c.id === catId)?.color || "#ffffff";

function makeIcon(color, found) {
  return L.divIcon({
    className: "",
    html: `<div class="marker-dot ${found ? "found" : ""}" style="background:${color}"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -10],
  });
}

export default function MapView({ visibleCategories, found, onToggleFound }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const toggleRef = useRef(onToggleFound);
  toggleRef.current = onToggleFound;

  // Map sirf ek dafa banta hai
  useEffect(() => {
    if (mapRef.current) return;

    const bounds = [
      [0, 0],
      [MAP_SIZE, MAP_SIZE],
    ];

    const map = L.map(containerRef.current, {
      crs: L.CRS.Simple,
      minZoom: -2,
      maxZoom: 2,
      zoomSnap: 0.25,
      maxBounds: [
        [-200, -200],
        [MAP_SIZE + 200, MAP_SIZE + 200],
      ],
      attributionControl: false,
    });

    L.imageOverlay("/placeholder-map.svg", bounds).addTo(map);
    map.fitBounds(bounds);

    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Jab filter ya "found" badle, markers dobara draw hote hain
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    layer.clearLayers();

    markers
      .filter((m) => visibleCategories.includes(m.category))
      .forEach((m) => {
        const isFound = !!found[m.id];
        const marker = L.marker([m.y, m.x], {
          icon: makeIcon(colorOf(m.category), isFound),
        });

        const box = document.createElement("div");
        box.innerHTML = `
          <div class="popup-title"></div>
          <p class="popup-desc"></p>
          <label class="popup-check">
            <input type="checkbox" /> Mil gaya (found)
          </label>`;
        box.querySelector(".popup-title").textContent = m.title;
        box.querySelector(".popup-desc").textContent = m.description;
        const checkbox = box.querySelector("input");
        checkbox.checked = isFound;
        checkbox.addEventListener("change", () => toggleRef.current(m.id));

        marker.bindPopup(box);
        marker.addTo(layer);
      });
  }, [visibleCategories, found]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
