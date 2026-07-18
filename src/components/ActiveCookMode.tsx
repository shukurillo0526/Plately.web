import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChefHat, 
  Globe, 
  Clock, 
  Users, 
  Flame, 
  ThumbsUp, 
  ThumbsDown, 
  Scale, 
  Plus, 
  Minus, 
  Play, 
  Pause, 
  Square, 
  Send, 
  Check, 
  AlertTriangle, 
  Sparkles, 
  Heart, 
  MessageSquare, 
  CornerDownRight, 
  ArrowLeft, 
  Flag,
  Refrigerator,
  Sparkle
} from 'lucide-react';

type ScreenState = 'detail' | 'setup' | 'active' | 'complete' | 'success';

interface Ingredient {
  id: string;
  name: string;
  baseAmount: number; // per serving
  unit: string;
  hasInInventory: boolean;
  category: string;
}

const RECIPE_INGREDIENTS: Ingredient[] = [
  { id: 'flour', name: 'All-Purpose Flour', baseAmount: 1/3, unit: 'cups', hasInInventory: false, category: 'Pantry' },
  { id: 'oil', name: 'Cooking Oil', baseAmount: 0.5, unit: 'tbsp', hasInInventory: true, category: 'Pantry' },
  { id: 'water', name: 'Water', baseAmount: 0.125, unit: 'cup', hasInInventory: true, category: 'Pantry' },
  { id: 'salt', name: 'Salt', baseAmount: 0.125, unit: 'tsp', hasInInventory: true, category: 'Pantry' }
];

const PRE_MADE_QA = [
  { 
    q: "What if I don't have cooking oil?", 
    a: "You can easily substitute melted butter, vegetable shortening, ghee, or lard in the exact same quantity. It adds a delicious traditional flavor!" 
  },
  { 
    q: "My dough feels too sticky to roll", 
    a: "Simply sprinkle a tiny bit of flour (about 1 tablespoon) onto your hands and kneading surface, and work it in until smooth and workable." 
  },
  { 
    q: "How hot should my skillet be?", 
    a: "Aim for medium-high heat! If you drop a drop of water on the skillet and it immediately sizzles and dances off, it is ready." 
  }
];

interface ActiveCookModeProps {
  isEmbedded?: boolean;
  onClose?: () => void;
}

