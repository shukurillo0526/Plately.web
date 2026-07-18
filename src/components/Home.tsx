import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Leaf, 
  Flame, 
  ChefHat, 
  CheckCircle, 
  Camera, 
  Calendar, 
  Plus, 
  TrendingUp, 
  Clock, 
  Heart, 
  ArrowRight, 
  Play, 
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Calculator,
  Utensils,
  Package,
  Search,
  BookOpen,
  Globe,
  ShoppingCart,
  ArrowLeft,
  User,
  Bell,
  Pencil,
  Image,
  Barcode,
  Check
} from 'lucide-react';
import { PageType } from '../types';
import ActiveCookMode from './ActiveCookMode';

interface HomeProps {
  onNavigate: (page: PageType) => void;
  onOpenBetaModal: () => void;
}

export default function Home({ onNavigate, onOpenBetaModal }: HomeProps) {
  // Interactive Simulator State (matching all core screens including Prep & Calorie Scan)
  const [mockTab, setMockTab] = useState<'cook' | 'scan' | 'shelf' | 'prep' | 'profile' | 'active_cook'>('cook');
  const [prevTab, setPrevTab] = useState<'cook' | 'scan' | 'shelf' | 'prep'>('cook');
  const [scanSubTab, setScanSubTab] = useState<'food' | 'calories'>('food');
  const [prepDays, setPrepDays] = useState<number>(5);
  const [prepRunning, setPrepRunning] = useState<boolean>(false);
  const [prepStepCheck, setPrepStepCheck] = useState<boolean[]>([false, false, false]);
  const [userXP, setUserXP] = useState<number>(2385);
  const [mealsCooked, setMealsCooked] = useState<number>(18);
  const [itemsSaved, setItemsSaved] = useState<number>(297);
  const [streakCount, setStreakCount] = useState<number>(1);
  const [xpAnimationTrigger, setXpAnimationTrigger] = useState<boolean>(false);
  const [gainedXPAmount, setGainedXPAmount] = useState<number>(0);
  
  // Custom shelf items matching the screenshot
  const [shelfItems, setShelfItems] = useState([
    { id: 't1', name: 'Flour Tortillas', qty: '5 portions', category: 'baking', freshness: 'good', daysLeft: 3, expiryText: '3d', type: 'leftover', location: 'Fridge' },
    { id: 'c1', name: 'Carrot', qty: '4 pcs', category: 'vegetable', freshness: 'critical', daysLeft: 7, expiryText: '1w', type: 'raw', location: 'Fridge' },
    { id: 's1', name: 'Baby Spinach', qty: '1 bag', category: 'vegetable', freshness: 'urgent', daysLeft: 2, expiryText: '2d', type: 'raw', location: 'Fridge' },
    { id: 'm1', name: 'Almond Milk', qty: '1L', category: 'beverage', freshness: 'good', daysLeft: 6, expiryText: '6d', type: 'raw', location: 'Fridge' },
  ]);

  // Active Category & Subtabs
  const [shelfSubTab, setShelfSubTab] = useState<'Fridge' | 'Freezer' | 'Pantry'>('Fridge');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Scanning State
  const [ocrScanning, setOcrScanning] = useState<boolean>(false);
  const [scanSuccessModal, setScanSuccessModal] = useState<boolean>(false);

  // Waste Savings Calculator State
  const [householdSize, setHouseholdSize] = useState<number>(2);
  const [monthlyGroceryBill, setMonthlyGroceryBill] = useState<number>(400);

  // Calculated estimates
  const estimatedSavingsYearly = Math.round(monthlyGroceryBill * 0.25 * 12); // Average 25% waste saved
  const mealsPreventedFromWaste = Math.round((monthlyGroceryBill * 0.25) / 5) * 12;

  // Trigger floating XP effect
  const triggerXPGain = (amount: number) => {
    setGainedXPAmount(amount);
    setXpAnimationTrigger(true);
    setUserXP(prev => prev + amount);
    setTimeout(() => {
      setXpAnimationTrigger(false);
    }, 1200);
  };

  const handleConsumeItem = (id: string) => {
    setShelfItems(prev => prev.filter(item => item.id !== id));
    setItemsSaved(prev => prev + 1);
    triggerXPGain(45);
  };

  // Receipt Scanner Trigger logic (Screenshot 2)
  const startOcrScan = () => {
    if (ocrScanning) return;
    setOcrScanning(true);
    setTimeout(() => {
      setOcrScanning(false);
      setScanSuccessModal(true);
    }, 1500);
  };

  // Confirm receipt addition & boost matches to 38%
  const handleConfirmOcrScan = () => {
    const alreadyScanned = shelfItems.some(i => i.id === 'g1');
    if (!alreadyScanned) {
      setShelfItems(prev => [
        ...prev,
        { id: 'g1', name: 'Garlic', qty: '1 bulb', category: 'baking', freshness: 'good', daysLeft: 14, expiryText: '2w', type: 'raw', location: 'Fridge' },
        { id: 'ch1', name: 'Chicken Thigh', qty: '500g', category: 'vegetable', freshness: 'good', daysLeft: 4, expiryText: '4d', type: 'raw', location: 'Fridge' },
        { id: 'ss1', name: 'Soy Sauce', qty: '1 bottle', category: 'oil', freshness: 'good', daysLeft: 90, expiryText: '3m', type: 'raw', location: 'Fridge' },
      ]);
    }
    setScanSuccessModal(false);
    triggerXPGain(150);
    setMealsCooked(prev => prev + 1);
    setItemsSaved(prev => prev + 3);
    setMockTab('shelf'); // auto navigate to shelf so they see their new items!
  };

  // Calculate dynamic recipe matches (Screenshot 1)
  const checkMatches = () => {
    const recipeIngs = ['chicken thigh', 'garlic', 'soy sauce', 'butter', 'rice', 'green onion', 'black pepper', 'sesame seeds'];
    const haveIngs = recipeIngs.filter(ing => 
      shelfItems.some(item => item.name.toLowerCase().includes(ing) || ing.includes(item.name.toLowerCase()))
    );
    return {
      matchedIngredientsCount: haveIngs.length,
      recipeMatchPercent: Math.round((haveIngs.length / recipeIngs.length) * 100)
    };
  };

  const { matchedIngredientsCount, recipeMatchPercent } = checkMatches();



  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section id="hero-section" className="relative pt-12 md:pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Column */}
          <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-brand-500/10 border border-brand-500/30 rounded-full px-4 py-1.5 text-xs font-semibold text-brand-400">
              <Sparkles className="h-3.5 w-3.5 text-brand-500 animate-pulse" />
              <span>Plately Beta v1.2 — Live Web Experience</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-tight tracking-tight text-white">
              Your entire kitchen, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-emerald-600">
                finally in one app.
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 font-sans max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Plately tracks what’s in your fridge, recommends smart recipes, logs what you eat, and schedules your meal prep—reducing waste, saving money, and optimizing nutrition.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a 
                id="hero-primary-cta"
                href="https://app.theplately.com"
                className="w-full sm:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-400 text-white font-semibold rounded-xl shadow-[0_0_15px_rgba(249,139,37,0.4)] hover:shadow-[0_0_25px_rgba(249,139,37,0.6)] transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Open Web App</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <button 
                id="hero-secondary-cta"
                onClick={() => onNavigate('features')}
                className="w-full sm:w-auto px-8 py-4 glass-panel hover:glass-panel-hover text-slate-300 font-semibold rounded-xl transition-all flex items-center justify-center space-x-2"
              >
                <span>Explore Features</span>
              </button>
            </div>

            {/* Micro proof banner */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-2xl font-bold font-display text-brand-500">25%</p>
                <p className="text-xs text-slate-500 font-sans">Avg. Grocery Savings</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-display text-brand-500">98%</p>
                <p className="text-xs text-slate-500 font-sans">Beta Tester Satisfaction</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-display text-brand-500">12t</p>
                <p className="text-xs text-slate-500 font-sans">Food Waste Prevented</p>
              </div>
            </div>
          </div>

          {/* Hero Right Column: Interactive App Simulator */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            
            {/* Real Smartphone Frame Wrapper */}
            <div className="relative w-full max-w-[380px] h-[750px] bg-[#0c0f16] border-[10px] border-[#1e2533] rounded-[44px] shadow-2xl flex flex-col overflow-hidden text-slate-100 font-sans select-none ring-1 ring-slate-800">
              
              {/* Device Notch / Dynamic Island */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-black rounded-full z-50 flex items-center justify-center space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                <div className="w-12 h-1 rounded-full bg-slate-950" />
              </div>

              {/* Top Device Status Bar */}
              <div className="h-10 bg-[#0f141c] px-6 pt-3.5 flex justify-between items-center text-[11px] font-semibold text-slate-400 z-40">
                <span>06:13</span>
                <div className="flex items-center space-x-1.5">
                  <svg className="w-3.5 h-3.5 fill-current text-slate-400" viewBox="0 0 24 24">
                    <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.22 19.58 10.57 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
                  </svg>
                  <span>LTE</span>
                  <div className="w-5 h-2.5 border border-slate-500 rounded-sm p-0.5 flex items-center">
                    <div className="bg-slate-300 h-full w-[85%] rounded-[1px]" />
                  </div>
                </div>
              </div>

              {/* Interactive Screens Body */}
              <div className="flex-1 bg-[#0f141c] flex flex-col overflow-y-auto no-scrollbar relative min-h-0">
                <AnimatePresence mode="wait">
                  
                  {/* 1. ACTIVE COOK MODE OVERLAY */}
                  {mockTab === 'active_cook' && (
                    <motion.div 
                      key="active_cook"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="absolute inset-0 z-40 bg-[#0f141c] flex flex-col"
                    >
                      <ActiveCookMode isEmbedded={true} onClose={() => setMockTab('cook')} />
                    </motion.div>
                  )}

                  {/* 2. COOK / EXPLORE SCREEN */}
                  {mockTab === 'cook' && (
                    <motion.div
                      key="cook"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col p-5 space-y-4"
                    >
                      {/* App Header (Screenshot 1) */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <img src={logo} alt="Plately Logo" className="w-6 h-6 rounded-md object-cover" referrerPolicy="no-referrer" />
                          <span className="text-xl font-extrabold font-display tracking-tight text-white">Plately</span>
                        </div>
                        
                        {/* Profile Avatar Trigger Button */}
                        <button 
                          onClick={() => {
                            setPrevTab('cook');
                            setMockTab('profile');
                          }}
                          className="w-8 h-8 rounded-full bg-[#e07a11]/20 border border-[#e07a11]/40 flex items-center justify-center text-[#e07a11] hover:bg-[#e07a11]/35 transition-all"
                        >
                          <User className="w-4 h-4 text-[#e07a11]" />
                        </button>
                      </div>

                      {/* Heading Row (Screenshot 1) */}
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-white tracking-tight">What to ...</h3>
                        
                        {/* Title Utilities Panel */}
                        <div className="flex items-center space-x-2.5 text-slate-400">
                          <button className="hover:text-white transition-all"><Search className="w-4 h-4" /></button>
                          <button className="hover:text-white transition-all"><Sparkles className="w-4 h-4" /></button>
                          <button className="hover:text-white transition-all"><Plus className="w-4 h-4" /></button>
                          <button className="hover:text-white transition-all"><BookOpen className="w-4 h-4" /></button>
                          <button 
                            onClick={() => {
                              setShelfItems([
                                { id: 't1', name: 'Flour Tortillas', qty: '5 portions', category: 'baking', freshness: 'good', daysLeft: 3, expiryText: '3d', type: 'leftover', location: 'Fridge' },
                                { id: 'c1', name: 'Carrot', qty: '4 pcs', category: 'vegetable', freshness: 'critical', daysLeft: 7, expiryText: '1w', type: 'raw', location: 'Fridge' },
                                { id: 's1', name: 'Baby Spinach', qty: '1 bag', category: 'vegetable', freshness: 'urgent', daysLeft: 2, expiryText: '2d', type: 'raw', location: 'Fridge' },
                                { id: 'm1', name: 'Almond Milk', qty: '1L', category: 'beverage', freshness: 'good', daysLeft: 6, expiryText: '6d', type: 'raw', location: 'Fridge' },
                              ]);
                              triggerXPGain(10);
                            }}
                            className="hover:text-white transition-all"
                            title="Reset Mock Inventory"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Subtabs (Screenshot 1) */}
                      <div className="flex space-x-4 border-b border-slate-800/60 pb-1 text-xs font-semibold text-slate-400">
                        <button className="text-[#e07a11] border-b-2 border-[#e07a11] pb-1.5 px-0.5">
                          Explore (112)
                        </button>
                        <button className="hover:text-slate-200 pb-1.5 transition-all">Perfect</button>
                        <button className="hover:text-slate-200 pb-1.5 transition-all">For You (2)</button>
                        <button className="hover:text-slate-200 pb-1.5 transition-all">Use It U...</button>
                      </div>

                      {/* Horizontal Category Chips (Screenshot 1) */}
                      <div className="flex space-x-2 overflow-x-auto no-scrollbar py-0.5">
                        <button className="flex items-center space-x-1.5 bg-[#e07a11] text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full shadow-sm">
                          <Check className="w-3 h-3" />
                          <span>All</span>
                        </button>
                        {['Uzbek', 'Korean', 'Japanese', 'Italian'].map(cat => (
                          <button 
                            key={cat} 
                            onClick={() => triggerXPGain(5)}
                            className="bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] font-medium px-3.5 py-1.5 rounded-full transition-all"
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      {/* Main Recipe Card - Garlic Chicken Rice Bowl (Screenshot 1) */}
                      <div 
                        onClick={() => setMockTab('active_cook')}
                        className="bg-slate-900 border border-slate-800/80 rounded-3xl overflow-hidden hover:border-slate-700 transition-all cursor-pointer shadow-lg group"
                      >
                        {/* Recipe Image with overlay percentage match */}
                        <div className="relative h-44 bg-slate-800">
                          <img 
                            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80" 
                            alt="Garlic Chicken Rice Bowl" 
                            className="w-full h-full object-cover group-hover:scale-102 transition-all duration-300 brightness-95"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/10" />
                          
                          {/* Match % badge (Screenshot 1) */}
                          <div className="absolute bottom-3 right-3 bg-slate-950/75 backdrop-blur-md text-white font-semibold font-mono text-[11px] px-3 py-1 rounded-full border border-slate-800">
                            {recipeMatchPercent}%
                          </div>
                        </div>

                        {/* Card Content details */}
                        <div className="p-4 space-y-3">
                          <div className="space-y-1">
                            <h4 className="text-base font-bold text-white group-hover:text-[#e07a11] transition-colors leading-tight">
                              Garlic Chicken Rice Bowl
                            </h4>
                            <p className="text-xs text-slate-300 flex items-center space-x-1.5">
                              <span>🌏 Discover something new</span>
                            </p>
                            <p className="text-[11px] text-slate-400 font-sans">
                              Filipino-inspired garlic chicken over rice
                            </p>
                          </div>

                          {/* Quick details Row */}
                          <div className="flex flex-wrap gap-1.5 text-[10px]">
                            <span className="bg-[#e07a11]/10 text-[#e07a11] border border-[#e07a11]/30 px-2 py-0.5 rounded-md flex items-center space-x-1">
                              <Package className="w-3 h-3" />
                              <span>{matchedIngredientsCount}/8 ingredients</span>
                            </span>
                            <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md flex items-center space-x-1">
                              <Globe className="w-3 h-3 text-slate-400" />
                              <span>Asian</span>
                            </span>
                            <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span>20 min</span>
                            </span>
                            <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md flex items-center space-x-1">
                              <span className="text-slate-400">📊⚡</span>
                              <span>Difficulty</span>
                            </span>
                          </div>

                          {/* Orange needed-ingredients warning container (Screenshot 1) */}
                          <div className="bg-[#4a2e16]/30 border border-[#e07a11]/25 p-3 rounded-2xl flex items-start space-x-2 text-[10px] text-amber-500 leading-normal">
                            <ShoppingCart className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                            <p className="font-medium text-amber-400/90">
                              <span className="font-bold text-[#e07a11]">Need:</span> Chicken Thigh, Garlic, Soy Sauce, Butter, Rice, Green Onion, Black Pepper, Sesame Seeds
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Mini helper hint */}
                      <p className="text-[9px] text-center text-slate-500 font-mono">
                        💡 Click the Garlic Chicken card to try Plately Active Cook Assistant!
                      </p>
                    </motion.div>
                  )}

                  {/* 3. SCAN SCREEN (Screenshot 2) */}
                  {mockTab === 'scan' && (
                    <motion.div
                      key="scan"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col p-5 space-y-5 justify-between"
                    >
                      {/* Scan Header */}
                      <div className="flex items-center justify-between">
                        <span className="w-8"></span> {/* empty spacer for center title */}
                        <span className="text-base font-bold text-white tracking-wide">Scan</span>
                        
                        <button 
                          onClick={() => {
                            setPrevTab('scan');
                            setMockTab('profile');
                          }}
                          className="w-8 h-8 rounded-full bg-[#e07a11]/20 border border-[#e07a11]/40 flex items-center justify-center text-[#e07a11]"
                        >
                          <User className="w-4 h-4 text-[#e07a11]" />
                        </button>
                      </div>

                      {/* Sub-tabs */}
                      <div className="flex justify-center border-b border-slate-800/60 text-xs font-semibold">
                        <button 
                          onClick={() => setScanSubTab('food')}
                          className={`pb-2 px-6 transition-all ${scanSubTab === 'food' ? 'text-[#e07a11] border-b-2 border-[#e07a11]' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                          Scan Food
                        </button>
                        <button 
                          onClick={() => setScanSubTab('calories')}
                          className={`pb-2 px-6 transition-all ${scanSubTab === 'calories' ? 'text-[#e07a11] border-b-2 border-[#e07a11]' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                          Scan Calories
                        </button>
                      </div>

                      {scanSubTab === 'calories' ? (
                        /* Calorie Plate Scanner Simulation (CalorieScanTab) */
                        <div className="flex-1 flex flex-col justify-between space-y-3 py-2 animate-fadeIn">
                          <div className="relative h-44 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-3 text-center">
                            <img 
                              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80" 
                              alt="Garlic Chicken Rice Bowl" 
                              className="absolute inset-0 w-full h-full object-cover opacity-35"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                            
                            <div className="relative z-10 space-y-2">
                              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono">
                                ✦ AI Plate Recognition Active
                              </span>
                              <h5 className="text-sm font-bold text-white leading-tight">Garlic Chicken & Brown Rice</h5>
                              <p className="text-[11px] text-amber-400 font-mono font-semibold">
                                520 kcal • 38g Protein • 45g Carbs
                              </p>
                            </div>

                            {/* Sweeping scan bar */}
                            <motion.div 
                              initial={{ top: '15%' }}
                              animate={{ top: '85%' }}
                              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                              className="absolute left-3 right-3 h-0.5 bg-[#e07a11] shadow-[0_0_12px_#e07a11] pointer-events-none"
                            />
                          </div>

                          <div className="bg-[#141b25] border border-slate-800/80 p-3 rounded-2xl space-y-1.5 text-left text-[11px]">
                            <div className="flex justify-between text-slate-300 font-semibold">
                              <span>Estimated Portion Size:</span>
                              <span className="text-[#e07a11]">1 Standard Bowl (420g)</span>
                            </div>
                            <div className="flex justify-between text-slate-400 text-[10px]">
                              <span>Vitamins & Minerals:</span>
                              <span className="text-emerald-400 font-medium">High Iron & Vitamin B6</span>
                            </div>
                          </div>

                          <button 
                            onClick={() => {
                              triggerXPGain(40);
                              setMealsCooked(prev => prev + 1);
                              setScanSubTab('food');
                              setMockTab('profile');
                            }}
                            className="w-full py-3 bg-gradient-to-r from-[#e07a11] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-amber-900/20 transition-all flex items-center justify-center space-x-1.5"
                          >
                            <Check className="w-4 h-4" />
                            <span>Consume & Log Plate (+40 XP)</span>
                          </button>
                        </div>
                      ) : (
                        /* Standard Food Scan (Receipt / Photo / Barcode) */
                        <>
                          {/* Camera viewfinder section */}
                          <div className="flex-1 flex flex-col items-center justify-center space-y-6 relative py-4">
                            <div className="relative w-40 h-40 flex items-center justify-center">
                              <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-xl animate-pulse" />
                              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#e07a11] rounded-tl-lg" />
                              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#e07a11] rounded-tr-lg" />
                              <div className="absolute bottom-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#e07a11] rounded-bl-lg rotate-180" />
                              <div className="absolute bottom-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#e07a11] rounded-br-lg rotate-180" />
                              <Barcode className="w-16 h-16 text-[#e07a11] opacity-90" />
                            </div>

                            <div className="text-center space-y-1 px-4">
                              <h4 className="text-lg font-bold text-white">Scan Your Ingredients</h4>
                              <p className="text-xs text-slate-400 font-sans leading-normal">
                                Take a photo of food items or grocery slips to add them automatically
                              </p>
                            </div>
                          </div>

                          {/* Input Mode Selector Bar */}
                          <div className="bg-slate-900/80 border border-slate-800 p-1 rounded-xl grid grid-cols-3 gap-1 text-[11px] font-semibold text-slate-400 text-center">
                            <button className="bg-[#4a2e16]/60 border border-[#e07a11]/35 text-white py-2 rounded-lg flex items-center justify-center space-x-1.5">
                              <span className="text-xs">🧾</span>
                              <span>Receipt</span>
                            </button>
                            <button className="hover:text-slate-200 py-2 flex items-center justify-center space-x-1.5 transition-all">
                              <Camera className="w-3.5 h-3.5 text-slate-400" />
                              <span>Photo</span>
                            </button>
                            <button className="hover:text-slate-200 py-2 flex items-center justify-center space-x-1.5 transition-all">
                              <span className="text-xs">📱</span>
                              <span>Barcode</span>
                            </button>
                          </div>

                          {/* Primary Camera trigger buttons */}
                          <div className="space-y-2 pt-2">
                            <button 
                              onClick={startOcrScan}
                              disabled={ocrScanning}
                              className="w-full py-3 bg-[#e07a11] hover:bg-amber-600 disabled:opacity-75 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-amber-900/10 transition-all"
                            >
                              <Camera className="w-4 h-4" />
                              <span>{ocrScanning ? 'Scanning Receipt...' : 'Take Photo'}</span>
                            </button>

                            <button className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl border border-slate-800 transition-all flex items-center justify-center space-x-2">
                              <Image className="w-4 h-4 text-slate-400" />
                              <span>Choose from Gallery</span>
                            </button>
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}

                  {/* 4. SHELF SCREEN (Screenshot 3) */}
                  {mockTab === 'shelf' && (
                    <motion.div
                      key="shelf"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col p-5 space-y-4"
                    >
                      {/* Shelf Title & Alerts Bar */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-lg">🧊</span>
                          <span className="text-lg font-bold text-white tracking-tight">My Fridge</span>
                        </div>

                        <div className="flex items-center space-x-3 text-slate-400">
                          <button 
                            onClick={() => {
                              setShelfItems([
                                { id: 't1', name: 'Flour Tortillas', qty: '5 portions', category: 'baking', freshness: 'good', daysLeft: 3, expiryText: '3d', type: 'leftover', location: 'Fridge' },
                                { id: 'c1', name: 'Carrot', qty: '4 pcs', category: 'vegetable', freshness: 'critical', daysLeft: 7, expiryText: '1w', type: 'raw', location: 'Fridge' },
                              ]);
                              triggerXPGain(15);
                            }}
                            className="hover:text-white transition-all"
                            title="Reset list"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                          
                          <div className="relative">
                            <Bell className="w-4 h-4 text-slate-400" />
                            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                              1
                            </span>
                          </div>

                          <button 
                            onClick={() => {
                              setPrevTab('shelf');
                              setMockTab('profile');
                            }}
                            className="w-8 h-8 rounded-full bg-[#e07a11]/20 border border-[#e07a11]/40 flex items-center justify-center text-[#e07a11]"
                          >
                            <User className="w-4 h-4 text-[#e07a11]" />
                          </button>
                        </div>
                      </div>

                      {/* Fridge/Freezer/Pantry Tabs */}
                      <div className="flex space-x-5 border-b border-slate-800/60 pb-1 text-xs font-semibold text-slate-400">
                        <button className="text-[#e07a11] border-b-2 border-[#e07a11] pb-1.5 px-0.5">Fridge</button>
                        <button className="hover:text-slate-200 pb-1.5 transition-all">Freezer</button>
                        <button className="hover:text-slate-200 pb-1.5 transition-all">Pantry</button>
                      </div>

                      {/* Status Badges Row Box (Screenshot 3) */}
                      <div className="bg-[#141b25] border border-slate-800/80 p-3 rounded-2xl grid grid-cols-4 gap-1 text-center shadow-inner">
                        <div>
                          <p className="text-[#e07a11] text-lg font-bold font-mono">{shelfItems.length}</p>
                          <p className="text-[9px] text-slate-400">Total</p>
                        </div>
                        <div>
                          <p className="text-emerald-500 text-lg font-bold font-mono">
                            {shelfItems.filter(i => i.freshness === 'good').length}
                          </p>
                          <p className="text-[9px] text-slate-400">Fresh</p>
                        </div>
                        <div>
                          <p className="text-[#f59e0b] text-lg font-bold font-mono">
                            {shelfItems.filter(i => i.freshness === 'critical' || i.freshness === 'urgent').length}
                          </p>
                          <p className="text-[9px] text-slate-400 font-medium">Expiring</p>
                        </div>
                        <div>
                          <p className="text-red-500 text-lg font-bold font-mono">0</p>
                          <p className="text-[9px] text-slate-400">Expired</p>
                        </div>
                      </div>

                      {/* Search bar input (Screenshot 3) */}
                      <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                        <input 
                          type="text" 
                          placeholder="Search ingredients..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#e07a11] transition-all"
                        />
                      </div>

                      {/* Category pills tags */}
                      <div className="flex space-x-2 overflow-x-auto no-scrollbar py-0.5">
                        <button 
                          onClick={() => setSelectedCategory('All')}
                          className={`flex items-center space-x-1 bg-gradient-to-r ${selectedCategory === 'All' ? 'from-[#e07a11] to-amber-600 text-white' : 'from-slate-800 to-slate-800 text-slate-300 hover:bg-slate-700'} text-[11px] font-semibold px-3 py-1.5 rounded-full transition-all`}
                        >
                          <Check className="w-3 h-3" />
                          <span>All</span>
                        </button>
                        {[
                          { name: 'baking', emoji: '🍞' },
                          { name: 'beverage', emoji: '🍹' },
                          { name: 'oil', emoji: '🫒' }
                        ].map(cat => (
                          <button 
                            key={cat.name}
                            onClick={() => setSelectedCategory(selectedCategory === cat.name ? 'All' : cat.name)}
                            className={`flex items-center space-x-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] font-medium px-3.5 py-1.5 rounded-full border border-transparent transition-all ${selectedCategory === cat.name ? 'border-[#e07a11] text-amber-400 bg-slate-900' : ''}`}
                          >
                            <span className="text-[10px]">{cat.emoji}</span>
                            <span>{cat.name}</span>
                          </button>
                        ))}
                      </div>

                      {/* Ingredients Grid Items list */}
                      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar pr-0.5">
                        {shelfItems.length === 0 ? (
                          <div className="text-center py-10 space-y-2">
                            <span className="text-2xl">🍃</span>
                            <p className="text-xs text-slate-500">Fridge is empty!</p>
                            <button 
                              onClick={() => setMockTab('scan')}
                              className="text-xs text-[#e07a11] font-bold underline block mx-auto hover:text-amber-400 mt-2"
                            >
                              Scan Receipt to Fill
                            </button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-3 pb-4">
                            {shelfItems
                              .filter(item => {
                                if (searchQuery) {
                                  return item.name.toLowerCase().includes(searchQuery.toLowerCase());
                                }
                                if (selectedCategory !== 'All') {
                                  return item.category === selectedCategory;
                                }
                                return true;
                              })
                              .map(item => {
                                // Decide styling based on item
                                const isTortilla = item.id === 't1';
                                const isCarrot = item.id === 'c1';
                                
                                return (
                                  <div 
                                    key={item.id}
                                    className={`relative bg-slate-900 border rounded-2xl p-3 flex flex-col justify-between aspect-square hover:border-slate-700 transition-all shadow-md group ${
                                      item.freshness === 'critical' ? 'border-red-500/50 hover:border-red-400' :
                                      item.freshness === 'urgent' ? 'border-[#f59e0b]/50 hover:border-[#f59e0b]' :
                                      'border-emerald-500/50 hover:border-emerald-400'
                                    }`}
                                  >
                                    {/* Left labels (qty portions) */}
                                    <div className="flex items-center justify-between text-[10px]">
                                      <span className="text-slate-400 font-medium">{item.qty}</span>
                                      
                                      {/* Leftover indicator badge (Screenshot 3) */}
                                      {item.type === 'leftover' && (
                                        <span className="bg-emerald-500/20 text-emerald-400 text-[8px] font-bold border border-emerald-500/30 px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                                          LEFTOVER
                                        </span>
                                      )}
                                    </div>

                                    {/* Center graphics/visual illustrations (Screenshot 3) */}
                                    <div className="flex-1 flex items-center justify-center py-1.5">
                                      {isTortilla ? (
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#132624] to-[#122b27] flex items-center justify-center border border-emerald-500/20 shadow-md">
                                          {/* Custom plate with fork/knife drawing (Screenshot 3) */}
                                          <div className="relative w-8 h-8 rounded-full border-2 border-emerald-400/40 flex items-center justify-center">
                                            <span className="text-xs text-emerald-400">🍴</span>
                                          </div>
                                        </div>
                                      ) : isCarrot ? (
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#2b141d] to-[#29181a] flex items-center justify-center border border-red-500/10 shadow-md">
                                          <span className="text-3xl">🥕</span>
                                        </div>
                                      ) : (
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-slate-800 to-slate-900 flex items-center justify-center shadow-md">
                                          <span className="text-3xl">
                                            {item.name === 'Garlic' ? '🧄' : 
                                             item.name === 'Chicken Thigh' ? '🍗' : 
                                             item.name === 'Soy Sauce' ? '🥢' : 
                                             item.name === 'Almond Milk' ? '🥛' : '🥑'}
                                          </span>
                                        </div>
                                      )}
                                    </div>

                                    {/* Item name and expiry text */}
                                    <div className="space-y-0.5">
                                      <p className="text-xs font-bold text-white leading-tight truncate">
                                        {item.name}
                                      </p>
                                      
                                      <div className="flex items-center justify-between text-[10px]">
                                        <span className={
                                          item.freshness === 'critical' ? 'text-red-400 font-semibold' :
                                          item.freshness === 'urgent' ? 'text-amber-400' : 'text-emerald-400'
                                        }>
                                          {item.expiryText}
                                        </span>

                                        {/* Hover consume quick-button */}
                                        <button 
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleConsumeItem(item.id);
                                          }}
                                          className="opacity-0 group-hover:opacity-100 bg-[#e07a11]/90 hover:bg-amber-600 text-white font-bold text-[9px] px-2 py-1 rounded transition-opacity"
                                        >
                                          ✓ Eat
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* 4.5 PREP SCREEN (AI Batch Meal Prep Generator & Session) */}
                  {mockTab === 'prep' && (
                    <motion.div
                      key="prep"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col p-5 space-y-4"
                    >
                      {/* Prep Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">🍱</span>
                          <span className="text-lg font-bold text-white tracking-tight">AI Bulk Prep</span>
                        </div>
                        <button 
                          onClick={() => {
                            setPrevTab('prep');
                            setMockTab('profile');
                          }}
                          className="w-8 h-8 rounded-full bg-[#e07a11]/20 border border-[#e07a11]/40 flex items-center justify-center text-[#e07a11]"
                        >
                          <User className="w-4 h-4 text-[#e07a11]" />
                        </button>
                      </div>

                      {/* Days selector pills */}
                      <div className="bg-[#141b25] border border-slate-800 p-1.5 rounded-2xl grid grid-cols-3 gap-1.5 text-center text-xs font-semibold">
                        {[3, 5, 7].map(d => (
                          <button
                            key={d}
                            onClick={() => setPrepDays(d)}
                            className={`py-2 rounded-xl transition-all ${prepDays === d ? 'bg-[#e07a11] text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                          >
                            {d}-Day Batch Plan
                          </button>
                        ))}
                      </div>

                      {/* Plan summary info */}
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-inner">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-xs font-bold text-white uppercase font-display tracking-wide">
                              {prepDays}-Day Shared Ingredient Matrix
                            </h4>
                            <p className="text-[10px] text-slate-400">
                              Optimized for 15 prep containers • 2h 15m total time
                            </p>
                          </div>
                          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[9px] font-mono px-2 py-0.5 rounded-full">
                            94% Shelf Synergy
                          </span>
                        </div>

                        {/* Consolidated ingredients row */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {['🍗 1.2kg Chicken Thigh', '🧄 2 Bulbs Garlic', '🍚 5 Cups Brown Rice', '🥬 2 Bags Spinach', '🥢 Soy Sauce'].map(ing => (
                            <span key={ing} className="bg-slate-800 text-slate-300 border border-slate-700/60 text-[10px] px-2 py-1 rounded-lg">
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Interactive Prep Session Timer */}
                      <div className="bg-[#141b25] border border-slate-800/80 p-4 rounded-2xl space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-slate-200">⏱️ Prep Session Steps</span>
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${prepRunning ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse' : 'bg-slate-800 text-slate-400'}`}>
                              {prepRunning ? 'SESSION ACTIVE (01:42:10)' : 'READY TO LAUNCH'}
                            </span>
                          </div>
                        </div>

                        {/* Checkable prep steps */}
                        <div className="space-y-2 text-[11px]">
                          {[
                            'Step 1: Roast chicken & garlic simultaneously at 400°F (35 min)',
                            'Step 2: Simmer brown rice with sesame oil broth (25 min)',
                            'Step 3: Portion into 15 glass boxes & apply QR freshness labels'
                          ].map((step, idx) => (
                            <div 
                              key={idx}
                              onClick={() => {
                                const newChecks = [...prepStepCheck];
                                newChecks[idx] = !newChecks[idx];
                                setPrepStepCheck(newChecks);
                                if (!newChecks[idx] === false) triggerXPGain(20);
                              }}
                              className={`p-2.5 rounded-xl border flex items-center space-x-2.5 cursor-pointer transition-all ${prepStepCheck[idx] ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'}`}
                            >
                              <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${prepStepCheck[idx] ? 'bg-emerald-500 border-emerald-400 text-black font-bold' : 'border-slate-600'}`}>
                                {prepStepCheck[idx] && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span className={prepStepCheck[idx] ? 'line-through opacity-75' : ''}>{step}</span>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => {
                            setPrepRunning(!prepRunning);
                            if (!prepRunning) triggerXPGain(60);
                          }}
                          className="w-full py-3 bg-[#e07a11] hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-amber-900/20 transition-all flex items-center justify-center space-x-2"
                        >
                          <Clock className="w-4 h-4" />
                          <span>{prepRunning ? 'Pause Prep Session' : 'Start Prep Timer Mode (+60 XP)'}</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* 5. PROFILE SCREEN (Screenshot 4) */}
                  {mockTab === 'profile' && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex-1 flex flex-col p-5 space-y-4"
                    >
                      {/* Back button Navigation (Screenshot 4) */}
                      <div className="flex items-center justify-between">
                        <button 
                          onClick={() => setMockTab(prevTab as any)}
                          className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800/80 flex items-center justify-center text-slate-300 transition-all"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        
                        <button 
                          onClick={() => {
                            setUserXP(2385);
                            setMealsCooked(18);
                            setItemsSaved(297);
                            setStreakCount(1);
                            triggerXPGain(15);
                          }}
                          className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800/80 flex items-center justify-center text-slate-300 transition-all"
                          title="Reset Profile Stats"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Profile details */}
                      <div className="flex flex-col items-center text-center space-y-2">
                        {/* Chef Avatar in circle bordered glowing orange */}
                        <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-slate-900 to-slate-800 flex items-center justify-center border-2 border-[#e07a11] shadow-lg shadow-[#e07a11]/15">
                          <span className="text-4xl">👨‍🍳</span>
                          <span className="absolute -bottom-1 -right-1 bg-amber-500 text-black text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            7
                          </span>
                        </div>

                        <div className="space-y-0.5">
                          <div className="flex items-center justify-center space-x-1.5">
                            <h4 className="text-lg font-bold text-white">Shukurillokh Mamarasulov</h4>
                            <button className="text-slate-400 hover:text-white"><Pencil className="w-3.5 h-3.5" /></button>
                          </div>
                          <p className="text-[11px] text-slate-400 font-sans leading-none">
                            shukurillomamarasulovex@gmail.com
                          </p>
                          <p className="text-[11px] text-[#e07a11] font-semibold tracking-wide">
                            @shukurillokh
                          </p>
                        </div>

                        {/* Outline XP Badge */}
                        <div className="inline-flex items-center bg-[#e07a11]/10 border border-[#e07a11]/40 text-[#e07a11] font-bold text-xs px-5 py-1.5 rounded-full uppercase tracking-wider font-mono">
                          Level 7 • {userXP} XP
                        </div>
                      </div>

                      {/* Level Progress section (Screenshot 4) */}
                      <div className="bg-[#141b25] border border-slate-800/80 p-4 rounded-2xl space-y-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Level Progress</p>
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-[#e07a11]">Level 7</span>
                          <span className="text-slate-300 font-mono">{userXP} / 6400 XP</span>
                        </div>
                        
                        {/* Orange progress bar */}
                        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800/60">
                          <motion.div 
                            className="bg-gradient-to-r from-[#e07a11] to-amber-500 h-full rounded-full"
                            style={{ width: `${Math.min(100, (userXP / 6400) * 100)}%` }}
                            layout
                          />
                        </div>
                      </div>

                      {/* Your Impact card metrics (Screenshot 4) */}
                      <div className="bg-[#141b25] border border-slate-800/80 p-4 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                          <span>Your Impact</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                        </div>

                        <div className="grid grid-cols-3 gap-1 divide-x divide-slate-800/60 text-center">
                          <div className="flex flex-col items-center space-y-1">
                            <span className="text-[#e07a11] text-lg">🍴</span>
                            <span className="text-lg font-extrabold text-white">{mealsCooked}</span>
                            <span className="text-[9px] text-slate-400 font-medium">Meals Cooked</span>
                          </div>
                          
                          <div className="flex flex-col items-center space-y-1">
                            <span className="text-emerald-500 text-lg">🍃</span>
                            <span className="text-lg font-extrabold text-white">{itemsSaved}</span>
                            <span className="text-[9px] text-slate-400 font-medium">Items Saved</span>
                          </div>

                          <div className="flex flex-col items-center space-y-1">
                            <span className="text-amber-500 text-lg">🔥</span>
                            <span className="text-lg font-extrabold text-white">{streakCount}</span>
                            <span className="text-[9px] text-slate-400 font-medium">Day Streak</span>
                          </div>
                        </div>
                      </div>

                      {/* Badges & Achievements row (Screenshot 4) */}
                      <div className="bg-[#141b25] border border-slate-800/80 p-4 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                          <span>Badges & Achievements</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                        </div>

                        <div className="flex space-x-3 overflow-x-auto no-scrollbar py-0.5">
                          {/* Active Egg Badge (Screenshot 4) */}
                          <div className="flex flex-col items-center space-y-1.5 flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-amber-500/10 border-2 border-amber-500 flex items-center justify-center shadow-md shadow-amber-500/10">
                              <span className="text-xl">🍳</span>
                            </div>
                            <span className="text-[9px] text-amber-500 font-bold">First Meal</span>
                          </div>

                          {/* Gray Badges */}
                          {[
                            { name: 'Waste Fighter', emoji: '🌱' },
                            { name: 'Waste Warrior', emoji: '🛡️' },
                            { name: '6-7 Day Streak', emoji: '📅' }
                          ].map(badge => (
                            <div key={badge.name} className="flex flex-col items-center space-y-1.5 flex-shrink-0 opacity-40 grayscale">
                              <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center">
                                <span className="text-xl">{badge.emoji}</span>
                              </div>
                              <span className="text-[9px] text-slate-400 font-medium">{badge.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Glowing XP Reward Flying Banner Animation */}
              <AnimatePresence>
                {xpAnimationTrigger && (
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={{ opacity: 1, y: -40, scale: 1.1 }}
                    exit={{ opacity: 0, y: -100, scale: 0.9 }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                    className="absolute bottom-20 right-8 z-50 bg-gradient-to-r from-amber-500 to-[#e07a11] text-black font-extrabold font-mono text-xs px-3.5 py-1.5 rounded-full shadow-lg border border-yellow-300 flex items-center space-x-1"
                  >
                    <span>✨</span>
                    <span>+{gainedXPAmount} XP</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Camera OCR scanning viewfinder sweep line */}
              <AnimatePresence>
                {ocrScanning && (
                  <div className="absolute inset-x-0 top-10 bottom-20 z-50 pointer-events-none overflow-hidden">
                    {/* Beautiful green scanner horizontal sweeping bar */}
                    <motion.div 
                      initial={{ top: '10%' }}
                      animate={{ top: '85%' }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                      className="absolute left-4 right-4 h-0.5 bg-green-400 shadow-[0_0_10px_#4ade80]"
                    />
                    <div className="absolute inset-0 bg-green-500/5 backdrop-blur-[0.5px]" />
                  </div>
                )}
              </AnimatePresence>

              {/* Simulated Device Home Button / Gesture indicator bar */}
              <div className="h-6 bg-[#0f141c] flex items-center justify-center z-40">
                <div className="w-32 h-1 bg-slate-700 rounded-full" />
              </div>

              {/* Bottom 4 Navigation tabs bar */}
              {mockTab !== 'active_cook' && (
                <div className="bg-[#0f141c] border-t border-slate-800/80 px-4 py-2 grid grid-cols-4 items-center text-center z-40">
                  
                  {/* Cook Tab link */}
                  <button 
                    onClick={() => setMockTab('cook')}
                    className={`flex flex-col items-center space-y-1 transition-all ${
                      mockTab === 'cook' ? 'text-[#e07a11] scale-102 font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Utensils className="w-4 h-4" />
                    <span className="text-[10px]">Cook</span>
                  </button>

                  {/* Scan Floating center button */}
                  <div className="relative -top-2 flex flex-col items-center">
                    <button 
                      onClick={() => setMockTab('scan')}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-105 shadow-md ${
                        mockTab === 'scan'
                          ? 'bg-[#e07a11] ring-4 ring-[#e07a11]/25 shadow-amber-600/30'
                          : 'bg-slate-800 hover:bg-slate-700'
                      }`}
                    >
                      <Camera className="w-4.5 h-4.5" />
                    </button>
                    <span className={`text-[9px] mt-0.5 transition-colors ${mockTab === 'scan' ? 'text-[#e07a11] font-bold' : 'text-slate-400'}`}>
                      Scan
                    </span>
                  </div>

                  {/* Shelf Tab link */}
                  <button 
                    onClick={() => setMockTab('shelf')}
                    className={`flex flex-col items-center space-y-1 transition-all ${
                      mockTab === 'shelf' ? 'text-[#e07a11] scale-102 font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Package className="w-4 h-4" />
                    <span className="text-[10px]">Shelf</span>
                  </button>

                  {/* Prep Tab link */}
                  <button 
                    onClick={() => setMockTab('prep')}
                    className={`flex flex-col items-center space-y-1 transition-all ${
                      mockTab === 'prep' ? 'text-[#e07a11] scale-102 font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span className="text-[10px]">Prep</span>
                  </button>

                </div>
              )}

            </div>

            {/* OCR Success Modal Overlay popup */}
            <AnimatePresence>
              {scanSuccessModal && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-slate-900 border border-slate-800 rounded-3xl p-5 w-full max-w-sm space-y-4 shadow-2xl text-slate-100"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl mx-auto">
                      🎉
                    </div>

                    <div className="text-center space-y-1">
                      <h4 className="text-base font-bold text-white">Receipt Scanned Successfully!</h4>
                      <p className="text-xs text-slate-400">
                        Plately OCR identified 3 new ingredients on your purchase receipt:
                      </p>
                    </div>

                    <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 text-left space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-slate-200">
                        <span>🍗 Chicken Thigh</span>
                        <span className="text-slate-400 font-normal">500g</span>
                      </div>
                      <div className="flex justify-between text-xs font-semibold text-slate-200 border-t border-slate-800/50 pt-1.5">
                        <span>🧄 Garlic</span>
                        <span className="text-slate-400 font-normal">1 bulb</span>
                      </div>
                      <div className="flex justify-between text-xs font-semibold text-slate-200 border-t border-slate-800/50 pt-1.5">
                        <span>🍾 Soy Sauce</span>
                        <span className="text-slate-400 font-normal">1 bottle</span>
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-400 text-center">
                      Adding these will boost your Garlic Chicken Rice Bowl match to <strong className="text-amber-400">38%</strong> and grant you <strong className="text-emerald-400">+150 XP</strong>!
                    </p>

                    <button 
                      onClick={handleConfirmOcrScan}
                      className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-900/10"
                    >
                      Confirm & Add to Shelf
                    </button>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Interactive Legend for the Smartphone Frame */}
            <div className="mt-4 flex flex-col space-y-1 text-center max-w-sm">
              <span className="text-[11px] text-slate-400 font-medium">
                ✨ **Interactive Smartphone Playground** ✨
              </span>
              <span className="text-[10px] text-slate-500 font-mono leading-relaxed">
                Toggle bottom tabs (Cook, Scan, Shelf, Prep), click top-right profile button to check impact stats, try Calorie Plate Scanner under Scan, or test AI Bulk Prep!
              </span>
            </div>
            
          </div>

        </div>
      </section>

      {/* 2. THE PROBLEM AND INTEGRATED ECOSYSTEM STATEMENT (Rich Dark/Glassmorphism Theme) */}
      <section id="ecosystem-story" className="bg-[#0c1017] border-y border-slate-800/80 py-20 text-white relative overflow-hidden">
        {/* Ambient background lighting */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#e07a11]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 bg-[#e07a11]/15 border border-[#e07a11]/35 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#e07a11]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE PLATELY ECOSYSTEM ENGINE</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Why do recipes, inventory, and health tracking live in disconnected apps?
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Every day, home cooks juggle recipe blogs filled with popups, manual food trackers with confusing scales, and sticky notes on the fridge that fail to prevent food from rotting. Plately unifies these silos into a single, automated closed-loop kitchen.
            </p>
          </div>

          {/* Integrated Ecosystem Cards (Glassmorphism & Rich Aesthetics) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
            
            <div className="bg-[#141b25]/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 hover:border-[#e07a11]/50 space-y-4 shadow-2xl hover:-translate-y-1.5 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#e07a11]/15 border border-[#e07a11]/35 flex items-center justify-center text-[#e07a11] group-hover:scale-110 transition-transform">
                <Camera className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">1. Multi-Mode Scanner</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Scan grocery slips via OCR, photograph fresh produce on your countertop, or point your camera at restaurant plates for instant AI calorie and macro extraction.
              </p>
              <div className="border-t border-slate-800/80 pt-3 flex items-center space-x-1 text-xs text-[#e07a11] font-semibold">
                <span>Receipt OCR & Plate Vision</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="bg-[#141b25]/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/50 space-y-4 shadow-2xl hover:-translate-y-1.5 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <ChefHat className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">2. Dynamic Shelf Zones</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Real-time freshness monitoring categorizes items into <span className="text-red-400 font-medium">Critical</span>, <span className="text-amber-400 font-medium">Urgent</span>, and <span className="text-emerald-400 font-medium">Good</span> zones across your Fridge, Freezer, and Pantry.
              </p>
              <div className="border-t border-slate-800/80 pt-3 flex items-center space-x-1 text-xs text-emerald-400 font-semibold">
                <span>Automated Expiration Timers</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="bg-[#141b25]/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 hover:border-amber-500/50 space-y-4 shadow-2xl hover:-translate-y-1.5 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/35 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Flame className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">3. Cook & Store Leftovers</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Our atomic <strong>Servings Cooked vs. Servings Eaten slider</strong> automatically logs nutrition for portions eaten while placing <span className="text-[#e07a11] font-mono">[LEFTOVER]</span> items straight onto your shelf.
              </p>
              <div className="border-t border-slate-800/80 pt-3 flex items-center space-x-1 text-xs text-amber-400 font-semibold">
                <span>Atomic Leftovers Transaction</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="bg-[#141b25]/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 hover:border-blue-500/50 space-y-4 shadow-2xl hover:-translate-y-1.5 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/35 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">4. AI Bulk Meal Prep</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Generate 3, 5, or 7-day batch prep plans that maximize ingredient sharing. Launch an interactive prep timer with sub-steps, container tracking, and freezer alerts.
              </p>
              <div className="border-t border-slate-800/80 pt-3 flex items-center space-x-1 text-xs text-blue-400 font-semibold">
                <span>Batch Prep Session Timer</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. KEY BENEFITS SECTION (Rich Dark Mode / Glassmorphism Grid) */}
      <section id="key-benefits" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold text-[#e07a11] uppercase tracking-widest">Designed for Daily Household Impact</h2>
          <p className="text-3xl md:text-5xl font-black font-display text-white leading-tight">
            Engineered to transform how we eat and live.
          </p>
          <p className="text-slate-400 text-sm">
            Our technology bridges nutritional science with smart home sustainability across four core pillars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4 bg-slate-900/95 p-7 rounded-3xl border border-slate-800 hover:border-[#e07a11]/40 shadow-xl transition-all text-white group">
            <div className="w-12 h-12 rounded-2xl bg-[#e07a11]/15 border border-[#e07a11]/35 flex items-center justify-center text-[#e07a11] group-hover:scale-110 transition-transform">
              <Leaf className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">Stop wasting food</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              “See exactly what’s in your fridge, get smart expiry push alerts, and instantly receive custom recipes tailored specifically to what needs to be cooked first.”
            </p>
          </div>

          <div className="space-y-4 bg-slate-900/95 p-7 rounded-3xl border border-slate-800 hover:border-emerald-500/40 shadow-xl transition-all text-white group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">Zero-click diet logging</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              “Log what you cook using our Store Leftovers slider, or snap photos of restaurant dishes to get immediate calorie and protein estimates without tedious spreadsheet entry.”
            </p>
          </div>

          <div className="space-y-4 bg-slate-900/95 p-7 rounded-3xl border border-slate-800 hover:border-amber-500/40 shadow-xl transition-all text-white group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/35 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Flame className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">Cook with total confidence</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              “Follow step‑by‑step guided cooking sessions with interactive timers, technique cards, ingredient substitution advice, and AI vocal Q&A answers—no ads or popups.”
            </p>
          </div>

          <div className="space-y-4 bg-slate-900/95 p-7 rounded-3xl border border-slate-800 hover:border-blue-500/40 shadow-xl transition-all text-white group">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/35 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">Prep once, eat all week</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              “Plan high-yield batch cooking sessions. Auto-portion boxes, track freezer life, and receive alerts before prep meals dry out or spoil.”
            </p>
          </div>

        </div>
      </section>

      {/* 4. INTERACTIVE SAVINGS CALCULATOR (Dark Mode High Contrast) */}
      <section id="savings-calculator" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0f141c] border border-slate-800 rounded-[36px] text-white p-8 md:p-12 shadow-2xl relative overflow-hidden ring-1 ring-slate-800/80">
          {/* Subtle background glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#e07a11]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="md:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-full px-3.5 py-1.5 text-xs font-bold text-[#e07a11]">
                <Calculator className="h-3.5 w-3.5" />
                <span>Interactive Waste & Cash Calculator</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight leading-none text-white">
                Measure your impact. <br />See what you save.
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed font-sans">
                The UN Food Programme reports families throw away over 25% of all grocery purchases. Plately's automated shelf scanner and Use-It-Up cook assistant prevent waste before it costs you.
              </p>

              {/* Slider Inputs */}
              <div className="space-y-5 pt-4 border-t border-slate-800">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>HOUSEHOLD SIZE</span>
                    <span className="text-white font-bold">{householdSize} {householdSize === 5 ? '5+ people' : householdSize === 1 ? 'Person' : 'People'}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    value={householdSize} 
                    onChange={(e) => setHouseholdSize(Number(e.target.value))}
                    className="w-full accent-[#e07a11] bg-slate-800 h-2 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>ESTIMATED MONTHLY GROCERY BILL</span>
                    <span className="text-white font-bold font-mono">${monthlyGroceryBill} / mo</span>
                  </div>
                  <input 
                    type="range" 
                    min="150" 
                    max="1200" 
                    step="25"
                    value={monthlyGroceryBill} 
                    onChange={(e) => setMonthlyGroceryBill(Number(e.target.value))}
                    className="w-full accent-[#e07a11] bg-slate-800 h-2 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="md:col-span-6 bg-[#141b25] border border-slate-800 p-6 md:p-8 rounded-3xl flex flex-col justify-between h-full space-y-6 shadow-inner">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-1 border-b sm:border-b-0 sm:border-r border-slate-800 pb-4 sm:pb-0">
                  <p className="text-xs font-mono font-bold text-slate-400">ANNUAL CASH SAVED</p>
                  <p className="text-4xl font-black font-display text-[#e07a11]">${estimatedSavingsYearly}</p>
                  <p className="text-[11px] text-slate-400">Equivalent to 3 free grocery months</p>
                </div>

                <div className="space-y-1 pl-0 sm:pl-4">
                  <p className="text-xs font-mono font-bold text-slate-400">MEALS SAVED FROM WASTE</p>
                  <p className="text-4xl font-black font-display text-emerald-400">{mealsPreventedFromWaste}</p>
                  <p className="text-[11px] text-slate-400">Fresh dishes instead of trash</p>
                </div>

              </div>

              <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 flex items-center space-x-3 text-xs text-slate-300">
                <CheckCircle className="h-5 w-5 text-[#e07a11] flex-shrink-0" />
                <p>
                  <strong>Plately Active Monitoring</strong> pays for itself within its first 14 days of kitchen zone tracking by automatically recommending recipes for near-expiry greens, meats, and dairy.
                </p>
              </div>

              <button 
                onClick={onOpenBetaModal}
                className="w-full py-3.5 bg-gradient-to-r from-[#e07a11] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold rounded-xl transition-all flex items-center justify-center space-x-2 text-xs shadow-lg shadow-amber-900/20"
              >
                <span>Activate Kitchen Monitoring Engine</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. TRUST, PRESS & VERIFIED USER STORIES */}
      <section id="trust-testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Press & Partner Badges */}
        <div className="text-center space-y-4">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">SUPPORTED BY SUSTAINABLE KITCHEN INITIATIVES & TECH VENTURES</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70 hover:opacity-100 transition-all">
            <span className="text-lg font-black font-display text-slate-200 tracking-tight">Sustainable Food Org</span>
            <span className="text-lg font-black font-display text-slate-200 tracking-tight">KitchenTech Quarterly</span>
            <span className="text-lg font-black font-display text-slate-200 tracking-tight">TechCrunch Beta</span>
            <span className="text-lg font-black font-display text-slate-200 tracking-tight">EcoSeed Ventures</span>
            <span className="text-lg font-black font-display text-slate-200 tracking-tight">ZeroWaste Allies</span>
          </div>
        </div>

        {/* Testimonials with rich dark cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
          
          <div className="bg-[#0f141c] p-7 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between text-white space-y-6">
            <p className="text-slate-300 text-xs italic font-sans leading-relaxed">
              "As a fitness enthusiast who batch cooks on Sundays, tracking freezer life and remaining boxes was a major headache. Plately's AI Bulk Meal Prep and expiration sensors are like Notion custom-coded for food. I always know what boxes are expiring soon."
            </p>
            <div className="flex items-center space-x-3 pt-4 border-t border-slate-800">
              <div className="w-10 h-10 rounded-full bg-[#e07a11]/20 border border-[#e07a11]/40 flex items-center justify-center font-bold text-[#e07a11] text-xs">
                DK
              </div>
              <div>
                <p className="text-xs font-bold text-white">David Kim</p>
                <p className="text-[10px] text-[#e07a11] font-mono">Meal Prepper & Marathoner</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0f141c] p-7 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between text-white space-y-6 ring-2 ring-[#e07a11]/60">
            <p className="text-slate-300 text-xs italic font-sans leading-relaxed">
              "We used to throw out raw spinach, cheese, and leftover rice every Friday—easily $150/month down the drain. With Plately’s Receipt OCR and the atomic Store Leftovers slider, our food waste is practically zero and our calories auto-log instantly."
            </p>
            <div className="flex items-center space-x-3 pt-4 border-t border-slate-800">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-400 text-xs">
                EM
              </div>
              <div>
                <p className="text-xs font-bold text-white">The Morris Family</p>
                <p className="text-[10px] text-emerald-400 font-mono">Sustainable Living Advocates</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0f141c] p-7 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between text-white space-y-6">
            <p className="text-slate-300 text-xs italic font-sans leading-relaxed">
              "Plately represents the definitive future of smart consumer kitchens. Connecting camera OCR scanning to automated nutrition diary logs is something standard fitness apps can't touch. The UI is breathtaking and lightning fast."
            </p>
            <div className="flex items-center space-x-3 pt-4 border-t border-slate-800">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center font-bold text-blue-400 text-xs">
                HW
              </div>
              <div>
                <p className="text-xs font-bold text-white">Harriet Wood</p>
                <p className="text-[10px] text-blue-400 font-mono">Ecosystem Angel Investor</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. BOTTOM CTA BANNER (Sleek Dark Mode Glass Banner) */}
      <section id="bottom-cta" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-[#0f141c] via-[#141b25] to-[#1e2736] border border-slate-800 p-12 md:p-16 rounded-[40px] space-y-6 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-1/3 w-64 h-64 bg-[#e07a11]/20 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="w-14 h-14 rounded-3xl bg-[#e07a11]/20 border border-[#e07a11]/40 flex items-center justify-center text-[#e07a11] mx-auto shadow-lg shadow-amber-900/20">
            <ChefHat className="h-7 w-7 animate-bounce" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight leading-tight">
            Ready to cook smarter, track calories, and eliminate food waste?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Get early access to Plately's multi-mode camera scanners, dynamic zone inventory zones, and AI step-by-step cooking & prep assistant. Beta access is free for our initial 1,000 households.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button 
              onClick={onOpenBetaModal}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#e07a11] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold rounded-2xl text-xs transition-all shadow-xl shadow-amber-900/30 flex items-center justify-center space-x-2"
            >
              <span>Request Free Beta Key</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onNavigate('how-it-works')}
              className="w-full sm:w-auto px-8 py-4 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 font-bold rounded-2xl text-xs transition-all flex items-center justify-center space-x-2"
            >
              <span>See How It Works</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
