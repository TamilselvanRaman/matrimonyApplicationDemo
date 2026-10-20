"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AdminProvider, useAdmin } from "@/data/AdminContext";

function AdminLayoutInner({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const { verifications } = useAdmin();

  // Authentication & Authorization Guard
  useEffect(() => {
    // If user is already on the dedicated login page, skip protection check
    if (pathname === "/admin/login") {
      setIsAuthChecking(false);
      return;
    }

    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("aura_admin_authenticated");
      const user = localStorage.getItem("aura_admin_user");

      if (isAuth === "true" && user) {
        try {
          setCurrentUser(JSON.parse(user));
        } catch (e) {
          setCurrentUser({ name: "Aura SuperAdmin", email: "admin@auramatrimony.com", role: "Super Admin" });
        }
        setIsAuthChecking(false);
      } else {
        // Redirect unauthorized attempts directly to the dedicated login gateway
        router.replace("/admin/login");
      }
    }
  }, [pathname, router]);

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("aura_admin_authenticated");
      localStorage.removeItem("aura_admin_user");
    }
    router.push("/admin/login");
  };

  // If on login page, render child directly without sidebar chrome
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Prevent flicker during auth verification
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-on-surface">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
        <p className="text-xs font-bold text-primary uppercase tracking-wider">Verifying Administrative Access...</p>
      </div>
    );
  }

  const pendingCount = verifications.filter((v) => v.status === "Pending Review").length;

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: "dashboard" },
    { href: "/admin/members", label: "Members Management", icon: "group" },
    { href: "/admin/verifications", label: "Profile Verification", icon: "verified_user", badge: pendingCount > 0 ? String(pendingCount) : null },
    { href: "/admin/plans", label: "Membership Plans", icon: "card_membership" },
    { href: "/admin/employees", label: "Employees Management", icon: "badge" },
    { href: "/admin/cms", label: "Content Management", icon: "article" },
    { href: "/admin/payments", label: "Payments & Billings", icon: "payments" },
    { href: "/admin/reports", label: "Analytics & Reports", icon: "insights" },
    { href: "/admin/settings", label: "Platform Settings", icon: "settings" },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row text-on-surface">
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex flex-col w-72 bg-surface-container-low border-r border-outline-variant/30 h-screen sticky top-0 shrink-0 z-30">
        {/* Brand Area */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-outline-variant/20 bg-white/40">
          <Link href="/admin" className="font-headline text-lg font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <span>Aura Admin</span>
          </Link>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container uppercase tracking-wider">
            HQ
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-outline">
            Administration
          </p>

          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-secondary-container text-on-secondary-container"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Area with Switch to Public Site and Sign Out */}
        <div className="p-4 border-t border-outline-variant/20 bg-white/30 space-y-2.5">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-outline-variant/30 text-xs font-bold text-on-surface-variant hover:bg-white hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-sm">open_in_new</span>
            <span>Back to Public Site</span>
          </Link>

          <div className="flex items-center justify-between p-2 bg-white/60 rounded-xl border border-outline-variant/20">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">
                {currentUser?.name ? currentUser.name.slice(0, 2).toUpperCase() : "AD"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold truncate">{currentUser?.name || "Aura SuperAdmin"}</p>
                <p className="text-[10px] text-outline truncate">{currentUser?.email || "admin@auramatrimony.com"}</p>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="p-1.5 text-outline hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors shrink-0"
              title="Sign Out of Admin Portal"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header */}
        <header className="h-16 sm:h-20 bg-white/80 backdrop-blur-xl border-b border-outline-variant/30 sticky top-0 z-20 px-4 sm:px-8 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden p-2 rounded-xl text-on-surface hover:bg-surface-container"
              aria-label="Toggle Admin Sidebar"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileSidebarOpen ? "close" : "menu"}
              </span>
            </button>
            <div>
              <h2 className="font-headline font-bold text-base sm:text-lg text-primary capitalize">
                {navItems.find((n) => n.href === pathname)?.label || "Admin Portal"}
              </h2>
              <p className="text-[10px] sm:text-xs text-on-surface-variant hidden sm:block">
                Aura International Elite Matchmaking Administration
              </p>
            </div>
          </div>

          {/* Quick Actions & Admin Avatar */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Database Connected
            </span>

            <Link
              href="/dashboard"
              className="px-3 sm:px-4 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-xs font-bold text-primary transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">visibility</span>
              <span className="hidden sm:inline">User Dashboard View</span>
            </Link>

            <button
              onClick={handleSignOut}
              className="px-3 py-1.5 rounded-full border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center gap-1"
              title="Sign Out"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileSidebarOpen && (
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm top-16"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <div
              className="w-72 bg-white h-full shadow-2xl p-4 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-on-surface-variant hover:bg-surface-container"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-lg">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-outline-variant/20 space-y-2">
                <button
                  onClick={handleSignOut}
                  className="w-full py-2.5 bg-rose-50 text-rose-700 text-center rounded-xl font-bold text-xs border border-rose-200 flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">logout</span>
                  <span>Sign Out</span>
                </button>
                <Link
                  href="/"
                  className="w-full block py-2.5 bg-surface-container text-center rounded-xl font-bold text-xs text-primary"
                >
                  Back to Public Website
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <AdminProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminProvider>
  );
}
