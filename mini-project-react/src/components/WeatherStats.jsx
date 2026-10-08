import {
  Droplets,
  Wind,
  Eye,
  Gauge,
} from "lucide-react";

const stats = [
  {
    label: "Humidity",
    key: "humidity",
    unit: "%",
    icon: Droplets,
  },
  {
    label: "Wind Speed",
    key: "wind",
    unit: "km/h",
    icon: Wind,
  },
  {
    label: "Visibility",
    key: "visibility",
    unit: "km",
    icon: Eye,
  },
  {
    label: "Pressure",
    key: "pressure",
    unit: "hPa",
    icon: Gauge,
  },
];

export default function WeatherStats({ weather }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.08]"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-white/5 p-2.5">
                <Icon size={19} className="text-cyan-400" />
              </div>

              <span className="text-xs text-slate-500">
                NOW
              </span>
            </div>

            <p className="mt-4 text-sm text-slate-400">
              {item.label}
            </p>

            <p className="mt-1 text-xl font-bold">
              {weather[item.key]}
              <span className="ml-1 text-sm font-medium text-slate-500">
                {item.unit}
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
}