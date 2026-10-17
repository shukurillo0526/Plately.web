import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  HelpCircle, 
  ChevronDown, 
  Monitor, 
  Utensils, 
  Store, 
  Truck, 
  ExternalLink 
} from 'lucide-react';

interface PricingProps {
  onOpenBetaModal?: () => void;
}

export default function Pricing({ onOpenBetaModal }: PricingProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Do diners or consumers ever pay fees on Plately?",
      a: "Never. The Plately client app is 100% free forever for all home cooks and diners. You get full access to the Smart Living Shelf, 6-signal AI recipe recommendations, hands-free cook mode, calorie vision, and direct 0% fee restaurant ordering."
    },
    {
      q: "How does Plately charge 0% commission on restaurant orders?",
      a: "Traditional aggregators charge up to 30% per order because they maintain expensive middleman bloat. Plately operates as modern SaaS software. We charge flat, transparent software tiers (or free on Starter) rather than taxing your kitchen's hard-earned gross sales."
    },
    {
      q: "Can I connect my own custom domain to my restaurant storefront?",
      a: "Yes! On Workshop Pro, you can connect your existing domain (such as order.yourbrand.com or eat.restaurant.uz). We automatically provision edge SSL certificates and routing via our Edge Proxy infrastructure in seconds."
    },
    {
      q: "What hardware is required to run the Workshop KDS?",
      a: "No proprietary hardware lock-in. Plately Workshop KDS runs smoothly in any modern web browser on existing iPads, Android tablets, desktop touch monitors, or smart TVs with low-latency WebSockets."
    },
    {
      q: "How does Noor Courier Fleet dispatch work?",
      a: "When a customer places a delivery order through your storefront or the Plately app, Workshop calculates the kitchen's live cook completion ETA and dispatches the closest Noor courier automatically, preventing cold food and driver wait times."
    }
  ];

  return (
    <div className="space-y-20 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans text-white">
      
      {/* 1. HEADER SECTION */}
      <section className="text-center pt-12 max-w-4xl mx-auto space-y-4">
        <span className="text-xs font-bold text-brand-400 bg-brand-500/10 border border-brand-500/30 px-4 py-1.5 rounded-full uppercase tracking-wider font-mono inline-flex items-center space-x-1.5">
          <Sparkles className="h-3.5 w-3.5 text-brand-400" />
          <span>TRANSPARENT TWO-SIDED PRICING</span>
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-white tracking-tight leading-tight">
          0% Commission. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-orange-400 to-emerald-400">
            Zero Hidden Take-Rates.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
          Plately is free for home cooks and food lovers forever. For restaurants, we replace predatory 30% delivery aggregator fees with flat, predictable software plans.
        </p>

        {/* Billing Switcher */}
        <div className="pt-4 flex items-center justify-center space-x-3">
          <span className={`text-xs font-bold ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className="w-14 h-8 bg-slate-800 rounded-full p-1 relative transition-colors border border-slate-700"
          >
            <div
              className={`w-6 h-6 rounded-full bg-brand-500 shadow-md transform transition-transform ${
                billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-bold flex items-center space-x-1.5 ${billingCycle === 'annual' ? 'text-emerald-400' : 'text-slate-400'}`}>
            <span>Annual</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">SAVE 20%</span>
          </span>
        </div>
      </section>

      {/* 2. THREE PRICING TIERS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* Tier 1: Diners & Food Lovers */}
        <div className="bg-[#0f141f] border border-white/10 rounded-3xl p-8 space-y-6 flex flex-col justify-between shadow-xl hover:border-brand-500/40 transition-all relative">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
              <Utensils className="w-3.5 h-3.5" />
              <span>FOR DINERS & HOME COOKS</span>
            </div>

            <div>
              <h3 className="text-2xl font-bold font-display text-white">Diner Client</h3>
              <p className="text-xs text-slate-400 mt-1">For individuals and families mastering home cooking & direct dining.</p>
            </div>

            <div className="pt-2">
              <span className="text-5xl font-black font-display text-white">$0</span>
              <span className="text-xs text-slate-400 font-mono ml-2">Free Forever</span>
            </div>

            <ul className="space-y-3 pt-4 border-t border-slate-800 text-xs text-slate-300">
              <li className="flex items-start space-x-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Smart Living Shelf:</strong> Real-time Fridge, Freezer & Pantry tracking.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>6-Signal AI Recipes:</strong> Tailored cook suggestions prioritizing expiring items.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Hands-Free Cook Mode:</strong> Vocal timers, steps, and instant substitutions.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Calorie Plate Scanner:</strong> Multi-mode AI vision & OCR receipt intake.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>0% Surcharge Direct Dining:</strong> Pick tables on floor plans without fee markups.</span>
              </li>
            </ul>
          </div>

          <a
            href="https://app.theplately.com"
            className="w-full py-3.5 bg-brand-500 hover:bg-brand-400 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-2"
          >
            <span>Open Diner App Free</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Tier 2: Workshop Starter (Most Popular) */}
        <div className="bg-[#121824] border-2 border-emerald-500/80 rounded-3xl p-8 space-y-6 flex flex-col justify-between shadow-2xl relative ring-1 ring-emerald-500/40">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 px-4 py-0.5 rounded-full text-[11px] font-extrabold uppercase font-mono tracking-wider shadow-md">
            POPULAR FOR RESTAURANTS
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <Store className="w-3.5 h-3.5" />
              <span>SINGLE BRANCH RESTAURANT</span>
            </div>

            <div>
              <h3 className="text-2xl font-bold font-display text-white">Workshop Starter</h3>
              <p className="text-xs text-slate-400 mt-1">Launch your direct online storefront & live kitchen display system.</p>
            </div>

            <div className="pt-2">
              <span className="text-5xl font-black font-display text-white">$0</span>
              <span className="text-xs text-slate-400 font-mono ml-2">/ month (0% Commission)</span>
            </div>

            <ul className="space-y-3 pt-4 border-t border-slate-800 text-xs text-slate-300">
              <li className="flex items-start space-x-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>AI Website Studio:</strong> Public storefront at <code className="text-brand-300 font-mono text-[11px]">[slug].plately.app</code>.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Live Multi-State KDS:</strong> Up to 2 active kitchen display screens.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Interactive Floor Plan:</strong> Real-time guest table reservations.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Full Menu & Stock CRUD:</strong> Instant 86 item toggles across platforms.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>100% Guest Data Ownership:</strong> Retain diner emails & preferences.</span>
              </li>
            </ul>
          </div>

          <a
            href="https://workshop.theplately.com"
            className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center space-x-2"
          >
            <span>Start Free on Workshop</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Tier 3: Workshop Pro / Scale */}
        <div className="bg-[#0f141f] border border-white/10 rounded-3xl p-8 space-y-6 flex flex-col justify-between shadow-xl hover:border-purple-500/40 transition-all relative">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              <Monitor className="w-3.5 h-3.5" />
              <span>MULTI-LOCATION & EXPANDING</span>
            </div>

            <div>
              <h3 className="text-2xl font-bold font-display text-white">Workshop Scale / Pro</h3>
              <p className="text-xs text-slate-400 mt-1">For multi-branch restaurants, ghost kitchens, and hospitality brands.</p>
            </div>

            <div className="pt-2">
              <span className="text-5xl font-black font-display text-white">
                {billingCycle === 'annual' ? '$39' : '$49'}
              </span>
              <span className="text-xs text-slate-400 font-mono ml-2">/ month (0% Commission)</span>
            </div>

            <ul className="space-y-3 pt-4 border-t border-slate-800 text-xs text-slate-300">
              <li className="flex items-start space-x-2.5">
                <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span><strong>Custom Domain & SSL:</strong> Serve on <code className="text-brand-300 font-mono text-[11px]">eat.yourbrand.com</code>.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span><strong>Unlimited KDS Screens:</strong> Prep, expo, bar, and dishwashing displays.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span><strong>Noor Logistics Fleet Dispatch:</strong> Automated driver route telemetry.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span><strong>AI Marketing Agents:</strong> Auto-generate video reels for Plately Explore.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span><strong>Staff Roles & Permissions:</strong> Owner, Manager, Chef, Server logins.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span><strong>Dedicated SLA Support:</strong> 24/7 priority onboarding & account manager.</span>
              </li>
            </ul>
          </div>

          <a
            href="https://workshop.theplately.com"
            className="w-full py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-all border border-white/10 flex items-center justify-center space-x-2"
          >
            <span>Launch Workshop Pro</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </section>

      {/* 3. THE 0% COMMISSION SAVINGS BREAKDOWN */}
      <section className="bg-[#0f141f] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold text-brand-400 uppercase tracking-widest bg-brand-500/10 px-3.5 py-1.5 rounded-full border border-brand-500/20">
            SAVINGS COMPARISON
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            What 0% Commission Means for Your Bottom Line
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Compare monthly commission loss on traditional 30% aggregator apps versus Plately Workshop.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="pb-4 font-bold">MONTHLY ORDER VOLUME</th>
                <th className="pb-4 font-bold text-red-400">30% AGGREGATOR FEE</th>
                <th className="pb-4 font-bold text-emerald-400">PLATELY WORKSHOP (0%)</th>
                <th className="pb-4 font-bold text-brand-400">YOUR ANNUAL SAVINGS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              <tr>
                <td className="py-4 font-bold text-white">$10,000 / mo</td>
                <td className="py-4 text-red-400">-$3,000 / mo</td>
                <td className="py-4 text-emerald-400">$0 commission</td>
                <td className="py-4 font-bold text-brand-400">+$36,000 / year</td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-white">$25,000 / mo</td>
                <td className="py-4 text-red-400">-$7,500 / mo</td>
                <td className="py-4 text-emerald-400">$0 commission</td>
                <td className="py-4 font-bold text-brand-400">+$90,000 / year</td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-white">$50,000 / mo</td>
                <td className="py-4 text-red-400">-$15,000 / mo</td>
                <td className="py-4 text-emerald-400">$0 commission</td>
                <td className="py-4 font-bold text-brand-400">+$180,000 / year</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">Everything you need to know about Plately pricing and commercial usage.</p>
        </div>

        <div className="space-y-3 pt-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#0f141f] border border-white/10 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex items-center justify-between space-x-4 hover:bg-white/5 transition-colors"
              >
                <span className="font-bold text-sm text-white">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    openFaq === idx ? 'rotate-180 text-brand-400' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed font-sans border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. 0% COMMISSION PLEDGE GUARANTEE */}
      <section className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/40 border border-emerald-500/30 p-8 sm:p-12 rounded-[36px] text-center max-w-4xl mx-auto space-y-4">
        <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
        <h3 className="text-2xl font-bold font-display text-white">The Plately 0% Commission Guarantee</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          We believe high-commission delivery apps are draining neighborhood culinary culture. Our promise is permanent: we will never take percentage cuts of your food orders.
        </p>
      </section>

    </div>
  );
}
