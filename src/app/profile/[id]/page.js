"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProfileById } from "../../../data/profiles";

export default function DynamicProfileDetailPage({ params }) {
  const router = useRouter();
  // Support both Promise-based and plain params in Next.js App Router
  const resolvedParams = params && typeof params.then === "function" ? use(params) : params;
  const profileId = resolvedParams?.id;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [mainPhotoIndex, setMainPhotoIndex] = useState(0);
  const [interestSent, setInterestSent] = useState(false);
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [reported, setReported] = useState(false);

  useEffect(() => {
    if (!profileId) {
      setLoading(false);
      setError("No profile identifier provided.");
      return;
    }

    try {
      const found = getProfileById(profileId);
      if (found) {
        setProfile(found);
        setMainPhotoIndex(0);
        setError(null);
      } else {
        setError(`Profile "${profileId}" could not be found.`);
      }
    } catch (err) {
      setError("Failed to load profile details.");
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  const handleSwap = (index) => {
    setMainPhotoIndex(index);
  };

  const handleExpressInterest = () => {
    if (!profile) return;
    setInterestSent(true);
    setTimeout(() => {
      setInterestSent(false);
    }, 4000);
  };

  const handleToggleShortlist = () => {
    setIsShortlisted((prev) => !prev);
  };

  const handleReport = () => {
    setReported(true);
    setTimeout(() => {
      setReported(false);
    }, 4000);
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background px-6">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
        <p className="text-on-surface font-headline font-bold text-lg">Curating Profile Dossier...</p>
        <p className="text-on-surface-variant text-xs mt-1">Analyzing psychological metrics and media assets</p>
      </div>
    );
  }

  // Not Found / Error State
  if (error || !profile) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center bg-background px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6 border border-outline-variant/30 text-outline">
          <span className="material-symbols-outlined text-4xl">person_off</span>
        </div>
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mb-2">
          Profile Not Found
        </h2>
        <p className="text-on-surface-variant text-sm max-w-md mb-8">
          The requested profile ({profileId ? `"${profileId}"` : "unknown"}) does not exist, has been made private, or was moved.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 rounded-full border border-outline-variant/40 hover:bg-slate-50 font-bold text-xs text-on-surface transition-colors"
          >
            Go Back
          </button>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-full bg-primary text-white font-bold text-xs shadow-md hover:bg-primary-light transition-all"
          >
            Return to Matches
          </Link>
        </div>
      </div>
    );
  }

  const photos = profile.photos && profile.photos.length > 0 ? profile.photos : [
    { id: "main", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9GWjygCVT9eipRvE8egZVFXN1NOSkd5WP8yL75SzVTvILRw6wZp1OqnM6W03dG_tkMN-YMmPIQcYDe_eiEHURGLX7E0vFngfmSe39QKXvEjEQL1GGRiBWNwaeE5qB5L_IUSP7L8irXu9OHnPM5Q3j-4yDU3kdjfQAuBTJB8ZUGBmgsOn5c2a6zrEyat5LX2-LlAJKnMAw16hIr1XnwHU3Qbhm1AAWPFbds2inXk52VFhBs_dPTtHrq8bhwsds8RNAdg3IV0DQPkM", alt: profile.name }
  ];

  const currentPhoto = photos[mainPhotoIndex] || photos[0];

  return (
    <div className="relative overflow-x-hidden min-h-screen pb-36 bg-background">
      {/* Back button breadcrumb */}
      <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop pt-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-on-surface-variant hover:text-primary transition-colors py-1"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Matches</span>
        </button>
      </div>

      {/* Hero Gallery Section */}
      <section className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:h-[550px]">
          {/* Main Hero Image */}
          <div className="col-span-1 lg:col-span-8 relative rounded-3xl overflow-hidden shadow-lg h-[400px] lg:h-full group">
            <img
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.01]"
              src={currentPhoto.src}
              alt={currentPhoto.alt || profile.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 text-white">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-bold flex items-center gap-2 shadow-md text-xs">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    auto_awesome
                  </span>
                  {profile.matchScore}% Compatibility
                </span>
                {profile.verified && (
                  <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold border border-white/30 text-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">verified</span>
                    Verified Profile
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-xs">
                  ID: #{profile.id}
                </span>
              </div>
              <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">
                {profile.name}, {profile.age}
              </h1>
              <p className="text-sm md:text-base font-light opacity-90">
                {profile.role} &middot; {profile.location}
              </p>
            </div>
          </div>

          {/* Thumbnail Selector Stack */}
          <div className="col-span-1 lg:col-span-4 flex flex-row lg:flex-col gap-6">
            {photos.map((photo, index) => {
              if (index === mainPhotoIndex) return null;
              return (
                <div
                  key={photo.id || index}
                  onClick={() => handleSwap(index)}
                  className="flex-1 h-[120px] lg:h-1/2 rounded-3xl overflow-hidden shadow-md cursor-pointer group border-2 border-transparent hover:border-secondary/30 transition-all"
                >
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={photo.src}
                    alt={photo.alt || `${profile.name} photo ${index + 1}`}
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
                  {profile.aiAnalysis}
                </p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="glass-panel p-8 md:p-10 rounded-3xl border border-outline-variant/30">
            <h2 className="font-headline text-2xl text-primary font-bold mb-6">About {profile.name.split(" ")[0]}</h2>
            <div className="space-y-6">
              <p className="text-body-lg text-on-surface-variant leading-relaxed text-sm">
                {profile.about}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                  <span className="material-symbols-outlined text-primary text-xl">translate</span>
                  <div>
                    <p className="text-[10px] text-outline uppercase tracking-wider font-semibold">Languages</p>
                    <p className="text-sm font-semibold text-on-surface">{profile.languages}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                  <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                  <div>
                    <p className="text-[10px] text-outline uppercase tracking-wider font-semibold">Base</p>
                    <p className="text-sm font-semibold text-on-surface">{profile.baseLocation}</p>
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
                {profile.interests?.map((interest, i) => (
                  <span key={i} className="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant font-semibold text-xs">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl flex flex-col gap-4 border border-outline-variant/30">
              <h3 className="font-headline text-lg font-bold text-primary">Values Alignment</h3>
              <div className="space-y-4">
                {profile.values &&
                  Object.entries(profile.values).map(([valName, valScore]) => (
                    <div key={valName} className="flex justify-between items-center text-xs">
                      <span className="text-on-surface-variant font-medium">{valName}</span>
                      <div className="w-32 h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${valScore}%` }} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Career & Education Timeline */}
        <div className="col-span-1 lg:col-span-4 sticky top-28 flex flex-col gap-8">
          <div className="bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-sm">
            <h3 className="font-headline text-lg font-bold text-primary mb-8">Background</h3>
            <div className="space-y-10 relative">
              <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-outline-variant/20" />

              {/* Education */}
              <div className="relative pl-14">
                <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-secondary ring-4 ring-white" />
                <p className="text-[10px] text-outline uppercase tracking-wider font-semibold mb-1">Education</p>
                <h4 className="font-headline text-base font-bold text-on-surface mb-1">
                  {profile.education?.degree}
                </h4>
                <p className="text-xs text-on-surface-variant">{profile.education?.field}</p>
                {profile.education?.undergrad && (
                  <div className="mt-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-xl">school</span>
                    <span className="text-xs font-semibold">{profile.education.undergrad}</span>
                  </div>
                )}
              </div>

              {/* Career */}
              <div className="relative pl-14">
                <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-white" />
                <p className="text-[10px] text-outline uppercase tracking-wider font-semibold mb-1">Career</p>
                <h4 className="font-headline text-base font-bold text-on-surface mb-1">
                  {profile.career?.role}
                </h4>
                <p className="text-xs text-on-surface-variant">{profile.career?.company}</p>
                {profile.career?.previous && (
                  <div className="mt-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-xl">business_center</span>
                    <div>
                      <p className="text-xs font-semibold">{profile.career.previous}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Trust Badge & Actions */}
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
              <h4 className="font-headline text-base font-bold mb-2">Verified Elite Profile</h4>
              <p className="opacity-80 text-xs mb-4">Identity, credentials, and achievements verified by Aura Concierge Service.</p>
              <button
                onClick={handleReport}
                className="text-[11px] text-white/60 hover:text-white transition-colors underline flex items-center justify-center gap-1 mx-auto"
              >
                <span className="material-symbols-outlined text-xs">flag</span>
                <span>{reported ? "Report Logged" : "Report Profile Concern"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Action Bar at Bottom */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[680px] px-6 z-50">
        <div className="bg-white/90 backdrop-blur-2xl border border-outline-variant/30 rounded-full p-3.5 shadow-2xl flex items-center justify-between gap-3">
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
            <span>
              {interestSent ? `Interest Expressed to ${profile.name.split(" ")[0]}!` : `Express Interest`}
            </span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleShortlist}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                isShortlisted
                  ? "bg-amber-400 text-white shadow-md"
                  : "bg-slate-100 hover:bg-amber-100 text-amber-600"
              }`}
              title={isShortlisted ? "Remove from Shortlist" : "Add to Shortlist"}
            >
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: isShortlisted ? "'FILL' 1" : "'FILL' 0" }}>
                star
              </span>
            </button>

            <Link
              href={`/dashboard?tab=chat&profile=${profile.id}`}
              className="w-14 h-14 rounded-full bg-slate-100 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-all duration-300 group"
              title={`Chat with ${profile.name}`}
            >
              <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">
                chat_bubble
              </span>
            </Link>

            <Link
              href={`/dashboard?tab=videocall&profile=${profile.id}`}
              className="w-14 h-14 rounded-full bg-slate-100 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-all duration-300 group"
              title={`Start Video Call with ${profile.name}`}
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
