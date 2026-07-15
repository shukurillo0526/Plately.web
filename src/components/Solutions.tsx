import React from 'react';
import { 
  Leaf, 
  Flame, 
  Compass, 
  Calendar, 
  TrendingUp, 
  User, 
  ShieldCheck, 
  ChevronRight, 
  DollarSign, 
  Smile, 
  Users, 
  Briefcase 
} from 'lucide-react';
import { PageType } from '../types';

interface SolutionsProps {
  onNavigate: (page: PageType) => void;
  onOpenBetaModal: () => void;
}

export default function Solutions({ onNavigate, onOpenBetaModal }: SolutionsProps) {
  return (
    <div className="space-y-24 pb-20">
      
      {/* HEADER */}
      <section className="text-center pt-12 max-w-4xl mx-auto px-4">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
          Tailored Solutions
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-cream-900 mt-4 tracking-tight leading-tight">
          How Plately fits into your life.
        </h1>
        <p className="text-sm md:text-base text-cream-600 font-sans mt-4 max-w-2xl mx-auto leading-relaxed">
          Whether you are trying to cut back on wasted money, build a gym-fueling protein program, or simply stop answering "What's for dinner?", Plately has a curated workflow for you.
        </p>
      </section>

      {/* SOLUTIONS CONTAINER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* MARKET 1: FOOD WASTE REDUCTION */}
        <div id="solution-food-waste" className="bg-white rounded-3xl border border-cream-200 p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-100/50 rounded-full blur-2xl pointer-events-none" />
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-brand-800 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
              <Leaf className="h-3.5 w-3.5" />
              <span>For Families & Eco-Conscious Households</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-extrabold font-display text-cream-900 tracking-tight">
              Eliminate Food Waste. Save Hard-Earned Money.
            </h2>

            <div className="space-y-4 font-sans text-xs">
              <p className="text-cream-600 leading-relaxed">
                <strong>The Problem:</strong> The average household tosses out roughly 25% of fresh ingredients, totaling more than $1,500 in wasted money per year. Grocery lists are bought with good intentions, but forgotten behind outer bottles.
              </p>
              <p className="text-cream-600 leading-relaxed">
                <strong>The Plately Solution:</strong> Receive passive notifications 48 hours before fresh proteins, green lettuces, or milk cartons spoil. Our "Use It Up" recipe engine scans your shelf list and compiles easy dinners around critical items, meaning you buy what you eat, and eat what you buy.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-cream-100">
              <div>
                <p className="text-xl font-black font-display text-brand-600">$1,500+</p>
                <p className="text-[10px] text-cream-500 font-sans uppercase">Avg. Money Saved</p>
              </div>
              <div>
                <p className="text-xl font-black font-display text-brand-600">80%</p>
                <p className="text-[10px] text-cream-500 font-sans uppercase">Waste Reduced</p>
              </div>
              <div>
                <p className="text-xl font-black font-display text-brand-600">30kg</p>
                <p className="text-[10px] text-cream-500 font-sans uppercase">CO2 Prevented</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-2">
              <button 
                onClick={onOpenBetaModal}
                className="px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center space-x-1"
              >
                <span>Protect my Fridge</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
              <button 
                onClick={() => onNavigate('features')}
                className="text-xs font-bold text-cream-600 hover:text-cream-800"
              >
                See Freshness Zones
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-cream-50 rounded-2xl p-6 border border-cream-200 space-y-4">
            <h4 className="text-xs font-mono font-bold text-cream-400 uppercase tracking-wider">REAL WORLD HOUSEHOLD EXPERIENCE</h4>
            <p className="text-xs italic text-cream-600 leading-relaxed font-sans">
              "We used to buy fresh berries and baby spinach on Sundays, only to throw them out slimy on Thursdays. Plately's recipe engine suggested a Spinach Ricotta Frittata that used up our eggs and spinach in one go. We haven't wasted food in months!"
            </p>
            <div className="flex items-center space-x-2 pt-2 border-t border-cream-200">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-800 text-xs">
                S
              </div>
              <div>
                <p className="text-[11px] font-bold text-cream-800">The Sullivans</p>
                <p className="text-[9px] text-cream-500">4-person household in Oregon</p>
              </div>
            </div>
          </div>

        </div>

        {/* MARKET 2: HEALTHY EATING */}
        <div id="solution-healthy-eating" className="bg-white rounded-3xl border border-cream-200 p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full blur-2xl pointer-events-none" />
          
          <div className="lg:col-span-5 bg-cream-50 rounded-2xl p-6 border border-cream-200 space-y-4 order-last lg:order-first">
            <h4 className="text-xs font-mono font-bold text-cream-400 uppercase tracking-wider">FITNESS INCORPORATION CASE STUDY</h4>
            <p className="text-xs italic text-cream-600 leading-relaxed font-sans">
              "Most dieting apps feel like a strict math test—manually searching database numbers is exhausting. Plately's automated recipe macro log makes staying on track painless. I just cook, cook mode finishes, and it's automatically synced to my Google Fit."
            </p>
            <div className="flex items-center space-x-2 pt-2 border-t border-cream-200">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-800 text-xs">
                M
              </div>
              <div>
                <p className="text-[11px] font-bold text-cream-800">Marcus Vance</p>
                <p className="text-[9px] text-cream-500">Marathon Prep & Amateur Baker</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              <TrendingUp className="h-3.5 w-3.5 animate-pulse" />
              <span>For Fitness & Caloric Stability</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-extrabold font-display text-cream-900 tracking-tight">
              Habit-Building Nutrition. Zero Manual Arithmetic.
            </h2>

            <div className="space-y-4 font-sans text-xs">
              <p className="text-cream-600 leading-relaxed">
                <strong>The Problem:</strong> Tracking carbs, fats, and protein is critical for physical health goals. But manual calorie-counting logs require tedious ingredient searching and constant scale-weighing, leading 85% of dieters to quit within two weeks.
              </p>
              <p className="text-cream-600 leading-relaxed">
                <strong>The Plately Solution:</strong> Plately converts your ingredients list to micro-macros on your behalf. Simply follow the guided step-by-step recipes; finishing a session automatically posts exact metrics directly into your personal log.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-cream-100">
              <div>
                <p className="text-xl font-black font-display text-emerald-600">100%</p>
                <p className="text-[10px] text-cream-500 font-sans uppercase">Automatic logging</p>
              </div>
              <div>
                <p className="text-xl font-black font-display text-emerald-600">Google</p>
                <p className="text-[10px] text-cream-500 font-sans uppercase">Fit & Health Sync</p>
              </div>
              <div>
                <p className="text-xl font-black font-display text-emerald-600">AI Scan</p>
                <p className="text-[10px] text-cream-500 font-sans uppercase">Macro Photo Parser</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-2">
              <button 
                onClick={onOpenBetaModal}
                className="px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center space-x-1"
              >
                <span>Log Meals Automatically</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
              <button 
                onClick={() => onNavigate('features')}
                className="text-xs font-bold text-cream-600 hover:text-cream-800"
              >
                How Photo Estimation works
              </button>
            </div>
          </div>

        </div>

        {/* MARKET 3: EVERYDAY COOKING */}
        <div id="solution-decision-fatigue" className="bg-white rounded-3xl border border-cream-200 p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100/50 rounded-full blur-2xl pointer-events-none" />
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-yellow-800 bg-yellow-50 border border-yellow-200 px-3 py-1 rounded-full">
              <Compass className="h-3.5 w-3.5" />
              <span>For Busy Professionals & Quick Dinners</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-extrabold font-display text-cream-900 tracking-tight">
              Beat Decision Fatigue. Open Plately & Cook.
            </h2>

            <div className="space-y-4 font-sans text-xs">
              <p className="text-cream-600 leading-relaxed">
                <strong>The Problem:</strong> "What do I cook?" is the ultimate exhaustion vector after a 9-hour workday. Usually, we end up opening food delivery apps, spending $35 on cold noodles, while raw chicken sits in the freezer.
              </p>
              <p className="text-cream-600 leading-relaxed">
                <strong>The Plately Solution:</strong> Unlock dinner instantly based on items you already own. Plately organizes recipes around your individual cooking skills, dietary constraints, and active prep duration. No more scouring Pinterest for random lists.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-cream-100">
              <div>
                <p className="text-xl font-black font-display text-yellow-600">3 clicks</p>
                <p className="text-[10px] text-cream-500 font-sans uppercase">To start skillet</p>
              </div>
              <div>
                <p className="text-xl font-black font-display text-yellow-600">15 min</p>
                <p className="text-[10px] text-cream-500 font-sans uppercase">Speed prep options</p>
              </div>
              <div>
                <p className="text-xl font-black font-display text-yellow-600">0 Ads</p>
                <p className="text-[10px] text-cream-500 font-sans uppercase">Zero blog essays</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-2">
              <button 
                onClick={onOpenBetaModal}
                className="px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center space-x-1"
              >
                <span>End Dinner Panic</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
              <button 
                onClick={() => onNavigate('features')}
                className="text-xs font-bold text-cream-600 hover:text-cream-800"
              >
                Browse Cook Screens
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-cream-50 rounded-2xl p-6 border border-cream-200 space-y-4">
            <h4 className="text-xs font-mono font-bold text-cream-400 uppercase tracking-wider">PROFESSIONAL WORK-WEEK VERDICT</h4>
            <p className="text-xs italic text-cream-600 leading-relaxed font-sans">
              "After long consulting hours, the last thing my brain wants is to research healthy recipes. With Plately, I just open the app. It knows I have spinach, onions, and salmon, and instantly shows a 20-min recipe with step-by-step checkboxes. It's my daily savior."
            </p>
            <div className="flex items-center space-x-2 pt-2 border-t border-cream-200">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center font-bold text-yellow-800 text-xs">
                CL
              </div>
              <div>
                <p className="text-[11px] font-bold text-cream-800">Claire Lin</p>
                <p className="text-[9px] text-cream-500">Strategy Consultant at McKinsey</p>
              </div>
            </div>
          </div>

        </div>

        {/* MARKET 4: BULK COOKING */}
        <div id="solution-meal-prep" className="bg-white rounded-3xl border border-cream-200 p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl pointer-events-none" />
          
          <div className="lg:col-span-5 bg-cream-50 rounded-2xl p-6 border border-cream-200 space-y-4 order-last lg:order-first">
            <h4 className="text-xs font-mono font-bold text-cream-400 uppercase tracking-wider">BULK BATCH PREPARATION FEEDBACK</h4>
            <p className="text-xs italic text-cream-600 leading-relaxed font-sans">
              "Cooking 10 portions of chicken and quinoa usually meant food got dried out or moldy by Thursday because I lost track of box storage dates. Plately's container expiry alerts tell me exactly when to shift box 5-8 into the freezer. It’s perfect."
            </p>
            <div className="flex items-center space-x-2 pt-2 border-t border-cream-200">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-800 text-xs">
                JR
              </div>
              <div>
                <p className="text-[11px] font-bold text-cream-800">Jordan Reyes</p>
                <p className="text-[9px] text-cream-500">Powerlifter & High school Coach</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              <Calendar className="h-3.5 w-3.5" />
              <span>For Bulk Preppers & Powerlifters</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-extrabold font-display text-cream-900 tracking-tight">
              Prep Once, Eat All Week. Keep Freshness Locked.
            </h2>

            <div className="space-y-4 font-sans text-xs">
              <p className="text-cream-600 leading-relaxed">
                <strong>The Problem:</strong> Batch cooking saves hours. But storing 8 plastic lunchboxes inside the fridge has risks—dishes lose moisture quickly, and meal fatigue kicks in. Without warnings, boxes spoil at the back of the shelf.
              </p>
              <p className="text-cream-600 leading-relaxed">
                <strong>The Plately Solution:</strong> Dedicate an active plan to Sunday prepping. Set serving counts, print box barcodes, and register container slots in Zone 3. Plately watches the refrigeration lifespans and lets you swipe boxes away as they are eaten.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-cream-100">
              <div>
                <p className="text-xl font-black font-display text-blue-600">6 Hours</p>
                <p className="text-[10px] text-cream-500 font-sans uppercase">Saved per week</p>
              </div>
              <div>
                <p className="text-xl font-black font-display text-blue-600">Label</p>
                <p className="text-[10px] text-cream-500 font-sans uppercase">Barcode system</p>
              </div>
              <div>
                <p className="text-xl font-black font-display text-blue-600">Freezer</p>
                <p className="text-[10px] text-cream-500 font-sans uppercase">Defrost alerts</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-2">
              <button 
                onClick={onOpenBetaModal}
                className="px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center space-x-1"
              >
                <span>Launch Prep Session</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
              <button 
                onClick={() => onNavigate('features')}
                className="text-xs font-bold text-cream-600 hover:text-cream-800"
              >
                Review Prep dashboard
              </button>
            </div>
          </div>

        </div>

      </section>

      {/* FOOTER ACTION BANNER */}
      <section className="bg-cream-900 text-white py-16 text-center max-w-7xl mx-auto rounded-3xl">
        <div className="max-w-2xl mx-auto space-y-6 px-4">
          <Smile className="h-10 w-10 text-brand-400 mx-auto" />
          <h2 className="text-3xl font-bold font-display">Ready to experience the kitchen of 2026?</h2>
          <p className="text-xs text-cream-300">
            Sign up today to gain immediate priority access to the consumer beta. It is 100% free while we finalize our machine-learning receipt scanner algorithms.
          </p>
          <button 
            onClick={onOpenBetaModal}
            className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-cream-950 font-bold rounded-xl transition-all shadow-lg text-xs"
          >
            Claim Free Beta Account
          </button>
        </div>
      </section>
      
    </div>
  );
}
