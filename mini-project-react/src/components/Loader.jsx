import { LoaderCircle } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        
        {/* Spinner */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-white/10" />

          <LoaderCircle
            size={52}
            strokeWidth={2.5}
            className="animate-spin text-cyan-400"
          />
        </div>

        {/* Text */}
        <p className="mt-5 text-sm font-medium text-slate-300">
          Fetching weather...
        </p>

        <p className="mt-1 text-xs text-slate-500">
          Getting latest weather information
        </p>
      </div>
    </div>
  );
}