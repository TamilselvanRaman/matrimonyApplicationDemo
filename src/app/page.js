"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.008;
      const y = (e.clientY - window.innerHeight / 2) * 0.008;
      setCoords({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      {/* Hero Section with Parallax */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-300 ease-out opacity-35"
            style={{
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBfOFfs3-bUV1lXTfufKLMLuIDyeRhTRQRZ6QkX5gW6a9S9QEsdw8T71VYP95xmCo-WIXfYBPp-2uKBCFulpesAIavLFUFYnMNLvgzauwJshKxjGD3jrmRg-EA0DH0DcUve2fsRR1EytseB8d3wTJkdAXGGjB98PP6ScWxHYvlfdKxX8bMzdr9gXnm0iVyEZJtguY-HK-PY-KLKIqlvWEQvVmuVHyzEtI6o33lKppxniJTXBHocxcD8HYC2BL4ZujIdo104qv-DgHQ')",
              transform: `scale(1.1) translate(${coords.x}px, ${coords.y}px)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-90" />
        </div>
        
        <div className="relative z-10 max-w-container-max-width mx-auto px-6 md:px-margin-desktop text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel mb-8 border border-secondary/20 shadow-sm animate-pulse">
            <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              stars
            </span>
            <span className="text-[10px] tracking-wider uppercase font-bold text-secondary">
              Elite AI Matchmaking
            </span>
          </div>
          
          <h1 className="font-headline text-4xl md:text-5xl text-primary font-bold mb-6 max-w-3xl mx-auto leading-tight">
            Where Sophisticated Souls Meet <span className="text-secondary italic font-light">Intelligence.</span>
          </h1>
          
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12 text-lg">
            Experience the future of partnership. Our proprietary Aura AI analyzes deep psychological compatibility to curate matches that resonate with your lifestyle and values.
          </p>

          {/* Search Widget */}
          <div className="glass-panel p-3 rounded-[32px] md:rounded-full max-w-4xl mx-auto flex flex-col md:flex-row gap-3 shadow-2xl border border-outline-variant/30">
            <div className="flex-1 px-6 py-2.5 flex items-center gap-3 text-left border-r border-outline-variant/20">
              <span className="material-symbols-outlined text-primary text-2xl">
                person_search
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-outline">Seeking</p>
                <p className="text-sm font-bold text-on-surface">Modern Woman</p>
              </div>
            </div>
            
            <div className="flex-1 px-6 py-2.5 flex items-center gap-3 text-left border-r border-outline-variant/20">
              <span className="material-symbols-outlined text-primary text-2xl">
                location_on
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-outline">Location</p>
                <p className="text-sm font-bold text-on-surface">London, UK</p>
              </div>
            </div>
            
            <div className="flex-1 px-6 py-2.5 flex items-center gap-3 text-left">
              <span className="material-symbols-outlined text-primary text-2xl">
                interests
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-outline">Priorities</p>
                <p className="text-sm font-bold text-on-surface">Intellect & Growth</p>
              </div>
            </div>
            
            <Link
              href="/dashboard"
              className="bg-primary hover:bg-primary-light text-white px-10 py-4 rounded-full font-bold transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.97]"
            >
              <span>Find My Match</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Success Counter Section */}
      <section className="py-12 bg-primary text-white relative overflow-hidden">
        <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop flex flex-col md:flex-row justify-around items-center gap-8 relative z-10">
          <div className="text-center">
            <h3 className="font-headline text-4xl text-secondary-light font-bold mb-2">24,812</h3>
            <p className="text-[10px] uppercase tracking-widest font-semibold opacity-80">Active Elite Members</p>
          </div>
          <div className="h-12 w-px bg-white/20 hidden md:block" />
          <div className="text-center">
            <h3 className="font-headline text-4xl text-secondary-light font-bold mb-2">142</h3>
            <p className="text-[10px] uppercase tracking-widest font-semibold opacity-80">Matches Made Today</p>
          </div>
          <div className="h-12 w-px bg-white/20 hidden md:block" />
          <div className="text-center">
            <h3 className="font-headline text-4xl text-secondary-light font-bold mb-2">98.4%</h3>
            <p className="text-[10px] uppercase tracking-widest font-semibold opacity-80">Compatibility Success</p>
          </div>
        </div>
      </section>

      {/* Verified Elite Showcase */}
      <section className="py-20 bg-surface">
        <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div className="max-w-xl">
              <h2 className="font-headline text-3xl text-primary font-bold mb-4">Verified Elite Members</h2>
              <p className="text-body-md text-on-surface-variant text-base">
                Each profile is manually vetted and verified by our concierge team to ensure an environment of absolute quality and trust.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-primary font-bold text-sm hover:underline decoration-secondary underline-offset-8 transition-all"
            >
              View All Discoveries <span className="material-symbols-outlined">trending_flat</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Eleanor Card */}
            <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-outline-variant/30 hover:shadow-xl transition-all duration-500">
              <div className="relative h-[380px] overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHAVLS5o1ikTIM9FEiKMdNJFAJFVEKpLeQi_ImVDrX2OF91nx8qadpgJZvOihvJtXQrMP5OkaFLn3UqkUTPBokMWJzAu64Ma0pCuz-XiN9jDPhvUQMOoHyL0a8T_-P4SLLTybf27c07_kK8bGmVSuoRvv4tRXwAPEG_63DReydT3iRtJ4gElLdpgCTmtuDzCh5dlRJTrSXLjBMAystFQAZh7mtuaQ7_oywcSWsvKLFQc8P-1EJKhRTYGH5yTMP8uUkUVOckEfrRWs"
                  alt="Eleanor V."
                />
                <div className="absolute top-4 right-4 bg-secondary text-white px-3.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-lg">
                  <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                  Verified
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/35 to-transparent text-white">
                  <p className="font-headline text-xl font-bold">Eleanor V., 31</p>
                  <p className="opacity-90 text-xs font-semibold uppercase tracking-wider">Art Curator • London</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
                    94% Compatibility
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant line-clamp-2">
                  Passion for contemporary art and sustainable architecture. Seeking a partner who values deep conversation...
                </p>
              </div>
            </div>

            {/* Julian Card */}
            <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border-2 border-secondary/30 hover:shadow-xl transition-all duration-500">
              <div className="relative h-[380px] overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpVKn_PrtY5ouG3tSGZu2-CKJ7aBuoib-2I7WGbM6SBhvGbpmfQ7TWXeABOAe0XPd0LrHBxt9VOZattD4zX793okiGHoI0nKTEQvImLF3APb9t7GLebNFVxXRCp4scu9XZMNASI1a0FFdl_VgEClYUrJehtJF8Pez6_OyjYby8nmfwxEOUPsidntAfWQjJcxYD0fu6anlhNRQZfjZk5FGWABXh_K1rUyrT0UiIpV1zbkVjDvoBX6r5iMZKaBZKcWMkl83uZAOryd8"
                  alt="Julian R."
                />
                <div className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-3.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-lg">
                  <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  AI Spotlight
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/35 to-transparent text-white">
                  <p className="font-headline text-xl font-bold">Julian R., 34</p>
                  <p className="opacity-90 text-xs font-semibold uppercase tracking-wider">Tech Entrepreneur • Geneva</p>
                </div>
              </div>
              <div className="p-6 bg-surface-container-low">
                <div className="flex items-center gap-2 mb-4">
                  <div className="px-3 py-1 bg-secondary text-white rounded-full text-xs font-bold">
                    98% Match Potential
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant italic">
                  &ldquo;Aura AI suggests Julian&apos;s core values in innovation and philanthropy align perfectly with your profile.&rdquo;
                </p>
              </div>
            </div>

            {/* Sophia Card */}
            <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-outline-variant/30 hover:shadow-xl transition-all duration-500">
              <div className="relative h-[380px] overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjZ51GnIi7PBSkMnc6ZXNbz1hXiEAvzgUS6VB3ZiFFDyt5vnqfu1dTybI099H0Ix37ui49sD8SvItpxVcS4vIcDz3XMKLmcK_j9LSCop0ypUSNuGLbybTVKLgDdfPKfT_xyKNlz3GSDWCY8n8bQDkTCAxYzvdcY8WHkZomMTwFkDT0zyXgz_aDLOLYYPShD6-pYvUMnki-P097A_JPnxE5M6RbANhOkHNDVrkoups2oTcwkDKvc1F4MdMIuliWiI-qRmfd_Dsq3Tw"
                  alt="Sophia M."
                />
                <div className="absolute top-4 right-4 bg-secondary text-white px-3.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-lg">
                  <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                  Verified
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/35 to-transparent text-white">
                  <p className="font-headline text-xl font-bold">Sophia M., 32</p>
                  <p className="opacity-90 text-xs font-semibold uppercase tracking-wider">Global Philanthropist • Paris</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
                    91% Compatibility
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant line-clamp-2">
                  Loves adventure travel and classical opera. Looking for someone to share the wonders of the world with...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop text-center mb-16">
          <h2 className="font-headline text-3xl text-primary font-bold mb-4">The Aura Architecture</h2>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Our four-step methodology ensures you spend less time searching and more time connecting with the person who truly matters.
          </p>
        </div>

        <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-20 h-20 rounded-3xl glass-panel flex items-center justify-center mb-6 text-primary shadow-lg border border-primary/10">
              <span className="material-symbols-outlined text-4xl">fingerprint</span>
            </div>
            <h4 className="font-headline text-xl text-primary font-bold mb-3">Deep Profiling</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Our AI assesses 150+ psychological markers to build your unique partnership blueprint.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-20 h-20 rounded-3xl glass-panel flex items-center justify-center mb-6 text-secondary shadow-lg border border-secondary/10">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                psychology
              </span>
            </div>
            <h4 className="font-headline text-xl text-primary font-bold mb-3">Neural Matching</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Complex algorithms simulate long-term compatibility scenarios before presenting a match.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-20 h-20 rounded-3xl glass-panel flex items-center justify-center mb-6 text-primary shadow-lg border border-primary/10">
              <span className="material-symbols-outlined text-4xl">verified_user</span>
            </div>
            <h4 className="font-headline text-xl text-primary font-bold mb-3">Elite Concierge</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Human matchmakers review every high-compatibility score to ensure total alignment.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-20 h-20 rounded-3xl glass-panel flex items-center justify-center mb-6 text-secondary shadow-lg border border-secondary/10">
              <span className="material-symbols-outlined text-4xl">auto_awesome</span>
            </div>
            <h4 className="font-headline text-xl text-primary font-bold mb-3">Refined Discovery</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Receive one highly-optimized profile every 48 hours for a focus on quality over quantity.
            </p>
          </div>
        </div>
      </section>

      {/* App Download Banner */}
      <section className="py-20 px-6 md:px-margin-desktop bg-background">
        <div className="max-w-container-max-width mx-auto relative rounded-[40px] overflow-hidden bg-primary text-white p-12 md:p-20 shadow-2xl">
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Take Aura Wherever <br /> You Go
              </h2>
              <p className="text-lg opacity-85 mb-10 max-w-xl">
                Join the most exclusive matchmaking community from your pocket. Receive real-time compatibility alerts and manage your elite concierge services on the move.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link
                  href="/connect"
                  className="bg-white text-primary px-8 py-4 rounded-2xl flex items-center gap-3 font-semibold hover:bg-secondary-light hover:text-secondary hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-3xl">apps</span>
                  <div className="text-left">
                    <p className="text-[10px] leading-tight opacity-75">Download on the</p>
                    <p className="text-base font-bold leading-tight">App Store</p>
                  </div>
                </Link>
                <Link
                  href="/connect"
                  className="bg-white text-primary px-8 py-4 rounded-2xl flex items-center gap-3 font-semibold hover:bg-secondary-light hover:text-secondary hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-3xl">play_books</span>
                  <div className="text-left">
                    <p className="text-[10px] leading-tight opacity-75">Get it on</p>
                    <p className="text-base font-bold leading-tight">Google Play</p>
                  </div>
                </Link>
              </div>
            </div>
            
            <div className="flex-shrink-0 bg-white/10 backdrop-blur-md p-8 rounded-[32px] border border-white/20 text-center shadow-lg">
              <div className="bg-white p-4 rounded-2xl mb-4 w-40 h-40 mx-auto flex items-center justify-center">
                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-primary-container rounded-lg">
                  <span className="material-symbols-outlined text-6xl text-primary">qr_code_2</span>
                </div>
              </div>
              <p className="text-white font-semibold text-sm">Scan to Experience</p>
              <p className="text-[10px] text-white/60 uppercase tracking-widest mt-1">Direct Download</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
