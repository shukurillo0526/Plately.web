import React from 'react';
import { FileText, CheckCircle2, AlertTriangle, Shield, Mail } from 'lucide-react';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-brand-500/10 border border-brand-500/30 rounded-full px-4 py-1.5 text-xs font-semibold text-brand-400">
          <FileText className="h-4 w-4 text-brand-400" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Effective date: November 2, 2026. Please review these terms governing your use of Plately applications and services.
        </p>
      </div>

      {/* Terms Body */}
      <div className="space-y-8 text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-8 rounded-3xl border border-white/10">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white font-display">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Plately consumer app, Plately Workshop, or related APIs, you agree to be bound by these Terms of Service. If you do not agree, you must discontinue use immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white font-display">2. Free Consumer Service & Fair-Use Limits</h2>
          <p>
            Plately provides core pantry tracking and recipe companion features free of charge with zero advertising or mandatory subscription paywalls.
          </p>
          <p>
            To prevent automated abuse and maintain sustainable server operations, expensive online AI features (cloud photo recognition and bespoke recipe generation) are governed by server-authoritative daily allowances (e.g. 3 photo scans and 2 recipe generations per day per user). Exhaustion of daily allowances results in an HTTP 429 response until midnight UTC; local deterministic pantry workflows remain fully functional without limit.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white font-display">3. Food Safety & Nutritional Disclaimers</h2>
          <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-200 space-y-1.5">
            <div className="flex items-center space-x-2 font-bold text-orange-400">
              <AlertTriangle className="w-4 h-4" />
              <span>Important Food Safety & Medical Guidance Notice</span>
            </div>
            <p>
              Estimated expiration dates, shelf life warnings, and nutritional calculations are generated algorithmically for planning and food waste reduction guidance only. They are not medical, dietary, or microbial safety guarantees. Users are solely responsible for inspecting food freshness, handling raw ingredients safely, and adhering to allergen precautions.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white font-display">4. Workshop Sandbox & Pilot Terms</h2>
          <p>
            Plately Workshop features demo accounts (such as <code>demo@plately.app</code>) intended strictly as an interactive sandbox. Real restaurant operations, POS integrations, and hardware deployments require a formal merchant pilot agreement.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white font-display">5. Contact & Inquiries</h2>
          <p>
            For legal or commercial inquiries, contact:
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
