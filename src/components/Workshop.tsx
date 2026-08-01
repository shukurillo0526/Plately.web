import React from 'react';
import { motion } from 'motion/react';
import { 
  Monitor, 
  ChefHat, 
  Truck, 
  LineChart, 
  ClipboardList, 
  Users,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';

export default function Workshop() {
  return (
    <div className="min-h-screen bg-cream-50 pt-20 pb-24 overflow-hidden relative selection:bg-brand-500 selection:text-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none opacity-50" />
      <div className="absolute bottom-[20%] right-[-5%] w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center space-x-2 bg-brand-100/50 text-brand-700 px-4 py-2 rounded-full text-sm font-bold border border-brand-200/50 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              <span>Plately Workshop for B2B</span>
            </span>
            <h1 className="text-5xl md:text-6xl font-black font-display text-cream-950 tracking-tight leading-[1.1] mb-6">
              The Engine for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-orange-400">
                Modern Restaurants
              </span>
            </h1>
            <p className="text-xl text-cream-600 leading-relaxed font-medium">
              A comprehensive Kitchen Display System (KDS), Dispatch router, and Menu Manager designed to synchronize your entire operation with Plately's consumer app.
            </p>
          </motion.div>
        </div>

        {/* B2B Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          
          {/* Feature 1: KDS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-3xl p-8 border border-cream-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-100/50 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
            <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center mb-6 relative z-10">
              <Monitor className="w-7 h-7 text-brand-600" />
            </div>
            <h3 className="text-2xl font-bold font-display text-cream-950 mb-3">Kitchen Display System</h3>
            <p className="text-cream-600 leading-relaxed mb-6">
              A real-time, interactive KDS that tracks order states, prep times, and ticket delays. Cooks can bump tickets instantly, synchronizing status to front-of-house.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-sm font-semibold text-cream-700">
                <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" /> Live ticket syncing
              </li>
              <li className="flex items-center text-sm font-semibold text-cream-700">
                <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" /> Prep time analytics
              </li>
            </ul>
          </motion.div>

          {/* Feature 2: Dispatch */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl relative overflow-hidden group text-white"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
            <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 relative z-10 border border-slate-700">
              <Truck className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold font-display text-white mb-3">Dispatch & Delivery</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Connect drivers with ready orders automatically. See live driver ETAs, auto-assign couriers based on kitchen output, and notify customers.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-sm font-semibold text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" /> Auto-courier assignment
              </li>
              <li className="flex items-center text-sm font-semibold text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" /> Heatmap analytics
              </li>
            </ul>
          </motion.div>

          {/* Feature 3: Orders & Menu */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-3xl p-8 border border-cream-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group md:col-span-2"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="md:w-1/2">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100">
                  <ClipboardList className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold font-display text-cream-950 mb-3">Unified Order Management</h3>
                <p className="text-cream-600 leading-relaxed mb-6">
                  Manage stock levels, toggle menu items instantly across platforms, and review full order lifecycles from submission to completion all in a single dashboard.
                </p>
                <button className="flex items-center font-bold text-brand-600 hover:text-brand-500 transition-colors">
                  Explore Menu Management <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              
              <div className="md:w-1/2 bg-cream-100/50 rounded-2xl p-6 border border-cream-200">
                <div className="space-y-4">
                  {/* Mock UI Row */}
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-cream-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <ChefHat className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-cream-900">Garlic Chicken Bowl</p>
                        <p className="text-xs text-emerald-600 font-semibold">In Stock</p>
                      </div>
                    </div>
                    <div className="h-6 w-10 bg-emerald-500 rounded-full flex items-center p-1 justify-end">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  
                  {/* Mock UI Row */}
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-cream-200 flex items-center justify-between opacity-60">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                        <ChefHat className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-cream-900">Avocado Toast</p>
                        <p className="text-xs text-red-500 font-semibold">Out of Stock</p>
                      </div>
                    </div>
                    <div className="h-6 w-10 bg-slate-200 rounded-full flex items-center p-1 justify-start">
                      <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Value Props Section */}
        <div className="bg-white rounded-[2rem] border border-cream-200 p-10 md:p-16 text-center shadow-xl mb-24 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black font-display text-cream-950 mb-12">
              Why restaurants choose Plately
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-cream-50 rounded-2xl flex items-center justify-center mb-6">
                  <LineChart className="w-8 h-8 text-brand-500" />
                </div>
                <h4 className="text-lg font-bold text-cream-950 mb-2">Deep Analytics</h4>
                <p className="text-sm text-cream-600 leading-relaxed text-center">Track ticket times, popular items, and peak hour bottlenecks to optimize kitchen flow.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-cream-50 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-8 h-8 text-emerald-500" />
                </div>
                <h4 className="text-lg font-bold text-cream-950 mb-2">Enterprise Reliability</h4>
                <p className="text-sm text-cream-600 leading-relaxed text-center">Built on Supabase and Next.js for zero-downtime menu syncing and offline robustness.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-cream-50 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
                <h4 className="text-lg font-bold text-cream-950 mb-2">Customer CRM</h4>
                <p className="text-sm text-cream-600 leading-relaxed text-center">Maintain order histories, dietary preferences, and reviews linked directly to consumer accounts.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Inline missing icon component
function CheckCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
