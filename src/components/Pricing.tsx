import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Info, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  Clock, 
  ChevronRight, 
  ArrowRight, 
  Activity, 
  LockOpen, 
  CheckCircle2, 
  CircleDot 
} from 'lucide-react';

interface PricingProps {
  onOpenBetaModal: () => void;
}

export default function Pricing({ onOpenBetaModal }: PricingProps) {
  const targetDate = new Date('2026-07-18T00:00:00');
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 15,
    minutes: 38,
    seconds: 33
  });

  // Calculate live countdown to 2026-07-18
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Adjust current year if system clock is different, but respect metadata year 2026
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        // Fallback static positive count for demo experience
        setTimeLeft({ days: 5, hours: 15, minutes: 39, seconds: 12 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-16 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* HEADER SECTION */}
      <section className="text-center pt-12 max-w-4xl mx-auto">
        <span className="text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider font-mono inline-flex items-center space-x-1.5">
          <CircleDot className="h-3 w-3 text-brand-500 animate-pulse" />
          <span>Demo Sandbox Mode - v0.1.9</span>
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-cream-900 mt-4 tracking-tight leading-tight">
          Everything is 100% Free. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-emerald-600">
            No payments. No credentials.
          </span>
        </h1>
        <p className="text-sm md:text-base text-cream-600 mt-4 max-w-2xl mx-auto leading-relaxed">
          As a public demo and prototype, Plately does not have any active paid subscription structures. All premium food waste mitigation trackers, AI-powered recipes, and scanning services are unlocked for open evaluation.
        </p>
      </section>

      {/* LAUNCH COUNTDOWN & PROGRESS BANNER */}
      <section className="max-w-4xl mx-auto bg-white border border-cream-200 p-8 rounded-3xl shadow-sm relative overflow-hidden">
        {/* Background decorative accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full blur-3xl -z-10 opacity-60" />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Milestone and Countdown */}
          <div className="md:col-span-7 space-y-5">
            <div className="inline-flex items-center space-x-2 bg-brand-100 text-brand-900 text-xs font-extrabold px-3 py-1 rounded-lg uppercase tracking-wide font-mono">
              <Sparkles className="h-3.5 w-3.5 text-brand-500 animate-pulse" />
              <span>Milestone: v0.2.0 Demo Launch</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-extrabold font-display text-cream-900 leading-tight">
              Planned for July 18, 2026
            </h2>
            
            <p className="text-xs text-cream-600 max-w-md leading-relaxed">
              We are currently in final development, resolving real-time syncing pipelines, expanding local storage buffers, and validating OCR scanner confidence scores for our first official milestone release.
            </p>

            {/* Micro Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-mono font-bold text-cream-500">
                <span>STAGE: STABILITY & LOCALIZATION HARSHENING</span>
                <span className="text-brand-600">92% DONE</span>
              </div>
              <div className="h-2 w-full bg-cream-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-500 rounded-full w-[92%] transition-all" />
              </div>
            </div>
          </div>

          {/* Countdown Clock Panel */}
          <div className="md:col-span-5 bg-cream-50 border border-cream-200/80 rounded-2xl p-6 text-center space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-cream-500 flex items-center justify-center space-x-1.5">
              <Clock className="h-3 w-3 text-brand-500" />
              <span>TIME REMAINING TO LAUNCH</span>
            </span>

            <div className="grid grid-cols-4 gap-2">
              <div className="bg-white rounded-xl p-3 border border-cream-200">
                <span className="text-2xl font-extrabold font-mono text-cream-900 block leading-none">{timeLeft.days}</span>
                <span className="text-[9px] font-semibold text-cream-400 uppercase tracking-tight block mt-1">Days</span>
              </div>
              <div className="bg-white rounded-xl p-3 border border-cream-200">
                <span className="text-2xl font-extrabold font-mono text-cream-900 block leading-none">{timeLeft.hours}</span>
                <span className="text-[9px] font-semibold text-cream-400 uppercase tracking-tight block mt-1">Hrs</span>
              </div>
              <div className="bg-white rounded-xl p-3 border border-cream-200">
                <span className="text-2xl font-extrabold font-mono text-cream-900 block leading-none">{timeLeft.minutes}</span>
                <span className="text-[9px] font-semibold text-cream-400 uppercase tracking-tight block mt-1">Mins</span>
              </div>
              <div className="bg-white rounded-xl p-3 border border-cream-200">
                <span className="text-2xl font-extrabold font-mono text-cream-900 block leading-none">{timeLeft.seconds}</span>
                <span className="text-[9px] font-semibold text-cream-400 uppercase tracking-tight block mt-1">Secs</span>
              </div>
            </div>

            <button 
              onClick={onOpenBetaModal}
              className="w-full py-2.5 bg-cream-900 hover:bg-cream-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center space-x-1"
            >
              <span>Get notified on release</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

        </div>
      </section>

      {/* DETAILED FEATURES STATUS TABLE */}
      <section className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold font-display text-cream-900">Current Pre-Release Sandbox Status</h3>
          <p className="text-xs text-cream-500">Compare what is ready to test today vs. planned for v0.2.0 on July 18.</p>
        </div>

        <div className="bg-white border border-cream-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="divide-y divide-cream-100">
            
            {/* Row 1 */}
            <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold font-mono text-cream-800">LIVING SHELF INVENTORY</span>
                  <span className="text-[9px] font-mono font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">STABLE</span>
                </div>
                <p className="text-xs text-cream-600">Digitize ingredients in your fridge with dynamic freshness zones and real-time food-waste monitoring dashboards.</p>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-cream-900 font-bold bg-cream-50 px-3 py-1.5 rounded-lg border border-cream-200/60 w-fit">
                <LockOpen className="h-3.5 w-3.5 text-brand-500" />
                <span>Unlocked & Free</span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold font-mono text-cream-800">AI RECIPE COMPILER & COOK MODE</span>
                  <span className="text-[9px] font-mono font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">STABLE</span>
                </div>
                <p className="text-xs text-cream-600">Select active ingredients to instantly generate customizable, calorie-accurate recipes with visual step-by-step guidance.</p>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-cream-900 font-bold bg-cream-50 px-3 py-1.5 rounded-lg border border-cream-200/60 w-fit">
                <LockOpen className="h-3.5 w-3.5 text-brand-500" />
                <span>Unlocked & Free</span>
              </div>
            </div>

            {/* Row 3 */}
            <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold font-mono text-cream-800">AI CALORIE PLATE SCANNER</span>
                  <span className="text-[9px] font-mono font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 font-semibold">REFINING</span>
                </div>
                <p className="text-xs text-cream-600">Scan photos of complete dishes or meal slips to calculate portion distribution, macronutrients, and calorie density automatically.</p>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-cream-900 font-bold bg-cream-50 px-3 py-1.5 rounded-lg border border-cream-200/60 w-fit">
                <LockOpen className="h-3.5 w-3.5 text-brand-500" />
                <span>Unlocked & Free</span>
              </div>
            </div>

            {/* Row 4 */}
            <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold font-mono text-cream-800">HOUSEHOLD FAMILY SYNC</span>
                  <span className="text-[9px] font-mono font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 font-semibold">v0.2.0 LAUNCH</span>
                </div>
                <p className="text-xs text-cream-600">Synchronize pantry item updates across multiple active screens and phones. (Currently in sandbox offline emulation mode).</p>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-cream-500 font-semibold bg-cream-50/50 px-3 py-1.5 rounded-lg border border-cream-100/60 w-fit">
                <Calendar className="h-3.5 w-3.5 text-cream-400" />
                <span>Planned for July 18</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SUSTAINABLE & PRIVACY COMMITMENT */}
      <section className="max-w-4xl mx-auto bg-cream-100/40 border border-cream-200/60 rounded-3xl p-8 text-center space-y-4">
        <ShieldCheck className="h-10 w-10 text-brand-600 mx-auto" />
        <h4 className="text-lg font-bold font-display text-cream-900">Our Sustainable Commitment</h4>
        <p className="text-xs text-cream-600 font-sans leading-relaxed max-w-xl mx-auto">
          We do not sell ingredient tracking logs or household food habit analytics to data brokers or advertising networks. We run a secure, privacy-first smart kitchen service, prioritizing genuine zero-waste behavior over telemetry harvesting.
        </p>
      </section>

    </div>
  );
}
