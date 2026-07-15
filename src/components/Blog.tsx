import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, User, X, ChevronRight, HelpCircle } from 'lucide-react';
import { BlogPost } from '../types';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const posts: BlogPost[] = [
    {
      id: '1',
      title: '5 Simple Ways to Reduce Household Food Waste This Week',
      category: 'Food Waste',
      excerpt: 'Did you know the average family throws away 25% of their groceries? Learn simple structural pantry adjustments that lock freshness in.',
      readTime: '4 min read',
      date: 'July 9, 2026',
      author: 'Shukurillo Mamarasulov'
    },
    {
      id: '2',
      title: 'The Gym-Goers Guide to Batch Prep and Freezer Management',
      category: 'Meal Prep',
      excerpt: 'Batch cooking 12 portions of beef and quinoa saves hours, but how do you prevent freezer burn and taste degradation? We break down core fridge zones.',
      readTime: '6 min read',
      date: 'July 5, 2026',
      author: 'David Kim'
    },
    {
      id: '3',
      title: 'How Receipt OCR Algorithmic Matching is Changing Smart Kitchens',
      category: 'Ecosystem',
      excerpt: 'An inside engineering look into how Plately converts standard thermal printed grocery store characters into structured kitchen database assets.',
      readTime: '8 min read',
      date: 'June 28, 2026',
      author: 'Plately Engineering'
    },
    {
      id: '4',
      title: 'Cooking Without Blogs: Why We Built Ad-Free Cook Mode',
      category: 'Healthy Cooking',
      excerpt: 'Traditional online recipe sites are bloated with popup advertisements, tracker networks, and 2000-word family essays. Plately offers clean checkboxes.',
      readTime: '5 min read',
      date: 'June 22, 2026',
      author: 'Claire Lin'
    }
  ];

  const blogContents: Record<string, string[]> = {
    '1': [
      `Food waste is a major structural challenge in modern households. Over 25% of all grocery purchases end up directly in trash containers. Luckily, you don't need expensive equipment to save cash and CO2—just three easy habits:`,
      `1. Segment Your Fridge Into Freshness Zones: Keep high-decay proteins (fish, ground beef) in the coldest, lowest drawers (Zone 1). Relocate hardier items like citrus, hard cheeses, and roots to outer panels or high shelves.`,
      `2. Track Expiration Countdown Climaxes: Plately's automated living shelf alerts notify you 48 hours before item decay curves peak, prompting you with custom recipes that consume these exact vegetables.`,
      `3. Freeze Impending Expiries: If you know you won't use raw spinach bags by Wednesday, sauté them with garlic in 2 minutes, place them in airtight storage cubes, and label them for the freezer drawer.`
    ],
    '2': [
      `Powerlifters, marathon runners, and busy parents understand the structural optimization of batch cooking. However, storing 10 portions of cooked sweet potatoes and lean turkey often results in dry, unappetizing textures by Friday:`,
      `1. Lock Moisture Under Seals: Never seal container boxes while foods are still steaming; condensation pools, freezing into ice shards that puncture and dry cellular protein. Wait until meals cool to lukewarm before applying airtight covers.`,
      `2. Use Double-Zone Rotation: Keep 3 days of meals in the primary Fridge Zone. Relocate days 4 through 7 directly into the freezer. Plately's bulk manager sends friendly alerts when to transfer box 5 into refrigerator defrost modes.`,
      `3. Label Containers: Write dates on storage boxes. Or better yet, print Plately custom barcodes to scan container boxes whenever you consume them—instantly calculating macros and logging workout ratios.`
    ],
    '3': [
      `Populating pantry spreadsheets manually is the number-one reason kitchen apps are abandoned. Plately eliminates human data entry through high-fidelity printed grocery receipt parsing:`,
      `1. Image Pre-processing: Standard phone cameras capture receipts under fluctuating kitchen lighting. Our parser binarizes the photo, adjusting high-contrast borders to isolate text layers from background countertop wood.`,
      `2. Optical Character Recognition (OCR): We extract raw letter arrays from crumpled thermal printing. Our models reconcile typos like "ORG SM SPINCH" to standard database entities ("Organic Baby Spinach").`,
      `3. Decay Life Inference: Each recognized product matches default expiration timetables (e.g., 5 days for fresh vegetables, 12 days for milk), which are immediately registered under your digital Freshness tabs.`
    ],
    '4': [
      `We’ve all experienced the exhaustion of looking up a quick chocolate chip cookie or pan-seared salmon recipe online. You are forced to navigate floating banner ads, cookie opt-ins, autoplay video panels, and 1,500 words of founder essays before reaching the list:`,
      `We built Plately’s Cook Mode to bypass ad-bloat entirely. When you trigger a recipe, Plately displays clean, minimal checkboxes, step progress indicators, and interactive pan timers right next to instructions.`,
      `We believe that cooking should be a calming, focused ritual. Our screens are designed with rich negative space, soft green contrast elements, and hands-free vocal narrations so you can cook with clean fingers and zero desktop noise.`
    ]
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* HEADER */}
      <section className="text-center pt-12 max-w-4xl mx-auto px-4">
        <span className="text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full uppercase tracking-wider">
          Resources & Articles
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-cream-900 mt-4 tracking-tight leading-tight">
          Read up on smart kitchen hacks.
        </h1>
        <p className="text-sm md:text-base text-cream-600 font-sans mt-4 max-w-2xl mx-auto leading-relaxed">
          Explore articles, technical updates, and sustainable cooking logs compiled by our localized teams and health cooks.
        </p>
      </section>

      {/* POSTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {posts.map(post => (
            <div 
              key={post.id}
              className="bg-white rounded-3xl border border-cream-200 p-6 shadow-sm flex flex-col justify-between hover:border-brand-300 hover:shadow-md transition-all group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-cream-400">
                  <span className="bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full font-bold">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>

                <h3 className="text-lg font-bold font-display text-cream-900 group-hover:text-brand-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs text-cream-500 font-sans leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-cream-100 mt-6 text-xs text-cream-500">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center font-bold text-[10px] text-brand-800">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span>{post.author}</span>
                </div>
                <span className="flex items-center space-x-1 font-bold text-brand-600 group-hover:underline">
                  <span>Read Post</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ARTICLE READER MODAL OVERLAY */}
      {selectedPost && (
        <div className="fixed inset-0 bg-cream-950/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl border border-cream-200">
            
            {/* Modal Header */}
            <div className="p-6 md:p-8 border-b border-cream-100 flex items-start justify-between">
              <div className="space-y-2">
                <span className="bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono">
                  {selectedPost.category}
                </span>
                <h3 className="text-xl md:text-2xl font-bold font-display text-cream-900">{selectedPost.title}</h3>
                <div className="flex items-center space-x-4 text-xs text-cream-400 font-mono">
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPost(null)}
                className="p-2 hover:bg-cream-100 rounded-full text-cream-400 hover:text-cream-600 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-4 font-sans text-xs md:text-sm text-cream-600 leading-relaxed">
              {blogContents[selectedPost.id]?.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              )) || (
                <p>Article content could not be located. Please check back later.</p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-cream-50 p-6 border-t border-cream-100 flex items-center justify-between text-xs text-cream-500">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-cream-800">Written by {selectedPost.author}</span>
              </div>
              <button 
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 bg-cream-900 hover:bg-cream-800 text-white rounded-xl font-bold"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
