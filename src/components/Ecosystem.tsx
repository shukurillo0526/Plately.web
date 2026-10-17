import React from 'react';
import { 
  Building2, 
  Truck, 
  Layers, 
  TrendingUp, 
  ChevronRight, 
  Users, 
  Percent, 
  MapPin, 
  Activity,
  Milestone,
  Lock,
  CheckCircle2,
  Sparkles,
  Monitor,
  Utensils,
  Share2,
  Store,
  ArrowRight
} from 'lucide-react';
import { PageType } from '../types';

interface EcosystemProps {
  onNavigate: (page: PageType) => void;
  onOpenBetaModal: () => void;
}

export default function Ecosystem({ onNavigate, onOpenBetaModal }: EcosystemProps) {
  return (
    <div className="space-y-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans text-white">
      
      {/* 1. HEADER SECTION */}
      <section className="text-center pt-12 max-w-4xl mx-auto space-y-4">
        <span className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-brand-400 bg-brand-500/10 border border-brand-500/30 px-4 py-1.5 rounded-full uppercase tracking-widest">
          <Sparkles className="h-3.5 w-3.5 text-brand-400" />
          <span>PLATELY 2.0 ECOSYSTEM ARCHITECTURE</span>
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-white tracking-tight leading-tight">
          A Synchronized Engine for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-orange-400 to-emerald-400">
            Diners, Kitchens & Couriers.
          </span>
        </h1>
        <p className="text-sm md:text-base text-slate-300 font-sans mt-4 max-w-2xl mx-auto leading-relaxed">
          Plately bridges consumer smart kitchen pantries with commercial restaurant operations and shared courier fleets in a closed, zero-commission digital economy.
        </p>
      </section>

      {/* 2. THE FOUR PILLARS OF THE PLATELY ECOSYSTEM */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
            SYSTEM ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">The Four Interlocking Pillars</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            How our consumer smart pantry technology binds directly with commercial restaurant hubs and shared neighborhood logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pillar 1: Consumer App */}
          <div className="bg-[#0f141f] p-7 rounded-3xl border border-white/10 shadow-xl space-y-4 hover:border-brand-500/50 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center text-brand-400 group-hover:scale-110 transition-transform">
                <Utensils className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono text-brand-400 font-extrabold uppercase tracking-wider">Pillar I</span>
              <h3 className="text-lg font-bold font-display text-white">Smart Living Shelf & Diner App</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Dynamic Fridge, Freezer, and Pantry zone monitoring, 6-signal AI recipe reconciliation, hands-free cook mode, and zero-markup restaurant ordering.
              </p>
            </div>
            <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20 font-semibold flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>STATUS: Live in Production</span>
            </div>
          </div>

          {/* Pillar 2: Workshop OS */}
          <div className="bg-[#0f141f] p-7 rounded-3xl border border-white/10 shadow-xl space-y-4 hover:border-emerald-500/50 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Monitor className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-extrabold uppercase tracking-wider">Pillar II</span>
              <h3 className="text-lg font-bold font-display text-white">Workshop Restaurant OS</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Multimodal AI Website Studio, low-latency WebSocket KDS screens, interactive floor plans, custom domains, and 0% commission direct ordering.
              </p>
            </div>
            <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20 font-semibold flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>STATUS: Live in Production</span>
            </div>
          </div>

          {/* Pillar 3: Noor Logistics Fleet */}
          <div className="bg-[#0f141f] p-7 rounded-3xl border border-white/10 shadow-xl space-y-4 hover:border-purple-500/50 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Truck className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono text-purple-400 font-extrabold uppercase tracking-wider">Pillar III</span>
              <h3 className="text-lg font-bold font-display text-white">Noor Fleet Logistics</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Intelligent courier routing engine synchronized with kitchen cook time ETAs. Real-time telemetry, automated driver assignment, and route batching.
              </p>
            </div>
            <div className="text-[10px] font-mono text-purple-400 bg-purple-500/10 p-2 rounded-xl border border-purple-500/20 font-semibold flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span>STATUS: Integrated & Active</span>
            </div>
          </div>

          {/* Pillar 4: Autonomous AI Marketing Agents */}
          <div className="bg-[#0f141f] p-7 rounded-3xl border border-white/10 shadow-xl space-y-4 hover:border-amber-500/50 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Share2 className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono text-amber-400 font-extrabold uppercase tracking-wider">Pillar IV</span>
              <h3 className="text-lg font-bold font-display text-white">Autonomous AI Marketing</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Autonomous agents that generate culinary video reels and promotional stories, publishing directly to the Plately.app Explore community feed.
              </p>
            </div>
            <div className="text-[10px] font-mono text-amber-400 bg-amber-500/10 p-2 rounded-xl border border-amber-500/20 font-semibold flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>STATUS: Operational & Publishing</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. ROADMAP / CHRONOLOGICAL MILESTONE RELEASES */}
      <section className="bg-[#0f141f] py-16 px-6 sm:px-12 rounded-3xl border border-white/10">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Milestone className="h-8 w-8 text-brand-400 mx-auto" />
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">Architectural Evolution & Roadmap</h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              From isolated consumer pantry tracker to the unified, two-sided digital food operating system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* V1.0 */}
            <div className="bg-[#141b26] p-6 rounded-2xl border border-emerald-500/30 space-y-3 shadow-md relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-emerald-400 font-bold font-mono uppercase bg-emerald-500/10 px-2 py-0.5 rounded">
                  v1.0 • SHIPPED
                </span>
                <span className="text-xs text-slate-400 font-mono">Q1 2026</span>
              </div>
              <h4 className="text-base font-bold text-white font-display">Smart Living Shelf</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Dynamic Fridge, Freezer, and Pantry zone monitoring, expiration countdowns, receipt OCR intake, and atomic leftover saving sliders.
              </p>
            </div>

            {/* V2.0 */}
            <div className="bg-[#141b26] p-6 rounded-2xl border border-emerald-500/30 space-y-3 shadow-md relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-emerald-400 font-bold font-mono uppercase bg-emerald-500/10 px-2 py-0.5 rounded">
                  v2.0 • SHIPPED
                </span>
                <span className="text-xs text-slate-400 font-mono">Q2 2026</span>
              </div>
              <h4 className="text-base font-bold text-white font-display">Direct Dining & Explore Feed</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                0% commission takeout ordering, video reel explore feed, calorie plate vision scanner, and interactive floor plan table booking for guests.
              </p>
            </div>

            {/* V3.0 */}
            <div className="bg-[#141b26] p-6 rounded-2xl border border-brand-500/50 space-y-3 shadow-md relative ring-1 ring-brand-500/30">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-brand-400 font-bold font-mono uppercase bg-brand-500/20 px-2 py-0.5 rounded">
                  v3.0 • CURRENT (LIVE)
                </span>
                <span className="text-xs text-slate-400 font-mono">LIVE OS</span>
              </div>
              <h4 className="text-base font-bold text-white font-display">Workshop OS & AI Studio</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Gemini-powered multimodal website studio, live multi-state KDS ticket boards with WebSocket sync, custom domains, and edge proxy routing.
              </p>
            </div>

            {/* V4.0 */}
            <div className="bg-[#141b26] p-6 rounded-2xl border border-purple-500/40 space-y-3 shadow-md relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-purple-400 font-bold font-mono uppercase bg-purple-500/20 px-2 py-0.5 rounded">
                  v4.0 • ACTIVE
                </span>
                <span className="text-xs text-slate-400 font-mono">ACTIVE DEPLOY</span>
              </div>
              <h4 className="text-base font-bold text-white font-display">Noor Fleet & AI Marketing</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Intelligent courier routing matching cook times, autonomous AI marketing agents publishing to Explore, and multi-stage standalone Docker / Nginx runners.
              </p>
            </div>

            {/* V5.0 Horizon */}
            <div className="bg-[#141b26] p-6 rounded-2xl border border-white/10 space-y-3 shadow-md relative opacity-85">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-bold font-mono uppercase bg-white/10 px-2 py-0.5 rounded">
                  v5.0 • HORIZON
                </span>
                <span className="text-xs text-slate-400 font-mono">2027</span>
              </div>
              <h4 className="text-base font-bold text-white font-display">Ambient Kitchen IoT</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Modular smart fridge weight scales and camera shelf sensors that automatically log ingredient consumption without manual camera scans.
              </p>
            </div>

            {/* Regional Hubs */}
            <div className="bg-[#141b26] p-6 rounded-2xl border border-white/10 space-y-3 shadow-md relative opacity-85">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-bold font-mono uppercase bg-white/10 px-2 py-0.5 rounded">
                  SCALE HORIZON
                </span>
                <span className="text-xs text-slate-400 font-mono">2027+</span>
              </div>
              <h4 className="text-base font-bold text-white font-display">Regional Fulfillment Dark Hubs</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Hyper-localized batch transport of prepped ingredients directly from farm wholesalers to residential clusters, cutting grocery costs by 40%.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. ECOSYSTEM CTA */}
      <section className="max-w-4xl mx-auto text-center space-y-6 bg-gradient-to-br from-[#121723] to-[#0a0d14] p-12 rounded-[36px] border border-white/10">
        <Activity className="h-10 w-10 text-brand-400 mx-auto" />
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">Ready to Explore the Plately Ecosystem?</h2>
        <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed max-w-xl mx-auto">
          Whether you're a food lover ready to transform household cooking, or a restaurant operator wanting to reclaim control of your digital storefront, get started today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href="https://app.theplately.com"
            className="w-full sm:w-auto px-7 py-3.5 bg-brand-500 hover:bg-brand-400 text-white font-bold rounded-xl text-xs transition-all shadow-lg flex items-center justify-center space-x-2"
          >
            <Utensils className="w-4 h-4" />
            <span>Open Diner Client</span>
          </a>
          <button 
            onClick={() => onNavigate('workshop')}
            className="w-full sm:w-auto px-7 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-all border border-slate-700 flex items-center justify-center space-x-2"
          >
            <Monitor className="w-4 h-4 text-emerald-400" />
            <span>Explore Workshop OS</span>
          </button>
        </div>
      </section>

    </div>
  );
}
