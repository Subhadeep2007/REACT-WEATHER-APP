import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";

import {
  MapPin,
  Navigation,
  LocateFixed,
} from "lucide-react";

import { useEffect } from "react";

// ==========================================
// MAP CONTROLLER
// ==========================================
function MapController({
  lat,
  lon,
  userLocation,
}) {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      const bounds = [
        [lat, lon],
        [
          userLocation.lat,
          userLocation.lon,
        ],
      ];

      map.fitBounds(bounds, {
        padding: [40, 40],
      });
    } else {
      map.flyTo(
        [lat, lon],
        11,
        {
          duration: 1.2,
        }
      );
    }
  }, [
    lat,
    lon,
    userLocation,
    map,
  ]);

  return null;
}

// ==========================================
// WEATHER MAP
// ==========================================
export default function WeatherMap({
  lat,
  lon,
  city,
  userLocation,
  userLocationName,
  onDirections,
}) {
  return (
    <div className="h-full min-h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] shadow-2xl backdrop-blur-2xl">

      {/* HEADER */}
      <div className="border-b border-white/10 bg-slate-900/90 p-5">

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
            <MapPin
              size={20}
              className="text-cyan-400"
            />
          </div>

        </div>
      </div>

      {/* MAP */}
      <div className="relative h-[350px] sm:h-[380px]">

        <MapContainer
          center={[lat, lon]}
          zoom={11}
          scrollWheelZoom={true}
          className="h-full w-full"
        >

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapController
            lat={lat}
            lon={lon}
            userLocation={
              userLocation
            }
          />

          {/* DESTINATION */}
          <CircleMarker
            center={[lat, lon]}
            radius={12}
            pathOptions={{
              color: "#22d3ee",
              fillColor: "#22d3ee",
              fillOpacity: 0.85,
            }}
          >
            <Popup>
              <strong>
                {city}
              </strong>

              <br />

              Destination
            </Popup>
          </CircleMarker>

          {/* CURRENT USER LOCATION */}
          {userLocation && (
            <CircleMarker
              center={[
                userLocation.lat,
                userLocation.lon,
              ]}
              radius={10}
              pathOptions={{
                color: "#22c55e",
                fillColor: "#22c55e",
                fillOpacity: 0.9,
              }}
            >
              <Popup>
                <strong>
                  {userLocationName}
                </strong>

                <br />

                Your current location
              </Popup>
            </CircleMarker>
          )}

        </MapContainer>

        {/* MAP BUTTON */}
        <button
          type="button"
          onClick={onDirections}
          className="absolute bottom-4 right-4 z-[1000] flex items-center gap-2 rounded-xl bg-slate-950/95 px-4 py-3 text-sm font-semibold text-white shadow-xl backdrop-blur-xl transition hover:bg-cyan-400 hover:text-slate-950 active:scale-[0.98]"
        >
          <Navigation size={16} />

          Directions
        </button>

        {/* CURRENT LOCATION BADGE */}
        {userLocation && (
          <div className="absolute left-4 top-4 z-[1000] flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/90 px-3 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-xl">

            <LocateFixed
              size={15}
              className="text-emerald-400"
            />

            Current location detected

          </div>
        )}

      </div>
    </div>
  );
}