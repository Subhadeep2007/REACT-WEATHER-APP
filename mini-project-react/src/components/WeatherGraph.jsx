import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function WeatherGraph({ data }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl sm:p-6">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Temperature
        </p>

        <h2 className="mt-1 text-xl font-bold">
          Today&apos;s Hourly Trend
        </h2>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 5,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="temperatureFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#22d3ee"
                  stopOpacity={0.35}
                />
                <stop
                  offset="100%"
                  stopColor="#22d3ee"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="rgba(255,255,255,0.08)"
              vertical={false}
            />

            <XAxis
              dataKey="time"
              tick={{
                fill: "#64748b",
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "#64748b",
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
              unit="°"
            />

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "14px",
                color: "#fff",
              }}
              formatter={(value) => [`${value}°C`, "Temperature"]}
            />

            <Area
              type="monotone"
              dataKey="temp"
              stroke="#22d3ee"
              strokeWidth={3}
              fill="url(#temperatureFill)"
              dot={{
                r: 4,
                fill: "#22d3ee",
                strokeWidth: 0,
              }}
              activeDot={{
                r: 6,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}