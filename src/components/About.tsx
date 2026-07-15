import React from 'react';
import { 
  Leaf, 
  Award, 
  Heart, 
  Sparkles, 
  Milestone, 
  Calendar, 
  ChevronRight, 
  GraduationCap, 
  Dumbbell, 
  Briefcase, 
  PiggyBank, 
  Camera, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';

interface AboutProps {
  onOpenBetaModal: () => void;
}

export default function About({ onOpenBetaModal }: AboutProps) {
  return (
    <div className="space-y-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* MISSION CARD */}
      <section className="pt-12 max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-brand-600 via-brand-700 to-emerald-800 text-white p-8 md:p-14 rounded-3xl shadow-xl space-y-6 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <span className="text-xs font-mono tracking-widest font-extrabold text-brand-200 uppercase bg-white/10 px-3.5 py-1.5 rounded-full inline-block">
            OUR NORTH STAR MISSION
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-display leading-tight max-w-4xl mx-auto tracking-tight">
            “To eliminate household food waste, simplify kitchen schedules, and make mindful eating sustainable in the real world.”
          </h1>
          <div className="w-16 bg-brand-300 h-1.5 rounded mx-auto" />
        </div>
      </section>

      {/* FOUNDER'S REAL STORY */}
      <section className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Story Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1.5 rounded-full uppercase tracking-wider">
                Founder's Story
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-display text-cream-900 leading-tight tracking-tight">
                From a small kitchen stove in SKKU to a global waste-free kitchen ecosystem.
              </h2>
            </div>
            
            <div className="space-y-5 text-sm text-cream-600 leading-relaxed font-sans">
              <p>
                My name is <strong className="text-cream-900">Shukurillo Mamarasulov</strong>, and I am the solo developer behind Plately. 
                For the first time in my life, I had to pack my bags and leave my home behind. I had never lived away from my family for more than a single month, let alone outside my beloved <strong className="text-cream-900">Vodiy region</strong>. But I got accepted into <strong className="text-cream-900">Sungkyunkwan University (SKKU)</strong> and moved to South Korea.
              </p>
              
              <p>
                I had never cooked a meal in my life. Suddenly, out of sheer necessity, I was forced to cook. I tried replication of traditional national foods, but quickly grew exhausted by the repetition. To make things more difficult, I faced tight financial constraints, meaning my grocery options were extremely limited.
              </p>

              <div className="bg-cream-50 p-5 rounded-2xl border border-cream-200/80 space-y-3">
                <div className="flex items-center space-x-2">
                  <Camera className="h-4 w-4 text-brand-600" />
                  <span className="text-xs font-extrabold text-cream-800 font-display">THE GEMINI LIVE SPARK</span>
                </div>
                <p className="text-xs text-cream-600 italic leading-relaxed">
                  "One night, looking at the random assortment of limited ingredients left in my small pantry, I decided I wanted to cook something brand new. I opened Gemini's 'Gemini Live' feature, hoping it would guide me. I showed the AI my camera feed, but it failed to detect half of my items, and offered completely generic, unusable recipe suggestions. I didn't need a search engine; I needed an intelligent pantry brain. That night, I decided to build it."
                </p>
              </div>

              <p>
                As a busy university student, a part/full-time worker, and a self-guided solo learner, my calendar had absolutely zero free slots. Spending 1 to 2 hours three times a day on cooking was a complete nightmare. To save critical time, I began buying groceries in bulk—only to watch fresh ingredients rot and spoil on my shelves before I could cook them. I realized I needed to solve two primary bottlenecks: <strong className="text-cream-900">the time-cost of food prep</strong> and <strong className="text-cream-900">the financial drain of food spoilage</strong>.
              </p>

              <p>
                Eventually, the constant overworking and lack of sleep took a major toll on my physical health. I faced a strict warning to start working out, dieting, and caring for my body. However, manually logging macronutrients of home-cooked meals in and out was exhausting. This final struggle inspired the fourth pillar of Plately: a commercial-grade, hassle-free calorie and macronutrient scanner.
              </p>
            </div>

            {/* Quote signature */}
            <div className="border-l-3 border-brand-500 pl-4 py-1.5 bg-brand-50/40 rounded-r-xl pr-4">
              <p className="text-xs italic text-cream-800 font-semibold font-sans">
                "We don't build software to show off technical logs or fill screens with unhelpful AI scripts. Plately is born from real-life survival in a tiny student kitchen—designed to respect your time, your wallet, and your health."
              </p>
              <p className="text-[10px] text-cream-500 mt-1.5">— Shukurillo Mamarasulov, Solo Founder & SKKU Student</p>
            </div>
          </div>

          {/* Side Profile Card */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            <div className="bg-white p-8 rounded-3xl border border-cream-200 shadow-md space-y-6 text-center">
              <div className="w-24 h-24 bg-brand-100 rounded-3xl flex items-center justify-center font-extrabold text-brand-800 text-3xl mx-auto border border-brand-200 rotate-3 transition-transform hover:rotate-0">
                SM
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold font-display text-cream-900">Shukurillo Mamarasulov</h3>
                <p className="text-xs text-cream-500 font-mono">Solo Developer & SKKU Student</p>
                <div className="inline-flex items-center space-x-1.5 text-[10px] bg-brand-50 text-brand-700 px-2.5 py-0.5 rounded-full border border-brand-100 font-semibold mt-1">
                  <span>Based in SKKU, South Korea</span>
                </div>
              </div>

              <div className="border-t border-cream-100 pt-5 text-xs font-sans text-cream-600 space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <GraduationCap className="h-5 w-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-cream-900 block">SKKU Academic Journey</span>
                    <span className="text-[11px]">Balancing rigorous software learning, student exams, and building Plately.</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Briefcase className="h-5 w-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-cream-900 block">Double-Duty Labor</span>
                    <span className="text-[11px]">Developing this ecosystem after full and part-time shifts, self-taught under pressure.</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Dumbbell className="h-5 w-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-cream-900 block">Health Recovery Commitment</span>
                    <span className="text-[11px]">Integrating advanced caloric plate readers to help others reclaim their nutrition easily.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Stat Box */}
            <div className="bg-cream-50 border border-cream-200 p-6 rounded-2xl flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-cream-400 uppercase font-bold">Project Architecture</span>
                <span className="text-xs font-extrabold text-cream-800 block">Single-Developer Sandbox</span>
              </div>
              <div className="text-right">
                <span className="text-xl font-mono font-extrabold text-brand-600">100%</span>
                <span className="text-[9px] text-cream-400 block font-semibold">AD-FREE / PRIVACY-FIRST</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* THE 4 TARGET MARKETS */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
            OUR CORE AUDIENCES
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold font-display text-cream-900">
            Four Communities, One Intelligent Kitchen.
          </h2>
          <p className="text-xs text-cream-500 leading-relaxed max-w-lg mx-auto">
            Plately translates the founder's survival story into production modules directly engineered to serve these distinct groups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Market 1 */}
          <div className="bg-white border border-cream-200 rounded-2xl p-6 space-y-4 hover:border-brand-300 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 border border-brand-100">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold font-display text-cream-900">1. Expats & First-Time Cooks</h3>
              <p className="text-xs text-cream-500 leading-relaxed">
                Leaving home regions for the first time, starting with zero culinary experience, and tired of exhausting repetitive dishes.
              </p>
            </div>
            <div className="text-[10px] font-mono font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded w-fit">
              COOK MODE SOLVES THIS
            </div>
          </div>

          {/* Market 2 */}
          <div className="bg-white border border-cream-200 rounded-2xl p-6 space-y-4 hover:border-brand-300 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 border border-brand-100">
              <PiggyBank className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold font-display text-cream-900">2. Budget-Conscious Optimizers</h3>
              <p className="text-xs text-cream-500 leading-relaxed">
                Navigating tight financial situations, working with sparse pantry leftovers, and aiming to make every dollar stretch further.
              </p>
            </div>
            <div className="text-[10px] font-mono font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded w-fit">
              ZERO-WASTE INGREDIENTS SOLVES THIS
            </div>
          </div>

          {/* Market 3 */}
          <div className="bg-white border border-cream-200 rounded-2xl p-6 space-y-4 hover:border-brand-300 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 border border-brand-100">
              <Briefcase className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold font-display text-cream-900">3. Double-Duty Workers & Students</h3>
              <p className="text-xs text-cream-500 leading-relaxed">
                No time in schedules, buying groceries in bulk to save shopping time, only to watch expensive perishables spoil on shelves.
              </p>
            </div>
            <div className="text-[10px] font-mono font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded w-fit">
              LIVING SHELF ALERTS SOLVES THIS
            </div>
          </div>

          {/* Market 4 */}
          <div className="bg-white border border-cream-200 rounded-2xl p-6 space-y-4 hover:border-brand-300 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 border border-brand-100">
              <Dumbbell className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold font-display text-cream-900">4. Health-Conscious Recoverers</h3>
              <p className="text-xs text-cream-500 leading-relaxed">
                Combating work fatigue, maintaining structured diets, and seeking stress-free calorie logging for meals prepared at home.
              </p>
            </div>
            <div className="text-[10px] font-mono font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded w-fit">
              PLATE CALORIE SCANNER SOLVES THIS
            </div>
          </div>

        </div>
      </section>

      {/* TIMELINE ACTION CTA */}
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <h3 className="text-lg font-bold font-display text-cream-900">Want to help shape our next kitchen release?</h3>
        <button 
          onClick={onOpenBetaModal}
          className="px-8 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs transition-all shadow-lg inline-flex items-center space-x-1.5"
        >
          <span>Join the Founding Cohort</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </section>

    </div>
  );
}
