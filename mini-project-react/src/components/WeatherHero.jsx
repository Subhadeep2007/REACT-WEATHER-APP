import {
  Sun,
  MapPin,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

export default function WeatherHero({ weather }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/15 via-blue-500/10 to-violet-500/10 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin size={17} className="text-cyan-400" />
              <span>{weather.city}, {weather.country}</span>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <CalendarDays size={17} className="text-slate-500" />
              <span className="text-sm text-slate-500">
                Today • Current Weather
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <Sun size={30} className="text-yellow-300" />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-3">
          <div className="text-7xl font-bold tracking-tight sm:text-8xl">
            {weather.temp}
            <span className="text-3xl text-slate-400 sm:text-4xl">°C</span>
          </div>

          <div className="pb-2">
            <p className="text-xl font-semibold">{weather.condition}</p>
            <p className="mt-1 text-sm text-slate-400">
              Feels like {weather.feelsLike}°C
            </p>
          </div>
        </div>

        <p className="mt-5 max-w-xl text-sm leading-6 text-slate-400">
          {weather.description}
        </p>

        <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Sunrise
            </p>
            <p className="mt-1 font-semibold">{weather.sunrise}</p>
          </div>

          <ArrowUpRight className="text-slate-600" />

          <div className="text-right">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Sunset
            </p>
            <p className="mt-1 font-semibold">{weather.sunset}</p>
          </div>
        </div>
      </div>
    </div>
  );
}