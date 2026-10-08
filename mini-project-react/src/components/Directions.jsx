import {
  Navigation,
  MapPin,
  ArrowDown,
  Clock3,
} from "lucide-react";

export default function Directions({
  city,
  country,
  userLocationName,
  onDirections,
}) {
  return (
    <div className="h-full rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl sm:p-6">

      {/* HEADER */}
      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-cyan-400/10 p-3">
          <Navigation
            size={20}
            className="text-cyan-400"
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Navigation
          </p>

          <h2 className="mt-1 text-xl font-bold">
            Directions
          </h2>
        </div>

      </div>

      {/* START */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4">

        <div className="flex items-center gap-3">

          <MapPin
            size={18}
            className="shrink-0 text-emerald-400"
          />

          <div className="min-w-0">

            <p className="text-xs text-slate-500">
              START
            </p>

            <p className="truncate font-medium">
              {userLocationName ||
                "Your Current Location"}
            </p>

          </div>

        </div>
      </div>

      {/* ARROW */}
      <div className="flex justify-center py-2">
        <ArrowDown
          size={18}
          className="text-slate-600"
        />
      </div>

      {/* DESTINATION */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">

        <div className="flex items-center gap-3">

          <MapPin
            size={18}
            className="shrink-0 text-cyan-400"
          />

          <div className="min-w-0">

            <p className="text-xs text-slate-500">
              DESTINATION
            </p>

            <p className="truncate font-medium">
              {city}
              {country
                ? `, ${country}`
                : ""}
            </p>

          </div>

        </div>
      </div>

      {/* NAVIGATION INFO */}
      <div className="mt-5 grid grid-cols-2 gap-3">

        <div className="rounded-2xl bg-white/5 p-4">

          <p className="text-xs text-slate-500">
            Route
          </p>

          <p className="mt-1 text-sm font-semibold text-cyan-400">
            Driving
          </p>

        </div>

        <div className="rounded-2xl bg-white/5 p-4">

          <p className="flex items-center gap-1 text-xs text-slate-500">
            <Clock3 size={13} />
            Maps
          </p>

          <p className="mt-1 text-sm font-semibold">
            Google Maps
          </p>

        </div>

      </div>

      {/* START NAVIGATION */}
      <button
        type="button"
        onClick={onDirections}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300 active:scale-[0.98]"
      >
        <Navigation size={18} />

        Navigate to {city}
      </button>

    </div>
  );
}