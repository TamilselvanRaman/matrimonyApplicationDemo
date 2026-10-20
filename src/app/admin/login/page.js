"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@auramatrimony.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please provide both your corporate email and administrator password.");
      return;
    }

    setIsLoading(true);

    // Demonstration authorization logic:
    // Authorized demo credentials: admin@auramatrimony.com with any valid password for demo or designated password
    setTimeout(() => {
      if (email.toLowerCase() === "admin@auramatrimony.com" && (password === "AuraAdmin2026!" || password === "admin" || password.length >= 4)) {
        if (typeof window !== "undefined") {
          localStorage.setItem("aura_admin_authenticated", "true");
          localStorage.setItem(
            "aura_admin_user",
            JSON.stringify({
              name: "Victoria Hastings",
              email: "admin@auramatrimony.com",
              role: "Super Admin",
            })
          );
        }
        router.push("/admin");
      } else {
        setIsLoading(false);
        setError("Invalid administrative credentials. For demo access, use corporate account admin@auramatrimony.com.");
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-4 sm:p-6 text-on-surface">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 font-headline text-2xl font-bold text-primary">
            <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <span>Aura Admin</span>
          </Link>
          <p className="text-xs text-on-surface-variant font-medium">
            Administrative Gateway &bull; Executive Portal Access
          </p>
          <div className="inline-block px-3 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container text-[10px] font-bold uppercase tracking-wider border border-secondary/20">
            Authorized Personnel Only
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <span className="material-symbols-outlined text-base shrink-0">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-on-surface mb-1">Corporate Email Address</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-lg">mail</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@auramatrimony.com"
                className="w-full bg-surface-container-low pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/30 text-xs focus:outline-none focus:border-primary font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-on-surface mb-1">Administrator Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-lg">lock</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-surface-container-low pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/30 text-xs focus:outline-none focus:border-primary"
              />
            </div>
            <p className="text-[10px] text-outline mt-1">
              Demo Access Hint: Password <span className="font-mono font-bold text-primary">AuraAdmin2026!</span> or any 4+ char password.
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-primary hover:bg-primary-light text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                <span>Authenticating Credentials...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">security</span>
                <span>Authenticate & Access Dashboard</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Back Link */}
        <div className="pt-4 border-t border-outline-variant/20 text-center">
          <Link
            href="/"
            className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Return to Public Matrimony Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
