export type PageType = 
  | 'home'
  | 'features'
  | 'solutions'
  | 'how-it-works'
  | 'ecosystem'
  | 'pricing'
  | 'about'
  | 'faq'
  | 'blog';

export interface BlogPost {
  id: string;
  title: string;
  category: 'Food Waste' | 'Meal Prep' | 'Healthy Cooking' | 'Ecosystem';
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'General' | 'Pantry & Scanning' | 'Recipes & Cooking' | 'Ecosystem';
}

export interface BetaRegistration {
  email: string;
  persona: string;
  cookingLevel: string;
  registeredAt: string;
}
