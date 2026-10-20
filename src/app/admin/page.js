"use client";

import { useState } from "react";
import Link from "next/link";
import { ADMIN_STATS, INITIAL_MEMBERS } from "@/data/adminData";
import { useAdmin } from "@/data/AdminContext";

export default function AdminDashboardPage() {
  const { members, verifications } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");

  const pendingCount = verifications.filter((v) => v.status === "Pending Review").length;
  const activeCount = members.filter((m) => m.status === "Active").length;

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-secondary px-3 py-1 bg-secondary-container/30 rounded-full inline-block mb-2">
            Overview & Operations
          </span>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary">
            Aura Administration Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Real-time platform metrics, member verifications, and subscription growth.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/verifications"
            className="px-4 py-2 bg-secondary text-white rounded-xl text-xs font-bold hover:bg-secondary/90 shadow-sm flex items-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-sm">verified_user</span>
            <span>Review Pending ({pendingCount})</span>
          </Link>
          <Link
            href="/admin/members"
            className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-light shadow-sm flex items-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-sm">person_add</span>
            <span>Manage Members</span>
          </Link>
        </div>
      </div>

      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Members */}
        <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-3xl">group</span>
          </div>
          <div>
            <p className="text-xs font-bold text-outline uppercase tracking-wider">Total Members</p>
            <h3 className="font-headline text-2xl font-bold text-primary mt-0.5">
              {ADMIN_STATS.totalMembers.toLocaleString()}
            </h3>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              +142 this week
            </p>
          </div>
        </div>

        {/* Active Profiles */}
        <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-secondary-container/40 text-on-secondary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-3xl">how_to_reg</span>
          </div>
          <div>
            <p className="text-xs font-bold text-outline uppercase tracking-wider">Active Profiles</p>
            <h3 className="font-headline text-2xl font-bold text-on-surface mt-0.5">
              {activeCount > 0 ? (ADMIN_STATS.activeProfiles - (INITIAL_MEMBERS.length - activeCount)).toLocaleString() : ADMIN_STATS.activeProfiles.toLocaleString()}
            </h3>
            <p className="text-[11px] text-on-surface-variant mt-1 font-medium">
              74.3% engagement rate
            </p>
          </div>
        </div>

        {/* Pending Verifications */}
        <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-3xl">pending_actions</span>
          </div>
          <div>
            <p className="text-xs font-bold text-outline uppercase tracking-wider">Pending Verifications</p>
            <h3 className="font-headline text-2xl font-bold text-amber-700 mt-0.5">
              {pendingCount}
            </h3>
            <p className="text-[11px] text-amber-600 font-semibold mt-1">
              Requires human review
            </p>
          </div>
        </div>

        {/* Active Memberships */}
        <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-3xl">loyalty</span>
          </div>
          <div>
            <p className="text-xs font-bold text-outline uppercase tracking-wider">Active Memberships</p>
            <h3 className="font-headline text-2xl font-bold text-emerald-800 mt-0.5">
              {ADMIN_STATS.activeMemberships.toLocaleString()}
            </h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">
              {ADMIN_STATS.monthlyRevenue} MRR
            </p>
          </div>
        </div>
      </div>

      {/* Recent Registrations Table */}
      <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-outline-variant/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-headline text-lg font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">recent_actors</span>
              Recent Registrations
            </h3>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Latest members registered on Aura Matrimony
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-sm">search</span>
              <input
                type="text"
                placeholder="Search member or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-surface-container-low pl-9 pr-4 py-2 rounded-xl text-xs border border-outline-variant/30 focus:outline-none focus:border-primary"
              />
            </div>
            <Link
              href="/admin/members"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-primary bg-primary/10 hover:bg-primary hover:text-white transition-colors shrink-0"
            >
              View All
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 text-outline text-[11px] font-bold uppercase tracking-wider border-b border-outline-variant/20">
                <th className="py-3.5 px-6">Member Name</th>
                <th className="py-3.5 px-6">Email Address</th>
                <th className="py-3.5 px-6">Plan</th>
                <th className="py-3.5 px-6">Registration Date</th>
                <th className="py-3.5 px-6">Verification</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-xs">
              {filteredMembers.slice(0, 6).map((member) => (
                <tr key={member.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover border border-outline-variant/30 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-on-surface">{member.name}</p>
                        <p className="text-[11px] text-outline">{member.location} &middot; {member.age} yrs</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant font-medium">
                    {member.email}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-block whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-bold bg-secondary-container/40 text-on-secondary-container border border-secondary/20 leading-none">
                      {member.membershipPlan}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant">
                    {member.registeredDate}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        member.verificationStatus === "Verified"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : member.verificationStatus === "Flagged"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[13px]">
                        {member.verificationStatus === "Verified"
                          ? "verified"
                          : member.verificationStatus === "Flagged"
                          ? "report"
                          : "hourglass_top"}
                      </span>
                      {member.verificationStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        member.status === "Active"
                          ? "bg-emerald-100 text-emerald-800"
                          : member.status === "Suspended"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/admin/members?inspect=${member.id}`}
                      className="p-1.5 text-outline hover:text-primary rounded-lg transition-colors inline-block"
                      title="Inspect Member Details"
                    >
                      <span className="material-symbols-outlined text-base">visibility</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Column Summary Widget: Quick Verification & Quick System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Verification Feed */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-outline-variant/30 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-outline-variant/20">
            <div>
              <h4 className="font-headline font-bold text-base text-primary">Pending Verification Queue</h4>
              <p className="text-xs text-on-surface-variant">Profiles awaiting concierge depth vetting</p>
            </div>
            <Link href="/admin/verifications" className="text-xs font-bold text-primary hover:underline">
              Open Full Queue
            </Link>
          </div>

          <div className="space-y-3">
            {verifications.slice(0, 3).map((v) => (
              <div
                key={v.id}
                className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-on-surface">{v.memberName}</span>
                    <span className="text-[10px] text-outline">({v.memberId})</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded-full">
                      {v.identityScore} Fit
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        v.status === "Approved"
                          ? "bg-emerald-100 text-emerald-800"
                          : v.status === "Rejected"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {v.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-1">{v.documentType}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/admin/verifications"
                    className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-light transition-colors"
                  >
                    Review Docs
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick System Info / Safety Status */}
        <div className="bg-white rounded-3xl p-6 border border-outline-variant/30 shadow-xs flex flex-col justify-between">
          <div>
            <h4 className="font-headline font-bold text-base text-primary mb-1">Aura Platform Health</h4>
            <p className="text-xs text-on-surface-variant mb-4">Core services operational status</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Proprietary AI Matching Engine
                </span>
                <span className="font-bold text-emerald-600">Active</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Encrypted HD Video Salons
                </span>
                <span className="font-bold text-emerald-600">Operational</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Biometric ID Verification
                </span>
                <span className="font-bold text-emerald-600">Optimal</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Stripe Payment Webhook
                </span>
                <span className="font-bold text-emerald-600">Connected</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-outline-variant/20">
            <p className="text-[11px] text-outline">
              Aura v3.4 Enterprise Edition &middot; Hosted on Netlify Serverless Cloud
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
