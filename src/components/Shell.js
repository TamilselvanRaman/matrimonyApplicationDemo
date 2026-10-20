"use client";

import Link from "next/link";
import Header from "./Header";
import { usePathname } from "next/navigation";

export default function Shell({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    // Admin pages provide their own dedicated layout/shell
    return <>{children}</>;
  }

  return (
    <div className="min-h-full flex flex-col bg-background text-foreground font-body select-none">
      <Header />
      <main className="flex-grow pt-16 sm:pt-20">
        {children}
      </main>
      <footer className="w-full py-12 bg-surface-container-highest border-t border-outline-variant/50">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-margin-desktop max-w-container-max-width mx-auto gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="font-headline text-headline-sm text-primary flex items-center gap-2 font-bold">
              <span className="material-symbols-outlined text-2xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              Aura
            </div>
            <p className="text-label-sm text-on-surface-variant opacity-80">
              © 2026 Aura International Matchmaking. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            <a className="text-label-sm text-on-surface-variant hover:text-secondary transition-colors opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
            <a className="text-label-sm text-on-surface-variant hover:text-secondary transition-colors opacity-80 hover:opacity-100" href="#">Terms of Service</a>
            <a className="text-label-sm text-on-surface-variant hover:text-secondary transition-colors opacity-80 hover:opacity-100" href="#">Elite Concierge</a>
            <a className="text-label-sm text-on-surface-variant hover:text-secondary transition-colors opacity-80 hover:opacity-100" href="#">Safety Center</a>
            <Link className="text-label-sm text-primary font-bold hover:underline" href="/admin">Admin Portal</Link>
          </div>
          
          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white hover:bg-primary hover:text-white transition-all duration-300 shadow-sm border border-outline-variant/30">
              <span className="material-symbols-outlined text-lg">share</span>
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white hover:bg-primary hover:text-white transition-all duration-300 shadow-sm border border-outline-variant/30">
              <span className="material-symbols-outlined text-lg">language</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
