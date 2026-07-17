"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProfileDetailPage() {
  // Photos State Array to enable seamless interactive image swapping
  const [photos, setPhotos] = useState([
    {
      id: "main",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9GWjygCVT9eipRvE8egZVFXN1NOSkd5WP8yL75SzVTvILRw6wZp1OqnM6W03dG_tkMN-YMmPIQcYDe_eiEHURGLX7E0vFngfmSe39QKXvEjEQL1GGRiBWNwaeE5qB5L_IUSP7L8irXu9OHnPM5Q3j-4yDU3kdjfQAuBTJB8ZUGBmgsOn5c2a6zrEyat5LX2-LlAJKnMAw16hIr1XnwHU3Qbhm1AAWPFbds2inXk52VFhBs_dPTtHrq8bhwsds8RNAdg3IV0DQPkM",
      alt: "Elena Richardson in evening gown",
    },
    {
      id: "thumb1",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYaqT60dyNKbE1FCQa-iVAG5djD79mxe-XWTEhASOHXHjfx52XT40vd6G6R83WsZsoujU55kfZgq32HDfoSV1x9Gni86SwJela1rcdcLeMwrSpA6G9U2TrOdDp0AnLwNvz9Qcqgb8Bzo1dUk6kDJ2AUYjuZYU3ctaZqOEWsSMYPmQwn3lYRQrxz4iMZc2fqPp-qCEiEO_nv9vHRKChMI-wSxd1hZmwOa3FH2PZ6eTyXV3WZKDdNljJn3UYvzzNKnSg6dqhwSTxkOg",
      alt: "Elena Richardson laughing at a cafe",
    },
    {
      id: "thumb2",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZZIcT1EYs-NT9t95_h9P1L9z4SdjFRWb9UzKDcjc5pk9GvmhXKOPUPW7bHvroSVcYH_DilZ8avIk2Mznn6fVVS5ndnh5Z4QTDDOhzsMQtvVHpIHQvlYCIIkOy9HO1WqvbRJ50TG9cKLAvzMgWljAON-qTsO8PNN8rWtYstlEKoYQFSAq3T5luxVEvil9C61ru0afsCxtix_BlO4RmnD0Is23Kv3EXOfRgK7AqRdzXeHRhd6TBrZ6YHl-wqbXnhHD8KTCi0M_p-SY",
      alt: "Elena Richardson playing a grand piano",
    },
  ]);

  const [mainPhotoIndex, setMainPhotoIndex] = useState(0);
  const [interestSent, setInterestSent] = useState(false);

  const handleSwap = (index) => {
    setMainPhotoIndex(index);
  };

  const handleExpressInterest = () => {
    setInterestSent(true);
    setTimeout(() => {
      setInterestSent(false);
    }, 4000);
  };

  return (
    <div className="relative overflow-x-hidden min-h-screen pb-36 bg-background">
      {/* Hero Gallery Section */}
      <section className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:h-[550px]">
          {/* Main Hero Image */}
          <div className="col-span-1 lg:col-span-8 relative rounded-3xl overflow-hidden shadow-lg h-[400px] lg:h-full group">
            <img
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.01]"
              src={photos[mainPhotoIndex].src}
              alt={photos[mainPhotoIndex].alt}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 text-white">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-bold flex items-center gap-2 shadow-md text-xs">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    auto_awesome
                  </span>
                  98% Compatibility
                </span>
                <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold border border-white/30 text-xs">
                  Verified Profile
                </span>
              </div>
              <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">Elena Richardson, 29</h1>
              <p className="text-sm md:text-base font-light opacity-90">
                International Strategy Consultant &middot; London / Dubai
              </p>
            </div>
          </div>
          
          {/* Thumbnail Selector Stack */}
          <div className="col-span-1 lg:col-span-4 flex flex-row lg:flex-col gap-6">
            {photos.map((photo, index) => {
              if (index === mainPhotoIndex) return null;
              return (
                <div
                  key={photo.id}
                  onClick={() => handleSwap(index)}
                  className="flex-1 h-[120px] lg:h-1/2 rounded-3xl overflow-hidden shadow-md cursor-pointer group border-2 border-transparent hover:border-secondary/30 transition-all"
                >
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={photo.src}
                    alt={photo.alt}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Profile Content Grid */}
      <section className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: About & Lifestyle */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-8">
          
          {/* AI Insight Card */}
          <div className="p-8 rounded-3xl bg-white border border-outline-variant/30 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/10 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="flex items-start gap-6 relative z-10">
              <div className="w-16 h-16 rounded-2xl shimmer-gold flex items-center justify-center text-white shrink-0 shadow-md">
                <span className="material-symbols-outlined text-3xl">psychology</span>
              </div>
              <div>
                <h3 className="font-headline text-lg font-bold text-primary mb-2">Aura Match Analysis</h3>
                <p className="text-body-md text-on-surface-variant leading-relaxed text-sm">
                  Elena&apos;s preference for intellectual depth and shared entrepreneurial vision aligns perfectly with your &ldquo;Strategic Growth&rdquo; personality profile. Her values on family heritage and global mobility suggest a high potential for long-term lifestyle harmony.
                </p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="glass-panel p-8 md:p-10 rounded-3xl border border-outline-variant/30">
            <h2 className="font-headline text-2xl text-primary font-bold mb-6">About Elena</h2>
            <div className="space-y-6">
              <p className="text-body-lg text-on-surface-variant leading-relaxed text-sm">
                A global citizen with a passion for sustainable luxury and cultural diplomacy. Having lived in four continents, I find joy in the intersection of traditional values and modern innovation. I&apos;m seeking a partner who is equally ambitious yet grounded in integrity.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                  <span className="material-symbols-outlined text-primary text-xl">translate</span>
                  <div>
                    <p className="text-[10px] text-outline uppercase tracking-wider font-semibold">Languages</p>
                    <p className="text-sm font-semibold text-on-surface">English, French, Mandarin</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                  <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                  <div>
                    <p className="text-[10px] text-outline uppercase tracking-wider font-semibold">Base</p>
                    <p className="text-sm font-semibold text-on-surface">London (Mayfair)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lifestyle Bento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-8 rounded-3xl flex flex-col gap-4 border border-outline-variant/30">
              <h3 className="font-headline text-lg font-bold text-primary">Interests</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant font-semibold text-xs">Modern Art</span>
                <span className="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant font-semibold text-xs">Equestrianism</span>
                <span className="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant font-semibold text-xs">Fine Dining</span>
                <span className="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant font-semibold text-xs">Yachting</span>
                <span className="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant font-semibold text-xs">Philanthropy</span>
              </div>
            </div>
            
            <div className="glass-panel p-8 rounded-3xl flex flex-col gap-4 border border-outline-variant/30">
              <h3 className="font-headline text-lg font-bold text-primary">Values</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant font-medium">Ambition</span>
                  <div className="w-32 h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[90%]" />
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant font-medium">Family</span>
                  <div className="w-32 h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[85%]" />
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant font-medium">Adventurousness</span>
                  <div className="w-32 h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[75%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Career & Education Timeline */}
        <div className="col-span-1 lg:col-span-4 sticky top-28 flex flex-col gap-8">
          <div className="bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-sm">
            <h3 className="font-headline text-lg font-bold text-primary mb-8">Background</h3>
            <div className="space-y-10 relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-outline-variant/20" />
              
              {/* Education */}
              <div className="relative pl-14">
                <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-secondary ring-4 ring-white" />
                <p className="text-[10px] text-outline uppercase tracking-wider font-semibold mb-1">Education</p>
                <h4 className="font-headline text-base font-bold text-on-surface mb-1">MBA, INSEAD</h4>
                <p className="text-xs text-on-surface-variant">Global Management &middot; Fontainebleau</p>
                <div className="mt-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">school</span>
                  <span className="text-xs font-semibold">BS Economics, LSE</span>
                </div>
              </div>
              
              {/* Career */}
              <div className="relative pl-14">
                <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-white" />
                <p className="text-[10px] text-outline uppercase tracking-wider font-semibold mb-1">Career</p>
                <h4 className="font-headline text-base font-bold text-on-surface mb-1">Senior Consultant</h4>
                <p className="text-xs text-on-surface-variant">McKinsey & Company &middot; International</p>
                <div className="mt-4">
                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-xl">business_center</span>
                    <div>
                      <p className="text-xs font-semibold">Ex-Strategic Advisor</p>
                      <p className="text-[10px] text-outline">United Nations (UNDP)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="bg-primary p-8 rounded-3xl text-white shadow-md relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg fill="none" height="100%" width="100%">
                <pattern height="40" id="pattern" patternUnits="userSpaceOnUse" width="40" x="0" y="0">
                  <path d="M0 40L40 0" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
                <rect fill="url(#pattern)" height="100%" width="100%" />
              </svg>
            </div>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                <span className="material-symbols-outlined text-3xl">verified_user</span>
              </div>
              <h4 className="font-headline text-base font-bold mb-2">Elite Status</h4>
              <p className="opacity-80 text-xs">Identity and assets verified by Aura Concierge Service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Action Bar at Bottom */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[650px] px-6 z-50">
        <div className="bg-white/85 backdrop-blur-2xl border border-outline-variant/30 rounded-full p-3.5 shadow-2xl flex items-center justify-between gap-4">
          <button
            onClick={handleExpressInterest}
            className={`flex-grow h-14 rounded-full font-bold flex items-center justify-center gap-3 transition-all duration-300 ${
              interestSent
                ? "bg-secondary text-white scale-[0.98]"
                : "bg-secondary-container hover:bg-secondary-container/90 text-on-secondary-container hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              favorite
            </span>
            <span>{interestSent ? "Interest Expressed!" : "Express Interest"}</span>
          </button>
          
          <div className="flex items-center gap-3">
            <Link
              href="/connect"
              className="w-14 h-14 rounded-full bg-slate-100 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-all duration-300 group"
            >
              <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">
                chat_bubble
              </span>
            </Link>
            <Link
              href="/connect"
              className="w-14 h-14 rounded-full bg-slate-100 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-all duration-300 group"
            >
              <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">
                videocam
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
