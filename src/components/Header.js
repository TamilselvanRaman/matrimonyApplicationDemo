"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Discover" },
    { href: "/dashboard", label: "Matches & Interests" },
    { href: "/dashboard?tab=videocall", label: "Video & Chat" },
    { href: "/profile/alexander", label: "Elite Spotlight" },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm">
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-margin-desktop max-w-container-max-width mx-auto h-16 sm:h-20">
          {/* Logo & Brand Name */}
          <Link
            href="/"
            className="font-headline text-lg sm:text-headline-sm font-bold text-primary flex items-center gap-1.5 sm:gap-2 shrink-0"
          >
            <span
              className="material-symbols-outlined text-2xl sm:text-3xl text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <span className="tracking-tight">Aura Matrimony</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors font-semibold py-1 ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Desktop Admin Link */}
            <Link
              href="/admin"
              className="px-3 py-1 rounded-full text-xs font-bold text-secondary bg-secondary-container/30 border border-secondary/20 hover:bg-secondary-container/60 transition-colors flex items-center gap-1"
              title="Aura Administration Portal"
            >
              <span className="material-symbols-outlined text-sm">shield</span>
              <span>Admin</span>
            </Link>
          </nav>

          {/* Actions & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Admin Link (compact badge on small screens) */}
            <Link
              href="/admin"
              className="md:hidden px-2.5 py-1 rounded-full text-[11px] font-bold text-secondary bg-secondary-container/40 border border-secondary/20 flex items-center gap-1"
              title="Admin Portal"
            >
              <span className="material-symbols-outlined text-sm">shield</span>
              <span>Admin</span>
            </Link>

            {/* Profile Link */}
            <Link
              href="/profile/alexander"
              className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-label-md font-semibold text-primary hover:bg-surface-container transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-base sm:text-lg">account_circle</span>
              <span>Profile</span>
            </Link>

            {/* Download App action */}
            <Link
              href="/connect"
              className="hidden sm:inline-flex px-4 sm:px-5 py-1.5 sm:py-2 bg-primary text-white rounded-full text-xs sm:text-label-md font-medium hover:opacity-90 transition-all shadow-sm items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Download App</span>
            </Link>

            {/* Mobile Menu Hamburger Button (shown < md) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface transition-colors"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Modal/Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute top-16 right-0 left-0 bg-white/95 backdrop-blur-2xl border-b border-outline-variant/30 shadow-2xl p-6 flex flex-col gap-4 animate-slideDown"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-2xl border border-outline-variant/20 mb-1">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary shrink-0">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3y5qLdsohC6r_XeHXn_V9hAjXg0WCz4oab26h--A25rmHCZjlGU9gqZvHEz9Uh6u00DmztJH8H-aKl_LKa7PQvl4Tuq8zRFMYMaX5V0MqU-nDUm0Gd-HpmEnggBSI9dLlKYpSVeWZZKrAN0W0r2k7dtEwAa8tXKPrzd4wN3TMAhBaGrwwKjpxlu9hRsVkq85xeg5AYh_mZzp_pAqQP8F83YHM5tc7bfFnetGdK3NiwMYP3ea_G9n-rIhZ0hEEo64nG5weTBsU_Lw"
                  alt="Alexander Sterling"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-on-surface truncate">Alexander Sterling</p>
                <p className="text-[10px] text-secondary font-bold uppercase tracking-wider">Elite Member</p>
              </div>
            </div>

            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-between ${
                    pathname === link.href
                      ? "bg-primary/10 text-primary font-bold"
                      : "text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="material-symbols-outlined text-base">chevron_right</span>
                </Link>
              ))}

              {/* Admin Link in Mobile Drawer */}
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl font-bold text-sm text-secondary bg-secondary-container/30 border border-secondary/20 flex items-center justify-between mt-1"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">shield</span>
                  <span>Admin Panel Portal</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-white font-bold">
                  HQ
                </span>
              </Link>
            </nav>

            <div className="pt-2 border-t border-outline-variant/20 flex flex-col gap-2">
              <Link
                href="/connect"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-primary text-white text-center rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
              >
                <span className="material-symbols-outlined text-base">download</span>
                <span>Download Aura Mobile App</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
