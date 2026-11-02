import React, { useState } from 'react';
import { HelpCircle, Mail, MessageSquare, CheckCircle2, Send, Activity, Sparkles } from 'lucide-react';

export default function Support() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'App Feedback', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tickets = JSON.parse(localStorage.getItem('plately_support_tickets') || '[]');
      tickets.push({ ...formData, createdAt: new Date().toISOString() });
      localStorage.setItem('plately_support_tickets', JSON.stringify(tickets));
    } catch (_) {}
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-brand-500/10 border border-brand-500/30 rounded-full px-4 py-1.5 text-xs font-semibold text-brand-400">
          <HelpCircle className="h-4 w-4 text-brand-400" />
          <span>Help & Support Center</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
          How Can We Help You?
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Need assistance with your smart pantry, scanning receipts, or onboarding your restaurant to Workshop? We are here to help.
        </p>
      </div>

      {/* Status Card */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <span className="font-bold text-white">All Systems Operational</span>
            <span className="text-slate-400 block sm:inline sm:ml-2">FastAPI Backend, Supabase Auth & Web Services are healthy.</span>
          </div>
        </div>
        <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">Uptime 99.9%</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Quick FAQs */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white font-display">Common Questions</h2>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-1.5">
              <h3 className="font-bold text-white">How does receipt scanning work?</h3>
              <p className="text-slate-400 leading-relaxed">
                Take a clean, well-lit photo of your paper receipt. Our OCR engine extracts food ingredients, estimates shelf life, and populates your Fridge or Pantry zones automatically.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-1.5">
              <h3 className="font-bold text-white">What happens when I hit my daily scan limit?</h3>
              <p className="text-slate-400 leading-relaxed">
                Free accounts receive 3 AI scans and 2 bespoke recipe generations every UTC day. When exhausted, you can still add ingredients manually, use the barcode scanner, and cook from your pantry with zero limits.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-1.5">
              <h3 className="font-bold text-white">How do I test Plately Workshop for my restaurant?</h3>
              <p className="text-slate-400 leading-relaxed">
                Launch the Workshop Sandbox using the demo credentials to explore the live KDS and menu editor. When ready for a production pilot, submit an application from the top banner.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10">
          <h2 className="text-lg font-bold text-white font-display mb-4">Send Us a Message</h2>

          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Message Delivered</h3>
              <p className="text-xs text-slate-400">
                Thank you for contacting Plately. We will review your inquiry and reply via email within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 px-4 py-2 bg-brand-500 text-white rounded-lg text-xs font-bold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Your Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full name"
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Your Email</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@email.com"
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="App Feedback">App Feedback</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Restaurant Workshop Pilot">Restaurant Workshop Pilot</option>
                  <option value="Account & Data Question">Account & Data Question</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you today?"
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-brand-500 hover:bg-brand-400 text-white font-bold rounded-lg transition-all flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(249,139,37,0.3)]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Ticket</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
