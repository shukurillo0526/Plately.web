import React from 'react';
import { 
  Building2, 
  Truck, 
  Tablet, 
  Layers, 
  TrendingUp, 
  ShieldAlert, 
  ChevronRight, 
  Users, 
  Percent, 
  MapPin, 
  Activity,
  Milestone,
  Lock,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { PageType } from '../types';

interface EcosystemProps {
  onNavigate: (page: PageType) => void;
  onOpenBetaModal: () => void;
}

export default function Ecosystem({ onNavigate, onOpenBetaModal }: EcosystemProps) {
  return (
    <div className="space-y-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* HEADER SECTION */}
      <section className="text-center pt-12 max-w-4xl mx-auto">
        <span className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-brand-700 bg-brand-50 border border-brand-200 px-3.5 py-1.5 rounded-full uppercase tracking-widest animate-pulse">
          <Lock className="h-3 w-3 text-brand-600" />
          <span>CONFIDENTIAL SYSTEM BLUEPRINT</span>
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-cream-900 mt-4 tracking-tight leading-tight">
          Ecosystem Roadmap & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-emerald-600">
            Confidential Strategic Vision
          </span>
        </h1>
        <p className="text-sm md:text-base text-cream-600 font-sans mt-4 max-w-2xl mx-auto leading-relaxed">
          Plately is building the infrastructure for a fully synchronized, localized food economy. This blueprint outlines our historical technical execution, active capabilities, and classified future milestones.
        </p>
      </section>

      {/* THREE PILLARS OF THE SYSTEM */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
            ARCHITECTURAL MOAT
          </span>
          <h2 className="text-2xl font-bold font-display text-cream-900">The Three-Pillar Ecosystem</h2>
          <p className="text-xs text-cream-500 max-w-md mx-auto leading-relaxed">
            How our consumer smart pantry technology binds directly with commercial restaurant hubs and shared neighborhood fleets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1 */}
          <div className="bg-white p-7 rounded-2xl border border-cream-200 shadow-sm space-y-4 hover:border-brand-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600">
              <Users className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-mono text-brand-600 font-extrabold uppercase">Pillar I</span>
            <h3 className="text-lg font-bold font-display text-cream-900">Consumer Smart Pantry Engine</h3>
            <p className="text-xs text-cream-500 leading-relaxed font-sans">
              Our live mobile client where household cooks track fridge inventory, access AI-reconciled cooking steps, and log nutritional metrics without manual typing fatigue.
            </p>
            <div className="text-[10px] font-mono text-brand-700 bg-brand-50/60 p-2 rounded border border-brand-100 font-semibold flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>STATUS: Active Beta Sandbox</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-7 rounded-2xl border border-cream-200 shadow-sm space-y-4 hover:border-brand-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Building2 className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-mono text-blue-600 font-extrabold uppercase">Pillar II</span>
            <h3 className="text-lg font-bold font-display text-cream-900">Restaurant B2B Operations Hub</h3>
            <p className="text-xs text-cream-500 leading-relaxed font-sans">
              A robust SaaS portal designed for localized commercial kitchens. Bypass standard 30% delivery commission rates, retain customer data, and synchronize ingredient flows.
            </p>
            <div className="text-[10px] font-mono text-blue-700 bg-blue-50/60 p-2 rounded border border-blue-100 font-semibold flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>STATUS: Core Simulated Trials</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-7 rounded-2xl border border-cream-200 shadow-sm space-y-4 hover:border-brand-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
              <Truck className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-mono text-purple-600 font-extrabold uppercase">Pillar III</span>
            <h3 className="text-lg font-bold font-display text-cream-900">Shared Logistics Courier Fleet</h3>
            <p className="text-xs text-cream-500 leading-relaxed font-sans">
              An intelligent route scheduling and carrier app for neighborhood batch delivery services—minimizing delivery distance, reducing food miles, and curbing carbon emissions.
            </p>
            <div className="text-[10px] font-mono text-purple-700 bg-purple-50/60 p-2 rounded border border-purple-100 font-semibold flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>STATUS: Conceptual Blueprint</span>
            </div>
          </div>

        </div>
      </section>

      {/* ROADMAP / CHRONOLOGICAL TIMELINE */}
      <section className="bg-cream-100/60 py-16 px-6 rounded-3xl border border-cream-200/80">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Milestone className="h-8 w-8 text-brand-600 mx-auto" />
            <h2 className="text-2xl font-bold font-display text-cream-900">Development History & Releases</h2>
            <p className="text-xs text-cream-500 font-sans">A timeline of our architectural milestones, iterative security hardening, and engine updates.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Milestone 1 */}
            <div className="bg-white p-6 rounded-2xl border border-cream-200/80 space-y-3 shadow-sm relative">
              <div className="absolute top-4 right-4 text-cream-300 font-mono text-[9px] font-bold">v0.1.5</div>
              <span className="text-[10px] text-brand-600 font-bold font-mono">Interactive Tutorial</span>
              <h4 className="text-sm font-bold text-cream-900 font-display">In-Memory Sandbox</h4>
              <p className="text-xs text-cream-500 leading-relaxed font-sans">
                Introduced an immersive, step-by-step sandboxed kitchen walkthrough, guiding busy students and first-time expats on efficient ingredient management.
              </p>
            </div>

            {/* Milestone 2 */}
            <div className="bg-white p-6 rounded-2xl border border-cream-200/80 space-y-3 shadow-sm relative">
              <div className="absolute top-4 right-4 text-cream-300 font-mono text-[9px] font-bold">v0.1.6</div>
              <span className="text-[10px] text-brand-600 font-bold font-mono">Store Leftovers</span>
              <h4 className="text-sm font-bold text-cream-900 font-display">Swipe Controls & Leftover Curation</h4>
              <p className="text-xs text-cream-500 leading-relaxed font-sans">
                Created smart swipe controls for shelf addition, dynamic portion calculations, and built automated leftover-saving tracking mechanisms.
              </p>
            </div>

            {/* Milestone 3 */}
            <div className="bg-white p-6 rounded-2xl border border-cream-200/80 space-y-3 shadow-sm relative">
              <div className="absolute top-4 right-4 text-cream-300 font-mono text-[9px] font-bold">v0.1.7</div>
              <span className="text-[10px] text-brand-600 font-bold font-mono">Calorie Plate Scanner</span>
              <h4 className="text-sm font-bold text-cream-900 font-display">Visual OCR & API Integrations</h4>
              <p className="text-xs text-cream-500 leading-relaxed font-sans">
                Engineered commercial-grade portion scanners. Instantly reading dishes or printed nutritional tables to aid physical health and workout recovery.
              </p>
            </div>

            {/* Milestone 4 */}
            <div className="bg-white p-6 rounded-2xl border border-cream-200/80 space-y-3 shadow-sm relative">
              <div className="absolute top-4 right-4 text-cream-300 font-mono text-[9px] font-bold">v0.1.8</div>
              <span className="text-[10px] text-brand-600 font-bold font-mono">SAST Audit</span>
              <h4 className="text-sm font-bold text-cream-900 font-display">Security & Full-Stack Hardening</h4>
              <p className="text-xs text-cream-500 leading-relaxed font-sans">
                Completed exhaustive security audits. Hardened database API routing, encrypted credentials, and added offline-first query filters.
              </p>
            </div>

            {/* Milestone 5 */}
            <div className="bg-white p-6 rounded-2xl border border-cream-200/80 space-y-3 shadow-sm relative ring-2 ring-brand-500 bg-brand-50/10">
              <div className="absolute top-4 right-4 text-brand-600 font-mono text-[9px] font-extrabold">CURRENT</div>
              <span className="text-[10px] text-brand-600 font-bold font-mono">v0.1.9 Sandbox</span>
              <h4 className="text-sm font-bold text-cream-900 font-display">Anti-Hallucination Engines</h4>
              <p className="text-xs text-cream-500 leading-relaxed font-sans">
                Perfected camera ingredient detection confidence scores, solved empty state edge cases, and expanded offline state caches.
              </p>
            </div>

            {/* Milestone 6 */}
            <div className="bg-white p-6 rounded-2xl border border-cream-200/80 space-y-3 shadow-sm relative opacity-90 border-brand-200">
              <div className="absolute top-4 right-4 text-brand-500 font-mono text-[9px] font-extrabold">JULY 18, 2026</div>
              <span className="text-[10px] text-brand-500 font-bold font-mono">v0.2.0 Web & Android Demo</span>
              <h4 className="text-sm font-bold text-cream-900 font-display">Multi-Device Cloud Sync</h4>
              <p className="text-xs text-cream-500 leading-relaxed font-sans">
                Planned first demo launch on Web and Android platforms, enabling multi-device household syncing, automated ingredient localization, and database cluster migrations.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECRET FUTURE GOALS & PLANS SECTION (RESTRICTED SYSTEM) */}
      <section className="space-y-12 max-w-5xl mx-auto">
        <div className="text-center space-y-3">
          <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-extrabold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider">
            <Lock className="h-3.5 w-3.5 text-amber-600" />
            <span>CLASSIFIED FUTURE HORIZONS (CONFIDENTIAL PLAN)</span>
          </span>
          <h2 className="text-2xl font-bold font-display text-cream-900">Strategic Vision & Future Milestones</h2>
          <p className="text-xs text-cream-500 max-w-lg mx-auto leading-relaxed">
            Plately's proprietary strategic roadmap consists of four secret implementation stages to mature our three-sided digital food economy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Secret Milestone 1 */}
          <div className="bg-cream-50/50 p-6 rounded-2xl border border-cream-200/80 space-y-4 relative overflow-hidden group hover:bg-white hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-16 h-16 bg-brand-500/5 rounded-bl-full pointer-events-none" />
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                <Lock className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-mono font-bold text-cream-400">STAGE 1 • Q3 - Q4 2026</span>
            </div>
            <h3 className="text-sm font-bold text-cream-900 font-display group-hover:text-brand-700 transition-colors">Transactional Maturity & Checkout Pipelines</h3>
            <p className="text-xs text-cream-500 leading-relaxed font-sans">
              Expanding our initial mobile ordering framework with secure third-party payment gateways (Stripe/local-fit networks). Enabling automated checkout verification codes and live order-preparation tracking.
            </p>
          </div>

          {/* Secret Milestone 2 */}
          <div className="bg-cream-50/50 p-6 rounded-2xl border border-cream-200/80 space-y-4 relative overflow-hidden group hover:bg-white hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full pointer-events-none" />
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                <Lock className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-mono font-bold text-cream-400">STAGE 2 • Q1 2027</span>
            </div>
            <h3 className="text-sm font-bold text-cream-900 font-display group-hover:text-blue-600 transition-colors">Modular Kitchen Kiosk Hardware</h3>
            <p className="text-xs text-cream-500 leading-relaxed font-sans">
              Developing wall-mounted interactive kitchen tablet terminals. Integrating native barcode scanners and automated weight scale peripherals to log container metrics directly into the Plately cloud.
            </p>
          </div>

          {/* Secret Milestone 3 */}
          <div className="bg-cream-50/50 p-6 rounded-2xl border border-cream-200/80 space-y-4 relative overflow-hidden group hover:bg-white hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 rounded-bl-full pointer-events-none" />
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                <Lock className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-mono font-bold text-cream-400">STAGE 3 • Q2 - Q3 2027</span>
            </div>
            <h3 className="text-sm font-bold text-cream-900 font-display group-hover:text-purple-600 transition-colors">Low-Emission Courier Logistics Fleet</h3>
            <p className="text-xs text-cream-500 leading-relaxed font-sans">
              Deploying the proprietary Plately Carrier system. Using hyper-optimized delivery dispatch routines to coordinate batch transport of prepped ingredients, completely bypassing the massive markups of aggregators.
            </p>
          </div>

          {/* Secret Milestone 4 */}
          <div className="bg-cream-50/50 p-6 rounded-2xl border border-cream-200/80 space-y-4 relative overflow-hidden group hover:bg-white hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                <Lock className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-mono font-bold text-cream-400">STAGE 4 • Q4 2027+</span>
            </div>
            <h3 className="text-sm font-bold text-cream-900 font-display group-hover:text-emerald-600 transition-colors">Global Cold-Storage Fulfillment Clusters</h3>
            <p className="text-xs text-cream-500 leading-relaxed font-sans">
              Structuring localized neighborhood food hubs. Partnering directly with regional wholesale distributors to ship raw ingredients to households in high-density areas, unlocking massive household savings.
            </p>
          </div>

        </div>
      </section>

      {/* B2B / INVESTOR BRIEFING CTA */}
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <Activity className="h-10 w-10 text-brand-600 mx-auto" />
        <h2 className="text-2xl font-bold font-display text-cream-900">Request Access to Our Secure Sandbox</h2>
        <p className="text-xs text-cream-600 font-sans leading-relaxed max-w-xl mx-auto">
          Are you a potential strategic partner or seed investor? We are preparing our official seed round briefings. Request access to our mock restaurant dashboards, logistics algorithms, and core platform analytics.
        </p>
        <button 
          onClick={onOpenBetaModal}
          className="px-6 py-3 bg-cream-900 hover:bg-cream-800 text-white font-bold rounded-xl text-xs transition-all shadow-md inline-flex items-center space-x-1"
        >
          <span>Request B2B / Investor Deck</span>
          <ChevronRight className="h-4 w-4 text-brand-400" />
        </button>
      </section>

    </div>
  );
}
