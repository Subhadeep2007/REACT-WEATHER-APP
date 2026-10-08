import {
  Search,
  MapPin,
  LocateFixed,
} from "lucide-react";

export default function SearchBar({ city, setCity, handleSearch }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-3 shadow-2xl shadow-black/20 backdrop-blur-2xl">
      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <MapPin
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search city..."
            className="h-14 w-full rounded-2xl border border-white/10 bg-slate-900/70 pl-12 pr-4 text-white outline-none placeholder:text-slate-500 transition focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/10"
          />
        </div>

        <button
          type="submit"
          className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 font-semibold text-slate-950 transition hover:bg-cyan-300 active:scale-[0.98]"
        >
          <Search size={20} />
          Search
        </button>

        <button
          type="button"
          className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 font-medium text-slate-200 transition hover:bg-white/10"
        >
          <LocateFixed size={20} />
          <span className="sm:hidden">Current Location</span>
          <span className="hidden sm:inline">Locate Me</span>
        </button>
      </form>
    </div>
  );
}