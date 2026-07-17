"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ConnectPage() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.012;
      const y = (e.clientY - window.innerHeight / 2) * 0.012;
      setCoords({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-background py-16">
        <div className="relative z-10 max-w-container-max-width mx-auto px-6 md:px-margin-desktop grid md:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold w-fit text-xs gap-2">
              <span className="material-symbols-outlined text-[16px]">smartphone</span>
              New Aura Mobile Experience
            </span>
            
            <h1 className="font-headline text-4xl md:text-5xl text-primary font-bold leading-tight">
              Continue the journey on your phone
            </h1>
            
            <p className="text-body-lg text-on-surface-variant max-w-lg leading-relaxed text-base">
              Never miss a meaningful connection. Experience Aura&apos;s elite matchmaking with real-time insights and high-fidelity video interactions, tailored for your premium lifestyle.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <a href="#" className="transition-transform hover:scale-[1.03] active:scale-[0.97] block">
                <img
                  className="h-14"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKUSsW8SMaK9tHJyWi96lRKQ16P6ahjYBfH-yhgqDy77eLsPfccIEjGPZSpcMhbj_GkUFHNAjLIX9NMxNVCfgq9bq1qi15DMODFtjoN2k7op8X708FtDpsJ46Xm5D65u5LBz45hjBhhJMFpfdBhps9PzvoAH-Z0rweQVegVAPj3jfrhJLL-y-XHLKxIiNotgsZW55hTFMjtocIUwP6HSeshv_tPpZMmBfKswogLuv8h2LdC9f_EekCdLPAsIkNTBYCza9kR_FiLc0"
                  alt="App Store Download"
                />
              </a>
              <a href="#" className="transition-transform hover:scale-[1.03] active:scale-[0.97] block">
                <img
                  className="h-14"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCVmGa-FxY3iEL2c0Y3MzMh4O4BAYoRo2fGNkk3cz2WMWWPEATvwHzxQ75oJbwAVLIV35qawTnEDougUYNqdU2kx0pK2UEwFXO3bXwLxvjSX3zQsa1CVcRUZR3dmjvifxKnvRXyBVTZHrFonbf4IN2n7e8CQ0veNc8AWnWSipxHhx-MWoWWopxM-9EmlTKcbWCXfeqE8Cw9h4avd-Y_72Q7OceWlqWmoXmpQQ7rDueNyS_UQ7WfjCKix20pMMtiKB6nYtT2MLCe-o"
                  alt="Play Store Download"
                />
              </a>
            </div>
          </div>

          {/* 3D Floating Mockups */}
          <div className="relative h-[550px] flex items-center justify-center">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
            
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Primary Phone Mockup */}
              <div
                className="absolute z-20 shadow-2xl rounded-[40px] border-8 border-slate-900 bg-background overflow-hidden w-[240px] h-[480px] transition-transform duration-100 ease-out"
                style={{
                  transform: `translate(${coords.x * 0.5}px, ${coords.y * 0.5}px)`,
                }}
              >
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBb_OlU5F0AljEVf0oNjnze4G1JpDWUvss5FFL3wAVIPjTL-XaQGIBHzC36DoUZ2595psQ1KFDJp44zYm3ib6BfU1ZtwAbd3mG4n8XvgltSVF4ivMyRh-1CxG1u3SKblLEDLHv88T6p4sQDf236ejsJLgwTRja53d-Sh8DQ7jKhTIyCCShceM5vFXu-q1VkHbn78TCqYlG4_3A0um0K46MvmusFXsuzFKLF7SCeCOGS-lhnj7dBpCnA0p-n-g_fjJBz062ObsX3er8"
                  alt="Aura Mobile Dashboard"
                />
              </div>
              
              {/* Secondary Phone Mockup (Left offset) */}
              <div
                className="absolute z-10 -translate-x-28 translate-y-10 shadow-xl rounded-[36px] border-4 border-slate-400 bg-background overflow-hidden w-[200px] h-[400px] opacity-80 transition-transform duration-100 ease-out"
                style={{
                  transform: `translate(${coords.x * 0.9 - 112}px, ${coords.y * 0.9 + 40}px)`,
                }}
              >
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2VnwABYNfF_78yVXgYbNhPUsbmc3CW2oSBiGVxo9VmGf0jSnmMUyPZyMP7dfS8o_ez3zU9uNzka-fRS34bxdNrqJ1TWfN2a2Jf2iniQk_3vPb5CRewIhUp24599yTspdt6hphLreJciAtFjx40co8DURVvVW8rs59G0mRJNxn4BZRM3xqUp3fkobyNOemrdpyXxggENT3c0dr3wT8UHG7hOYM5nRx4FbfjHMLyfNyWpd-MjwL8f0ZT8HJGzj2GDpvjIu7NzLpMxQ"
                  alt="Aura Video Call Screen"
                />
              </div>

              {/* Decorative AI Floating Badge */}
              <div
                className="absolute -right-4 top-1/4 z-30 glass-panel p-5 rounded-2xl shadow-lg border border-secondary/20 flex flex-col gap-2 transition-transform duration-100 ease-out"
                style={{
                  transform: `translate(${coords.x * 1.2}px, ${coords.y * 1.2}px)`,
                }}
              >
                <div className="flex items-center gap-2 text-secondary font-bold text-xs">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    auto_awesome
                  </span>
                  <span>98% Match</span>
                </div>
                <div className="w-20 h-1 bg-outline-variant/30 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-secondary shimmer-gold" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* QR Sync Section */}
      <section className="py-20 bg-surface-container-lowest">
        <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop">
          <div className="glass-panel rounded-[32px] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-sm border border-outline-variant/30">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="font-headline text-3xl text-primary font-bold mb-4">Scan to Sync</h2>
              <p className="text-body-lg text-on-surface-variant mb-8 text-base">
                Instantly transfer your desktop session to your mobile device. Scan this encrypted QR code to log in securely without entering your credentials.
              </p>
              
              <ul className="space-y-4 text-on-surface text-sm font-semibold">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary bg-primary/10 p-1 rounded-full text-lg">check</span>
                  No password required for sync
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary bg-primary/10 p-1 rounded-full text-lg">check</span>
                  End-to-end encrypted transfer
                </li>
              </ul>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-3xl blur-lg transition-all group-hover:blur-xl" />
              <div className="relative bg-white p-8 rounded-[24px] shadow-xl border border-outline-variant/30 flex flex-col items-center">
                <div className="w-48 h-48 bg-slate-50 flex items-center justify-center rounded-xl relative overflow-hidden border border-outline-variant/20">
                  <img
                    className="w-full h-full p-2 object-contain"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-pupCzSrFDJ8nIcAUBt-g7edSR-YliPs8WzYdI0lX6R7hRWJiO2oL6My9dQUsn3oIbdfsQz5fIlpvIrEN5YiYVz314io6WN5Bc7B4GGZEMjomAh0DV4Cqg85CxJOHqGurc2iJy_Vm7814fs8qiWNBhO13Jm_6v-syZsXuobhrLvGAZAOEvDd5EXdn4cyW-mllcIW-wgRtXVjZBwCVv7KkvesfcDeJwjcL3Onzuv-zrp5Q4n4A1kfTwyQjjEnUUc7S1XhH8tt13DI"
                    alt="Encrypted Sync QR Code"
                  />
                  <div className="absolute inset-x-0 h-0.5 bg-secondary shimmer-gold opacity-50 top-1/2 pointer-events-none" />
                </div>
                <span className="mt-4 text-[10px] text-outline font-bold tracking-widest uppercase">Aura Secure ID</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-20 px-6 md:px-margin-desktop max-w-container-max-width mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline text-3xl text-primary font-bold mb-4">Elite Mobile Features</h2>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Designed for the high-intent individual who values time and authenticity.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-3xl hover:-translate-y-1 transition-all duration-300 border border-outline-variant/30">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <span className="material-symbols-outlined text-3xl">verified_user</span>
            </div>
            <h3 className="font-headline text-lg font-bold text-primary mb-3">Real-time verification</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Our mobile app uses advanced biometric depth-sensing to ensure every profile is 100% authentic and currently active.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl hover:-translate-y-1 transition-all duration-300 border border-secondary/20">
            <div className="w-14 h-14 bg-secondary-container/20 text-on-secondary-container rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <span className="material-symbols-outlined text-3xl">videocam</span>
            </div>
            <h3 className="font-headline text-lg font-bold text-primary mb-3">Instant Video calls</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Transition seamlessly from chat to high-definition video within our secure environment, preserving your privacy at every step.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl hover:-translate-y-1 transition-all duration-300 border border-outline-variant/30">
            <div className="w-14 h-14 bg-slate-100 text-on-surface-variant rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <span className="material-symbols-outlined text-3xl">notifications_active</span>
            </div>
            <h3 className="font-headline text-lg font-bold text-primary mb-3">Push Notifications</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Receive subtle, discreet alerts for high-value matches and exclusive event invitations curated by our AI concierge.
            </p>
          </div>
        </div>
      </section>

      {/* Atmospheric CTA */}
      <section className="relative py-24 overflow-hidden mt-12 bg-primary text-white text-center">
        <div className="relative z-10 px-6 md:px-margin-desktop max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl font-bold mb-6">Find your forever, anywhere.</h2>
          <p className="text-primary-fixed-dim text-lg mb-10 opacity-90">
            Join over 50,000 elite members who found their perfect match through the Aura mobile experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/"
              className="bg-secondary hover:bg-secondary/90 text-white px-10 py-4 rounded-full font-bold text-base shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all"
            >
              Get Started Free
            </Link>
            <Link
              href="/dashboard"
              className="text-white flex items-center gap-2 hover:underline text-sm font-semibold"
            >
              <span className="material-symbols-outlined text-lg">play_circle</span>
              See how it works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
