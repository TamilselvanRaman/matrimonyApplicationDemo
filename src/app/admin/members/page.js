"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAdmin } from "@/data/AdminContext";

function MembersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { members, toggleMemberStatus } = useAdmin();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterVerification, setFilterVerification] = useState("all");
  const [selectedMember, setSelectedMember] = useState(null);

  // Check query parameter ?inspect=MEM-XXXX
  useEffect(() => {
    const inspectId = searchParams.get("inspect");
    if (inspectId) {
      const match = members.find((m) => m.id === inspectId);
      if (match) setSelectedMember(match);
    }
  }, [searchParams, members]);

  // Total summary counts
  const totalCount = members.length;
  const activeCount = members.filter((m) => m.status === "Active").length;
  const pendingVerificationCount = members.filter((m) => m.verificationStatus !== "Verified").length;
  const suspendedCount = members.filter((m) => m.status === "Suspended").length;

  const filtered = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPlan = filterPlan === "all" || m.membershipPlan === filterPlan;
    const matchesStatus = filterStatus === "all" || m.status === filterStatus;
    const matchesVerification = filterVerification === "all" || m.verificationStatus === filterVerification;

    return matchesSearch && matchesPlan && matchesStatus && matchesVerification;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-xs">
        <div>
          <h1 className="font-headline text-2xl font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">group</span>
            Total Registered Users & Members
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Complete member roster, background profiles, membership tiers, and verification lifecycles.
          </p>
        </div>
        <div className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-bold shrink-0">
          {filtered.length} of {totalCount} Members Listed
        </div>
      </div>

      {/* 4 Overview Count Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-outline-variant/30 shadow-xs">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-outline">Total Registered</p>
          <h3 className="font-headline text-xl sm:text-2xl font-bold text-primary mt-1">{totalCount}</h3>
          <p className="text-[11px] text-outline mt-0.5">Across all plans</p>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-outline-variant/30 shadow-xs">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-outline">Active Users</p>
          <h3 className="font-headline text-xl sm:text-2xl font-bold text-emerald-700 mt-1">{activeCount}</h3>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Can access chat & video</p>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-outline-variant/30 shadow-xs">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-outline">Pending Verification</p>
          <h3 className="font-headline text-xl sm:text-2xl font-bold text-amber-700 mt-1">{pendingVerificationCount}</h3>
          <p className="text-[11px] text-amber-600 font-semibold mt-0.5">Awaiting concierge check</p>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-outline-variant/30 shadow-xs">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-outline">Suspended Users</p>
          <h3 className="font-headline text-xl sm:text-2xl font-bold text-rose-700 mt-1">{suspendedCount}</h3>
          <p className="text-[11px] text-rose-600 font-semibold mt-0.5">Access disabled</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-sm">search</span>
          <input
            type="text"
            placeholder="Search by ID, name, city or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface-container-low pl-9 pr-4 py-2 rounded-xl text-xs border border-outline-variant/30 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            className="bg-surface-container-low px-3 py-2 rounded-xl text-xs border border-outline-variant/30 focus:outline-none font-medium"
          >
            <option value="all">All Membership Plans</option>
            <option value="Elite Royal">Elite Royal</option>
            <option value="Bespoke Concierge">Bespoke Concierge</option>
            <option value="Signature Premium">Signature Premium</option>
            <option value="Classic Aura">Classic Aura</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-surface-container-low px-3 py-2 rounded-xl text-xs border border-outline-variant/30 focus:outline-none font-medium"
          >
            <option value="all">All Account Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
          </select>

          <select
            value={filterVerification}
            onChange={(e) => setFilterVerification(e.target.value)}
            className="bg-surface-container-low px-3 py-2 rounded-xl text-xs border border-outline-variant/30 focus:outline-none font-medium"
          >
            <option value="all">All Verification States</option>
            <option value="Verified">Verified</option>
            <option value="Under Review">Under Review</option>
            <option value="Documents Uploaded">Documents Uploaded</option>
            <option value="Flagged">Flagged</option>
          </select>
        </div>
      </div>

      {/* Members Grid / Table */}
      <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 text-outline text-[11px] font-bold uppercase tracking-wider border-b border-outline-variant/20">
                <th className="py-3.5 px-6">Member ID</th>
                <th className="py-3.5 px-6">Profile</th>
                <th className="py-3.5 px-6 min-w-[170px]">Membership Tier</th>
                <th className="py-3.5 px-6">Location</th>
                <th className="py-3.5 px-6">Verification</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Registered</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-xs">
              {filtered.map((member) => (
                <tr key={member.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-4 px-6 font-mono text-[11px] text-outline font-semibold">
                    {member.id}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover border border-outline-variant/30 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-on-surface truncate">{member.name}</p>
                        <p className="text-[11px] text-outline font-medium truncate">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  {/* Fixed Membership Tier Display: whitespace-nowrap and flexible padding */}
                  <td className="py-4 px-6">
                    <span className="inline-block whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold bg-secondary-container/30 text-on-secondary-container border border-secondary/30 shadow-2xs leading-none">
                      {member.membershipPlan}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant font-medium whitespace-nowrap">
                    {member.location}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${
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
                  <td className="py-4 px-6 text-on-surface-variant text-[11px] whitespace-nowrap">
                    {member.registeredDate}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedMember(member)}
                        className="px-2.5 py-1 rounded-lg text-primary bg-primary/10 hover:bg-primary hover:text-white transition-colors font-bold text-xs"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => toggleMemberStatus(member.id)}
                        className={`px-2 py-1 rounded-lg text-xs font-semibold border ${
                          member.status === "Active"
                            ? "border-rose-300 text-rose-600 hover:bg-rose-50"
                            : "border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                        }`}
                        title={member.status === "Active" ? "Suspend member access" : "Activate member"}
                      >
                        {member.status === "Active" ? "Suspend" : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Member Details Drawer/Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => {
            setSelectedMember(null);
            router.push("/admin/members");
          }}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-outline-variant/30 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
              <div className="flex items-center gap-3">
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <h3 className="font-bold text-lg text-primary">{selectedMember.name}</h3>
                  <p className="text-xs text-outline font-mono">{selectedMember.id} &middot; {selectedMember.gender}, {selectedMember.age} yrs</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedMember(null);
                  router.push("/admin/members");
                }}
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high text-on-surface"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Verification Status Banner in Inspect Modal */}
            <div
              className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs font-semibold ${
                selectedMember.verificationStatus === "Verified"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : selectedMember.verificationStatus === "Flagged"
                  ? "bg-rose-50 text-rose-800 border-rose-200"
                  : "bg-amber-50 text-amber-800 border-amber-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">
                  {selectedMember.verificationStatus === "Verified" ? "verified" : "report"}
                </span>
                <span>Verification State: {selectedMember.verificationStatus}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-white text-[10px] font-bold shadow-2xs">
                Account {selectedMember.status}
              </span>
            </div>

            {selectedMember.rejectionReason && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900">
                <p className="font-bold text-[10px] uppercase tracking-wider text-rose-700">Rejection / Flagged Reason:</p>
                <p className="mt-0.5">{selectedMember.rejectionReason}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-surface-container-low rounded-xl">
                <p className="text-[10px] uppercase font-bold text-outline">Email Address</p>
                <p className="font-bold text-on-surface mt-0.5 truncate">{selectedMember.email}</p>
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl">
                <p className="text-[10px] uppercase font-bold text-outline">Location</p>
                <p className="font-bold text-on-surface mt-0.5">{selectedMember.location}</p>
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl">
                <p className="text-[10px] uppercase font-bold text-outline">Membership Tier</p>
                <p className="font-bold text-secondary mt-0.5">{selectedMember.membershipPlan}</p>
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl">
                <p className="text-[10px] uppercase font-bold text-outline">Profession</p>
                <p className="font-bold text-on-surface mt-0.5 truncate">{selectedMember.profession || "Vetted Professional"}</p>
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl">
                <p className="text-[10px] uppercase font-bold text-outline">Education</p>
                <p className="font-bold text-on-surface mt-0.5 truncate">{selectedMember.education || "University Graduate"}</p>
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl">
                <p className="text-[10px] uppercase font-bold text-outline">Registration Date</p>
                <p className="font-bold text-on-surface mt-0.5">{selectedMember.registeredDate}</p>
              </div>
            </div>

            {selectedMember.bio && (
              <div className="p-3.5 bg-surface-container-low rounded-2xl border border-outline-variant/20 text-xs">
                <p className="text-[10px] uppercase font-bold text-outline mb-1">Personal Bio</p>
                <p className="text-on-surface-variant leading-relaxed">&ldquo;{selectedMember.bio}&rdquo;</p>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-outline-variant/20">
              <button
                onClick={() => {
                  setSelectedMember(null);
                  router.push("/admin/members");
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container"
              >
                Back to Member List
              </button>
              <button
                onClick={() => {
                  toggleMemberStatus(selectedMember.id);
                  setSelectedMember((prev) => ({
                    ...prev,
                    status: prev.status === "Active" ? "Suspended" : "Active",
                  }));
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition-colors ${
                  selectedMember.status === "Active" ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {selectedMember.status === "Active" ? "Suspend Account" : "Activate Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MembersManagementPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs">Loading members roster...</div>}>
      <MembersContent />
    </Suspense>
  );
}
