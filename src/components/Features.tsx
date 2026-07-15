import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChefHat, 
  Camera, 
  RotateCcw,
  Sparkles, 
  Flame, 
  Plus, 
  Trash2, 
  Check, 
  Utensils, 
  BarChart3, 
  BookOpen, 
  Zap, 
  ScanLine,
  HelpCircle
} from 'lucide-react';
import ActiveCookMode from './ActiveCookMode';

export default function Features() {
  const [activeTab, setActiveTab] = useState<'cook' | 'scan' | 'shelf' | 'health' | 'prep'>('cook');
  const [cookSubTab, setCookSubTab] = useState<'simulator' | 'compiler'>('simulator');
  
  // OCR Scan Demo State
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState<number>(0);
  const [scannedItems, setScannedItems] = useState<string[]>([]);

  // Receipt items to scan
  const receiptMock = {
    store: 'Whole Foods Market',
    date: 'July 11, 2026',
    items: [
      { name: 'ORGANIC BABY SPINACH', price: '$4.99', type: 'Fridge' },
      { name: 'WILD SALMON FILLET', price: '$14.20', type: 'Fridge' },
      { name: 'OAT MILK 1L', price: '$3.50', type: 'Fridge' },
      { name: 'YELLOW ONIONS (3pk)', price: '$2.80', type: 'Pantry' },
      { name: 'BROWN JASMINE RICE 1KG', price: '$5.40', type: 'Pantry' }
    ]
  };

  // Recipe AI custom builder state
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(['Salmon', 'Spinach']);
  const [generatedRecipe, setGeneratedRecipe] = useState<{
    title: string;
    prepTime: string;
    servings: number;
    macros: string;
    instructions: string[];
  } | null>(null);

  const handleSimulateScan = () => {
    setScanning(true);
    setScanStep(1);
    setScannedItems([]);
    
    // Step 1: Camera flash
    setTimeout(() => {
      setScanStep(2); // Extracting items
      setTimeout(() => {
        setScanStep(3); // Success
        setScanning(false);
        setScannedItems(receiptMock.items.map(i => `${i.name} (${i.type})`));
      }, 1500);
    }, 1000);
  };

  const handleToggleIngredient = (ing: string) => {
    if (selectedIngredients.includes(ing)) {
      setSelectedIngredients(prev => prev.filter(i => i !== ing));
    } else {
      setSelectedIngredients(prev => [...prev, ing]);
    }
  };

  const handleGenerateRecipe = () => {
    // Mock the local AI model response safely
    if (selectedIngredients.length === 0) return;
    
    setGeneratedRecipe({
      title: `AI Customized ${selectedIngredients.join(' & ')} Nourish Bowl`,
      prepTime: '15 Minutes',
      servings: 2,
      macros: 'Calories: 480 kcal • Protein: 38g • Carbs: 32g • Fat: 14g',
      instructions: [
        `Assemble your shelf ingredients: ${selectedIngredients.join(', ')}.`,
        `Preheat skillet or oven. Sauté vegetables with olive oil, salt, and pepper.`,
        `Prepare any starch base (quinoa, sweet potatoes, or rice).`,
        `Sear proteins for 4-6 minutes each side until internal temperature reaches safety limits.`,
        `Assemble into bowls, drizzle with olive oil, and swipe to automatically log calories!`
      ]
    });
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* HEADER SECTION */}
      <section className="text-center pt-12 max-w-4xl mx-auto px-4">
        <span className="text-xs font-bold text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full uppercase tracking-wider">
          Inside Plately
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-cream-900 mt-4 tracking-tight leading-tight">
          A fully integrated <br className="hidden sm:block" />
          smart‑kitchen & nutrition system.
        </h1>
        <p className="text-sm md:text-base text-cream-600 font-sans mt-4 max-w-2xl mx-auto leading-relaxed">
          Plately goes beyond recipe matching. It is an automated lifecycle manager for your food—tracking every ingredient from the retail grocery slip to your fitness logs.
        </p>

        {/* Feature quick selector */}
        <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-3xl mx-auto bg-cream-100 p-2 rounded-2xl border border-cream-200">
          <button 
            onClick={() => setActiveTab('cook')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'cook' ? 'bg-white text-cream-900 shadow-sm' : 'text-cream-600 hover:text-cream-800'}`}
          >
            🍳 Cook Mode
          </button>
          <button 
            onClick={() => setActiveTab('scan')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'scan' ? 'bg-white text-cream-900 shadow-sm' : 'text-cream-600 hover:text-cream-800'}`}
          >
            📸 Scan & Digitize
          </button>
          <button 
            onClick={() => setActiveTab('shelf')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'shelf' ? 'bg-white text-cream-900 shadow-sm' : 'text-cream-600 hover:text-cream-800'}`}
          >
            🧺 Living Shelf
          </button>
          <button 
            onClick={() => setActiveTab('health')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'health' ? 'bg-white text-cream-900 shadow-sm' : 'text-cream-600 hover:text-cream-800'}`}
          >
            📊 Health & Intake
          </button>
          <button 
            onClick={() => setActiveTab('prep')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'prep' ? 'bg-white text-cream-900 shadow-sm' : 'text-cream-600 hover:text-cream-800'}`}
          >
            🍱 Bulk Meal Prep
          </button>
        </div>
      </section>

      {/* CORE FEATURE DEEP DIVES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        
        {/* MODULE 1: COOK MODE */}
        <div id="cook-mode-feature" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-1 bg-brand-50 border border-brand-200 rounded-full px-3 py-1 text-xs text-brand-700 font-semibold">
              <ChefHat className="h-3.5 w-3.5" />
              <span>Smart Cooking Assistant</span>
            </div>
            <h2 className="text-3xl font-extrabold font-display text-cream-900 leading-tight">
              Cook Mode: Interactive Step-by-Step Cooking
            </h2>
            <p className="text-xs text-cream-600 font-sans leading-relaxed">
              No more scrolling through endless cooking blogs or scaling quantities in your head. Plately launches an immersive Cook Mode with auto-adjusting smart timers, active step checkboxes, and hands-free vocal narration.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="p-1 rounded bg-brand-100 text-brand-700 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <p className="text-xs text-cream-700">
                  <strong>Inventory-aware matching:</strong> Sort recommendations by "Use It Up" (using expiring food) vs "Explore" (searching outer cuisines).
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="p-1 rounded bg-brand-100 text-brand-700 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <p className="text-xs text-cream-700">
                  <strong>Beginner companion:</strong> Click any highlighted culinary term to see a 10-second technique card or ask the kitchen AI assistant.
                </p>
              </div>
            </div>

            <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 text-xs text-brand-800 font-medium">
              💡 <strong>Concrete Benefit:</strong> Eliminates decision fatigue, saves up to 45 minutes of meal-planning time per week, and prevents cooking mistakes.
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl border border-cream-200 p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-cream-100 pb-4 gap-2">
              <div>
                <h4 className="text-sm font-bold text-cream-900">Plately Interactive Sandbox</h4>
                <p className="text-[11px] text-cream-500 font-sans">Simulate Plately's AI customizer and guided active cooking wizard</p>
              </div>
              <div className="flex bg-cream-100 p-1 rounded-xl border border-cream-200 shrink-0">
                <button 
                  onClick={() => setCookSubTab('simulator')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase transition-all ${cookSubTab === 'simulator' ? 'bg-cream-900 text-white shadow-sm' : 'text-cream-600 hover:text-cream-800'}`}
                >
                  📱 Cook Mode
                </button>
                <button 
                  onClick={() => setCookSubTab('compiler')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase transition-all ${cookSubTab === 'compiler' ? 'bg-cream-900 text-white shadow-sm' : 'text-cream-600 hover:text-cream-800'}`}
                >
                  🪄 AI Compiler
                </button>
              </div>
            </div>

            {cookSubTab === 'compiler' ? (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-3">
                  <p className="text-xs font-bold text-cream-700">1. SELECT INGREDIENTS ON YOUR SHELF:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Salmon', 'Spinach', 'Quinoa', 'Avocado', 'Onions', 'Almond Milk'].map(ing => {
                      const selected = selectedIngredients.includes(ing);
                      return (
                        <button
                          key={ing}
                          onClick={() => handleToggleIngredient(ing)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1 ${selected ? 'bg-brand-600 text-white border border-brand-700 shadow-sm' : 'bg-cream-100 text-cream-600 border border-cream-200 hover:bg-cream-200/50'}`}
                        >
                          <span>{ing}</span>
                          {selected ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={handleGenerateRecipe}
                  disabled={selectedIngredients.length === 0}
                  className="w-full py-3 bg-cream-900 hover:bg-cream-800 disabled:bg-cream-200 disabled:text-cream-400 text-white text-xs font-bold rounded-xl transition-all shadow flex items-center justify-center space-x-1.5"
                >
                  <Sparkles className="h-4 w-4 text-brand-400" />
                  <span>Compile AI Recipe From Shelf</span>
                </button>

                {generatedRecipe && (
                  <div className="bg-cream-50 rounded-xl p-4 border border-cream-200 space-y-3 animate-fadeIn">
                    <div className="flex items-start justify-between">
                      <h5 className="text-xs font-extrabold text-cream-900 uppercase font-display">{generatedRecipe.title}</h5>
                      <span className="text-[10px] bg-brand-50 text-brand-700 font-bold px-2 py-0.5 rounded border border-brand-200 font-mono">
                        {generatedRecipe.prepTime}
                      </span>
                    </div>
                    <p className="text-[11px] text-cream-600 italic border-l-2 border-brand-500 pl-2">
                      {generatedRecipe.macros}
                    </p>
                    <div className="space-y-1.5">
                      {generatedRecipe.instructions.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start space-x-2 text-xs text-cream-700">
                          <span className="font-mono text-[10px] text-brand-600 bg-brand-50 w-4 h-4 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                            {sIdx + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex justify-center animate-fadeIn">
                <ActiveCookMode />
              </div>
            )}
          </div>
        </div>

        {/* MODULE 2: SCAN */}
        <div id="scan-digitize-feature" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 order-last lg:order-first">
            <div className="bg-cream-900 text-white rounded-2xl p-6 shadow-xl space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-cream-800 pb-4">
                <div className="flex items-center space-x-2">
                  <ScanLine className="h-5 w-5 text-brand-400" />
                  <span className="text-xs font-mono tracking-wider font-bold">RECEIPT OCR ALGORITHM</span>
                </div>
                <span className="text-[10px] bg-cream-800 text-cream-300 px-2.5 py-1 rounded-full font-mono">
                  v2.0 active
                </span>
              </div>

              {/* Simulated camera capture block */}
              <div className="h-[220px] bg-cream-950 border border-cream-800 rounded-xl flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                {scanStep === 0 && (
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-full bg-cream-800 flex items-center justify-center mx-auto text-cream-300">
                      <Camera className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-cream-100">Whole Foods Market grocery receipt ready</p>
                      <p className="text-[10px] text-cream-400">Press button below to simulate phone camera OCR scan</p>
                    </div>
                  </div>
                )}

                {scanStep === 1 && (
                  <div className="space-y-3 animate-pulse">
                    <div className="w-10 h-10 rounded-full bg-brand-500/20 border border-brand-500 flex items-center justify-center mx-auto text-brand-400">
                      <ScanLine className="h-5 w-5 animate-bounce" />
                    </div>
                    <p className="text-xs text-brand-400 font-mono">CAPTURING CAMERA FLASH...</p>
                  </div>
                )}

                {scanStep === 2 && (
                  <div className="space-y-3">
                    <div className="w-8 h-8 rounded-full border-2 border-t-brand-500 border-cream-700 animate-spin mx-auto" />
                    <p className="text-xs text-cream-300 font-mono">EXTRACTING INVENTORY COGNITIVE ENTITIES...</p>
                  </div>
                )}

                {scanStep === 3 && (
                  <div className="space-y-3 text-left w-full max-h-[180px] overflow-y-auto pr-2">
                    <div className="flex items-center space-x-2 text-brand-400 text-xs font-bold font-mono">
                      <Check className="h-4 w-4" />
                      <span>OCR ENTITIES RECONCILED SUCCESSFULLY!</span>
                    </div>
                    <div className="bg-cream-900 border border-cream-800 rounded-lg p-3 space-y-1.5">
                      <div className="flex justify-between text-[11px] text-cream-400 border-b border-cream-800 pb-1">
                        <span>ITEM NAME</span>
                        <span>TARGET ZONE</span>
                      </div>
                      {receiptMock.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs font-mono">
                          <span className="text-cream-100">{item.name}</span>
                          <span className="text-brand-400 font-bold">{item.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={handleSimulateScan}
                  disabled={scanning}
                  className="flex-1 py-3 bg-brand-500 hover:bg-brand-600 disabled:bg-cream-800 disabled:text-cream-500 text-cream-950 hover:text-cream-900 font-bold text-xs rounded-xl transition-all shadow-md"
                >
                  {scanning ? 'OCR Engine Running...' : 'Simulate Receipt OCR Scan'}
                </button>
                {scanStep > 0 && (
                  <button
                    onClick={() => setScanStep(0)}
                    className="p-3 bg-cream-800 hover:bg-cream-700 text-cream-300 hover:text-white rounded-xl transition-all"
                    title="Reset scanner"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-1 bg-brand-50 border border-brand-200 rounded-full px-3 py-1 text-xs text-brand-700 font-semibold">
              <Camera className="h-3.5 w-3.5" />
              <span>Digitize Your Kitchen</span>
            </div>
            <h2 className="text-3xl font-extrabold font-display text-cream-900 leading-tight">
              Scan: Eliminate Manual Food Entry
            </h2>
            <p className="text-xs text-cream-600 font-sans leading-relaxed">
              No one has time to manually type in thirty grocery items after returning from the supermarket. Plately features three distinct cognitive vision options to populate your digital kitchen instantly.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="p-1 rounded-lg bg-cream-100 text-cream-700 mt-0.5">
                  <ScanLine className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-cream-800">Receipt OCR Scanning</h4>
                  <p className="text-[11px] text-cream-500 leading-relaxed">
                    Snap a quick photo of your retail grocery receipt. Our OCR parser translates printed line items into inventory database entities with pre-loaded generic shelf lifespans.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-1 rounded-lg bg-cream-100 text-cream-700 mt-0.5">
                  <Camera className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-cream-800">Photo Object Matching</h4>
                  <p className="text-[11px] text-cream-500 leading-relaxed">
                    Have loose vegetables or bulk farmer's market greens? Photograph them on your countertop. Our AI image model classifies the ingredients on the spot.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 text-xs text-brand-800 font-medium">
              💡 <strong>Concrete Benefit:</strong> Eliminates human tracking error, cuts kitchen management to less than 1 minute per grocery trip, and ensures pantry logs remain perfectly accurate.
            </div>
          </div>
        </div>

        {/* MODULE 3: LIVING SHELF */}
        <div id="living-shelf-feature" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-1 bg-brand-50 border border-brand-200 rounded-full px-3 py-1 text-xs text-brand-700 font-semibold">
              <Utensils className="h-3.5 w-3.5" />
              <span>Pantry & Fridge Organiser</span>
            </div>
            <h2 className="text-3xl font-extrabold font-display text-cream-900 leading-tight">
              Living Shelf: Your Freshness Control Center
            </h2>
            <p className="text-xs text-cream-600 font-sans leading-relaxed">
              Think of the Living Shelf as an interactive, digital map of your kitchen zones. Set separate tabs for the Fridge, Pantry, and Freezer, complete with color-coded freshness alerts that transition as expiry clocks tick down.
            </p>

            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="p-1 rounded bg-brand-100 text-brand-700 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <p className="text-xs text-cream-700">
                  <strong>Swipe interactions:</strong> Swipe left to mark an ingredient as consumed, or swipe right to discard—instantly updating your household waste stats.
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="p-1 rounded bg-brand-100 text-brand-700 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <p className="text-xs text-cream-700">
                  <strong>Freeze integration:</strong> Click "Freeze" on any item nearing expiration. Plately pauses the expiry timer and relocates the entity to the Freezer tab.
                </p>
              </div>
            </div>

            <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 text-xs text-brand-800 font-medium">
              💡 <strong>Concrete Benefit:</strong> Reduces household food waste by up to 80% and ensures you never open a drawer to find rotting raw produce again.
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl border border-cream-200 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-cream-100 pb-3">
              <h4 className="text-xs font-bold text-cream-700 uppercase tracking-wide">Interactive Freshness Map</h4>
              <span className="text-[10px] bg-red-50 text-red-700 border border-red-200 font-bold px-2 py-0.5 rounded">Critical Expiries</span>
            </div>

            <div className="space-y-2.5">
              
              <div className="border border-red-200 bg-red-50/50 p-3.5 rounded-xl flex items-center justify-between shadow-sm">
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-red-900">Fresh Salmon Fillet</span>
                    <span className="text-[9px] bg-red-100 text-red-700 font-mono px-1.5 rounded">Fridge Zone 1</span>
                  </div>
                  <div className="w-48 bg-cream-200 h-1 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full w-[15%]" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[10px] font-bold transition-all">
                    Use Now 🍳
                  </button>
                  <button className="px-2 py-1 bg-white hover:bg-cream-100 border border-cream-200 text-cream-600 rounded-lg text-[10px] font-bold transition-all">
                    Freeze ❄️
                  </button>
                </div>
              </div>

              <div className="border border-yellow-200 bg-yellow-50/50 p-3.5 rounded-xl flex items-center justify-between shadow-sm">
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-yellow-900">Baby Spinach bag</span>
                    <span className="text-[9px] bg-yellow-100 text-yellow-700 font-mono px-1.5 rounded">Crisper Drawer</span>
                  </div>
                  <div className="w-48 bg-cream-200 h-1 rounded-full overflow-hidden">
                    <div className="bg-yellow-500 h-full w-[45%]" />
                  </div>
                </div>
                <span className="text-[11px] text-yellow-700 font-bold font-mono">2 Days left</span>
              </div>

              <div className="border border-cream-200 bg-white p-3.5 rounded-xl flex items-center justify-between shadow-sm">
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-cream-900">Organic Avocados</span>
                    <span className="text-[9px] bg-cream-100 text-cream-500 font-mono px-1.5 rounded">Countertop</span>
                  </div>
                  <div className="w-48 bg-cream-200 h-1 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full w-[85%]" />
                  </div>
                </div>
                <span className="text-[11px] text-green-600 font-semibold font-mono font-bold">5 Days left</span>
              </div>

            </div>
          </div>
        </div>

        {/* MODULE 4: HEALTH & INTAKE */}
        <div id="health-intake-feature" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 order-last lg:order-first">
            <div className="bg-white rounded-2xl border border-cream-200 p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-cream-100 pb-3">
                <div>
                  <h4 className="text-sm font-bold text-cream-800">Macro Analytics Board</h4>
                  <p className="text-[11px] text-cream-500 font-sans">Simulating smart nutritional feedback loops</p>
                </div>
                <span className="text-[10px] bg-brand-50 text-brand-700 border border-brand-200 px-2.5 py-0.5 rounded-full font-bold">
                  Daily Intake
                </span>
              </div>

              {/* Progress grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="border border-cream-150 p-3 rounded-xl bg-cream-50/50">
                  <span className="text-[10px] text-cream-500 uppercase font-mono tracking-wider">PROTEIN</span>
                  <p className="text-xl font-bold font-display text-cream-900 mt-1">112g</p>
                  <p className="text-[9px] text-cream-400 font-sans mt-0.5">83% of daily goal</p>
                </div>
                <div className="border border-cream-150 p-3 rounded-xl bg-cream-50/50">
                  <span className="text-[10px] text-cream-500 uppercase font-mono tracking-wider">CARBOHYDRATES</span>
                  <p className="text-xl font-bold font-display text-cream-900 mt-1">194g</p>
                  <p className="text-[9px] text-brand-600 font-bold mt-0.5">Optimal levels</p>
                </div>
                <div className="border border-cream-150 p-3 rounded-xl bg-cream-50/50">
                  <span className="text-[10px] text-cream-500 uppercase font-mono tracking-wider">HEALTH SCORE</span>
                  <p className="text-xl font-bold font-display text-emerald-600 mt-1">A-</p>
                  <p className="text-[9px] text-cream-400 font-sans mt-0.5">Based on whole food %</p>
                </div>
              </div>

              {/* Smart analysis card */}
              <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center space-x-1.5">
                  <Flame className="h-4 w-4 text-brand-600" />
                  <span className="text-xs font-bold text-brand-900">Plately AI Intake Estimate</span>
                </div>
                <p className="text-[11px] text-brand-800 leading-relaxed font-sans">
                  "Your home-cooked salmon dish was high in omega-3 and potassium. Based on your current 12-day streak, you are on track to exceed your energy recovery levels by Friday."
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-1 bg-brand-50 border border-brand-200 rounded-full px-3 py-1 text-xs text-brand-700 font-semibold">
              <BarChart3 className="h-3.5 w-3.5" />
              <span>Automated Diet Logger</span>
            </div>
            <h2 className="text-3xl font-extrabold font-display text-cream-900 leading-tight">
              Health & Intake Tracking
            </h2>
            <p className="text-xs text-cream-600 font-sans leading-relaxed">
              Diet logs are notoriously difficult to keep up. Plately solves this by creating zero-click automated logging. When you cook a Plately recipe, the exact grams of macros, vitamins, and calories are calculated and automatically synced to your dashboard.
            </p>

            <div className="space-y-4 text-xs text-cream-700 font-sans">
              <div className="flex items-start space-x-2">
                <div className="p-1 rounded bg-brand-100 text-brand-700 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <p>
                  <strong>Photo-based Restaurant Estimations:</strong> Snap a photo of your plate at restaurants. Our image model estimates macronutrients and portion sizes on the fly.
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="p-1 rounded bg-brand-100 text-brand-700 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <p>
                  <strong>Health Metric Sync:</strong> Seamless integration with Google Fit, Android Health Connect, and web health protocols to capture caloric logs.
                </p>
              </div>
            </div>

            <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 text-xs text-brand-800 font-medium">
              💡 <strong>Concrete Benefit:</strong> Eliminates manual caloric arithmetic, provides actionable meal-prep adjustments, and keeps home nutrition highly accurate.
            </div>
          </div>
        </div>

        {/* MODULE 5: BULK MEAL PREP */}
        <div id="meal-prep-feature" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-1 bg-brand-50 border border-brand-200 rounded-full px-3 py-1 text-xs text-brand-700 font-semibold">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Bulk Food Optimization</span>
            </div>
            <h2 className="text-3xl font-extrabold font-display text-cream-900 leading-tight">
              Bulk Meal Prep & Leftovers
            </h2>
            <p className="text-xs text-cream-600 font-sans leading-relaxed">
              Gym goers and busy parents know the value of batch cooking. Plately is the only smart kitchen app with a dedicated Bulk Meal Prep mode. Choose high-yield meals, scale quantities, and print or scan prep-box labels.
            </p>

            <div className="space-y-3 text-xs text-cream-700">
              <div className="flex items-start space-x-2">
                <div className="p-1 rounded bg-brand-100 text-brand-700 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <p>
                  <strong>Serve Scaling:</strong> Instantly scale any ingredient list from 2 portions to 12. Plately adjusts cooking times and skillet sizing recommendations automatically.
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="p-1 rounded bg-brand-100 text-brand-700 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <p>
                  <strong>Box Tracking:</strong> Label and scan your plastic meal containers. Get friendly alerts when a meal prep box is on its final day of safe refrigeration.
                </p>
              </div>
            </div>

            <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 text-xs text-brand-800 font-medium">
              💡 <strong>Concrete Benefit:</strong> Saves up to 6 hours of weekly cooking, manages portion distributions, and ensures prepped meals never spoil in the back of the shelf.
            </div>
          </div>

          <div className="lg:col-span-7 bg-cream-900 text-white rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-cream-800 pb-3">
              <h4 className="text-xs font-mono font-bold tracking-wider">PREP BOX EXPIRY CALENDAR</h4>
              <span className="text-[10px] bg-brand-500 text-cream-950 font-bold px-2 py-0.5 rounded">Active Plan</span>
            </div>

            <div className="space-y-2 text-xs font-sans">
              <div className="bg-cream-800 p-3.5 rounded-xl border border-cream-700 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-cream-100">Box 1-3: Chili Lime Beef Bowls</h5>
                  <p className="text-[10px] text-cream-400">Prepped: Sunday (3 days ago) • Fridge Zone 3</p>
                </div>
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 font-bold text-[10px] border border-yellow-500/30 rounded-md">
                  Eat today or Freeze
                </span>
              </div>

              <div className="bg-cream-800 p-3.5 rounded-xl border border-cream-700 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-cream-100">Box 4-6: Honey Garlic Salmon Medleys</h5>
                  <p className="text-[10px] text-cream-400">Prepped: Sunday (3 days ago) • Freezer Chest</p>
                </div>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 font-bold text-[10px] border border-green-500/30 rounded-md">
                  Frozen (Safe 20 days)
                </span>
              </div>
            </div>
          </div>
        </div>

      </section>
      
    </div>
  );
}
