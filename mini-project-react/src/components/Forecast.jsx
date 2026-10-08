export default function Forecast({ forecast }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl sm:p-6">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
          6 Day Forecast
        </p>

        <h2 className="mt-1 text-xl font-bold">
          Upcoming Weather
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {forecast.map((item, index) => (
          <div
            key={item.day}
            className={`rounded-2xl border p-4 text-center transition ${
              index === 0
                ? "border-cyan-400/30 bg-cyan-400/10"
                : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
            }`}
          >
            <p className="text-sm font-medium text-slate-300">
              {item.day}
            </p>

            <div className="my-4 text-4xl">
              {item.icon}
            </div>

            <p className="text-xl font-bold">
              {item.temp}°
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {item.min}° low
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}