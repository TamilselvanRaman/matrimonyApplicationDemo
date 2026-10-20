"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/data/AdminContext";

export default function ProfileVerificationPage() {
  const router = useRouter();
  const { verifications, approveVerification, rejectVerification } = useAdmin();

  const [filterStatus, setFilterStatus] = useState("all");
  const [rejectingItem, setRejectingItem] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionError, setRejectionError] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const filtered = verifications.filter(
    (v) => filterStatus === "all" || v.status === filterStatus
  );

  const handleApprove = (v) => {
    // Validate required verification information
    if (!v.memberName || !v.memberId) {
      alert("Error: Verification record lacks valid member identifier.");
      return;
    }

    approveVerification(v.id, v.memberId);
    setFeedbackMessage({
      type: "success",
      text: `Profile for ${v.memberName} (${v.memberId}) approved successfully! Redirecting to Users list...`,
    });

    // Workflow: return to Users/Members list page after approval completes
    setTimeout(() => {
      router.push(`/admin/members?inspect=${v.memberId}`);
    }, 1200);
  };

  const handleOpenRejectModal = (v) => {
    setRejectingItem(v);
    setRejectionReason("");
    setRejectionError("");
  };

  const handleConfirmReject = (e) => {
    e.preventDefault();
    if (!rejectionReason.trim()) {
      setRejectionError("Please specify a reason for rejecting this verification submission.");
      return;
    }

    rejectVerification(rejectingItem.id, rejectingItem.memberId, rejectionReason.trim());
    const memberName = rejectingItem.memberName;
    const memberId = rejectingItem.memberId;
    setRejectingItem(null);

    setFeedbackMessage({
      type: "error",
      text: `Verification for ${memberName} rejected with note: "${rejectionReason.trim()}". Redirecting to Users list...`,
    });

    // Workflow: return to Users/Members list page after rejection completes
    setTimeout(() => {
      router.push(`/admin/members?inspect=${memberId}`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Toast Feedback Notification */}
      {feedbackMessage && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-bold animate-fadeIn shadow-md ${
            feedbackMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
              : "bg-rose-50 text-rose-800 border-rose-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">
              {feedbackMessage.type === "success" ? "check_circle" : "cancel"}
            </span>
            <span>{feedbackMessage.text}</span>
          </div>
          <span className="text-[10px] uppercase font-bold text-outline animate-pulse">Navigating...</span>
        </div>
      )}

      {/* Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-xs">
        <div>
          <h1 className="font-headline text-2xl font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified_user
            </span>
            Profile Verification Desk
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Manual KYC, identity credentials, and biometric validation for elite status approval.
          </p>
        </div>

        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-surface-container-low px-3 py-2 rounded-xl text-xs border border-outline-variant/30 focus:outline-none font-medium"
          >
            <option value="all">All Verification Statuses</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Verification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 border border-outline-variant/30 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-4">
                <div>
                  <span className="text-[10px] font-mono text-outline font-bold">{item.id}</span>
                  <h3 className="font-bold text-base text-primary">{item.memberName}</h3>
                  <p className="text-[11px] text-outline">Member ID: {item.memberId}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      item.status === "Approved"
                        ? "bg-emerald-100 text-emerald-800"
                        : item.status === "Rejected"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {item.status}
                  </span>
                  <p className="text-[10px] text-emerald-600 font-bold mt-1">
                    AI Match: {item.identityScore}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-outline text-base">badge</span>
                  <div>
                    <p className="font-bold text-on-surface">Documents Submitted:</p>
                    <p className="text-on-surface-variant text-[11px]">{item.documentType}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-outline text-base">schedule</span>
                  <div>
                    <p className="font-bold text-on-surface">Submission Timestamp:</p>
                    <p className="text-on-surface-variant text-[11px]">{item.submittedAt}</p>
                  </div>
                </div>

                <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 mt-3">
                  <p className="text-[10px] uppercase font-bold text-outline">Concierge Notes</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">{item.notes}</p>
                </div>

                {item.rejectionReason && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl mt-3 text-rose-900">
                    <p className="text-[10px] uppercase font-bold text-rose-700">Rejection Reason</p>
                    <p className="text-xs mt-0.5">{item.rejectionReason}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 pt-5 border-t border-outline-variant/20 mt-5">
              <button
                onClick={() => handleApprove(item)}
                disabled={item.status === "Approved"}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  item.status === "Approved"
                    ? "bg-emerald-100 text-emerald-700 cursor-default"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm active:scale-[0.99]"
                }`}
              >
                <span className="material-symbols-outlined text-base">check</span>
                <span>{item.status === "Approved" ? "Approved" : "Approve Verified"}</span>
              </button>
              <button
                onClick={() => handleOpenRejectModal(item)}
                disabled={item.status === "Rejected"}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  item.status === "Rejected"
                    ? "bg-rose-100 text-rose-700 cursor-default"
                    : "border border-rose-300 text-rose-600 hover:bg-rose-50"
                }`}
              >
                <span className="material-symbols-outlined text-base">close</span>
                <span>Reject</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mandatory Rejection Reason Modal */}
      {rejectingItem && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setRejectingItem(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-outline-variant/30 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <div className="flex items-center gap-2 text-rose-600">
                <span className="material-symbols-outlined text-2xl">warning</span>
                <h3 className="font-bold text-base text-primary">Reject Verification Submission</h3>
              </div>
              <button
                onClick={() => setRejectingItem(null)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <p className="text-xs text-on-surface-variant">
              You are rejecting the verification for <span className="font-bold text-on-surface">{rejectingItem.memberName}</span> ({rejectingItem.memberId}). Please supply a clear reason to log in the member audit trail.
            </p>

            <form onSubmit={handleConfirmReject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Rejection Reason <span className="text-rose-600">*</span>
                </label>
                <textarea
                  rows={3}
                  value={rejectionReason}
                  onChange={(e) => {
                    setRejectionReason(e.target.value);
                    if (rejectionError) setRejectionError("");
                  }}
                  placeholder="e.g. Expired identification document, blurry biometric scan, or credential verification failure..."
                  className="w-full bg-surface-container-low p-3 rounded-xl border border-outline-variant/30 text-xs focus:outline-none focus:border-rose-500"
                />
                {rejectionError && (
                  <p className="text-xs text-rose-600 mt-1 font-semibold">{rejectionError}</p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectingItem(null)}
                  className="px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-container rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Confirm Rejection & Navigate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
