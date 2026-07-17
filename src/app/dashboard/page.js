"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const handleCardClick = () => {
    router.push("/profile/alexander");
  };

  return (
    <div className="flex bg-surface min-h-[calc(100vh-80px)] text-on-surface">
      {/* Sidebar Navigation */}
      <aside className="hidden md:flex flex-col p-6 gap-stack-gap-sm bg-surface-container-low h-[calc(100vh-80px)] w-72 sticky top-20 border-r border-outline-variant/30 shadow-sm">
        <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl mb-6 shadow-sm border border-outline-variant/10">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3y5qLdsohC6r_XeHXn_V9hAjXg0WCz4oab26h--A25rmHCZjlGU9gqZvHEz9Uh6u00DmztJH8H-aKl_LKa7PQvl4Tuq8zRFMYMaX5V0MqU-nDUm0Gd-HpmEnggBSI9dLlKYpSVeWZZKrAN0W0r2k7dtEwAa8tXKPrzd4wN3TMAhBaGrwwKjpxlu9hRsVkq85xeg5AYh_mZzp_pAqQP8F83YHM5tc7bfFnetGdK3NiwMYP3ea_G9n-rIhZ0hEEo64nG5weTBsU_Lw"
              alt="Alexander Sterling"
            />
          </div>
          <div>
            <p className="font-bold text-sm text-on-surface">Alexander Sterling</p>
            <p className="text-[10px] text-secondary font-bold uppercase tracking-wider">Elite Member</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-xl font-bold text-sm transition-all"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link
            href="/profile/alexander"
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl font-bold text-sm transition-all"
          >
            <span className="material-symbols-outlined">auto_awesome</span>
            <span>My Spotlight</span>
          </Link>
          <Link
            href="/connect"
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl font-bold text-sm transition-all"
          >
            <span className="material-symbols-outlined">favorite</span>
            <span>Interests</span>
          </Link>
          <Link
            href="/connect"
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl font-bold text-sm transition-all"
          >
            <span className="material-symbols-outlined">star</span>
            <span>Shortlist</span>
          </Link>
        </nav>

        <Link
          href="/connect"
          className="w-full py-4 px-4 shimmer-gold text-primary rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-md"
        >
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
            diamond
          </span>
          <span className="text-xs uppercase tracking-wider">View AI Insights</span>
        </Link>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 px-6 md:px-margin-desktop py-12 max-w-container-max-width mx-auto overflow-hidden">
        {/* Welcome Section */}
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <h3 className="font-headline text-3xl md:text-4xl text-on-surface font-bold">
                Welcome back, <span className="text-primary">Alexander.</span>
              </h3>
              <p className="text-body-md text-on-surface-variant mt-2">
                Your AI Matchmaker has analyzed 42 new potentials for you today.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-4 py-2 bg-primary-container/10 text-primary border border-primary/20 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  bolt
                </span>
                Live Analysis Active
              </span>
            </div>
          </div>
        </section>

        {/* Top AI Picks */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-headline text-xl text-on-surface font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                stars
              </span>
              Top AI Picks
            </h4>
            <Link href="/dashboard" className="text-primary font-bold text-sm hover:underline">
              View all matches
            </Link>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
            {/* Elena V Card */}
            <div
              onClick={handleCardClick}
              className="min-w-[300px] bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer border border-outline-variant/30"
            >
              <div className="relative h-56">
                <img
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCrzruh4UPoPjvzvpaAm5RURiIZr-1ZtVbZlEH7Vx8B9mqRwRNMLBlSWRpVyOx1ZL1gSF5Mmdek34V7CvpDvkEX9ZfusvJw3eWG-gk-4DH9ZdtCH06JoxE5adV1VW5WFbjuEhlV0GSKFzQphm9KAcguCSEu6LapEdkvA-uLcsScGfp5BWX63L3Ts8SjKUACi90l2J2mzQHpH0oy_mUvcIsHqfkcznkIWVZLdXs8bdCkoX_bni0ZBphVneVmdsNCS1CvW7u3MXvA54"
                  alt="Elena V."
                />
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  98% Match
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/75 to-transparent text-white">
                  <h5 className="font-headline font-bold text-lg">Elena V., 29</h5>
                  <p className="text-white/80 text-xs">Architect & Interior Designer</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-xs">Aesthetic</span>
                  <span className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-xs">Innovation</span>
                </div>
                <p className="text-xs text-on-surface-variant line-clamp-2">
                  &ldquo;Passionate about creating spaces that tell stories. Looking for a partner who values creativity and intellectual depth...&rdquo;
                </p>
              </div>
            </div>

            {/* Sophia K Card */}
            <div
              onClick={handleCardClick}
              className="min-w-[300px] bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer border-2 border-secondary/30 relative"
            >
              <div className="relative h-56">
                <img
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6p28bpm7KmQ-RQJa3o77dQeLcMn3TrobC0xYQa-dxAU2QW8XQCFmxilWzmgbqqflGILZLNgFE1htAaIE3se5ToHSMznPIIwD_b0yZAusJawI8Lbz0MbAu_Qi572dxBGWwd_pe0yFxVQxz6kFH6J-c7qZziup6L_wWPfv4UJVP0rDlladP1TfFOBdXfj3rLfmekWKIKNSJFsdf_se0j93kx1OkDGNJNUBmc25fUXGXL24pheqQJC1yF88Lw54p-c1QliadS-U1mX0"
                  alt="Sophia K."
                />
                <div className="absolute top-4 right-4 shimmer-gold text-primary px-3 py-1 rounded-full text-[10px] font-bold shadow-md flex items-center gap-1 border border-secondary/20">
                  <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                    bolt
                  </span>
                  AI Priority
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/75 to-transparent text-white">
                  <h5 className="font-headline font-bold text-lg">Sophia K., 31</h5>
                  <p className="text-white/80 text-xs">Tech Entrepreneur</p>
                </div>
              </div>
              <div className="p-6 bg-surface-container-low">
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold">Goal Oriented</span>
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold">Adventurous</span>
                </div>
                <p className="text-xs text-on-surface-variant italic">
                  &ldquo;Building the future of AI. Seeking a power partner who thrives on ambition and mutual growth...&rdquo;
                </p>
              </div>
            </div>

            {/* Isabella M Card */}
            <div
              onClick={handleCardClick}
              className="min-w-[300px] bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer border border-outline-variant/30"
            >
              <div className="relative h-56">
                <img
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzDt_4AMrgyEjStOHavHMd-egdO62vq8UBNnkckGEcfN4h2bWkf52fv5FzXaWs8Kqo9Pr8_mcXRoNEJ__nVsk-i0zoXs4lKs6GTwXfh_Gm0bWsVYfBXZ7pF3iIO4IymU-u6Jtz7ea12etCmzaUc1fPxSZVyQW7Q8Lzdq38dRmIGKcqBhCq3eDUXZp9fiK5diCItDBHT72Pz9Cz09MbdIqpAPj3nqqq9qk0w9sZD2mUTZaFnKUS4lWm_ZHtJnme6wtn_cxYzI-NiZ4"
                  alt="Isabella M."
                />
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  94% Match
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/75 to-transparent text-white">
                  <h5 className="font-headline font-bold text-lg">Isabella M., 27</h5>
                  <p className="text-white/80 text-xs">Curator & Painter</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-xs">Wellness</span>
                  <span className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-xs">Classical Art</span>
                </div>
                <p className="text-xs text-on-surface-variant line-clamp-2">
                  &ldquo;Art is the language of the soul. Finding beauty in the mundane and seeking a partner for quiet conversations.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Compatibility & Activity Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Radar Charts Grid */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-outline-variant/30">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="font-headline text-lg font-bold text-on-surface">Compatibility Matrix</h4>
                <p className="text-xs text-on-surface-variant">Global average across top 10 potentials</p>
              </div>
              <button className="text-primary hover:text-primary-light flex items-center gap-1 font-bold text-xs">
                Details <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Personality Radar */}
              <div className="text-center">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-6">Personality Match</p>
                <div className="relative w-full aspect-square max-w-[220px] mx-auto">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <polygon className="stroke-slate-200 fill-none stroke-1" points="50,5 95,35 80,90 20,90 5,35" />
                    <polygon className="stroke-slate-200 fill-none stroke-1" points="50,20 80,40 70,80 30,80 20,40" />
                    <polygon className="stroke-slate-200 fill-none stroke-1" points="50,35 65,45 60,70 40,70 35,45" />
                    {/* Data polygon */}
                    <polygon className="fill-primary/15 stroke-primary stroke-2" points="50,15 85,38 75,85 35,75 15,45" />
                    
                    {/* SVG Text Labels */}
                    <text fill="#757682" fontSize="5" textAnchor="middle" x="50" y="3">Openness</text>
                    <text fill="#757682" fontSize="5" textAnchor="start" x="97" y="38">Extraversion</text>
                    <text fill="#757682" fontSize="5" textAnchor="middle" x="80" y="97">Agreeable</text>
                    <text fill="#757682" fontSize="5" textAnchor="middle" x="20" y="97">Neuroticism</text>
                    <text fill="#757682" fontSize="5" textAnchor="end" x="3" y="38">Conscientious</text>
                  </svg>
                </div>
              </div>

              {/* Lifestyle Radar */}
              <div className="text-center">
                <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-6">Lifestyle Insights</p>
                <div className="relative w-full aspect-square max-w-[220px] mx-auto">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <polygon className="stroke-slate-200 fill-none stroke-1" points="50,5 95,35 80,90 20,90 5,35" />
                    <polygon className="stroke-slate-200 fill-none stroke-1" points="50,20 80,40 70,80 30,80 20,40" />
                    {/* Data polygon */}
                    <polygon className="fill-secondary/15 stroke-secondary stroke-2" points="50,10 90,42 65,80 45,82 25,30" />
                    
                    {/* SVG Text Labels */}
                    <text fill="#757682" fontSize="5" textAnchor="middle" x="50" y="3">Career</text>
                    <text fill="#757682" fontSize="5" textAnchor="start" x="97" y="38">Travel</text>
                    <text fill="#757682" fontSize="5" textAnchor="middle" x="80" y="97">Family</text>
                    <text fill="#757682" fontSize="5" textAnchor="middle" x="20" y="97">Wellness</text>
                    <text fill="#757682" fontSize="5" textAnchor="end" x="3" y="38">Finance</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed Column */}
          <div className="flex flex-col gap-6">
            {/* Interests Received */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-outline-variant/30">
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-4">Interests Received</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-2 hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    NB
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold">Natalie B. <span className="font-normal text-outline">sent a heart</span></p>
                    <p className="text-[10px] text-outline">2 hours ago</p>
                  </div>
                  <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                </div>

                <div className="flex items-center gap-3 p-2 hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-secondary-container/20 text-on-secondary-container font-bold text-xs">
                    JM
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold">Julianne M. <span className="font-normal text-outline">viewed your profile</span></p>
                    <p className="text-[10px] text-outline">5 hours ago</p>
                  </div>
                  <span className="material-symbols-outlined text-outline">visibility</span>
                </div>

                <div className="flex items-center gap-3 p-2 hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-on-surface-variant font-bold text-xs">
                    SC
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold">Sarah C. <span className="font-normal text-outline">bookmarked you</span></p>
                    <p className="text-[10px] text-outline">Yesterday</p>
                  </div>
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
              </div>
              <button className="w-full mt-6 py-2.5 border border-outline-variant/40 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors">
                View All Activity
              </button>
            </div>

            {/* Elite Card Upgrade */}
            <div className="bg-primary text-white rounded-3xl p-6 shadow-md relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-secondary opacity-15 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/20 mb-4">
                  <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    diamond
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-secondary-light">Elite Tier</span>
                </div>
                <h5 className="text-lg font-bold mb-2">Upgrade to Aura Elite</h5>
                <p className="text-xs opacity-75 mb-6 leading-relaxed">
                  Gain access to Concierge-vetted profiles and 1-on-1 AI personality deep dives.
                </p>
                <Link
                  href="/connect"
                  className="w-full block text-center py-3 bg-white text-primary hover:bg-secondary-light hover:text-secondary font-bold rounded-xl shadow-lg transition-all text-xs"
                >
                  Unlock Full Access
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* AI Insight Section */}
        <section className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border-l-4 border-primary relative overflow-hidden border border-outline-variant/30">
          <div className="absolute top-0 right-0 p-8 opacity-[0.04] pointer-events-none hidden md:block">
            <span className="material-symbols-outlined text-primary text-9xl">auto_awesome</span>
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-lg">psychology</span>
                </span>
                <h4 className="font-headline text-lg font-bold text-on-surface">AI Matchmaker Sentiment</h4>
              </div>
              <p className="text-body-md text-on-surface-variant leading-relaxed text-sm">
                Based on your recent interactions with <strong>Design & Innovation</strong> profiles, our neural engine suggests exploring partners with a high &ldquo;Openness to Experience&rdquo; score. We&apos;ve detected a strong preference for individuals who value <em>intellectual autonomy</em> and <em>urban lifestyle</em>.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-full text-xs font-semibold">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span>92% Match Certainty</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-full text-xs font-semibold">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Updated 4m ago</span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-auto flex-shrink-0">
              <Link
                href="/connect"
                className="px-8 py-4 bg-primary hover:bg-primary-light text-white rounded-full font-bold shadow-md block text-center text-xs hover:-translate-y-0.5 transition-all"
              >
                Refine My Algorithm
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
