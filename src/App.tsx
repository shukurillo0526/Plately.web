import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  ChevronDown, 
  Menu, 
  X, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  CheckCircle, 
  Check, 
  Globe, 
  Mail, 
  Flame, 
  ChefHat 
} from 'lucide-react';

import { PageType, BetaRegistration } from './types';
import logo from './assets/logo.png';
import Home from './components/Home';
import Features from './components/Features';
import Solutions from './components/Solutions';
import HowItWorks from './components/HowItWorks';
import Ecosystem from './components/Ecosystem';
import Pricing from './components/Pricing';
import About from './components/About';
import Faq from './components/Faq';
import Blog from './components/Blog';
import Helmet from './components/Helmet';
import PageLoader from './components/PageLoader';
import PerformanceMonitor from './components/PerformanceMonitor';
import { motion, AnimatePresence } from 'motion/react';

const getSEO = (page: PageType) => {
  switch (page) {
    case 'features':
      return {
        title: 'Features & Freshness Sensors',
        description: 'Explore Plately\'s features: high-accuracy OCR receipt scanning, digital shelf life warnings, AI-powered recipe pairing, and automated kitchen logs.',
        canonicalUrl: 'https://theplately.com/features',
      };
    case 'solutions':
      return {
        title: 'Smart Kitchen Use Cases & Family Plans',
        description: 'Perfect use cases for Plately: healthy families, shared roommate houses, zero-waste meal planners, and smart appliance integrators.',
        canonicalUrl: 'https://theplately.com/solutions',
      };
    case 'how-it-works':
      return {
        title: 'How It Works - From Store to Plate',
        description: 'Discover how Plately turns purchase receipts into automated digital inventories, dynamic fresh-zones, and creative zero-waste meals in seconds.',
        canonicalUrl: 'https://theplately.com/how-it-works',
      };
    case 'ecosystem':
      return {
        title: 'IoT Ecosystem & Hardware Roadmap',
        description: 'Join the future of food tracking: Plately\'s IoT vision, collaborative freshness hardware, and smart kitchen integrations.',
        canonicalUrl: 'https://theplately.com/ecosystem',
      };
    case 'pricing':
      return {
        title: 'Beta Launch Tracker & Registration',
        description: 'Track our beta launch timeline and request free access keys to get Plately on your phone for zero-waste pantry planning.',
        canonicalUrl: 'https://theplately.com/pricing',
      };
    case 'about':
      return {
        title: 'Meet the Solo Developer Behind Plately',
        description: 'Read the story of Shukurillo Mamarasulov, the developer behind Plately, striving to build the ultimate zero-waste kitchen platform.',
        canonicalUrl: 'https://theplately.com/about',
      };
    case 'faq':
      return {
        title: 'Help Center & Direct Hotline Support',
        description: 'Have questions about OCR receipt matching, offline synchronizations, or premium features? Get direct hotline assistance and read Plately FAQ answers.',
        canonicalUrl: 'https://theplately.com/faq',
      };
    case 'blog':
      return {
        title: 'Smart Kitchen Guides, Freshness Tips & Blog',
        description: 'Expert guides on meal prep, shelf preservation, food science, and digital pantry scanning. Cook smart, waste less, and save money with Plately.',
        canonicalUrl: 'https://theplately.com/blog',
      };
    case 'home':
    default:
      return {
        title: 'Plately - Smart Kitchen Assistant, Recipe Scanner & Pantry Planner',
        description: 'Reduce food waste and cook smarter with Plately. Scan receipts, track fridge shelf freshness, get AI recipe ideas, and plan sustainable grocery shopping.',
        canonicalUrl: 'https://theplately.com',
      };
  }
};

const modalStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    }
  }
};

const modalStaggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 15
    }
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [betaModalOpen, setBetaModalOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Beta Form state
  const [email, setEmail] = useState('');
  const [persona, setPersona] = useState('Healthy home cook');
  const [cookingLevel, setCookingLevel] = useState('Intermediate');
  const [registered, setRegistered] = useState(false);
  const [generatedKey, setGeneratedKey] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [totalBetaCount, setTotalBetaCount] = useState(148); // Initial mock starting point

  // Load beta count and history from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('plately_registrations');
      if (stored) {
        const parsed = JSON.parse(stored) as BetaRegistration[];
        setTotalBetaCount(148 + parsed.length);
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
  }, []);

  // Scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handlePageNavigation = (page: PageType) => {
    if (page === currentPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setMobileMenuOpen(false);
      return;
    }

    setIsTransitioning(true);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 450ms loading duration for beautiful perceived telemetry syncing
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
    }, 450);
  };

  const handleOpenBetaModal = () => {
    window.location.href = 'https://app.theplately.com';
  };

  const handleBetaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);

    setTimeout(() => {
      // Simulate real persistence and unique beta key calculation
      const prefix = 'PLATE-2026-';
      const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
      const inviteKey = `${prefix}${randomPart}`;
      
      const newReg: BetaRegistration = {
        email,
        persona,
        cookingLevel,
        registeredAt: new Date().toISOString()
      };

      try {
        const stored = localStorage.getItem('plately_registrations');
        const list = stored ? JSON.parse(stored) : [];
        list.push(newReg);
        localStorage.setItem('plately_registrations', JSON.stringify(list));
        setTotalBetaCount(148 + list.length);
      } catch (err) {
        console.error('Local persistence fail', err);
      }

      setGeneratedKey(inviteKey);
      setSubmitting(false);
      setRegistered(true);
    }, 1200);
  };

  const seoProps = getSEO(currentPage);

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans bg-slate-950 text-slate-200 selection:bg-brand-500/30 selection:text-brand-300">
      <Helmet {...seoProps} />
      <PerformanceMonitor page={currentPage} />
      
      {/* GLOBAL NOTIFICATION RUNNING HEADER banner */}
      <div className="bg-black/40 text-cream-200 py-2 px-4 text-center text-[11px] font-medium border-b border-white/5 flex items-center justify-center space-x-2">
        <Sparkles className="h-3.5 w-3.5 text-brand-400 animate-pulse" />
        <span>Summer Beta program is fully open. {totalBetaCount} active kitchens currently synchronized.</span>
        <a 
          href="https://app.theplately.com"
          className="underline text-brand-400 hover:text-brand-300 font-bold ml-1.5"
        >
          Open App →
        </a>
      </div>

      {/* HEADER NAVIGATION BAR */}
      <header id="global-header" className="sticky top-0 glass-panel z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo and Brand */}
            <div 
              onClick={() => handlePageNavigation('home')}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-xl overflow-hidden bg-black/50 group-hover:scale-105 transition-all flex items-center justify-center shadow-sm border border-white/10">
                <img src={logo} alt="Plately" className="w-full h-full object-cover opacity-90" referrerPolicy="no-referrer" />
              </div>
              <div>
                <span className="text-xl font-bold font-display tracking-tight text-white">Plately</span>
                <span className="text-[10px] font-mono text-brand-400 block -mt-1 font-semibold uppercase">Smart Kitchen</span>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              
              {/* Product Category Group */}
              <div className="flex items-center space-x-1 bg-white/5 p-1 rounded-xl border border-white/5">
                <button 
                  onClick={() => handlePageNavigation('features')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${currentPage === 'features' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-slate-200'}`}
                >
                  Features
                </button>
                <button 
                  onClick={() => handlePageNavigation('solutions')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${currentPage === 'solutions' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-slate-200'}`}
                >
                  Use Cases
                </button>
                <button 
                  onClick={() => handlePageNavigation('how-it-works')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${currentPage === 'how-it-works' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-slate-200'}`}
                >
                  How It Works
                </button>
              </div>

              <div className="w-px h-6 bg-white/10 mx-2" />

              {/* Company & Support Group */}
              <div className="flex items-center space-x-1">
                <button 
                  onClick={() => handlePageNavigation('ecosystem')}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${currentPage === 'ecosystem' ? 'text-accent-400 bg-accent-500/10' : 'text-slate-500 hover:text-slate-200'}`}
                >
                  Roadmap
                </button>
                <button 
                  onClick={() => handlePageNavigation('pricing')}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${currentPage === 'pricing' ? 'text-brand-400 bg-brand-500/10' : 'text-slate-500 hover:text-slate-200'}`}
                >
                  Demo Launch
                </button>
                <button 
                  onClick={() => handlePageNavigation('about')}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${currentPage === 'about' ? 'text-white' : 'text-slate-500 hover:text-slate-200'}`}
                >
                  Story
                </button>
                <button 
                  onClick={() => handlePageNavigation('faq')}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${currentPage === 'faq' ? 'text-white' : 'text-slate-500 hover:text-slate-200'}`}
                >
                  FAQ
                </button>
                <button 
                  onClick={() => handlePageNavigation('blog')}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${currentPage === 'blog' ? 'text-white' : 'text-slate-500 hover:text-slate-200'}`}
                >
                  Blog
                </button>
              </div>

            </nav>

            {/* Header Right CTAs */}
            <div className="hidden lg:flex items-center space-x-3">
              <a 
                href="https://app.theplately.com" 
                className="text-xs font-bold text-slate-400 hover:text-white px-3 py-2"
              >
                Sign In
              </a>
              <a 
                href="https://app.theplately.com"
                className="px-5 py-2.5 bg-brand-500 hover:bg-brand-400 text-white text-xs font-bold rounded-xl shadow-[0_0_15px_rgba(249,139,37,0.3)] transition-all"
              >
                Open Web App
              </a>
            </div>

            {/* Mobile Hamburger menu */}
            <div className="flex lg:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-400 hover:text-white focus:outline-none"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop Blur Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 top-20 bg-black/40 backdrop-blur-md z-30 lg:hidden"
              />

              {/* Mobile Drawer Container */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="fixed top-20 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-white/10 p-6 space-y-4 shadow-2xl z-40 lg:hidden overflow-y-auto max-h-[calc(100vh-80px)]"
              >
                <div className="grid grid-cols-2 gap-2 pb-2">
                  <button 
                    onClick={() => handlePageNavigation('features')}
                    className={`p-3 text-left rounded-xl text-xs font-bold ${currentPage === 'features' ? 'bg-brand-500/20 text-brand-400' : 'bg-white/5 text-slate-300'}`}
                  >
                    🧺 Features
                  </button>
                  <button 
                    onClick={() => handlePageNavigation('solutions')}
                    className={`p-3 text-left rounded-xl text-xs font-bold ${currentPage === 'solutions' ? 'bg-brand-500/20 text-brand-400' : 'bg-white/5 text-slate-300'}`}
                  >
                    🎯 Use Cases
                  </button>
                  <button 
                    onClick={() => handlePageNavigation('how-it-works')}
                    className={`p-3 text-left rounded-xl text-xs font-bold ${currentPage === 'how-it-works' ? 'bg-brand-500/20 text-brand-400' : 'bg-white/5 text-slate-300'}`}
                  >
                    ⚙️ How It Works
                  </button>
                  <button 
                    onClick={() => handlePageNavigation('ecosystem')}
                    className={`p-3 text-left rounded-xl text-xs font-bold ${currentPage === 'ecosystem' ? 'bg-accent-500/20 text-accent-400' : 'bg-white/5 text-slate-300'}`}
                  >
                    🗺️ Roadmap
                  </button>
                </div>

                <div className="border-t border-white/10 pt-2 space-y-1">
                  <button 
                    onClick={() => handlePageNavigation('pricing')}
                    className={`w-full p-2.5 text-left rounded-lg text-xs font-semibold ${currentPage === 'pricing' ? 'text-brand-400 bg-brand-500/10' : 'text-slate-400 hover:bg-white/5'}`}
                  >
                    Demo Launch Tracker
                  </button>
                  <button 
                    onClick={() => handlePageNavigation('about')}
                    className={`w-full p-2.5 text-left rounded-lg text-xs font-semibold ${currentPage === 'about' ? 'text-white bg-white/10' : 'text-slate-400 hover:bg-white/5'}`}
                  >
                    Founder Story
                  </button>
                  <button 
                    onClick={() => handlePageNavigation('faq')}
                    className={`w-full p-2.5 text-left rounded-lg text-xs font-semibold ${currentPage === 'faq' ? 'text-white bg-white/10' : 'text-slate-400 hover:bg-white/5'}`}
                  >
                    FAQ Help
                  </button>
                  <button 
                    onClick={() => handlePageNavigation('blog')}
                    className={`w-full p-2.5 text-left rounded-lg text-xs font-semibold ${currentPage === 'blog' ? 'text-white bg-white/10' : 'text-slate-400 hover:bg-white/5'}`}
                  >
                    Resources & Blog
                  </button>
                </div>

                <div className="pt-4 flex flex-col gap-2">
                  <a 
                    href="https://app.theplately.com"
                    className="w-full py-3 bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs rounded-xl text-center shadow-[0_0_15px_rgba(249,139,37,0.3)] transition-all"
                  >
                    Open Web App
                  </a>
                  <a 
                    href="https://app.theplately.com"
                    className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-bold text-xs rounded-xl text-center border border-white/10 transition-all"
                  >
                    Sign In
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* CORE PAGES PORT ROUTING */}
      <main className="flex-grow">
        {isTransitioning ? (
          <PageLoader page={currentPage} />
        ) : (
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {currentPage === 'home' && <Home onNavigate={handlePageNavigation} onOpenBetaModal={handleOpenBetaModal} />}
            {currentPage === 'features' && <Features />}
            {currentPage === 'solutions' && <Solutions onNavigate={handlePageNavigation} onOpenBetaModal={handleOpenBetaModal} />}
            {currentPage === 'how-it-works' && <HowItWorks onNavigate={handlePageNavigation} onOpenBetaModal={handleOpenBetaModal} />}
            {currentPage === 'ecosystem' && <Ecosystem onNavigate={handlePageNavigation} onOpenBetaModal={handleOpenBetaModal} />}
            {currentPage === 'pricing' && <Pricing onOpenBetaModal={handleOpenBetaModal} />}
            {currentPage === 'about' && <About onOpenBetaModal={handleOpenBetaModal} />}
            {currentPage === 'faq' && <Faq />}
            {currentPage === 'blog' && <Blog />}
          </motion.div>
        )}
      </main>

      {/* FOOTER SECTION */}
      <footer id="global-footer" className="bg-white/5 border-t border-white/10 py-16 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Logo and Tagline Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-lg overflow-hidden bg-black/50 flex items-center justify-center shadow-sm border border-white/10">
                <img src={logo} alt="Plately" className="w-full h-full object-cover opacity-90" referrerPolicy="no-referrer" />
              </div>
              <span className="text-lg font-bold font-display text-white tracking-tight">Plately</span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm">
              Connecting retail scanning, digital freshness zoning, and automated diet tracking to eliminate food waste and support home cooks.
            </p>
            <p className="text-[10px] text-slate-500 font-mono">
              Designed & developed in Washington, USA.
            </p>
          </div>

          {/* Links Column 1: Product */}
          <div className="md:col-span-2 space-y-4 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider font-display">Product</h4>
            <ul className="space-y-2.5 font-medium">
              <li><button onClick={() => handlePageNavigation('features')} className="hover:text-brand-400 transition-colors">Features breakdown</button></li>
              <li><button onClick={() => handlePageNavigation('solutions')} className="hover:text-brand-400 transition-colors">Solutions / Use Cases</button></li>
              <li><button onClick={() => handlePageNavigation('how-it-works')} className="hover:text-brand-400 transition-colors">Process / Flows</button></li>
              <li><button onClick={() => handlePageNavigation('pricing')} className="hover:text-brand-400 transition-colors">Demo Launch Tracker</button></li>
            </ul>
          </div>

          {/* Links Column 2: Company */}
          <div className="md:col-span-2 space-y-4 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider font-display">Company</h4>
            <ul className="space-y-2.5 font-medium">
              <li><button onClick={() => handlePageNavigation('about')} className="hover:text-brand-400 transition-colors">Founder & Mission</button></li>
              <li><button onClick={() => handlePageNavigation('faq')} className="hover:text-brand-400 transition-colors">FAQ Support</button></li>
              <li><button onClick={() => handlePageNavigation('blog')} className="hover:text-brand-400 transition-colors">Resources / Blog</button></li>
              <li><button onClick={() => handlePageNavigation('ecosystem')} className="hover:text-brand-400 transition-colors">Roadmap & Vision</button></li>
            </ul>
          </div>

          {/* Links Column 3: Contact/Newsletter */}
          <div className="md:col-span-4 space-y-4 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider font-display">Newsletter</h4>
            <p className="text-[11px] leading-relaxed">
              Receive smart cooking tips and zero-waste pantry updates. No spam, ever.
            </p>
            
            <form 
              onSubmit={(e) => { e.preventDefault(); handleOpenBetaModal(); }}
              className="flex space-x-1.5"
            >
              <input 
                type="email" 
                placeholder="your@email.com" 
                required
                className="flex-grow px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
              <button 
                type="submit"
                className="px-3.5 py-2 bg-brand-500 hover:bg-brand-400 text-white rounded-lg text-xs font-bold transition-all shadow-[0_0_10px_rgba(249,139,37,0.2)]"
              >
                Join List
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-12 border-t border-white/10 text-center text-[10px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <span>© 2026 Plately Technologies Inc. All rights reserved. Zero waste, zero ads.</span>
          <div className="flex space-x-4">
            <span className="text-slate-400 font-sans font-semibold">Crafted by Shukurillo Mamarasulov</span>
            <span>•</span>
            <a 
              href="https://github.com/shukurillo0526/Plately/blob/main/PRIVACY_POLICY.md" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:underline hover:text-slate-300"
            >
              Privacy Policy
            </a>
            <span>•</span>
            <span className="text-slate-400 font-sans">Contact: theplately@gmail.com</span>
          </div>
        </div>
      </footer>

      {/* HIGH FIDELITY BETA REGISTRATION MODAL */}
      <AnimatePresence>
        {betaModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.4, bounce: 0.1 }}
              className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-cream-200"
            >
              
              {/* Modal Header banner */}
              <div className="bg-brand-900 text-white p-6 relative">
                <button 
                  onClick={() => setBetaModalOpen(false)}
                  className="absolute top-4 right-4 p-1 hover:bg-brand-800 rounded-full transition-all text-brand-400"
                >
                  <X className="h-5 w-5" />
                </button>
                
                <div className="flex items-center space-x-2">
                  <ChefHat className="h-5 w-5 text-brand-400" />
                  <span className="text-xs font-mono font-bold tracking-widest text-brand-300">PLATELY INVITE PROGRAM</span>
                </div>
                <h3 className="text-xl font-bold font-display mt-2 text-white">Join our Summer Cohort</h3>
                <p className="text-[11px] text-brand-300 mt-1">Free access keys provided to first 1,000 households.</p>
              </div>

              {/* Modal Body / Form */}
              <div className="p-6">
                {!registered ? (
                  <form onSubmit={handleBetaSubmit}>
                    <motion.div 
                      variants={modalStaggerContainer}
                      initial="hidden"
                      animate="visible"
                      className="space-y-4"
                    >
                      
                      <motion.div variants={modalStaggerItem} className="space-y-1">
                        <label className="text-[10px] font-bold text-cream-500 uppercase tracking-wider font-mono">
                          EMAIL ADDRESS
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                          <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john.doe@gmail.com"
                            className="w-full pl-10 pr-4 py-2.5 bg-cream-50 border border-cream-200 rounded-xl text-xs text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                          />
                        </div>
                      </motion.div>

                      <motion.div variants={modalStaggerItem} className="space-y-1">
                        <label className="text-[10px] font-bold text-cream-500 uppercase tracking-wider font-mono">
                          PRIMARY KITCHEN PERSONA
                        </label>
                        <select 
                          value={persona}
                          onChange={(e) => setPersona(e.target.value)}
                          className="w-full px-3 py-2.5 bg-cream-50 border border-cream-200 rounded-xl text-xs text-slate-800 focus:outline-none"
                        >
                          <option value="Healthy home cook">Healthy home cook</option>
                          <option value="Gym-goer / Bulk meal prepper">Gym-goer / Bulk meal prepper</option>
                          <option value="Busy professional / Quick dinners">Busy professional / Quick dinners</option>
                          <option value="Family food-waste planner">Family food-waste planner</option>
                          <option value="Partner / Restaurant Owner">Partner / Restaurant Owner</option>
                        </select>
                      </motion.div>

                      <motion.div variants={modalStaggerItem} className="space-y-1">
                        <label className="text-[10px] font-bold text-cream-500 uppercase tracking-wider font-mono">
                          YOUR COOKING EXPERIENCE
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {['Beginner', 'Intermediate', 'Chef Master'].map(lvl => (
                            <button
                              key={lvl}
                              type="button"
                              onClick={() => setCookingLevel(lvl)}
                              className={`py-2.5 border rounded-xl text-xs font-semibold transition-all ${cookingLevel === lvl ? 'bg-slate-900 border-cream-900 text-white' : 'bg-cream-50 border-cream-200 text-cream-600 hover:bg-slate-200'}`}
                            >
                              {lvl}
                            </button>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div variants={modalStaggerItem} className="bg-cream-50 border border-cream-200 p-3.5 rounded-xl flex items-start space-x-2.5 text-[11px] text-cream-500 leading-normal">
                        <ShieldCheck className="h-4 w-4 text-brand-500 mt-0.5 flex-shrink-0" />
                        <p>
                          <strong>Privacy Assurance:</strong> We securely compile registration entries inside local store databases. Your details remain fully confidential.
                        </p>
                      </motion.div>

                      <motion.div variants={modalStaggerItem}>
                        <button
                          type="submit"
                          disabled={submitting || !email}
                          className="w-full py-3 bg-brand-600 hover:bg-brand-700 disabled:bg-cream-200 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center space-x-1"
                        >
                          {submitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-t-white border-brand-500 rounded-full animate-spin" />
                              <span>Validating invite details...</span>
                            </>
                          ) : (
                            <span>Request Invitation Key</span>
                          )}
                        </button>
                      </motion.div>

                    </motion.div>
                  </form>
                ) : (
                  <div className="text-center py-6 space-y-5 animate-fadeIn">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto">
                      <Check className="h-6 w-6" />
                    </div>
                    
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-bold text-cream-900">COHORT ACCESS SECURED!</h4>
                      <p className="text-xs text-cream-500 leading-normal font-sans max-w-sm mx-auto">
                        Congratulations! Your registration has been indexed. Below is your dedicated invite token for the Plately Consumer App:
                      </p>
                    </div>

                    <div className="bg-brand-50 border-2 border-dashed border-brand-500/40 p-4 rounded-xl">
                      <span className="text-base font-mono font-black text-brand-800 tracking-wider">
                        {generatedKey}
                      </span>
                      <p className="text-[9px] text-brand-500 font-bold uppercase tracking-wider font-mono mt-1">
                        ACTIVATE ON CLIENT APPS
                      </p>
                    </div>

                    <div className="text-[10px] text-slate-500 font-mono">
                      Registered email: <strong className="text-cream-600">{email}</strong>
                    </div>

                    <button
                      onClick={() => setBetaModalOpen(false)}
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all w-full"
                    >
                      Return to marketing site
                    </button>
                  </div>
                )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
