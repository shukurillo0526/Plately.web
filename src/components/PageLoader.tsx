import { useState, useEffect } from 'react';
import { Sparkles, Scan, Flame, Calendar, ChefHat, Database } from 'lucide-react';

interface PageLoaderProps {
  page: string;
}

const COOKING_TIPS = [
  {
    icon: Scan,
    title: "OCR Receipt Processing",
    text: "Decoding item tags and automatic expiry coordinates..."
  },
  {
    icon: Sparkles,
    title: "Zero Waste Recipe AI",
    text: "Matching available items in fridge with healthy recipe options..."
  },
  {
    icon: Flame,
    title: "Pantry Calibrations",
    text: "Estimating intake quantities and dynamic shelf weights..."
  },
  {
    icon: Calendar,
    title: "Shelf Life Forecasting",
    text: "Recalculating fresh zones and digital shelf decay metrics..."
  },
  {
    icon: ChefHat,
    title: "Smart Onboarding Checks",
    text: "Synchronizing family kitchen plans and eco-commission tables..."
  },
  {
    icon: Database,
    title: "Offline Sync Engine",
    text: "Aligning local store files with Washington-region cloud replicas..."
  }
];

export default function PageLoader({ page }: PageLoaderProps) {
  const [tipIndex, setTipIndex] = useState(0);

  // Rotate tips every 200ms to feel rapid, active and technical
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % COOKING_TIPS.length);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const ActiveIcon = COOKING_TIPS[tipIndex].icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-pulse">
      
      {/* Dynamic Status bar header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-6 gap-4">
        <div className="space-y-2">
          {/* Shimmering small tag */}
          <div className="h-4 w-32 bg-white/10 rounded-full animate-pulse" />
          {/* Shimmering title */}
          <div className="h-8 w-64 bg-slate-400 rounded-lg animate-pulse" />
        </div>
        
        {/* Active Smart Kitchen Telemetry Loading */}
        <div className="flex items-center space-x-3 glass-panel border border-white/10 p-3.5 rounded-2xl shadow-sm min-w-[280px]">
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-500">
              <ActiveIcon className="h-5 w-5 animate-bounce" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-brand-400 block uppercase tracking-wider">
              {COOKING_TIPS[tipIndex].title}
            </span>
            <span className="text-[11px] text-slate-500 block font-medium truncate max-w-[200px]">
              {COOKING_TIPS[tipIndex].text}
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Skeleton Cards mimicking standard Plately layouts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left main pane skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel border border-white/10/60 rounded-3xl p-6 space-y-6 shadow-sm">
            {/* Shimmering Card Header */}
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-5 w-40 bg-slate-400 rounded" />
                <div className="h-3.5 w-60 bg-white/10 rounded" />
              </div>
              <div className="h-9 w-24 bg-white/5 rounded-xl" />
            </div>

            {/* Simulated list item rows */}
            <div className="space-y-3.5 pt-4 border-t border-white/5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-white/5/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10" />
                    <div className="space-y-1.5">
                      <div className="h-4 w-28 bg-slate-400 rounded" />
                      <div className="h-3 w-20 bg-white/10 rounded" />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-6 w-14 bg-white/10 rounded-full" />
                    <div className="h-6 w-14 bg-white/5 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shimmery footer details block */}
          <div className="bg-white/5/40 border border-white/10/50 rounded-2xl p-5 flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-white/10" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3.5 w-3/4 bg-slate-400 rounded" />
              <div className="h-3 w-1/2 bg-white/10 rounded" />
            </div>
          </div>
        </div>

        {/* Right side panel skeleton */}
        <div className="space-y-6">
          
          {/* Circle gauge card */}
          <div className="glass-panel border border-white/10/60 rounded-3xl p-6 text-center space-y-5 shadow-sm">
            <div className="h-4 w-24 bg-white/10 rounded mx-auto" />
            
            {/* Shimmering circle representing fresh chart */}
            <div className="w-32 h-32 rounded-full border-8 border-white/5 flex items-center justify-center mx-auto relative">
              <div className="w-24 h-24 rounded-full bg-slate-950 flex flex-col justify-center items-center">
                <div className="h-4 w-12 bg-slate-400 rounded mb-1" />
                <div className="h-3 w-8 bg-white/10 rounded" />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="h-3.5 w-full bg-white/10 rounded" />
              <div className="h-3.5 w-5/6 bg-white/10 rounded mx-auto" />
            </div>
          </div>

          {/* Checklist card */}
          <div className="glass-panel border border-white/10/60 rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="h-4 w-32 bg-slate-400 rounded" />
            <div className="space-y-3.5 pt-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-md bg-white/10 flex-shrink-0" />
                  <div className="h-3.5 flex-1 bg-white/5 rounded" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
