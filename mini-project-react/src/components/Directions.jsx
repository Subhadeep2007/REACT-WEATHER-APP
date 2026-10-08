import {
  Navigation,
  MapPin,
  ArrowRight,
  Clock3,
} from "lucide-react";

export default function Directions() {
  return (
    <div className="h-full rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl sm:p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-cyan-400/10 p-3">
          <Navigation size={20} className="text-cyan-400" />
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

      <div className="mt-6 space-y-3">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-emerald-400" />

            <div className="min-w-0">
              <p className="text-xs text-slate-500">
                START
              </p>

              <p className="truncate font-medium">
                Your Location
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowRight className="rotate-90 text-slate-600" size={18} />
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-cyan-400" />

            <div className="min-w-0">
              <p className="text-xs text-slate-500">
                DESTINATION
              </p>

              <p className="truncate font-medium">
                Kolkata
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-xs text-slate-500">
            Distance
          </p>

          <p className="mt-1 text-lg font-bold">
            8.4 km
          </p>
        </div>

        <div className="rounded-2xl bg-white/5 p-4">
          <p className="flex items-center gap-1 text-xs text-slate-500">
            <Clock3 size={13} />
            ETA
          </p>

          <p className="mt-1 text-lg font-bold">
            24 min
          </p>
        </div>
      </div>

      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300">
        <Navigation size={18} />
        Start Navigation
      </button>
    </div>
  );
}