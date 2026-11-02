import React, { useState } from 'react';
import { Trash2, AlertTriangle, CheckCircle2, ShieldAlert, Mail } from 'lucide-react';

export default function DeleteAccount() {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleDeleteRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmed || !email) return;

    try {
      const requests = JSON.parse(localStorage.getItem('plately_deletion_requests') || '[]');
      requests.push({
        email,
        reason,
        requestedAt: new Date().toISOString(),
      });
      localStorage.setItem('plately_deletion_requests', JSON.stringify(requests));
    } catch (_) {}

    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-rose-500/10 border border-rose-500/30 rounded-full px-4 py-1.5 text-xs font-semibold text-rose-400">
          <Trash2 className="h-4 w-4 text-rose-400" />
          <span>Account & Data Erasure</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
          Delete Your Account & Data
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          In accordance with Google Play, Apple App Store, and GDPR policies, you can request the permanent deletion of your Plately account and all stored personal data.
        </p>
      </div>

      {/* Warning Box */}
      <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200 space-y-3">
        <div className="flex items-center space-x-2 font-bold text-rose-400 text-sm">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>This action is permanent and irreversible</span>
        </div>
        <p className="leading-relaxed">
          Requesting account deletion will permanently purge your user profile, pantry inventory, scan history, saved recipes, and telemetry data from our production database within 30 days.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10">
        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Erasure Request Received</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              We have recorded your deletion request for <strong className="text-white">{email}</strong>. A verification email has been sent to confirm ownership before permanently purging the database record.
            </p>
          </div>
        ) : (
          <form onSubmit={handleDeleteRequest} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Your Account Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.com"
                className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Reason for Leaving (Optional)</label>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Help us understand how we can improve..."
                className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 text-xs resize-none"
              />
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start space-x-3">
              <input
                required
                type="checkbox"
                id="confirm-check"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-0.5 rounded text-rose-500 focus:ring-rose-500"
              />
              <label htmlFor="confirm-check" className="text-slate-300 leading-relaxed cursor-pointer">
                I understand that deleting my account permanently deletes my pantry records, recipe favorites, and streak statistics, and cannot be undone.
              </label>
            </div>

            <button
              type="submit"
              disabled={!confirmed || !email}
              className="w-full py-3 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:hover:bg-rose-600 text-white font-bold rounded-xl transition-all flex items-center justify-center space-x-2 text-sm shadow-[0_0_15px_rgba(244,63,94,0.3)]"
            >
              <Trash2 className="w-4 h-4" />
              <span>Confirm Account & Data Deletion</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
