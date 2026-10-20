"use client";

import { useState } from "react";

export default function SettingsAdminPage() {
  const [siteName, setSiteName] = useState("Aura Matrimony");
  const [supportEmail, setSupportEmail] = useState("concierge@auramatrimony.com");
  const [requireManualKYC, setRequireManualKYC] = useState(true);
  const [enableVideoRooms, setEnableVideoRooms] = useState(true);
  const [enableAIStars, setEnableAIStars] = useState(true);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-xs">
        <div>
          <h1 className="font-headline text-2xl font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">settings</span>
            Platform & Governance Settings
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            General matrimony site configurations, moderation thresholds, and concierge controls.
          </p>
        </div>
        {savedMessage && (
          <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200 flex items-center gap-1 animate-fadeIn">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            Settings saved successfully (Demo)
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Configurations */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-xs space-y-6">
          <h3 className="font-headline font-bold text-base text-primary pb-3 border-b border-outline-variant/20">
            Brand & Support Identity
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="block font-bold text-on-surface mb-1.5">Application Brand Title</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:border-primary text-xs"
              />
              <p className="text-[11px] text-outline mt-1">Displayed in global headers and notification footers.</p>
            </div>

            <div>
              <label className="block font-bold text-on-surface mb-1.5">Elite Concierge Support Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:border-primary text-xs"
              />
              <p className="text-[11px] text-outline mt-1">Destination for escalated VIP member verification inquiries.</p>
            </div>
          </div>
        </div>

        {/* Feature Flags & Safety Controls */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-xs space-y-6">
          <h3 className="font-headline font-bold text-base text-primary pb-3 border-b border-outline-variant/20">
            Safety, Video & Matching Feature Toggles
          </h3>

          <div className="space-y-4 text-xs">
            <label className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-2xl cursor-pointer hover:bg-surface-container transition-colors">
              <div>
                <p className="font-bold text-on-surface">Mandatory Concierge KYC Approval</p>
                <p className="text-[11px] text-outline">Require manual administrator approval before a newly registered member can send messages.</p>
              </div>
              <input
                type="checkbox"
                checked={requireManualKYC}
                onChange={(e) => setRequireManualKYC(e.target.checked)}
                className="w-5 h-5 accent-primary cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-2xl cursor-pointer hover:bg-surface-container transition-colors">
              <div>
                <p className="font-bold text-on-surface">Encrypted HD Video Salon Rooms</p>
                <p className="text-[11px] text-outline">Enable web-based peer video interactions for Signature and Elite Royal tier subscribers.</p>
              </div>
              <input
                type="checkbox"
                checked={enableVideoRooms}
                onChange={(e) => setEnableVideoRooms(e.target.checked)}
                className="w-5 h-5 accent-primary cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-2xl cursor-pointer hover:bg-surface-container transition-colors">
              <div>
                <p className="font-bold text-on-surface">Proprietary AI Compatibility Matrix</p>
                <p className="text-[11px] text-outline">Display 150-parameter neural compatibility radar charts on member dashboards.</p>
              </div>
              <input
                type="checkbox"
                checked={enableAIStars}
                onChange={(e) => setEnableAIStars(e.target.checked)}
                className="w-5 h-5 accent-primary cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <button
            type="submit"
            className="px-6 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            <span>Save Platform Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}