export default function ActiveCookMode({ isEmbedded = false, onClose }: ActiveCookModeProps) {
  const [screen, setScreen] = useState<ScreenState>('detail');
  const [servings, setServings] = useState<number>(6);
  const [beginnerMode, setBeginnerMode] = useState<boolean>(true);
  const [flourType, setFlourType] = useState<string>('All-Purpose Flour');
  const [pantryAdded, setPantryAdded] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<'none' | 'like' | 'dislike'>('none');
  
  // Timer States
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(170); // 2:50 as in Screenshot 4 (total 180s)
  const [timerRunning, setTimerRunning] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Chat States
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant', text: string }>>([
    { sender: 'assistant', text: 'Hi, I’m your Plately Assistant. Let me know if you have any questions or need suggestions for this step!' }
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');

  // Leftovers Screen States
  const [portionsCooked, setPortionsCooked] = useState<number>(6);
  const [portionsEaten, setPortionsEaten] = useState<number>(1);

  // Expiration / Logging States
  const [congratsTriggered, setCongratsTriggered] = useState<boolean>(false);

  // Flour swaps list
  const flourSwaps = ['All-Purpose Flour', 'Almond Flour (GF)', 'Whole Wheat Flour', 'Cassava Flour'];

  const steps = [
    {
      title: "Prepare & Knead the Dough",
      description: "Mix flour and salt. Rub in lard or cooking oil until crumbly. Add warm water. Knead 3 minutes until smooth.",
      duration: 180, // 3 minutes
    },
    {
      title: "Rest the Dough Balls",
      description: "Divide dough into 8 equal balls. Cover with a damp cloth and let rest for 20 minutes to relax the gluten.",
      duration: 1200, // 20 minutes
    },
    {
      title: "Roll Tortilla Circles",
      description: "Roll each ball into a thin, translucent circle on a lightly floured countertop using a rolling pin.",
      duration: 60, // 1 minute
    },
    {
      title: "Heat the Skillet",
      description: "Preheat a dry cast-iron skillet or heavy-bottomed frying pan over medium-high heat until hot.",
      duration: 120, // 2 minutes
    },
    {
      title: "Cook in Skillet",
      description: "Cook each tortilla for 30 to 45 seconds until large bubbles form. Flip and cook for another 30 seconds.",
      duration: 45, // 45 seconds
    }
  ];

  // Auto-adjust servings-based quantities
  const getIngredientAmount = (ing: Ingredient) => {
    return (ing.baseAmount * servings).toFixed(2).replace(/\.00$/, '').replace(/\.(\d)0$/, '.$1');
  };

  // Timer Tick Hook
  useEffect(() => {
    if (screen === 'active' && timerRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setTimerRunning(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [screen, timerRunning, currentStepIdx]);

  // Set step duration on change
  const handleNextStep = () => {
    if (currentStepIdx < steps.length - 1) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      setTimeLeft(steps[nextIdx].duration);
      setTimerRunning(true);
    } else {
      setScreen('complete');
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      const prevIdx = currentStepIdx - 1;
      setCurrentStepIdx(prevIdx);
      setTimeLeft(steps[prevIdx].duration);
      setTimerRunning(true);
    } else {
      setScreen('setup');
    }
  };

  // Format MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  // Chat Submission
  const handleSendMessage = (textToSend?: string) => {
    const msg = textToSend || inputMessage;
    if (!msg.trim()) return;

    const userMsg = msg;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputMessage('');

    // Simulate smart response
    setTimeout(() => {
      let assistantResponse = "That is a great cooking question! For best results, follow the active step closely and keep your heat steady.";
      
      // Match predefined questions
      const matched = PRE_MADE_QA.find(qa => userMsg.toLowerCase().includes(qa.q.toLowerCase()) || qa.q.toLowerCase().includes(userMsg.toLowerCase()));
      if (matched) {
        assistantResponse = matched.a;
      } else if (userMsg.toLowerCase().includes('lard') || userMsg.toLowerCase().includes('oil')) {
        assistantResponse = "Using standard vegetable cooking oil works perfectly! Flour tortillas get their soft texture from lipids, so just ensure it is well distributed.";
      } else if (userMsg.toLowerCase().includes('gluten') || userMsg.toLowerCase().includes('sticky')) {
        assistantResponse = "If your dough is too springy and shrinks back when rolling, rest it for an extra 5 minutes to let the gluten relax completely.";
      }

      setChatMessages(prev => [...prev, { sender: 'assistant', text: assistantResponse }]);
    }, 800);
  };

  // Ingredient list count
  const itemsMissingCount = RECIPE_INGREDIENTS.filter(i => !i.hasInInventory && !pantryAdded).length;
  const itemsHaveCount = RECIPE_INGREDIENTS.length - itemsMissingCount;

  // Swap flour action
  const handleSwapFlour = () => {
    const nextIdx = (flourSwaps.indexOf(flourType) + 1) % flourSwaps.length;
    setFlourType(flourSwaps[nextIdx]);
  };

  const renderContent = () => (
    <div className={`flex-1 flex flex-col overflow-y-auto no-scrollbar relative bg-[#0f141c] ${isEmbedded ? 'h-[450px]' : ''}`}>
          
          <AnimatePresence mode="wait">
            
            {/* 1. RECIPE DETAIL SCREEN */}
            {screen === 'detail' && (
              <motion.div
                key="detail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col"
              >
                {/* Hero Recipe Image banner */}
                <div className="relative h-64 bg-slate-800">
                  <img 
                    src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600" 
                    alt="Tortillas cooking" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f141c] via-[#0f141c]/30 to-black/40" />
                  
                  {/* Floating Action Buttons */}
                  <button 
                    onClick={() => {
                      if (onClose) {
                        onClose();
                      }
                    }}
                    className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-all">
                    <Flag className="w-3.5 h-3.5" />
                  </button>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-bold bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      75% Match
                    </span>
                    <h2 className="text-2xl font-bold font-display text-white mt-1.5">Flour Tortillas</h2>
                    <p className="text-[11px] text-slate-300">Soft homemade flour tortillas</p>
                  </div>
                </div>

                {/* Tags Grid */}
                <div className="p-4 grid grid-cols-3 gap-2">
                  <div className="bg-[#1b2230] border border-slate-800 p-2.5 rounded-xl flex items-center space-x-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-[11px] text-slate-300 font-semibold">Latin</span>
                  </div>
                  <div className="bg-[#1b2230] border border-slate-800 p-2.5 rounded-xl flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[11px] text-slate-300 font-semibold">25 min</span>
                  </div>
                  <div className="bg-[#1b2230] border border-slate-800 p-2.5 rounded-xl flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px] text-slate-300 font-semibold">{servings} servings</span>
                  </div>
                </div>

                {/* Macros & Calorie specification */}
                <div className="px-4 pb-2 grid grid-cols-4 gap-2">
                  <div className="bg-[#1b2230] border border-slate-800/80 p-2 rounded-xl text-center col-span-1">
                    <span className="text-[9px] text-slate-400 uppercase font-mono block">Difficulty</span>
                    <span className="text-xs font-bold text-amber-500">⚡⚡</span>
                  </div>
                  <div className="bg-[#1b2230] border border-slate-800/80 p-2 rounded-xl text-center col-span-3 flex items-center justify-around">
                    <div className="text-center">
                      <span className="text-[8px] text-slate-400 font-mono block">KCAL / SRV</span>
                      <span className="text-xs font-bold text-slate-100">206</span>
                    </div>
                    <div className="h-6 w-px bg-slate-800" />
                    <div className="text-center">
                      <span className="text-[8px] text-slate-400 font-mono block">PROTEIN</span>
                      <span className="text-xs font-bold text-blue-400">3.3g</span>
                    </div>
                    <div className="h-6 w-px bg-slate-800" />
                    <div className="text-center">
                      <span className="text-[8px] text-slate-400 font-mono block">CARBS</span>
                      <span className="text-xs font-bold text-amber-500">29.3g</span>
                    </div>
                    <div className="h-6 w-px bg-slate-800" />
                    <div className="text-center">
                      <span className="text-[8px] text-slate-400 font-mono block">FAT</span>
                      <span className="text-xs font-bold text-emerald-400">0.7g</span>
                    </div>
                  </div>
                </div>

                {/* Rating component */}
                <div className="px-4 py-2">
                  <div className="bg-[#151b26] border border-slate-800/60 rounded-xl p-3 flex items-center justify-between text-xs text-slate-300">
                    <span className="font-semibold flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Rate this recipe</span>
                    </span>
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => setUserRating('like')}
                        className={`p-1.5 rounded-lg transition-all ${userRating === 'like' ? 'bg-[#f59e0b]/20 text-[#f59e0b]' : 'hover:bg-slate-800 text-slate-400'}`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setUserRating('dislike')}
                        className={`p-1.5 rounded-lg transition-all ${userRating === 'dislike' ? 'bg-red-500/20 text-red-400' : 'hover:bg-slate-800 text-slate-400'}`}
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Ingredients section */}
                <div className="p-4 flex-1 space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                    <span className="font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                      <span>🍽️ Ingredients</span>
                      <span className="text-[10px] text-slate-500 font-mono">({RECIPE_INGREDIENTS.length})</span>
                    </span>
                    <button 
                      onClick={() => setScreen('setup')}
                      className="text-[#f59e0b] hover:text-[#e67e00] font-bold flex items-center space-x-1"
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>Scale</span>
                    </button>
                  </div>

                  {/* Scaled List */}
                  <div className="space-y-2">
                    {RECIPE_INGREDIENTS.map(ing => (
                      <div 
                        key={ing.id}
                        className="bg-[#141a24] border border-slate-800/80 rounded-xl p-3 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className={`w-2.5 h-2.5 rounded-full ${ing.hasInInventory || pantryAdded ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          <span className="font-medium text-slate-200">
                            {ing.id === 'flour' ? flourType : ing.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-slate-400">
                          {ing.id === 'flour' && (
                            <button 
                              onClick={handleSwapFlour}
                              className="text-[10px] bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20 px-2 py-0.5 rounded-md hover:bg-[#f59e0b]/20 font-bold"
                            >
                              Swap ⇄
                            </button>
                          )}
                          <span className="font-mono font-bold text-slate-300">
                            {getIngredientAmount(ing)} {ing.unit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add missing to shopping list */}
                  {itemsMissingCount > 0 && (
                    <button 
                      onClick={() => setPantryAdded(true)}
                      className="w-full py-2.5 bg-transparent hover:bg-slate-800 border border-dashed border-[#f59e0b]/40 text-[#f59e0b] text-[11px] font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add missing {itemsMissingCount} to Shopping List</span>
                    </button>
                  )}
                </div>

                {/* Persistent Footer Start Cooking Button */}
                <div className="p-4 bg-[#0f141c] border-t border-slate-800/60 sticky bottom-0">
                  <button
                    onClick={() => setScreen('setup')}
                    className="w-full py-3.5 bg-[#e67e00] hover:bg-[#f59e0b] active:scale-[0.98] text-white font-bold text-xs rounded-2xl transition-all shadow-lg flex items-center justify-center space-x-1.5"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Start Cooking</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* 2. SETUP & PREPARATION SCREEN */}
            {screen === 'setup' && (
              <motion.div
                key="setup"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col p-4 space-y-4"
              >
                {/* Header title */}
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setScreen('detail')}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h3 className="text-lg font-bold text-white">Flour Tortillas</h3>
                </div>

                {/* Servings count */}
                <div className="bg-[#141a24] border border-slate-800/80 p-4 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-semibold flex items-center space-x-1.5">
                      <Users className="w-4 h-4 text-brand-500" />
                      <span>Servings</span>
                    </span>
                    <div className="flex items-center space-x-3.5">
                      <button 
                        onClick={() => servings > 1 && setServings(servings - 1)}
                        className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-bold hover:bg-slate-700"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold font-mono text-[#f59e0b]">{servings}</span>
                      <button 
                        onClick={() => setServings(servings + 1)}
                        className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-bold hover:bg-slate-700"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Toggle Beginner mode */}
                <div className="bg-[#141a24] border border-slate-800/80 p-4 rounded-2xl flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-slate-200">👨‍🍳 Beginner Mode</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Standard cooking instructions</span>
                  </div>
                  
                  {/* Custom slide toggle */}
                  <button 
                    onClick={() => setBeginnerMode(!beginnerMode)}
                    className={`w-11 h-6 rounded-full p-0.5 transition-all duration-200 ${beginnerMode ? 'bg-[#e67e00]' : 'bg-slate-800 border border-slate-700'}`}
                  >
                    <div className={`w-5 h-5 rounded-full glass-panel transition-all duration-200 ${beginnerMode ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Calorie breakdown amber card */}
                <div className="bg-gradient-to-r from-[#d97706]/10 to-[#b45309]/10 border border-[#d97706]/30 p-4 rounded-2xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-sm font-extrabold text-[#f59e0b] block font-display">
                      {206 * servings} cal total
                    </span>
                    <span className="text-[10px] text-slate-400">
                      206 cal × {servings} servings
                    </span>
                  </div>
                  <Flame className="w-6 h-6 text-[#f59e0b] animate-pulse" />
                </div>

                {/* Inventory status pill flags */}
                <div className="flex items-center space-x-2 text-[10px] font-bold">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center space-x-1">
                    <Check className="w-3 h-3" />
                    <span>{itemsHaveCount} have</span>
                  </span>
                  {itemsMissingCount > 0 && (
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full flex items-center space-x-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>{itemsMissingCount} missing</span>
                    </span>
                  )}
                </div>

                {/* Ingredients Checkbox checklist */}
                <div className="space-y-2 flex-1">
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-500 block tracking-wider">
                    📋 Ingredients Checklist
                  </span>
                  
                  <div className="space-y-2">
                    {RECIPE_INGREDIENTS.map(ing => {
                      const isAcquired = ing.hasInInventory || pantryAdded;
                      return (
                        <div 
                          key={ing.id}
                          className="bg-[#141a24] border border-slate-800/80 rounded-xl p-3 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center space-x-2.5">
                            {/* Checkbox item */}
                            <button 
                              onClick={() => {
                                if (ing.id === 'flour') setPantryAdded(!pantryAdded);
                              }}
                              className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${isAcquired ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'border-slate-700 text-transparent'}`}
                            >
                              <Check className="w-3 h-3 stroke-[3]" />
                            </button>
                            <span className="font-semibold text-slate-200">
                              {ing.id === 'flour' ? flourType : ing.name}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {ing.id === 'flour' && (
                              <button 
                                onClick={handleSwapFlour}
                                className="text-[9px] border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded"
                              >
                                Swap
                              </button>
                            )}
                            <span className="font-mono text-slate-400 font-bold">
                              {getIngredientAmount(ing)} {ing.unit}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Large Start Cooking button */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setCurrentStepIdx(0);
                      setTimeLeft(steps[0].duration);
                      setTimerRunning(true);
                      setScreen('active');
                    }}
                    className="w-full py-3.5 bg-[#e67e00] hover:bg-[#f59e0b] text-white font-extrabold text-xs rounded-2xl transition-all shadow-md uppercase tracking-wider flex items-center justify-center space-x-2"
                  >
                    <span>🍴 Start Guided Cooking</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* 3. ACTIVE guided COOKING SCREEN WITH PROGRESS, TIMERS AND AI CHAT */}
            {screen === 'active' && (
              <motion.div
                key="active"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col p-4 space-y-4"
              >
                {/* Header with back button & progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <button 
                      onClick={handlePrevStep}
                      className="text-slate-400 hover:text-white font-semibold flex items-center space-x-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Setup</span>
                    </button>
                    <span className="text-[10px] font-mono text-slate-400">
                      Step {currentStepIdx + 1} of {steps.length}
                    </span>
                  </div>

                  {/* Horizontal progress bar */}
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#e67e00] h-full transition-all duration-300"
                      style={{ width: `${((currentStepIdx + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Title & Core active instruction text */}
                <div className="space-y-1.5 min-h-[96px] bg-[#141a24] border border-slate-800/80 p-4 rounded-2xl">
                  <span className="text-[9px] uppercase font-mono font-bold text-[#f59e0b] block tracking-widest">
                    ACTIVE DIRECTION
                  </span>
                  <h4 className="text-xs font-bold text-slate-100 uppercase">{steps[currentStepIdx].title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {steps[currentStepIdx].description}
                  </p>
                </div>

                {/* Countdown Timer Visual Ring */}
                <div className="bg-[#111721] border border-slate-800/80 py-4 px-6 rounded-2xl flex flex-col items-center justify-center relative">
                  
                  {/* Ring Container */}
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    
                    {/* SVG circle track and indicator */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle 
                        cx="56" 
                        cy="56" 
                        r="48" 
                        stroke="#1e293b" 
                        strokeWidth="5" 
                        fill="transparent" 
                      />
                      <circle 
                        cx="56" 
                        cy="56" 
                        r="48" 
                        stroke="#e67e00" 
                        strokeWidth="5" 
                        fill="transparent" 
                        strokeDasharray={301.6}
                        strokeDashoffset={301.6 - (301.6 * (timeLeft / steps[currentStepIdx].duration))}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>

                    {/* Numeric clock readout */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold font-mono text-white">
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                  </div>

                  {/* Play/Pause control panel */}
                  <div className="flex items-center space-x-3 mt-3.5">
                    <button 
                      onClick={() => setTimerRunning(!timerRunning)}
                      className="px-4 py-1.5 bg-[#142921] border border-[#10b981]/20 hover:bg-[#163a2e] text-emerald-400 rounded-lg text-[10px] font-bold transition-all flex items-center space-x-1"
                    >
                      {timerRunning ? (
                        <>
                          <Pause className="w-3 h-3 fill-current" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-current" />
                          <span>Resume</span>
                        </>
                      )}
                    </button>

                    <button 
                      onClick={() => {
                        setTimerRunning(false);
                        setTimeLeft(0);
                      }}
                      className="px-4 py-1.5 bg-[#291418] border border-red-500/20 hover:bg-[#3d161e] text-red-400 rounded-lg text-[10px] font-bold transition-all flex items-center space-x-1"
                    >
                      <Square className="w-2.5 h-2.5 fill-current" />
                      <span>Stop</span>
                    </button>
                  </div>
                </div>

                {/* Assistant Chat Bot widget Panel */}
                <div className="bg-[#141a24] border border-slate-800/80 rounded-2xl flex-1 flex flex-col overflow-hidden">
                  <div className="bg-[#1b2230] px-3.5 py-2 border-b border-slate-800/60 flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-[10px] font-mono font-bold text-slate-300">PLATELY COPILOT CHAT</span>
                    </div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase font-mono">Hands-Free OK</span>
                  </div>

                  {/* Chat logs */}
                  <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-[11px] no-scrollbar max-h-[160px]">
                    {chatMessages.map((msg, mIdx) => (
                      <div 
                        key={mIdx}
                        className={`flex items-start space-x-1.5 ${msg.sender === 'user' ? 'justify-end' : ''}`}
                      >
                        {msg.sender === 'assistant' && (
                          <div className="w-5 h-5 rounded-full bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/20 flex items-center justify-center font-mono font-bold text-[9px] flex-shrink-0 mt-0.5">
                            AI
                          </div>
                        )}
                        <div 
                          className={`p-2.5 rounded-xl leading-normal ${msg.sender === 'user' ? 'bg-[#e67e00] text-white rounded-tr-none max-w-[80%]' : 'bg-slate-900 border border-slate-800 text-slate-300 rounded-tl-none max-w-[82%]'}`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Preloaded suggestion pills */}
                  <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
                    {PRE_MADE_QA.map((qa, qIdx) => (
                      <button 
                        key={qIdx}
                        onClick={() => handleSendMessage(qa.q)}
                        className="bg-slate-900 hover:bg-slate-800 border border-slate-800 px-2 py-1 rounded-full text-[9px] text-[#f59e0b] font-medium whitespace-nowrap"
                      >
                        {qa.q}
                      </button>
                    ))}
                  </div>

                  {/* Chat input form */}
                  <div className="p-2 bg-[#10141d] border-t border-slate-800 flex items-center space-x-1.5">
                    <input 
                      type="text" 
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask copilot or type substitution..."
                      className="flex-1 bg-[#161c28] border border-slate-800 text-[11px] px-3 py-1.5 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#f59e0b]"
                    />
                    <button 
                      onClick={() => handleSendMessage()}
                      className="p-1.5 bg-[#e67e00] hover:bg-[#f59e0b] text-white rounded-lg transition-all"
                    >
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Step navigation actions */}
                <div className="pt-2">
                  <button
                    onClick={handleNextStep}
                    className="w-full py-3 bg-[#e67e00] hover:bg-[#f59e0b] text-white font-extrabold text-xs rounded-xl flex items-center justify-center space-x-1.5"
                  >
                    <span>
                      {currentStepIdx === steps.length - 1 ? 'Finish Cooking' : 'Next Step >'}
                    </span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* 4. LEFTOVERS / INTAKE DRAWER CONFIRMATION SCREEN */}
            {screen === 'complete' && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="flex-1 flex flex-col p-5 space-y-4"
              >
                {/* Header Icon */}
                <div className="text-center space-y-1 py-1">
                  <div className="w-12 h-12 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20 flex items-center justify-center mx-auto">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mt-1">Cook & Store leftovers</h4>
                  <p className="text-[10px] text-slate-400 max-w-xs mx-auto leading-normal">
                    Confirm servings cooked vs eaten raw to auto-log macros and store the rest in your fridge.
                  </p>
                </div>

                {/* Slider: Portions Cooked */}
                <div className="bg-[#141a24] border border-slate-800/80 p-4 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-bold">Portions Cooked</span>
                    <span className="bg-[#f59e0b]/20 text-[#f59e0b] font-mono font-bold px-2 py-0.5 rounded border border-[#f59e0b]/30">
                      {portionsCooked} portions
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={portionsCooked} 
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setPortionsCooked(val);
                      if (portionsEaten > val) setPortionsEaten(val);
                    }}
                    className="w-full accent-[#e67e00] bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Slider: Eating Right Now */}
                <div className="bg-[#141a24] border border-slate-800/80 p-4 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-bold">Eating Right Now</span>
                    <span className="bg-emerald-500/20 text-emerald-400 font-mono font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                      {portionsEaten} portions
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max={portionsCooked} 
                    value={portionsEaten} 
                    onChange={(e) => setPortionsEaten(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Transaction Preview list */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <span className="text-[9px] uppercase font-mono font-bold text-slate-500 tracking-wider block">
                    Transaction Preview:
                  </span>

                  <div className="space-y-2 text-[11px] text-slate-300 leading-normal">
                    {/* Item 1: Deduct from inventory */}
                    <div className="flex items-start space-x-2.5">
                      <div className="w-4 h-4 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center flex-shrink-0 font-bold">
                        -
                      </div>
                      <p>
                        Deducting raw ingredients for <strong>{portionsCooked} portions</strong> from shelf.
                      </p>
                    </div>

                    {/* Item 2: Log macros */}
                    <div className="flex items-start space-x-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 font-bold">
                        ✦
                      </div>
                      <p>
                        Logging <strong>{portionsEaten} portion(s)</strong> of macros (<strong>{206 * portionsEaten} kcal</strong>) to today's diary.
                      </p>
                    </div>

                    {/* Item 3: Storing leftovers */}
                    {portionsCooked - portionsEaten > 0 && (
                      <div className="flex items-start space-x-2.5">
                        <div className="w-4 h-4 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <Refrigerator className="w-2.5 h-2.5" />
                        </div>
                        <p>
                          Storing <strong>{portionsCooked - portionsEaten} leftover portion(s)</strong> in your virtual fridge.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cook & Save leftovers button */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setCongratsTriggered(true);
                      setScreen('success');
                    }}
                    className="w-full py-4 bg-[#e67e00] hover:bg-[#f59e0b] active:scale-[0.98] text-white font-extrabold text-xs rounded-2xl transition-all shadow-lg uppercase tracking-wider"
                  >
                    Cook & Save Leftovers
                  </button>
                </div>
              </motion.div>
            )}

            {/* 5. SUCCESS RECONCILED STATE SCREEN */}
            {screen === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col p-6 items-center justify-center text-center space-y-6"
              >
                {/* Floating Confetti visual check */}
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl scale-125 animate-pulse" />
                  <div className="w-16 h-16 rounded-full bg-[#102a1e] border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto relative z-10">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-black text-white uppercase tracking-wider font-display">
                    KITCHEN METRICS RECORDED!
                  </h4>
                  <p className="text-xs text-slate-300 leading-normal max-w-xs mx-auto">
                    Excellent! Plately OCR, Living Shelf, and Health Diaries have been dynamically updated in your local database.
                  </p>
                </div>

                {/* Summary Reconciled Card */}
                <div className="bg-[#141a24] border border-slate-800/80 p-4 rounded-2xl w-full text-left space-y-3">
                  <span className="text-[9px] uppercase font-mono font-bold text-slate-500 tracking-wider block border-b border-slate-800/60 pb-1.5">
                    Sync Summary Output:
                  </span>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-[#111620] p-2.5 rounded-xl border border-slate-800/60">
                      <span className="text-[8px] text-slate-400 block font-mono">HEALTH DIARY</span>
                      <p className="text-sm font-extrabold text-emerald-400 mt-0.5">+{206 * portionsEaten} kcal</p>
                      <p className="text-[9px] text-slate-500">Synced to dashboard</p>
                    </div>

                    <div className="bg-[#111620] p-2.5 rounded-xl border border-slate-800/60">
                      <span className="text-[8px] text-slate-400 block font-mono">FRIDGE SHELF</span>
                      <p className="text-sm font-extrabold text-blue-400">+{portionsCooked - portionsEaten} portions</p>
                      <p className="text-[9px] text-slate-500">Auto-expires in 4d</p>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800/60 p-3 rounded-xl flex items-center space-x-2 text-[11px] text-slate-400 leading-normal">
                    <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 animate-bounce" />
                    <p>
                      Ingredients for flour tortillas subtracted from your local kitchen. Expiration reminders active.
                    </p>
                  </div>
                </div>

                {/* Back / Reset simulator button */}
                <div className="w-full pt-4 space-y-2">
                  <button
                    onClick={() => {
                      setScreen('detail');
                      setPantryAdded(false);
                      setServings(6);
                      setPortionsCooked(6);
                      setPortionsEaten(1);
                    }}
                    className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700"
                  >
                    Reset & Cook Again 🍳
                  </button>
                  <button
                    onClick={() => setScreen('detail')}
                    className="w-full py-2.5 bg-transparent text-slate-500 hover:text-slate-300 font-bold text-xs"
                  >
                    Return to Recipe Details
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

    </div>
  );

  if (isEmbedded) {
    return (
      <div className="w-full text-slate-100 font-sans select-none flex flex-col h-[450px]">
        {renderContent()}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Visual Device Frame Wrapper */}
      <div className="relative w-full max-w-[390px] h-[780px] bg-[#0c0f16] border-[8px] border-[#1e2533] rounded-[42px] shadow-2xl flex flex-col overflow-hidden text-slate-100 font-sans select-none ring-1 ring-slate-800">
        
        {/* Notch / Dynamic Island simulation */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-black rounded-full z-50 flex items-center justify-center space-x-1">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          <div className="w-12 h-1 rounded-full bg-slate-950" />
        </div>

        {/* Device Status Bar */}
        <div className="h-10 bg-transparent px-6 pt-3 flex justify-between items-center text-[11px] font-semibold text-slate-400 z-40">
          <span>05:58</span>
          <div className="flex items-center space-x-1.5">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.22 19.58 10.57 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
            </svg>
            <span>LTE</span>
            <div className="w-5 h-2.5 border border-slate-500 rounded-sm p-0.5 flex items-center">
              <div className="bg-slate-300 h-full w-[85%] rounded-[1px]" />
            </div>
          </div>
        </div>

        {renderContent()}

        {/* Device Bottom Home Indicator line */}
        <div className="h-6 bg-transparent flex items-center justify-center z-40">
          <div className="w-32 h-1 bg-slate-700 rounded-full" />
        </div>

      </div>
      
      {/* Interactive Legend for the Simulated Device Frame */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center max-w-sm text-center">
        <span className="text-[10px] text-slate-500 font-mono">
          💡 Click around to scale servings, toggle Beginner Mode, ask questions in the live copilot chat, or complete portions to trigger leftover logs!
        </span>
      </div>
    </div>
  );
}
