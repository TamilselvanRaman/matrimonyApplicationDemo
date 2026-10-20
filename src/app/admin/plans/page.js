"use client";

import { useState } from "react";
import { useAdmin } from "@/data/AdminContext";

export default function MembershipPlansAdminPage() {
  const { plans, updateMembershipPlan } = useAdmin();

  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    price: "",
    period: "",
    status: "Active",
    matchingBenefits: "",
    communicationBenefits: "",
    visibilityLimit: "",
    verificationBenefit: "",
    featuresText: "",
  });
  const [successToast, setSuccessToast] = useState("");

  const handleOpenEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      tagline: plan.tagline || "",
      price: plan.price,
      period: plan.period,
      status: plan.status || "Active",
      matchingBenefits: plan.matchingBenefits || "",
      communicationBenefits: plan.communicationBenefits || "",
      visibilityLimit: plan.visibilityLimit || "",
      verificationBenefit: plan.verificationBenefit || "",
      featuresText: plan.features ? plan.features.join("\n") : "",
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price.trim()) {
      alert("Please provide both plan name and price.");
      return;
    }

    const updatedFeatures = formData.featuresText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    updateMembershipPlan(editingPlan.id, {
      name: formData.name.trim(),
      tagline: formData.tagline.trim(),
      price: formData.price.trim(),
      period: formData.period.trim(),
      status: formData.status,
      matchingBenefits: formData.matchingBenefits.trim(),
      communicationBenefits: formData.communicationBenefits.trim(),
      visibilityLimit: formData.visibilityLimit.trim(),
      verificationBenefit: formData.verificationBenefit.trim(),
      features: updatedFeatures.length > 0 ? updatedFeatures : editingPlan.features,
    });

    const updatedName = formData.name.trim();
    setEditingPlan(null);
    setSuccessToast(`Tier rules for "${updatedName}" updated successfully!`);
    setTimeout(() => setSuccessToast(""), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {successToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-2 shadow-sm animate-fadeIn">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>{successToast}</span>
        </div>
      )}

      {/* Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-xs">
        <div>
          <h1 className="font-headline text-2xl font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">card_membership</span>
            Membership Plans & Tiers
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Configure subscription tiers, feature access matrix, pricing rules, and active subscriber metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 bg-secondary-container text-on-secondary-container rounded-xl text-xs font-bold">
            6,920 Active Subscribers
          </span>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-3xl p-6 border shadow-xs flex flex-col justify-between relative transition-all ${
              plan.highlight
                ? "border-2 border-secondary shadow-md ring-4 ring-secondary/10"
                : "border-outline-variant/30"
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-secondary text-white text-[10px] font-bold uppercase tracking-wider shadow-sm whitespace-nowrap">
                Most Popular
              </span>
            )}

            <div>
              <div className="mb-4 pb-4 border-b border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline text-lg font-bold text-primary break-words">{plan.name}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                      plan.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {plan.status || "Active"}
                  </span>
                </div>
                <p className="text-[11px] text-on-surface-variant mt-0.5 min-h-[32px]">{plan.tagline}</p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-headline text-3xl font-extrabold text-on-surface">{plan.price}</span>
                  <span className="text-xs text-outline font-semibold">{plan.period}</span>
                </div>
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl mb-4">
                <p className="text-[10px] uppercase font-bold text-outline">Current Active Base</p>
                <p className="text-sm font-bold text-primary mt-0.5">{plan.activeSubscribers.toLocaleString()} Members</p>
              </div>

              <div className="space-y-2.5 mb-6">
                <p className="text-[11px] font-bold text-outline uppercase tracking-wider">Features Included</p>
                {plan.features.map((f, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <span className="material-symbols-outlined text-emerald-600 text-sm mt-0.5 shrink-0">check_circle</span>
                    <span className="text-on-surface-variant leading-snug">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/20">
              <button
                type="button"
                onClick={() => handleOpenEdit(plan)}
                className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-primary hover:text-white text-primary text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
                <span>Edit Tier Rules</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Tier Rules Modal */}
      {editingPlan && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setEditingPlan(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-outline-variant/30 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">tune</span>
                <div>
                  <h3 className="font-bold text-base text-primary">Edit Tier Rules: {editingPlan.name}</h3>
                  <p className="text-[11px] text-outline">Configure pricing, duration and exclusive privilege matrix</p>
                </div>
              </div>
              <button
                onClick={() => setEditingPlan(null)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-on-surface mb-1">Plan Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-bold text-on-surface mb-1">Plan Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30 text-xs focus:outline-none font-medium"
                  >
                    <option value="Active">Active</option>
                    <option value="Hidden">Hidden (Legacy)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">Tagline / Short Pitch</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-on-surface mb-1">Price *</label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. $499"
                    className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30 text-xs focus:outline-none focus:border-primary font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-on-surface mb-1">Billing Duration</label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="e.g. /month or /quarter"
                    className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">Features Included (one per line)</label>
                <textarea
                  rows={4}
                  value={formData.featuresText}
                  onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                  placeholder="Enter plan features, one per line..."
                  className="w-full bg-surface-container-low p-3 rounded-xl border border-outline-variant/30 text-xs focus:outline-none focus:border-primary leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-on-surface mb-1">Matching Benefit</label>
                  <input
                    type="text"
                    value={formData.matchingBenefits}
                    onChange={(e) => setFormData({ ...formData, matchingBenefits: e.target.value })}
                    placeholder="e.g. Daily AI compatibility insights"
                    className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-bold text-on-surface mb-1">Communication Benefit</label>
                  <input
                    type="text"
                    value={formData.communicationBenefits}
                    onChange={(e) => setFormData({ ...formData, communicationBenefits: e.target.value })}
                    placeholder="e.g. HD Video Call Salons"
                    className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-container rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Save Tier Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
