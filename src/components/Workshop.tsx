import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Monitor, 
  ChefHat, 
  Truck, 
  LineChart, 
  Layers, 
  Sliders, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Sparkles, 
  Clock, 
  Check, 
  ExternalLink, 
  Store, 
  Users, 
  Percent, 
  DollarSign, 
  Utensils, 
  Printer, 
  Share2,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { PageType } from '../types';

const PREVIEW_SLIDES = [
  {
    title: 'Command Center Dashboard',
    tag: 'Operational Radar',
    src: '/previews/02_workshop_dashboard.png',
    desc: 'Real-time revenue stream, orders today, target prep times, AI Agent shift briefing recommendations, and live ticket stream.',
  },
  {
    title: 'Visual Website Studio',
    tag: 'AI Storefront Builder',
    src: '/previews/07_workshop_website_builder.png',
    desc: 'Multimodal prompt canvas, live design tokens, reorderable visual content blocks, and instant storefront publishing.',
  },
  {
    title: 'Kitchen Display System (KDS)',
    tag: 'Line Radar',
    src: '/previews/05_workshop_kds.png',
    desc: 'Color-coded ticket lifecycles, timer alerts, audio chimes, and instant one-click line bumping for kitchen staff.',
  },
  {
    title: 'Menu & Dynamic Pricing',
    tag: 'Catalog Engine',
    src: '/previews/03_workshop_menu.png',
    desc: 'Pre-populated authentic dish catalog, instant 86-ing / sold out toggles, dietary badges, and prep time controls.',
  },
  {
    title: 'Table Reservations & Floor Plan',
    tag: 'Dine-In Management',
    src: '/previews/06_workshop_reservations.png',
    desc: 'Realtime interactive table bookings with instant guest confirmations, notes, and 0% third-party aggregator take.',
  },
  {
    title: 'Public Online Storefront',
    tag: 'Customer Experience',
    src: '/previews/09_storefront_kamolon.png',
    desc: 'High-speed public storefront with table booking, online ordering, and authentic restaurant brand identity.',
  },
  {
    title: 'Custom Domains & DNS Verification',
    tag: 'Network Settings',
    src: '/previews/08_workshop_settings_domains.png',
    desc: 'Automated CNAME verification, zero-config SSL, and branded subdomains on workshop.theplately.com.',
  },
];

interface WorkshopProps {
  onNavigate?: (page: PageType) => void;
  onOpenBetaModal?: () => void;
}

