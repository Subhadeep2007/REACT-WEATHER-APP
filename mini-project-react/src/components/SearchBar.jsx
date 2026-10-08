import {
  Search,
  MapPin,
  LocateFixed,
} from "lucide-react";

export default function SearchBar({
  city,
  setCity,
  handleSearch,
  onLocate,
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-3 shadow-2xl backdrop-blur-2xl">

      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-3 sm:flex-row"
      >

        {/* SEARCH INPUT */}
        <div className="relative flex-1">

          <MapPin
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
            placeholder="Search city..."
            className="h-14 w-full rounded-2xl border border-white/10 bg-slate-900/70 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/10"
          />

        </div>

        {/* SEARCH */}
        <button
          type="submit"
          className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-7 font-bold text-slate-950 transition hover:bg-cyan-300 active:scale-[0.98]"
        >
          <Search size={19} />
          Search
        </button>

        {/* LOCATE ME */}
        <button
          type="button"
          onClick={onLocate}
          className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 font-semibold text-slate-300 transition hover:bg-white/10 active:scale-[0.98]"
        >
          <LocateFixed size={19} />

          <span className="sm:hidden">
            Locate Me
          </span>

          <span className="hidden sm:inline">
            Locate Me
          </span>
        </button>

      </form>
    </div>
  );
}