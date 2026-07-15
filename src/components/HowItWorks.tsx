import React, { useState } from 'react';
import { 
  ScanLine, 
  Sparkles, 
  Calendar, 
  Utensils, 
  Camera, 
  CheckCircle, 
  ArrowRight, 
  ChevronRight, 
  Clock, 
  Play, 
  Flame, 
  ClipboardList 
} from 'lucide-react';
import { PageType } from '../types';

interface HowItWorksProps {
  onNavigate: (page: PageType) => void;
  onOpenBetaModal: () => void;
}

export default function HowItWorks({ onNavigate, onOpenBetaModal }: HowItWorksProps) {
  const [activeFlow, setActiveFlow] = useState<1 | 2 | 3>(1);

  return (
    <div className="space-y-24 pb-20">
      
      {/* HEADER */}
      <section className="text-center pt-12 max-w-4xl mx-auto px-4">
        <span className="text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full uppercase tracking-wider">
          The Plately Process
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-cream-900 mt-4 tracking-tight leading-tight">
          How Plately works, step‑by‑step.
        </h1>
        <p className="text-sm md:text-base text-cream-600 font-sans mt-4 max-w-2xl mx-auto leading-relaxed">
          Kitchen automation shouldn't require complex training. Plately operates in three intuitive, self-correcting loops that align perfectly with your daily grocery habits.
        </p>

        {/* Flow Switcher */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-12 max-w-4xl mx-auto">
          <button 
            onClick={() => setActiveFlow(1)}
            className={`p-4 rounded-2xl text-left border transition-all flex items-start space-x-3 ${activeFlow === 1 ? 'bg-white border-brand-300 shadow-sm ring-1 ring-brand-400' : 'bg-cream-100 border-cream-200 hover:bg-cream-200/50'}`}
          >
            <div className={`p-2 rounded-lg ${activeFlow === 1 ? 'bg-brand-600 text-white' : 'bg-cream-200 text-cream-600'}`}>
              <ScanLine className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-cream-900">Flow 1: Digitize & Save</h4>
              <p className="text-[10px] text-cream-500 mt-0.5">Scan grocery slips to build active pantry list</p>
            </div>
          </button>

          <button 
            onClick={() => setActiveFlow(2)}
            className={`p-4 rounded-2xl text-left border transition-all flex items-start space-x-3 ${activeFlow === 2 ? 'bg-white border-brand-300 shadow-sm ring-1 ring-brand-400' : 'bg-cream-100 border-cream-200 hover:bg-cream-200/50'}`}
          >
            <div className={`p-2 rounded-lg ${activeFlow === 2 ? 'bg-brand-600 text-white' : 'bg-cream-200 text-cream-600'}`}>
              <Utensils className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-cream-900">Flow 2: Cook & Log</h4>
              <p className="text-[10px] text-cream-500 mt-0.5">Follow guided recipes with zero-click calorie log</p>
            </div>
          </button>

          <button 
            onClick={() => setActiveFlow(3)}
            className={`p-4 rounded-2xl text-left border transition-all flex items-start space-x-3 ${activeFlow === 3 ? 'bg-white border-brand-300 shadow-sm ring-1 ring-brand-400' : 'bg-cream-100 border-cream-200 hover:bg-cream-200/50'}`}
          >
            <div className={`p-2 rounded-lg ${activeFlow === 3 ? 'bg-brand-600 text-white' : 'bg-cream-200 text-cream-600'}`}>
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-cream-900">Flow 3: Prep & Portion</h4>
              <p className="text-[10px] text-cream-500 mt-0.5">Scale bulk recipes and track container shelf-lives</p>
            </div>
          </button>
        </div>
      </section>

      {/* DETAILED DIAGRAM CHUNK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeFlow === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-cream-200 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-cream-100 pb-3">
                <span className="text-xs font-mono font-bold text-cream-400">DIGITAL PANTRY INVENTORY</span>
                <span className="text-[10px] bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-0.5 rounded font-bold">Auto-Populated</span>
              </div>
              
              <div className="space-y-2">
                <div className="p-3 bg-cream-50 rounded-xl border border-cream-200 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="font-semibold text-cream-800">Fresh Salmon Fillet</span>
                  </div>
                  <span className="text-cream-400 font-mono">Qty: 400g • Expires tomorrow</span>
                </div>
                <div className="p-3 bg-cream-50 rounded-xl border border-cream-200 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <span className="font-semibold text-cream-800">Organic Baby Spinach</span>
                  </div>
                  <span className="text-cream-400 font-mono">Qty: 1 bag • Expires in 2 days</span>
                </div>
              </div>

              <div className="bg-brand-50 border border-brand-200 p-3 rounded-xl flex items-center justify-between text-xs text-brand-800 font-medium">
                <span>Plately suggests: "Pan-Seared Salmon Salad"</span>
                <button 
                  onClick={() => setActiveFlow(2)}
                  className="font-bold flex items-center space-x-0.5 text-brand-900 hover:underline"
                >
                  <span>Cook</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Steps Column */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-2xl font-bold font-display text-cream-900">
                Flow 1: Digitize and save food from rotting.
              </h3>
              
              <div className="space-y-6 relative border-l border-cream-200 pl-6 ml-3">
                
                <div className="relative">
                  <span className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold font-mono flex items-center justify-center">1</span>
                  <h4 className="text-sm font-bold text-cream-900">Scan Grocery Receipts</h4>
                  <p className="text-xs text-cream-600 font-sans mt-1 leading-relaxed">
                    Come home from Safeway, Trader Joe's, or Whole Foods and simply take a quick photo of your physical receipt. Our OCR engine handles line extraction and assigns standard shelf-lives.
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold font-mono flex items-center justify-center">2</span>
                  <h4 className="text-sm font-bold text-cream-900">Plately Builds Digital Fridge</h4>
                  <p className="text-xs text-cream-600 font-sans mt-1 leading-relaxed">
                    Ingredients are categorized automatically into digital "Pantry", "Fridge", and "Freezer" zones with active freshness countdowns. No manual data entry required.
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold font-mono flex items-center justify-center">3</span>
                  <h4 className="text-sm font-bold text-cream-900">Get Proactive Expiry Alerts</h4>
                  <p className="text-xs text-cream-600 font-sans mt-1 leading-relaxed">
                    Instead of discovering moldy peppers in your crisper drawer, receive a warning 48 hours prior to spoilage alongside custom recipes that use those exact ingredients.
                  </p>
                </div>

              </div>
            </div>

          </div>
        )}

        {activeFlow === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-cream-200 shadow-xl space-y-4">
              <div className="bg-brand-900 text-white p-4 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-brand-300">ACTIVE SESSION</p>
                  <h4 className="text-xs font-bold">Salmon & Crisp Spinach</h4>
                </div>
                <span className="text-[10px] bg-brand-800 text-brand-100 px-2 py-0.5 rounded font-mono">Step 2 of 3</span>
              </div>

              <div className="bg-cream-50 p-4 rounded-xl border border-cream-200 space-y-2">
                <p className="text-xs font-medium text-cream-700">
                  Sear salmon flesh-side down for 4 minutes. Our smart timer is running:
                </p>
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cream-900">
                  <Clock className="h-4 w-4 text-brand-600" />
                  <span>Remaining: 2m 45s</span>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800 font-semibold">
                <span>Completed! Automatically logged 420 calories.</span>
                <CheckCircle className="h-4 w-4 text-emerald-600" />
              </div>
            </div>

            {/* Steps Column */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-2xl font-bold font-display text-cream-900">
                Flow 2: Cook and automatically log nutrition.
              </h3>
              
              <div className="space-y-6 relative border-l border-cream-200 pl-6 ml-3">
                
                <div className="relative">
                  <span className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold font-mono flex items-center justify-center">1</span>
                  <h4 className="text-sm font-bold text-cream-900">Select an Inventory-Aware Recipe</h4>
                  <p className="text-xs text-cream-600 font-sans mt-1 leading-relaxed">
                    Browse suggested recipes or generate dynamic culinary ideas built strictly around ingredients that already sit in your physical cabinet zones.
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold font-mono flex items-center justify-center">2</span>
                  <h4 className="text-sm font-bold text-cream-900">Follow Guided Cooking steps</h4>
                  <p className="text-xs text-cream-600 font-sans mt-1 leading-relaxed">
                    Launches full-screen Cook Mode. Check off completed steps, toggle skillet and baking timers directly in-app, and utilize hands-free text-to-speech.
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold font-mono flex items-center justify-center">3</span>
                  <h4 className="text-sm font-bold text-cream-900">Auto-Log Your Macro Profile</h4>
                  <p className="text-xs text-cream-600 font-sans mt-1 leading-relaxed">
                    Once you hit "Complete", Plately subtracts the ingredients from your active digital fridge and automatically saves nutritional values (calories, macros) to your daily logs.
                  </p>
                </div>

              </div>
            </div>

          </div>
        )}

        {activeFlow === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-cream-200 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-cream-100 pb-3">
                <span className="text-xs font-mono font-bold text-cream-400">MEAL PREP BOX MANAGER</span>
                <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded font-bold">Batch Cooking</span>
              </div>

              <div className="space-y-2">
                <div className="p-3.5 bg-cream-50 rounded-xl border border-cream-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-cream-800">Spiced Beef Sweet Potato bowls</p>
                    <p className="text-[10px] text-cream-400">Box 1-4 • Refrigerator Shelf 3</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 font-bold text-[10px] rounded">
                    Expires in 2 days
                  </span>
                </div>

                <div className="p-3.5 bg-cream-50 rounded-xl border border-cream-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-cream-800">Cajun Chicken Quinoa</p>
                    <p className="text-[10px] text-cream-400">Box 5-8 • Freezer Chest</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 font-bold text-[10px] rounded font-mono">
                    Frozen safe
                  </span>
                </div>
              </div>
            </div>

            {/* Steps Column */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-2xl font-bold font-display text-cream-900">
                Flow 3: Plan once, prepare bulk, eat all week.
              </h3>
              
              <div className="space-y-6 relative border-l border-cream-200 pl-6 ml-3">
                
                <div className="relative">
                  <span className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold font-mono flex items-center justify-center">1</span>
                  <h4 className="text-sm font-bold text-cream-900">Select serving scale count</h4>
                  <p className="text-xs text-cream-600 font-sans mt-1 leading-relaxed">
                    Plan high-yield cooking. Choose 4 to 12 portions of a customized quinoa bake or seasoned beef mix. Plately handles ingredient multiplication and pan-size estimations.
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold font-mono flex items-center justify-center">2</span>
                  <h4 className="text-sm font-bold text-cream-900">Register Plastic Container Boxes</h4>
                  <p className="text-xs text-cream-600 font-sans mt-1 leading-relaxed">
                    Once cooked, portion into lunchboxes and register them in Plately's bulk tracker. The app assigns safe refrigeration timelines and reminds you before taste degrades.
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold font-mono flex items-center justify-center">3</span>
                  <h4 className="text-sm font-bold text-cream-900">Defrost & Swipe Away</h4>
                  <p className="text-xs text-cream-600 font-sans mt-1 leading-relaxed">
                    As you eat container portions throughout the work-week, simply swipe the boxes away in your app. It auto-updates your macros and keeps freezer databases aligned.
                  </p>
                </div>

              </div>
            </div>

          </div>
        )}
      </section>

      {/* QUICK FOOTER CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="bg-brand-50 border border-brand-200 rounded-3xl p-8 max-w-3xl mx-auto space-y-4">
          <p className="text-xs font-bold text-brand-700 uppercase tracking-widest">GET FIRST-HAND EXPERIENCE</p>
          <h4 className="text-xl font-bold font-display text-brand-950">We are currently accepting beta registrations for our Summer cohorts.</h4>
          <p className="text-xs text-brand-800">
            No charge or billing credentials required. Setup takes less than 60 seconds of your afternoon.
          </p>
          <button 
            onClick={onOpenBetaModal}
            className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl text-xs transition-all shadow-md inline-flex items-center space-x-1"
          >
            <span>Claim Free Invitation</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