export default function Workshop({ onNavigate, onOpenBetaModal }: WorkshopProps) {
  const [activeTab, setActiveTab] = useState<'kds' | 'studio' | 'floorplan'>('kds');
  const [previewSlide, setPreviewSlide] = useState(0);
  
  // Interactive KDS Demo State
  const [demoOrders, setDemoOrders] = useState([
    { id: '201', table: 'Table 4', channel: 'Dine-In', items: ['2x Truffle Ribeye', '1x Burrata Caprese', '2x Chianti Classico'], status: 'preparing', time: '12m', priority: 'VIP' },
    { id: '202', table: 'Noor Courier #88', channel: 'Delivery', items: ['1x Woodfired Margherita', '1x Tiramisu Tradizionale'], status: 'pending', time: '4m', priority: 'Normal' },
    { id: '203', table: 'Table 9', channel: 'Dine-In', items: ['1x Tagliatelle al Tartufo', '1x San Pellegrino'], status: 'ready', time: '18m', priority: 'Normal' },
  ]);

  const [studioTheme, setStudioTheme] = useState('Luxury Charcoal');
  const [selectedTable, setSelectedTable] = useState('T4');

  const handleBumpDemoOrder = (id: string) => {
    setDemoOrders(prev => prev.map(order => {
      if (order.id !== id) return order;
      if (order.status === 'pending') return { ...order, status: 'preparing' };
      if (order.status === 'preparing') return { ...order, status: 'ready' };
      if (order.status === 'ready') return { ...order, status: 'completed' };
      return { ...order, status: 'preparing' };
    }));
  };

  return (
    <div className="min-h-screen bg-[#070a10] pt-24 pb-28 text-white relative selection:bg-brand-500 selection:text-white overflow-hidden font-sans">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[550px] h-[550px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-28">
        
        {/* 1. HERO HEADER */}
        <section className="text-center max-w-4xl mx-auto space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <span className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>PLATELY WORKSHOP OS 2.0 • B2B RESTAURANT ENGINE</span>
            </span>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display text-white tracking-tight leading-[1.1]">
              The AI-Native OS for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-brand-400">
                Modern Restaurants.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
              Empower your restaurant with an AI Website Studio, low-latency WebSocket KDS screens, interactive architectural floor plans, and intelligent courier dispatch—all with <strong className="text-white">0% commission fees</strong>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="https://workshop.theplately.com"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] transition-all flex items-center justify-center space-x-2 text-sm"
              >
                <Monitor className="w-4 h-4" />
                <span>Launch Workshop OS</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://theplately.com/store/gusto"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold rounded-2xl transition-all flex items-center justify-center space-x-2 text-sm"
              >
                <Store className="w-4 h-4 text-brand-400" />
                <span>View Live Storefront Demo</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>

            {/* 4 Core B2B Metrics */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 text-center max-w-3xl mx-auto">
              <div>
                <p className="text-2xl sm:text-3xl font-black font-display text-brand-400">0%</p>
                <p className="text-xs text-slate-400 font-mono">Commission Fee</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black font-display text-emerald-400">&lt; 3m</p>
                <p className="text-xs text-slate-400 font-mono">AI Website Creation</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black font-display text-teal-300">3ms</p>
                <p className="text-xs text-slate-400 font-mono">WebSocket KDS Latency</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black font-display text-white">100%</p>
                <p className="text-xs text-slate-400 font-mono">Guest Data Retention</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 2. INTERACTIVE WORKSHOP CONSOLE DEMO */}
        <section className="bg-[#0f141f] border border-white/10 rounded-[36px] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">INTERACTIVE CONSOLE SIMULATOR</span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">Experience Plately Workshop in Real Time</h3>
            </div>

            {/* Tabs */}
            <div className="flex items-center space-x-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-white/10 self-start sm:self-auto">
              <button
                onClick={() => setActiveTab('kds')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                  activeTab === 'kds' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Live KDS Board</span>
              </button>

              <button
                onClick={() => setActiveTab('studio')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                  activeTab === 'studio' ? 'bg-brand-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Website Studio</span>
              </button>

              <button
                onClick={() => setActiveTab('floorplan')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                  activeTab === 'floorplan' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Floor Plan</span>
              </button>
            </div>
          </div>

          {/* Interactive Screen Content */}
          <div className="pt-6">
            {activeTab === 'kds' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>LIVE KITCHEN DISPLAY SYSTEM • CLICK "BUMP STATUS" TO ADVANCE TICKETS</span>
                  <button
                    onClick={() => setDemoOrders([
                      { id: '201', table: 'Table 4', channel: 'Dine-In', items: ['2x Truffle Ribeye', '1x Burrata Caprese', '2x Chianti Classico'], status: 'preparing', time: '12m', priority: 'VIP' },
                      { id: '202', table: 'Noor Courier #88', channel: 'Delivery', items: ['1x Woodfired Margherita', '1x Tiramisu Tradizionale'], status: 'pending', time: '4m', priority: 'Normal' },
                      { id: '203', table: 'Table 9', channel: 'Dine-In', items: ['1x Tagliatelle al Tartufo', '1x San Pellegrino'], status: 'ready', time: '18m', priority: 'Normal' },
                    ])}
                    className="text-emerald-400 underline hover:text-emerald-300"
                  >
                    Reset Tickets
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {demoOrders.map(order => {
                    const isPrep = order.status === 'preparing';
                    const isReady = order.status === 'ready';
                    const isPending = order.status === 'pending';
                    const isDone = order.status === 'completed';

                    return (
                      <div
                        key={order.id}
                        className={`rounded-2xl border p-4 space-y-3 flex flex-col justify-between transition-all ${
                          isDone 
                            ? 'bg-slate-900/40 border-slate-800 opacity-60' 
                            : isReady 
                            ? 'bg-emerald-950/40 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
                            : isPrep 
                            ? 'bg-amber-950/40 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.1)]' 
                            : 'bg-slate-900 border-slate-800'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between pb-2 border-b border-white/5">
                            <span className="font-mono font-bold text-sm text-white">#{order.id}</span>
                            <span className="text-xs font-mono text-slate-400 flex items-center space-x-1">
                              <Clock className="w-3.5 h-3.5 text-slate-500" />
                              <span>{order.time}</span>
                            </span>
                          </div>

                          <div className="mt-2 flex items-center justify-between">
                            <span className={`text-xs font-bold ${order.channel === 'Delivery' ? 'text-purple-300' : 'text-blue-300'}`}>
                              {order.table}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase ${
                              order.channel === 'Delivery' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'
                            }`}>
                              {order.channel}
                            </span>
                          </div>

                          <div className="mt-3 space-y-1.5">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="text-xs text-slate-200 font-medium flex items-center space-x-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => handleBumpDemoOrder(order.id)}
                          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                            isPending
                              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                              : isPrep
                              ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                              : isReady
                              ? 'bg-purple-600 hover:bg-purple-500 text-white'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {isPending && <span>Start Cooking →</span>}
                          {isPrep && <span>Mark Ready ✓</span>}
                          {isReady && <span>Dispatch Order 🚀</span>}
                          {isDone && <span>Archived (Reset)</span>}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'studio' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-[#141b26] border border-brand-500/30 p-4 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white flex items-center space-x-1.5">
                        <Sparkles className="w-4 h-4 text-brand-400" />
                        <span>Gemini Multimodal Command Bar</span>
                      </span>
                      <span className="text-[10px] font-mono text-brand-400 bg-brand-500/20 px-2 py-0.5 rounded">
                        Schema Safe
                      </span>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
                      "Generate fine dining Italian layout with reservations for 12 tables and dark gold accents"
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] text-slate-400 font-mono">PALETTE TOKENS:</span>
                      <div className="flex flex-wrap gap-2">
                        {['Luxury Charcoal', 'Emerald Tuscan', 'Midnight Sapphire', 'Terracotta Flame'].map(theme => (
                          <button
                            key={theme}
                            onClick={() => setStudioTheme(theme)}
                            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                              studioTheme === theme ? 'bg-brand-500 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {theme}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Workshop compiles the natural language command into validated JSON schema, updates the split-screen live preview instantaneously, and publishes to <code className="text-brand-300 font-mono">theplately.com/store/[slug]</code> with full SEO indexing.
                  </p>
                </div>

                <div className="lg:col-span-7 bg-[#0b0e15] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="bg-[#121722] px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-300">gusto.plately.app</span>
                    <span className="text-emerald-400 font-mono text-[11px]">0% Fee Storefront • SSL Active</span>
                  </div>

                  <div className="p-6 space-y-4 bg-gradient-to-b from-[#141b27] to-[#0b0e15]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xl font-bold font-display text-white">Gusto Trattoria & Pasticceria</h4>
                        <p className="text-xs text-slate-400">Handcrafted Tuscan pasta & wood-fired pinsa</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-mono">
                        Open Now
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-white">Truffle Pappardelle</p>
                          <p className="text-[11px] text-emerald-400 font-mono">$24.00</p>
                        </div>
                        <button className="text-[11px] bg-brand-500 text-white font-bold px-2 py-1 rounded">
                          Add
                        </button>
                      </div>

                      <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-white">Florentine T-Bone</p>
                          <p className="text-[11px] text-emerald-400 font-mono">$48.00</p>
                        </div>
                        <button className="text-[11px] bg-brand-500 text-white font-bold px-2 py-1 rounded">
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'floorplan' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <h4 className="text-lg font-bold font-display text-white">Architectural Floor Plan Canvas</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Configure custom restaurant seating zones (Main Hall, Window, Terrace, VIP Booths). When guests open your storefront or the Plately client app, they can reserve specific tables in real time.
                  </p>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1 font-mono">
                    <p className="text-slate-400">SELECTED: <strong className="text-white">{selectedTable}</strong></p>
                    <p className="text-emerald-400">STATUS: Live Bookable (0% Aggregator Take)</p>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-[#0b0e15] border border-slate-800 p-6 rounded-3xl">
                  <div className="grid grid-cols-4 gap-3 text-center font-mono">
                    {[
                      { id: 'T1', type: 'Window', guests: '2p', status: 'Booked', color: 'text-red-400' },
                      { id: 'T2', type: 'Window', guests: '4p', status: 'Open', color: 'text-emerald-400' },
                      { id: 'T3', type: 'Main', guests: '2p', status: 'Booked', color: 'text-red-400' },
                      { id: 'T4', type: 'VIP Booth', guests: '6p', status: 'Selected', color: 'text-brand-400' },
                      { id: 'T5', type: 'Main', guests: '4p', status: 'Open', color: 'text-emerald-400' },
                      { id: 'T6', type: 'Terrace', guests: '2p', status: 'Open', color: 'text-emerald-400' },
                      { id: 'T7', type: 'Terrace', guests: '4p', status: 'Booked', color: 'text-red-400' },
                      { id: 'T8', type: 'VIP Lounge', guests: '8p', status: 'Open', color: 'text-emerald-400' },
                    ].map(table => (
                      <button
                        key={table.id}
                        onClick={() => setSelectedTable(table.id)}
                        className={`p-3 rounded-2xl border text-xs transition-all ${
                          selectedTable === table.id
                            ? 'bg-brand-500/20 border-brand-500 shadow-md'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <p className="font-bold text-white">{table.id}</p>
                        <p className="text-[10px] text-slate-400">{table.type} ({table.guests})</p>
                        <p className={`text-[10px] font-bold mt-1 ${table.color}`}>{table.status}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 2.5. LIVE OPERATING SYSTEM TOUR */}
        <section className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
              PRODUCTION OPERATING SYSTEM TOUR
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white">
              Inside Plately Workshop OS
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Explore authentic high-resolution captures from our live merchant deployment at <span className="text-emerald-400 font-mono">workshop.theplately.com</span>.
            </p>
          </div>

          <div className="bg-[#0f141f] border border-white/10 rounded-[32px] p-4 sm:p-8 shadow-2xl space-y-6">
            {/* Slide Navigation Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
              {PREVIEW_SLIDES.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setPreviewSlide(idx)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2 ${
                    previewSlide === idx
                      ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5 hover:border-white/15'
                  }`}
                >
                  <span>{slide.title}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    previewSlide === idx ? 'bg-black/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {slide.tag}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Slide Viewer with Mac-style browser chrome */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/15 overflow-hidden bg-[#070a10] shadow-2xl">
                {/* Browser bar */}
                <div className="bg-[#161b22] px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                    <span className="ml-3 text-xs font-mono text-slate-400 hidden sm:inline-block">
                      https://workshop.theplately.com
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                      Live Production ✓
                    </span>
                    <a
                      href="https://workshop.theplately.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
                    >
                      <span className="hidden sm:inline">Open Live</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Screenshot Frame */}
                <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden flex items-center justify-center">
                  <img
                    src={PREVIEW_SLIDES[previewSlide].src}
                    alt={PREVIEW_SLIDES[previewSlide].title}
                    className="w-full h-full object-cover object-top transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Description & Navigation Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 px-2">
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center space-x-2">
                    <span>{PREVIEW_SLIDES[previewSlide].title}</span>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {PREVIEW_SLIDES[previewSlide].tag}
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-sans">
                    {PREVIEW_SLIDES[previewSlide].desc}
                  </p>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-auto">
                  <button
                    onClick={() => setPreviewSlide((prev) => (prev > 0 ? prev - 1 : PREVIEW_SLIDES.length - 1))}
                    className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/50 transition-all"
                    title="Previous Slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-slate-400 px-2">
                    {previewSlide + 1} / {PREVIEW_SLIDES.length}
                  </span>
                  <button
                    onClick={() => setPreviewSlide((prev) => (prev < PREVIEW_SLIDES.length - 1 ? prev + 1 : 0))}
                    className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/50 transition-all"
                    title="Next Slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CORE PLATFORM PILLARS (5 Powerful Grid Cards) */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-brand-400 uppercase tracking-widest bg-brand-500/10 px-3.5 py-1.5 rounded-full border border-brand-500/20">
              END-TO-END RESTAURANT ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white">
              Everything Your Kitchen Needs to Dominate.
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Replace five separate disjointed subscriptions (Squarespace, Toast KDS, OpenTable, DoorDash, Mailchimp) with one unified, synchronized engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1: AI Website Studio */}
            <div className="bg-[#0f141f] border border-white/10 p-8 rounded-3xl space-y-4 hover:border-brand-500/50 transition-all shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center text-brand-400 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">AI-Native Website Studio</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Turn physical menu photos or voice prompts into high-converting storefronts. Multi-viewport preview, reorderable visual blocks, and verified schema execution.
              </p>
              <ul className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Gemini 2.5 Flash / Pro model selector</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Custom domains with zero-config SSL</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2: Live KDS */}
            <div className="bg-[#0f141f] border border-white/10 p-8 rounded-3xl space-y-4 hover:border-emerald-500/50 transition-all shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">Live Multi-State KDS</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Low-latency WebSocket order pipelines connecting POS, website storefronts, and diner clients. Acoustic chimes, bump bars, and thermal receipt printing.
              </p>
              <ul className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Interactive Incoming &gt; Prep &gt; Ready states</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Thermal printer ESC/POS integration</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3: Floor Plans & Reservations */}
            <div className="bg-[#0f141f] border border-white/10 p-8 rounded-3xl space-y-4 hover:border-blue-500/50 transition-all shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">Interactive Floor Plans</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Drag-and-drop architectural table layout canvas. Guests pick specific tables when booking online, avoiding double-bookings and aggregator seat fees.
              </p>
              <ul className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>0% commission table reservation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Real-time occupancy & turn time analytics</span>
                </li>
              </ul>
            </div>

            {/* Pillar 4: Noor Logistics Fleet */}
            <div className="bg-[#0f141f] border border-white/10 p-8 rounded-3xl space-y-4 hover:border-purple-500/50 transition-all shadow-xl group md:col-span-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-3 sm:max-w-md">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <Truck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-white">Noor Delivery Fleet Logistics</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Intelligent courier routing matches drivers automatically based on kitchen cook completion ETAs. Live telemetry, customer tracking links, and zero 30% delivery commission deductions.
                  </p>
                </div>
                
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>COURIER ASSIGNMENT:</span>
                    <span className="text-emerald-400 font-bold">Automatic</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>AVG DISPATCH TIME:</span>
                    <span className="text-white font-bold">1m 12s</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>AGGREGATOR SAVINGS:</span>
                    <span className="text-brand-400 font-bold">+$14,200/mo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 5: AI Marketing Agents */}
            <div className="bg-[#0f141f] border border-white/10 p-8 rounded-3xl space-y-4 hover:border-amber-500/50 transition-all shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">Autonomous Marketing Agents</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Workshop agents generate video reels from kitchen footage and dish photos, automatically publishing promotions straight to Plately.app Explore feeds.
              </p>
            </div>

          </div>
        </section>

        {/* 4. THE 0% COMMISSION ECONOMIC REVOLUTION */}
        <section className="bg-gradient-to-br from-[#121723] via-[#0f141f] to-[#0a0d14] border border-white/10 rounded-[36px] p-8 md:p-14 shadow-2xl space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              FAIR RESTAURANT ECONOMICS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
              Why Pay 30% to Aggregators?
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Traditional delivery platforms take up to 30% of gross revenue and withhold customer emails. Plately Workshop operates on 0% commission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-red-950/20 border border-red-500/30 p-6 rounded-3xl space-y-4">
              <h4 className="text-lg font-bold text-red-400 font-display">Traditional Aggregator Apps</h4>
              <ul className="space-y-3 text-xs text-slate-300 font-sans">
                <li className="flex items-center space-x-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span><strong>30% Commission:</strong> On a $40,000 monthly volume, you lose $12,000 every single month.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span><strong>Zero Customer Ownership:</strong> You never receive diner phone numbers or emails.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span><strong>Competitor Ads:</strong> Aggregators advertise competing restaurants on your menu page.</span>
                </li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 p-6 rounded-3xl space-y-4">
              <h4 className="text-lg font-bold text-emerald-400 font-display">Plately Workshop Ecosystem</h4>
              <ul className="space-y-3 text-xs text-slate-300 font-sans">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span><strong>0% Commission:</strong> Keep 100% of your food sales. Transparent flat SaaS pricing.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span><strong>100% Guest Ownership:</strong> Retain full diner CRM profiles, dietary notes, and repeat order history.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span><strong>Your Branded Storefront:</strong> Custom domain (<code className="text-emerald-300 font-mono text-[11px]">order.yourbrand.com</code>) with zero competitor distractions.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. BOTTOM B2B CTA */}
        <section className="text-center max-w-4xl mx-auto bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/40 border border-emerald-500/30 p-12 rounded-[36px] shadow-2xl space-y-6">
          <div className="w-14 h-14 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
            <Monitor className="w-7 h-7" />
          </div>

          <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            Ready to Take Control of Your Restaurant's Future?
          </h3>

          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join hundreds of visionary culinary entrepreneurs running on Plately Workshop OS. Launch your AI storefront in under 3 minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="https://workshop.theplately.com"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center space-x-2 text-sm"
            >
              <Monitor className="w-4 h-4" />
              <span>Launch Workshop Free</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => onNavigate && onNavigate('pricing')}
              className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl border border-slate-700 text-sm transition-all"
            >
              <span>View Pricing Plans</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
