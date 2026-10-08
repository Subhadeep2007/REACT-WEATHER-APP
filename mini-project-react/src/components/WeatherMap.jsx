import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import { MapPin, Navigation } from "lucide-react";
import { useEffect } from "react";

function MapCenter({ lat, lon }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lon], 11, {
      duration: 1.2,
    });
  }, [lat, lon, map]);

  return null;
}

export default function WeatherMap({ lat, lon, city }) {
  return (
    <div className="h-full min-h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] shadow-2xl backdrop-blur-2xl">
      <div className="border-b border-white/10 bg-slate-900/70 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Location
            </p>

            <h2 className="mt-1 text-xl font-bold">
              {city} Map
            </h2>
          </div>

          <div className="rounded-xl bg-cyan-400/10 p-2.5">
            <MapPin className="text-cyan-400" size={20} />
          </div>
        </div>
      </div>

      <div className="relative h-[350px] sm:h-[380px]">
        <MapContainer
          center={[lat, lon]}
          zoom={11}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapCenter lat={lat} lon={lon} />

          <CircleMarker
            center={[lat, lon]}
            radius={12}
            pathOptions={{
              color: "#22d3ee",
              fillColor: "#22d3ee",
              fillOpacity: 0.8,
            }}
          >
            <Popup>
              <strong>{city}</strong>
              <br />
              Current weather location
            </Popup>
          </CircleMarker>
        </MapContainer>

        <button className="absolute bottom-4 right-4 z-[1000] flex items-center gap-2 rounded-xl bg-slate-950/90 px-4 py-3 text-sm font-semibold text-white shadow-xl backdrop-blur-xl">
          <Navigation size={16} />
          Directions
        </button>
      </div>
    </div>
  );
}