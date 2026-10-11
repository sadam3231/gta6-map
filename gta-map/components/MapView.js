'use client';

import { useEffect, useState } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markersData from '../data/markers';

// Leaflet default icon setup
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Map bounds match for new HD map ratio
const bounds = [[0, 0], [1000, 750]];

export default function MapView({ selectedCategory, foundMarkers, toggleFound }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="h-full w-full bg-slate-900 flex items-center justify-center text-white">Map loading...</div>;

  const filteredMarkers = selectedCategory === 'all' 
    ? markersData 
    : markersData.filter(m => m.category === selectedCategory);

  return (
    <MapContainer
      center={[500, 375]}
      zoom={0}
      minZoom={-1}
      maxZoom={3}
      crs={L.CRS.Simple}
      style={{ height: '100%', width: '100%', background: '#080d1a' }}
      maxBounds={bounds}
    >
      <ImageOverlay
        url="/map-bg.jpg"
        bounds={bounds}
      />
      {filteredMarkers.map((marker) => (
        <Marker 
          key={marker.id} 
          position={marker.coords}
          opacity={foundMarkers.includes(marker.id) ? 0.4 : 1}
        >
          <Popup>
            <div className="p-2 text-slate-900">
              <h3 className="font-bold text-lg">{marker.title}</h3>
              <p className="text-sm">{marker.description}</p>
              <button
                onClick={() => toggleFound(marker.id)}
                className={`mt-2 px-3 py-1 rounded text-xs font-bold text-white ${
                  foundMarkers.includes(marker.id) ? 'bg-green-600' : 'bg-blue-600'
                }`}
              >
                {foundMarkers.includes(marker.id) ? 'Found ✓' : 'Mark as Found'}
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
