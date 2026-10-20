"use client";

import { ADMIN_STATS } from "@/data/adminData";

export default function ReportsAdminPage() {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-xs">
        <div>
          <h1 className="font-headline text-2xl font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">insights</span>
            Analytics & Operations Reports
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Aggregated membership insights, compatibility conversion rates, and revenue performance.
          </p>
        </div>
        <button
          type="button"
          onClick={() => alert("Demo Report Exported (CSV format).")}
          className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-primary-light"
        >
          <span className="material-symbols-outlined text-sm">download</span>
          Export Audit Report
        </button>
      </div>

      {/* KPI Metric Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-xs">
          <p className="text-xs font-bold text-outline uppercase tracking-wider">AI Compatibility Match Rate</p>
          <h3 className="font-headline text-3xl font-bold text-primary mt-1">{ADMIN_STATS.verificationRate}</h3>
          <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
            Percentage of member matches reaching mutually positive engagement in Video Salons.
          </p>
          <div className="w-full bg-surface-container-high h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-primary h-full w-[97.8%]"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-xs">
          <p className="text-xs font-bold text-outline uppercase tracking-wider">Paid Subscription Conversion</p>
          <h3 className="font-headline text-3xl font-bold text-secondary mt-1">27.8%</h3>
          <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
            Free profile holders transitioning to Signature or Elite Royal membership within 14 days.
          </p>
          <div className="w-full bg-surface-container-high h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-secondary h-full w-[27.8%]"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-xs">
          <p className="text-xs font-bold text-outline uppercase tracking-wider">Monthly Recurring Revenue</p>
          <h3 className="font-headline text-3xl font-bold text-emerald-700 mt-1">{ADMIN_STATS.monthlyRevenue}</h3>
          <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
            Net recurring subscription revenue across all active global jurisdictions.
          </p>
          <div className="w-full bg-surface-container-high h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-emerald-600 h-full w-[85%]"></div>
          </div>
        </div>
      </div>

      {/* Breakdown Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-xs">
          <h3 className="font-headline font-bold text-base text-primary mb-1">Top Member Regional Hubs</h3>
          <p className="text-xs text-on-surface-variant mb-4">Distribution of verified high-intent members</p>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
              <span className="font-semibold text-on-surface">London, United Kingdom</span>
              <span className="font-bold text-primary">34% of global base</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
              <span className="font-semibold text-on-surface">Paris & Milan (Western Europe)</span>
              <span className="font-bold text-primary">22% of global base</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
              <span className="font-semibold text-on-surface">San Francisco & New York (US)</span>
              <span className="font-bold text-primary">20% of global base</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
              <span className="font-semibold text-on-surface">Dubai & Zurich (International)</span>
              <span className="font-bold text-primary">16% of global base</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-semibold text-on-surface">Other Verified Metro Cities</span>
              <span className="font-bold text-primary">8% of global base</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-xs">
          <h3 className="font-headline font-bold text-base text-primary mb-1">Safety & Verification Health</h3>
          <p className="text-xs text-on-surface-variant mb-4">Concierge security parameters</p>

          <div className="space-y-4">
            <div className="p-3 bg-surface-container-low rounded-xl">
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="font-bold text-on-surface">Zero Fraud Tolerance</span>
                <span className="text-emerald-600 font-bold">100% Guaranteed</span>
              </div>
              <p className="text-[11px] text-outline">All accounts require two-factor biometric verification before chat activation.</p>
            </div>

            <div className="p-3 bg-surface-container-low rounded-xl">
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="font-bold text-on-surface">Average Verification Turnaround</span>
                <span className="text-primary font-bold">3.4 Hours</span>
              </div>
              <p className="text-[11px] text-outline">Human concierge review SLA targets under 6 hours from document submission.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

