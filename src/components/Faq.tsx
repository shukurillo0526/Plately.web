import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, Search } from 'lucide-react';

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState<'General' | 'Pantry' | 'Recipes' | 'Ecosystem'>('General');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Expanded states map
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Is Plately really free? What is the catch?',
      answer: 'Yes! The core consumer app is 100% free while we validate our receipt scanner algorithms during our early beta program. In the future, we plan to release a "Pro Home" subscription ($8/mo) for unlimited scans and smart kitchen dashboard expansions. We never sell your kitchen data or feed grocery telemetry to advertisers.',
      category: 'General'
    },
    {
      question: 'How does receipt scanning work?',
      answer: 'Simply snap a photo of your printed grocery receipt. Plately runs a specialized OCR scanner to translate text into ingredients, then consults a database to assign a standard shelf lifespan (e.g. 5 days for fresh chicken, 14 days for butter) based on target storage zones (Fridge, Pantry, Freezer).',
      category: 'Pantry'
    },
    {
      question: 'Can I add loose ingredients or homemade leftovers?',
      answer: 'Absolutely! You can snap a photo of loose countertop vegetables (which our AI image classifier identifies instantly) or write item names manually. You can also log custom leftovers, like "Sunday Stew Portion", and assign manual expiration clocks.',
      category: 'Pantry'
    },
    {
      question: 'How does Plately calculate nutritional macros for cooked recipes?',
      answer: 'Every ingredient in Plately has generic nutritional attributes (protein, fat, carbs, calories). When you complete a guided Cook Mode recipe, Plately scales the exact weights of the checked ingredients you used, aggregates the total nutrient weight, and logs it directly to your profile diary.',
      category: 'Recipes'
    },
    {
      question: 'Is there an offline mode?',
      answer: 'Yes. Plately saves active shelf lists and recipe step instructions locally inside your browser/phone storage. You can check off cooking checkboxes or search pantry lists even if your kitchen has poor Wi-Fi. It will synchronize changes once internet connection returns.',
      category: 'Recipes'
    },
    {
      question: 'What is the long-term roadmap and strategic vision?',
      answer: 'Plately is developing a confidential, multi-stage food ecosystem designed to bridge consumer smart pantry tools with local kitchen operations and logistics networks. Our roadmap spans four classified stages: from Web & Android transactional maturity (Q3-Q4 2026), to modular kiosk hardware, shared carrier fleets, and localized cold-storage fulfillment hubs. These plans remain confidential as we execute under early sandboxed trials.',
      category: 'Ecosystem'
    },
    {
      question: 'Which platforms are supported at launch?',
      answer: 'Our first upcoming demo launch is exclusively for Web and Android. We are not launching on iOS first. Future iOS versions will be scheduled based on Web & Android beta telemetry and community feedback.',
      category: 'General'
    },
    {
      question: 'Are my health and calorie logs secure?',
      answer: 'Yes. We protect all profiles under modern encryption standards. We do not sell caloric logs, weight numbers, or storage habits to food conglomerates, gym advertisers, or pharmaceutical organizations.',
      category: 'General'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = 
      activeCategory === 'General' && faq.category === 'General' ||
      activeCategory === 'Pantry' && faq.category === 'Pantry' ||
      activeCategory === 'Recipes' && faq.category === 'Recipes' ||
      activeCategory === 'Ecosystem' && faq.category === 'Ecosystem';
      
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (idx: number) => {
    if (expandedIndex === idx) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(idx);
    }
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* HEADER */}
      <section className="text-center pt-12 max-w-4xl mx-auto px-4">
        <span className="text-xs font-bold text-slate-500 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
          Support Center
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-white mt-4 tracking-tight leading-tight">
          Frequently Asked Questions.
        </h1>
        <p className="text-sm md:text-base text-slate-400 font-sans mt-4 max-w-2xl mx-auto leading-relaxed">
          Need help understanding OCR receipt matching, offline synchronizations, or ecosystem commissions? Explore our categories or search with keyword terms.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mt-8">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-600" />
          <input 
            type="text" 
            placeholder="Search questions (e.g. 'OCR', 'free' ...)" 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setExpandedIndex(null);
            }}
            className="w-full pl-11 pr-4 py-3 glass-panel border border-white/10 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500 shadow-sm"
          />
        </div>
      </section>

      {/* CORE FAQ CHUNKS */}
      <section className="max-w-4xl mx-auto px-4">
        
        {/* Category Tabs */}
        <div className="flex justify-center space-x-2 border-b border-white/10 pb-3 mb-8">
          {(['General', 'Pantry', 'Recipes', 'Ecosystem'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setExpandedIndex(null);
              }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeCategory === cat ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-200'}`}
            >
              {cat === 'Pantry' ? '🧺 Shelf & Scanning' :
               cat === 'Recipes' ? '🍳 Cook & Diet' :
               cat === 'Ecosystem' ? '🗺️ Roadmap & Vision' :
               cat === 'General' ? '❔ General FAQ' : cat}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-3 min-h-[250px]">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <HelpCircle className="h-8 w-8 mx-auto text-slate-400" />
              <p className="text-xs font-sans">No questions matched your active search queries.</p>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <div 
                  key={idx}
                  className="glass-panel rounded-xl border border-white/10 shadow-sm overflow-hidden"
                >
                  <button 
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-5 text-left flex items-center justify-between font-display text-xs md:text-sm font-bold text-white hover:bg-slate-950 transition-all"
                  >
                    <span>{faq.question}</span>
                    {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-400 leading-relaxed font-sans border-t border-white/5 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </section>

      {/* SUPPORT FOOTER MESSAGE */}
      <section className="max-w-3xl mx-auto px-4 text-center space-y-8 pb-12">
        <div className="space-y-2">
          <MessageSquare className="h-8 w-8 text-brand-500 mx-auto" />
          <h4 className="text-xl font-bold font-display text-white">Get in Touch</h4>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Whether you have technical feedback, investment inquiries, or need kitchen onboarding support, our channels are fully open.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {/* Card 1: Official Support */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-white/10/60 hover:border-brand-500/30 transition-all flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-mono text-brand-400 uppercase tracking-wider font-semibold">General Support</span>
              <h5 className="font-bold font-display text-white text-sm mt-1">Customer & App Help</h5>
              <p className="text-[11px] text-slate-500 mt-1">For general inquiries, account assistance, or app setup help.</p>
            </div>
            <a href="mailto:theplately@gmail.com" className="text-xs font-bold text-brand-500 hover:text-brand-400 transition-colors inline-flex items-center space-x-1 mt-2">
              <span>theplately@gmail.com</span>
              <span>→</span>
            </a>
          </div>

          {/* Card 2: Personal Hotline */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-white/10/60 hover:border-brand-500/30 transition-all flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-mono text-brand-400 uppercase tracking-wider font-semibold">Direct Line</span>
              <h5 className="font-bold font-display text-white text-sm mt-1">Founder's Phone</h5>
              <p className="text-[11px] text-slate-500 mt-1">Urgent matters, media inquiries, or technical priority queries.</p>
            </div>
            <a href="tel:+998903850526" className="text-xs font-bold text-brand-500 hover:text-brand-400 transition-colors inline-flex items-center space-x-1 mt-2">
              <span>+998 90 385 0526</span>
              <span>→</span>
            </a>
          </div>

          {/* Card 3: Founder's Desk */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-white/10/60 hover:border-brand-500/30 transition-all flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-mono text-brand-400 uppercase tracking-wider font-semibold">Partnerships</span>
              <h5 className="font-bold font-display text-white text-sm mt-1">Founder's Email</h5>
              <p className="text-[11px] text-slate-500 mt-1">Reach out directly to Shukurillo Mamarasulov for strategic ties.</p>
            </div>
            <a href="mailto:shukurillomamarasulovex@gmail.com" className="text-xs font-bold text-brand-500 hover:text-brand-400 transition-colors inline-flex items-center space-x-1 mt-2">
              <span className="truncate">shukurillomamarasulovex@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
