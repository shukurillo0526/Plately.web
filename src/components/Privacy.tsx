import React from 'react';
import { ShieldCheck, Lock, EyeOff, Trash2, Mail, CheckCircle2 } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-1.5 text-xs font-semibold text-emerald-400">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Privacy & Data Protection</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Last updated: November 2, 2026. Plately is built on a fundamental principle: zero waste, zero advertising, and zero monetization of your personal data.
        </p>
      </div>

      {/* Trust Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <EyeOff className="w-6 h-6 text-brand-400" />
          <h3 className="text-sm font-bold text-white">No Ads or Trackers</h3>
          <p className="text-xs text-slate-400">We do not display third-party advertisements or embed third-party surveillance ad SDKs.</p>
        </div>
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <Lock className="w-6 h-6 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">Encrypted & Secure</h3>
          <p className="text-xs text-slate-400">All data in transit is protected via TLS 1.3; database storage is protected with Postgres Row-Level Security.</p>
        </div>
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <Trash2 className="w-6 h-6 text-orange-400" />
          <h3 className="text-sm font-bold text-white">Complete Data Deletion</h3>
          <p className="text-xs text-slate-400">You retain 100% ownership of your pantry data. Delete your account and associated records at any time.</p>
        </div>
      </div>

      {/* Full Policy Body */}
      <div className="space-y-8 text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-8 rounded-3xl border border-white/10">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white font-display">1. Information We Collect</h2>
          <p>
            When you use Plately (mobile app, web client, or workshop platform), we collect only the information necessary to provide the service:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-400">
            <li><strong className="text-slate-200">Account Credentials:</strong> Email address, optional display name, and securely hashed authentication credentials via Supabase Auth.</li>
            <li><strong className="text-slate-200">Pantry & Inventory Items:</strong> Ingredient names, categories, expiration dates, and storage zones (Fridge, Freezer, Pantry) you create or scan.</li>
            <li><strong className="text-slate-200">Camera & Image Data:</strong> Photos of food items or receipts that you explicitly submit for OCR and ingredient recognition. Photos are processed for text extraction and immediately discarded; they are not sold or used for public training datasets.</li>
            <li><strong className="text-slate-200">Local Diagnostics:</strong> Anonymized crash logs and telemetry to debug offline sync, performance, and application stability.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white font-display">2. How We Use Information</h2>
          <p>We process your data strictly to operate and improve your Plately experience:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-400">
            <li>Synchronizing your pantry inventory across your devices.</li>
            <li>Calculating expiration warnings and zero-waste suggestions.</li>
            <li>Matching available ingredients to delicious local recipes.</li>
            <li>Enforcing server-side daily fair-use AI allowances.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white font-display">3. Google Play & Mobile Permissions</h2>
          <p>
            The Plately mobile app requests only the following permissions:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-400">
            <li><strong className="text-slate-200">Camera:</strong> Strictly used when you trigger the camera scanner to take a photo of groceries, receipts, or barcodes.</li>
            <li><strong className="text-slate-200">Notifications:</strong> Used solely to alert you when ingredients are approaching their expiration date or when your cooking timer finishes.</li>
            <li><strong className="text-slate-200">Network & Storage:</strong> Used to communicate with the encrypted API and cache pantry items locally via SQLite/Hive for offline usage.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white font-display">4. Account and Data Deletion</h2>
          <p>
            Under GDPR, CCPA, and Google Play Store policies, you have the right to inspect, export, or permanently delete your account and all associated inventory and profile records. You can delete your account directly inside the app settings or via our dedicated <a href="/delete-account" className="text-brand-400 underline font-semibold">Account Deletion Page</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white font-display">5. Contact Information</h2>
          <p>
            If you have questions or privacy inquiries, contact our data protection team:
          </p>
          <div className="flex items-center space-x-2 text-xs text-slate-300">
            <Mail className="w-4 h-4 text-brand-400" />
            <span>theplately@gmail.com — Plately Technologies Inc.</span>
          </div>
        </section>
      </div>
    </div>
  );
}
