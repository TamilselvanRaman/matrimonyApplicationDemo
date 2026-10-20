"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PROFILES } from "../../data/profiles";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard' | 'interests' | 'shortlist' | 'chat' | 'videocall'
  const [selectedChatUser, setSelectedChatUser] = useState(0);
  const [activeVideoProfileId, setActiveVideoProfileId] = useState("elena-richardson");

  const [messagesByContact, setMessagesByContact] = useState({
    "elena-richardson": [
      { sender: "them", text: "Hello Alexander! I loved reading about your work in global investments.", time: "10:14 AM" },
      { sender: "me", text: "Hi! Thank you. I was really impressed by your projects in London.", time: "10:18 AM" },
      { sender: "them", text: "That means a lot! Would you be free for a brief video call this weekend?", time: "10:22 AM" },
    ],
    "sophia-kensington": [
      { sender: "them", text: "Hi Alexander, loved discussing your perspective on sustainable investments!", time: "Yesterday" },
      { sender: "me", text: "It was great talking to you Sophia. Your tech venture is truly exciting.", time: "Yesterday" },
      { sender: "them", text: "Would you like to connect over video this week?", time: "8:45 AM" },
    ],
    "isabella-martinez": [
      { sender: "them", text: "Hello Alexander, the architectural gallery photos were wonderful.", time: "2 days ago" },
      { sender: "me", text: "Thank you Isabella! Your art curation work in Madrid is spectacular.", time: "2 days ago" },
      { sender: "them", text: "I appreciate that! Let's arrange a chat soon.", time: "Yesterday" },
    ],
    "concierge": [
      { sender: "them", text: "Welcome to Aura AI Concierge. We have curated 3 high-compatibility matches for you today.", time: "9:00 AM" },
      { sender: "me", text: "Thank you. Could you prioritize profiles with international backgrounds?", time: "9:15 AM" },
      { sender: "them", text: "Certainly, Alexander. Elena Richardson and Sophia Kensington match your preferences.", time: "9:16 AM" },
    ],
  });
  const [messageInput, setMessageInput] = useState("");
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoCamOff, setIsVideoCamOff] = useState(false);

  // Interest categories tab
  const [interestFilter, setInterestFilter] = useState("received"); // 'received' | 'sent' | 'mutual'

  // Read URL query params if linked directly
  useEffect(() => {
    const tab = searchParams?.get("tab");
    const profileId = searchParams?.get("profile");

    if (tab && ["dashboard", "interests", "shortlist", "chat", "videocall"].includes(tab)) {
      setActiveTab(tab);
    }
    if (profileId) {
      setActiveVideoProfileId(profileId);
      const contactIdx = chatContacts.findIndex((c) => c.profileId === profileId);
      if (contactIdx !== -1) {
        setSelectedChatUser(contactIdx);
      }
    }
  }, [searchParams]);

  // Interests Data mapped to actual profile IDs
  const interestsData = {
    received: [
      {
        id: "elena-richardson",
        name: "Elena Richardson",
        age: 29,
        role: "International Strategy Consultant",
        location: "London / Dubai",
        match: "98%",
        status: "Sent you an interest 2h ago",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9GWjygCVT9eipRvE8egZVFXN1NOSkd5WP8yL75SzVTvILRw6wZp1OqnM6W03dG_tkMN-YMmPIQcYDe_eiEHURGLX7E0vFngfmSe39QKXvEjEQL1GGRiBWNwaeE5qB5L_IUSP7L8irXu9OHnPM5Q3j-4yDU3kdjfQAuBTJB8ZUGBmgsOn5c2a6zrEyat5LX2-LlAJKnMAw16hIr1XnwHU3Qbhm1AAWPFbds2inXk52VFhBs_dPTtHrq8bhwsds8RNAdg3IV0DQPkM",
      },
      {
        id: "natalie-brooks",
        name: "Natalie Brooks",
        age: 28,
        role: "Creative Director & Fine Arts",
        location: "Paris / London",
        match: "95%",
        status: "Liked your lifestyle values 5h ago",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCrzruh4UPoPjvzvpaAm5RURiIZr-1ZtVbZlEH7Vx8B9mqRwRNMLBlSWRpVyOx1ZL1gSF5Mmdek34V7CvpDvkEX9ZfusvJw3eWG-gk-4DH9ZdtCH06JoxE5adV1VW5WFbjuEhlV0GSKFzQphm9KAcguCSEu6LapEdkvA-uLcsScGfp5BWX63L3Ts8SjKUACi90l2J2mzQHpH0oy_mUvcIsHqfkcznkIWVZLdXs8bdCkoX_bni0ZBphVneVmdsNCS1CvW7u3MXvA54",
      },
      {
        id: "julianne-miller",
        name: "Julianne Miller",
        age: 30,
        role: "Biotech Founder & Researcher",
        location: "Zurich / Boston",
        match: "91%",
        status: "Expressed interest yesterday",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzDt_4AMrgyEjStOHavHMd-egdO62vq8UBNnkckGEcfN4h2bWkf52fv5FzXaWs8Kqo9Pr8_mcXRoNEJ__nVsk-i0zoXs4lKs6GTwXfh_Gm0bWsVYfBXZ7pF3iIO4IymU-u6Jtz7ea12etCmzaUc1fPxSZVyQW7Q8Lzdq38dRmIGKcqBhCq3eDUXZp9fiK5diCItDBHT72Pz9Cz09MbdIqpAPj3nqqq9qk0w9sZD2mUTZaFnKUS4lWm_ZHtJnme6wtn_cxYzI-NiZ4",
      },
    ],
    sent: [
      {
        id: "sophia-kensington",
        name: "Sophia Kensington",
        age: 31,
        role: "Tech Entrepreneur & Venture Founder",
        location: "San Francisco / London",
        match: "96%",
        status: "Interest sent 1 day ago - Pending response",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6p28bpm7KmQ-RQJa3o77dQeLcMn3TrobC0xYQa-dxAU2QW8XQCFmxilWzmgbqqflGILZLNgFE1htAaIE3se5ToHSMznPIIwD_b0yZAusJawI8Lbz0MbAu_Qi572dxBGWwd_pe0yFxVQxz6kFH6J-c7qZziup6L_wWPfv4UJVP0rDlladP1TfFOBdXfj3rLfmekWKIKNSJFsdf_se0j93kx1OkDGNJNUBmc25fUXGXL24pheqQJC1yF88Lw54p-c1QliadS-U1mX0",
      },
    ],
    mutual: [
      {
        id: "elena-richardson",
        name: "Elena Richardson",
        age: 29,
        role: "International Strategy Consultant",
        location: "London / Dubai",
        match: "98%",
        status: "Matched! You both connected",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9GWjygCVT9eipRvE8egZVFXN1NOSkd5WP8yL75SzVTvILRw6wZp1OqnM6W03dG_tkMN-YMmPIQcYDe_eiEHURGLX7E0vFngfmSe39QKXvEjEQL1GGRiBWNwaeE5qB5L_IUSP7L8irXu9OHnPM5Q3j-4yDU3kdjfQAuBTJB8ZUGBmgsOn5c2a6zrEyat5LX2-LlAJKnMAw16hIr1XnwHU3Qbhm1AAWPFbds2inXk52VFhBs_dPTtHrq8bhwsds8RNAdg3IV0DQPkM",
      },
    ],
  };

  // Sample data for Shortlist with unique IDs
  const [shortlistData, setShortlistData] = useState([
    {
      id: "elena-richardson",
      name: "Elena Richardson",
      age: 29,
      role: "Strategy Consultant",
      location: "London, UK",
      match: "98%",
      notes: "High aesthetic compatibility, loves classical piano & equestrian sports.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9GWjygCVT9eipRvE8egZVFXN1NOSkd5WP8yL75SzVTvILRw6wZp1OqnM6W03dG_tkMN-YMmPIQcYDe_eiEHURGLX7E0vFngfmSe39QKXvEjEQL1GGRiBWNwaeE5qB5L_IUSP7L8irXu9OHnPM5Q3j-4yDU3kdjfQAuBTJB8ZUGBmgsOn5c2a6zrEyat5LX2-LlAJKnMAw16hIr1XnwHU3Qbhm1AAWPFbds2inXk52VFhBs_dPTtHrq8bhwsds8RNAdg3IV0DQPkM",
    },
    {
      id: "sophia-kensington",
      name: "Sophia Kensington",
      age: 31,
      role: "Tech Entrepreneur",
      location: "San Francisco / London",
      match: "96%",
      notes: "Shared venture vision, passion for AI & endurance running.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6p28bpm7KmQ-RQJa3o77dQeLcMn3TrobC0xYQa-dxAU2QW8XQCFmxilWzmgbqqflGILZLNgFE1htAaIE3se5ToHSMznPIIwD_b0yZAusJawI8Lbz0MbAu_Qi572dxBGWwd_pe0yFxVQxz6kFH6J-c7qZziup6L_wWPfv4UJVP0rDlladP1TfFOBdXfj3rLfmekWKIKNSJFsdf_se0j93kx1OkDGNJNUBmc25fUXGXL24pheqQJC1yF88Lw54p-c1QliadS-U1mX0",
    },
    {
      id: "isabella-martinez",
      name: "Isabella Martinez",
      age: 27,
      role: "Curator & Fine Artist",
      location: "Madrid / London",
      match: "94%",
      notes: "Artistic sensibility, values quiet moments and architectural history.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzDt_4AMrgyEjStOHavHMd-egdO62vq8UBNnkckGEcfN4h2bWkf52fv5FzXaWs8Kqo9Pr8_mcXRoNEJ__nVsk-i0zoXs4lKs6GTwXfh_Gm0bWsVYfBXZ7pF3iIO4IymU-u6Jtz7ea12etCmzaUc1fPxSZVyQW7Q8Lzdq38dRmIGKcqBhCq3eDUXZp9fiK5diCItDBHT72Pz9Cz09MbdIqpAPj3nqqq9qk0w9sZD2mUTZaFnKUS4lWm_ZHtJnme6wtn_cxYzI-NiZ4",
    },
  ]);

  // Chat contacts
  const chatContacts = [
    {
      id: 0,
      profileId: "elena-richardson",
      name: "Elena Richardson",
      status: "Active now",
      online: true,
      lastMsg: "Would you be free for a brief video call this weekend?",
      match: "98%",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9GWjygCVT9eipRvE8egZVFXN1NOSkd5WP8yL75SzVTvILRw6wZp1OqnM6W03dG_tkMN-YMmPIQcYDe_eiEHURGLX7E0vFngfmSe39QKXvEjEQL1GGRiBWNwaeE5qB5L_IUSP7L8irXu9OHnPM5Q3j-4yDU3kdjfQAuBTJB8ZUGBmgsOn5c2a6zrEyat5LX2-LlAJKnMAw16hIr1XnwHU3Qbhm1AAWPFbds2inXk52VFhBs_dPTtHrq8bhwsds8RNAdg3IV0DQPkM",
    },
    {
      id: 1,
      profileId: "sophia-kensington",
      name: "Sophia Kensington",
      status: "Active 2h ago",
      online: false,
      lastMsg: "Loved discussing your perspective on sustainable investments.",
      match: "96%",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6p28bpm7KmQ-RQJa3o77dQeLcMn3TrobC0xYQa-dxAU2QW8XQCFmxilWzmgbqqflGILZLNgFE1htAaIE3se5ToHSMznPIIwD_b0yZAusJawI8Lbz0MbAu_Qi572dxBGWwd_pe0yFxVQxz6kFH6J-c7qZziup6L_wWPfv4UJVP0rDlladP1TfFOBdXfj3rLfmekWKIKNSJFsdf_se0j93kx1OkDGNJNUBmc25fUXGXL24pheqQJC1yF88Lw54p-c1QliadS-U1mX0",
    },
    {
      id: 2,
      profileId: "isabella-martinez",
      name: "Isabella Martinez",
      status: "Active yesterday",
      online: false,
      lastMsg: "The architectural gallery photos were wonderful.",
      match: "94%",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzDt_4AMrgyEjStOHavHMd-egdO62vq8UBNnkckGEcfN4h2bWkf52fv5FzXaWs8Kqo9Pr8_mcXRoNEJ__nVsk-i0zoXs4lKs6GTwXfh_Gm0bWsVYfBXZ7pF3iIO4IymU-u6Jtz7ea12etCmzaUc1fPxSZVyQW7Q8Lzdq38dRmIGKcqBhCq3eDUXZp9fiK5diCItDBHT72Pz9Cz09MbdIqpAPj3nqqq9qk0w9sZD2mUTZaFnKUS4lWm_ZHtJnme6wtn_cxYzI-NiZ4",
    },
    {
      id: 3,
      profileId: "concierge",
      name: "Aura AI Concierge",
      status: "Always available",
      online: true,
      lastMsg: "3 new high-compatibility matches analyzed for you.",
      match: "100%",
      isBot: true,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3y5qLdsohC6r_XeHXn_V9hAjXg0WCz4oab26h--A25rmHCZjlGU9gqZvHEz9Uh6u00DmztJH8H-aKl_LKa7PQvl4Tuq8zRFMYMaX5V0MqU-nDUm0Gd-HpmEnggBSI9dLlKYpSVeWZZKrAN0W0r2k7dtEwAa8tXKPrzd4wN3TMAhBaGrwwKjpxlu9hRsVkq85xeg5AYh_mZzp_pAqQP8F83YHM5tc7bfFnetGdK3NiwMYP3ea_G9n-rIhZ0hEEo64nG5weTBsU_Lw",
    },
  ];

  const activeContactId = chatContacts[selectedChatUser]?.profileId || "elena-richardson";
  const currentChatMessages = messagesByContact[activeContactId] || [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    const newMsg = {
      sender: "me",
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessagesByContact((prev) => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMsg],
    }));
    setMessageInput("");
  };

  const handleRemoveShortlist = (id) => {
    setShortlistData((prev) => prev.filter((item) => item.id !== id));
  };

  // Currently active video caller profile
  const currentVideoProfile =
    PROFILES.find((p) => p.id === activeVideoProfileId) || PROFILES[0];

  return (
    <div className="flex bg-surface min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] text-on-surface">
      {/* Desktop Sidebar Navigation (Preserved exactly as approved on desktop) */}
      <aside className="hidden md:flex flex-col p-6 gap-stack-gap-sm bg-surface-container-low h-[calc(100vh-80px)] w-72 sticky top-20 border-r border-outline-variant/30 shadow-sm shrink-0">
        <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl mb-4 shadow-sm border border-outline-variant/10">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary shrink-0">
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

        <nav className="flex-1 space-y-1.5 overflow-y-auto">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "dashboard"
                ? "bg-secondary-container text-on-secondary-container shadow-sm"
                : "text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </button>

          <Link
            href="/profile/elena-richardson"
            className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl font-bold text-sm transition-all"
          >
            <span className="material-symbols-outlined">auto_awesome</span>
            <span>My Spotlight</span>
          </Link>

          <button
            onClick={() => setActiveTab("interests")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "interests"
                ? "bg-secondary-container text-on-secondary-container shadow-sm"
                : "text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">favorite</span>
              <span>Interests</span>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">3</span>
          </button>

          <button
            onClick={() => setActiveTab("shortlist")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "shortlist"
                ? "bg-secondary-container text-on-secondary-container shadow-sm"
                : "text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">star</span>
              <span>Shortlist</span>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold">{shortlistData.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("chat")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "chat"
                ? "bg-secondary-container text-on-secondary-container shadow-sm"
                : "text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">chat</span>
              <span>Messages & Chat</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </button>

          <button
            onClick={() => setActiveTab("videocall")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "videocall"
                ? "bg-secondary-container text-on-secondary-container shadow-sm"
                : "text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">videocam</span>
              <span>Video Call Room</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-primary tracking-wider px-2 py-0.5 rounded-full bg-primary-fixed">HD</span>
          </button>
        </nav>

        <button
          onClick={() => setActiveTab("videocall")}
          className="w-full py-3.5 px-4 shimmer-gold text-primary rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-md mt-auto"
        >
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
            video_camera_front
          </span>
          <span className="text-xs uppercase tracking-wider">Start Video Session</span>
        </button>
      </aside>

      {/* Main Content Area: Responsive padding and spacing */}
      <div className="flex-1 w-full px-4 sm:px-6 md:px-margin-desktop py-6 sm:py-8 md:py-10 max-w-container-max-width mx-auto overflow-hidden pb-24 md:pb-10">

        {/* 1. DASHBOARD VIEW */}
        {activeTab === "dashboard" && (
          <>
            {/* Welcome Section */}
            <section className="mb-6 sm:mb-8 md:mb-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-4">
                <div className="min-w-0">
                  <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl text-on-surface font-bold leading-tight break-words">
                    Welcome back, <span className="text-primary">Alexander.</span>
                  </h3>
                  <p className="text-xs sm:text-body-md text-on-surface-variant mt-1.5 sm:mt-2">
                    Your AI Matchmaker has analyzed {PROFILES.length} vetted profiles for you today.
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-container/10 text-primary border border-primary/20 rounded-full text-[11px] sm:text-xs font-bold flex items-center gap-1.5 sm:gap-2 shadow-sm whitespace-nowrap">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      bolt
                    </span>
                    Live Analysis Active
                  </span>
                </div>
              </div>
            </section>

            {/* Quick Action Summary Cards (2-column on mobile, 4-column on sm+) */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-8 sm:mb-10">
              <button
                onClick={() => setActiveTab("chat")}
                className="p-3 sm:p-4 bg-white rounded-2xl border border-outline-variant/30 hover:border-primary hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3 text-left group min-h-[96px] sm:min-h-0"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                  <span className="material-symbols-outlined text-lg sm:text-xl">chat</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-on-surface truncate">Direct Chat</p>
                  <p className="text-[10px] sm:text-[11px] text-outline truncate">3 Unread messages</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("videocall")}
                className="p-3 sm:p-4 bg-white rounded-2xl border border-outline-variant/30 hover:border-primary hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3 text-left group min-h-[96px] sm:min-h-0"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                  <span className="material-symbols-outlined text-lg sm:text-xl">videocam</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-on-surface truncate">Video Call</p>
                  <p className="text-[10px] sm:text-[11px] text-outline truncate">1 Scheduled today</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("interests")}
                className="p-3 sm:p-4 bg-white rounded-2xl border border-outline-variant/30 hover:border-primary hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3 text-left group min-h-[96px] sm:min-h-0"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors shrink-0">
                  <span className="material-symbols-outlined text-lg sm:text-xl">favorite</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-on-surface truncate">Interests</p>
                  <p className="text-[10px] sm:text-[11px] text-outline truncate">3 New requests</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("shortlist")}
                className="p-3 sm:p-4 bg-white rounded-2xl border border-outline-variant/30 hover:border-primary hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3 text-left group min-h-[96px] sm:min-h-0"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors shrink-0">
                  <span className="material-symbols-outlined text-lg sm:text-xl">star</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-on-surface truncate">Shortlist</p>
                  <p className="text-[10px] sm:text-[11px] text-outline truncate">{shortlistData.length} Profiles saved</p>
                </div>
              </button>
            </section>

            {/* Top AI Picks - DYNAMIC PROFILE CARDS with touch-friendly responsive carousel */}
            <section className="mb-10 sm:mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 mb-4 sm:mb-6">
                <h4 className="font-headline text-lg sm:text-xl text-on-surface font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    stars
                  </span>
                  Top AI Picks ({PROFILES.length} Profiles)
                </h4>
                <button
                  onClick={() => setActiveTab("shortlist")}
                  className="text-primary font-bold text-xs sm:text-sm hover:underline text-left"
                >
                  View Shortlisted ({shortlistData.length})
                </button>
              </div>

              {/* Scrollable container with snap-align on mobile for touch UX */}
              <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory -mx-4 px-4 sm:-mx-2 sm:px-2">
                {PROFILES.map((p) => {
                  const mainImg = p.photos[0]?.src;
                  return (
                    <div
                      key={p.id}
                      onClick={() => router.push(`/profile/${p.id}`)}
                      className="snap-center w-[85vw] max-w-[310px] min-w-[270px] sm:min-w-[310px] bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer border border-outline-variant/30 flex flex-col justify-between shrink-0"
                    >
                      <div className="relative h-48 sm:h-56">
                        <img
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          src={mainImg}
                          alt={p.name}
                        />
                        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-primary text-white px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold shadow-md">
                          {p.matchScore}% Match
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                          <h5 className="font-headline font-bold text-base sm:text-lg">{p.name}, {p.age}</h5>
                          <p className="text-white/80 text-xs truncate">{p.role}</p>
                        </div>
                      </div>

                      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap gap-1.5 mb-2.5 sm:mb-3">
                            {p.interests.slice(0, 2).map((interest, idx) => (
                              <span key={idx} className="px-2.5 py-1 bg-surface-container text-on-surface-variant rounded-full text-[11px] font-medium">
                                {interest}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                            &ldquo;{p.about}&rdquo;
                          </p>
                        </div>

                        <div className="flex gap-2 mt-4 pt-3.5 sm:pt-4 border-t border-outline-variant/20">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const idx = chatContacts.findIndex((c) => c.profileId === p.id);
                              setSelectedChatUser(idx !== -1 ? idx : 0);
                              setActiveTab("chat");
                            }}
                            className="flex-1 py-2 rounded-xl bg-surface-container hover:bg-primary hover:text-white text-on-surface-variant text-xs font-bold flex items-center justify-center gap-1 transition-colors min-h-[40px]"
                          >
                            <span className="material-symbols-outlined text-sm">chat</span>
                            Chat
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveVideoProfileId(p.id);
                              setActiveTab("videocall");
                            }}
                            className="flex-1 py-2 rounded-xl bg-secondary-container text-on-secondary-container text-xs font-bold flex items-center justify-center gap-1 hover:brightness-95 transition-all min-h-[40px]"
                          >
                            <span className="material-symbols-outlined text-sm">videocam</span>
                            Video
                          </button>
                          <Link
                            href={`/profile/${p.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="w-10 h-10 rounded-xl bg-white border border-outline-variant/30 text-on-surface hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center transition-all shrink-0"
                            title={`View ${p.name}'s Profile`}
                          >
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Compatibility & Activity Section */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {/* Radar Charts Grid */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-outline-variant/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 sm:mb-8">
                  <div>
                    <h4 className="font-headline text-base sm:text-lg font-bold text-on-surface">Compatibility Matrix</h4>
                    <p className="text-xs text-on-surface-variant">Global average across top potentials</p>
                  </div>
                  <button onClick={() => setActiveTab("interests")} className="text-primary hover:text-primary-light flex items-center gap-1 font-bold text-xs">
                    View Insights <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                  <div className="text-center">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4 sm:mb-6">Personality Match</p>
                    <div className="relative w-full aspect-square max-w-[200px] sm:max-w-[220px] mx-auto">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <polygon className="stroke-slate-200 fill-none stroke-1" points="50,5 95,35 80,90 20,90 5,35" />
                        <polygon className="stroke-slate-200 fill-none stroke-1" points="50,20 80,40 70,80 30,80 20,40" />
                        <polygon className="stroke-slate-200 fill-none stroke-1" points="50,35 65,45 60,70 40,70 35,45" />
                        <polygon className="fill-primary/15 stroke-primary stroke-2" points="50,15 85,38 75,85 35,75 15,45" />
                        <text fill="#757682" fontSize="5" textAnchor="middle" x="50" y="3">Openness</text>
                        <text fill="#757682" fontSize="5" textAnchor="start" x="97" y="38">Extraversion</text>
                        <text fill="#757682" fontSize="5" textAnchor="middle" x="80" y="97">Agreeable</text>
                        <text fill="#757682" fontSize="5" textAnchor="middle" x="20" y="97">Neuroticism</text>
                        <text fill="#757682" fontSize="5" textAnchor="end" x="3" y="38">Conscientious</text>
                      </svg>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-4 sm:mb-6">Lifestyle Insights</p>
                    <div className="relative w-full aspect-square max-w-[200px] sm:max-w-[220px] mx-auto">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <polygon className="stroke-slate-200 fill-none stroke-1" points="50,5 95,35 80,90 20,90 5,35" />
                        <polygon className="stroke-slate-200 fill-none stroke-1" points="50,20 80,40 70,80 30,80 20,40" />
                        <polygon className="fill-secondary/15 stroke-secondary stroke-2" points="50,10 90,42 65,80 45,82 25,30" />
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
                <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-outline-variant/30">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Interests Activity</h4>
                    <button onClick={() => setActiveTab("interests")} className="text-xs text-primary font-bold hover:underline">
                      View All
                    </button>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <div
                      onClick={() => router.push("/profile/elena-richardson")}
                      className="flex items-center gap-3 p-2 hover:bg-surface-container-low rounded-xl transition-colors cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                        ER
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate">Elena Richardson <span className="font-normal text-outline">sent a heart</span></p>
                        <p className="text-[10px] text-outline">2 hours ago</p>
                      </div>
                      <span className="material-symbols-outlined text-error shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                    </div>

                    <div
                      onClick={() => router.push("/profile/natalie-brooks")}
                      className="flex items-center gap-3 p-2 hover:bg-surface-container-low rounded-xl transition-colors cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full bg-secondary-container/20 text-on-secondary-container font-bold text-xs shrink-0">
                        NB
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate">Natalie Brooks <span className="font-normal text-outline">viewed your profile</span></p>
                        <p className="text-[10px] text-outline">5 hours ago</p>
                      </div>
                      <span className="material-symbols-outlined text-outline shrink-0">visibility</span>
                    </div>

                    <div
                      onClick={() => router.push("/profile/sophia-kensington")}
                      className="flex items-center gap-3 p-2 hover:bg-surface-container-low rounded-xl transition-colors cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-on-surface-variant font-bold text-xs shrink-0">
                        SK
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate">Sophia Kensington <span className="font-normal text-outline">in shortlist</span></p>
                        <p className="text-[10px] text-outline">Yesterday</p>
                      </div>
                      <span className="material-symbols-outlined text-primary shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("interests")}
                    className="w-full mt-5 sm:mt-6 py-2.5 border border-outline-variant/40 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors"
                  >
                    Manage All Interests
                  </button>
                </div>

                {/* Direct Video Invitation */}
                <div className="bg-primary text-white rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden group">
                  <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-secondary opacity-15 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/20 mb-3 sm:mb-4">
                      <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                        videocam
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-secondary-light">Instant Virtual Date</span>
                    </div>
                    <h5 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2">High-Def Video Calls</h5>
                    <p className="text-xs opacity-75 mb-5 sm:mb-6 leading-relaxed">
                      Connect face-to-face with concierge-vetted members in our encrypted virtual salon.
                    </p>
                    <button
                      onClick={() => setActiveTab("videocall")}
                      className="w-full block text-center py-3 bg-white text-primary hover:bg-secondary-light hover:text-secondary font-bold rounded-xl shadow-lg transition-all text-xs"
                    >
                      Launch Video Salon
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* 2. INTERESTS VIEW */}
        {activeTab === "interests" && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 sm:pb-6 border-b border-outline-variant/30">
              <div>
                <h3 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    favorite
                  </span>
                  Interests & Connections
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                  Manage profiles that showed mutual admiration or expressed direct interest in you.
                </p>
              </div>

              {/* Tabs Filter (Responsive scroll on narrow screens) */}
              <div className="flex bg-surface-container rounded-2xl p-1 gap-1 border border-outline-variant/30 w-full sm:w-auto overflow-x-auto">
                <button
                  onClick={() => setInterestFilter("received")}
                  className={`flex-1 sm:flex-none whitespace-nowrap px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    interestFilter === "received"
                      ? "bg-white text-primary shadow-sm"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  Received ({interestsData.received.length})
                </button>
                <button
                  onClick={() => setInterestFilter("sent")}
                  className={`flex-1 sm:flex-none whitespace-nowrap px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    interestFilter === "sent"
                      ? "bg-white text-primary shadow-sm"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  Sent ({interestsData.sent.length})
                </button>
                <button
                  onClick={() => setInterestFilter("mutual")}
                  className={`flex-1 sm:flex-none whitespace-nowrap px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    interestFilter === "mutual"
                      ? "bg-white text-primary shadow-sm"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  Mutual ({interestsData.mutual.length})
                </button>
              </div>
            </div>

            {/* List Cards with Dynamic IDs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {interestsData[interestFilter].map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-md transition-all flex flex-col"
                >
                  <div
                    onClick={() => router.push(`/profile/${item.id}`)}
                    className="relative h-56 sm:h-60 cursor-pointer group"
                  >
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {item.match} Match
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                      <h4 className="font-bold text-base sm:text-lg">{item.name}, {item.age}</h4>
                      <p className="text-xs text-white/80">{item.role}</p>
                      <p className="text-[11px] text-white/70 flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-xs">location_on</span>
                        {item.location}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div className="bg-surface-container-low p-2.5 sm:p-3 rounded-xl border border-outline-variant/20 mb-3 sm:mb-4">
                      <p className="text-xs text-secondary font-bold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {item.status}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const idx = chatContacts.findIndex((c) => c.profileId === item.id);
                          setSelectedChatUser(idx !== -1 ? idx : 0);
                          setActiveTab("chat");
                        }}
                        className="flex-1 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-light flex items-center justify-center gap-1.5 transition-colors shadow-sm min-h-[42px]"
                      >
                        <span className="material-symbols-outlined text-sm">chat</span>
                        Message
                      </button>
                      <button
                        onClick={() => {
                          setActiveVideoProfileId(item.id);
                          setActiveTab("videocall");
                        }}
                        className="w-11 h-11 rounded-xl bg-secondary-container text-on-secondary-container hover:brightness-95 flex items-center justify-center transition-all shrink-0"
                        title="Start Video Call"
                      >
                        <span className="material-symbols-outlined text-base">videocam</span>
                      </button>
                      <Link
                        href={`/profile/${item.id}`}
                        className="w-11 h-11 rounded-xl bg-surface-container text-on-surface-variant hover:bg-surface-container-high flex items-center justify-center transition-colors shrink-0"
                        title="View Full Profile"
                      >
                        <span className="material-symbols-outlined text-base">visibility</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. SHORTLIST VIEW */}
        {activeTab === "shortlist" && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 sm:pb-6 border-b border-outline-variant/30">
              <div>
                <h3 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  My Shortlisted Profiles
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                  Profiles you saved for careful consideration. Keep private notes and connect whenever ready.
                </p>
              </div>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-secondary-container text-on-secondary-container font-bold text-xs">
                {shortlistData.length} Profiles Saved
              </span>
            </div>

            {shortlistData.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-outline-variant/30">
                <span className="material-symbols-outlined text-4xl sm:text-5xl text-outline mb-3">bookmark_border</span>
                <h4 className="font-bold text-base sm:text-lg text-on-surface">No shortlisted profiles yet</h4>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-sm mx-auto">
                  Explore top AI picks or recommendation streams to add candidate profiles to your shortlist.
                </p>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className="mt-6 px-6 py-2.5 bg-primary text-white rounded-full font-bold text-xs shadow-md"
                >
                  Explore Matches
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {shortlistData.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-md transition-all flex flex-col"
                  >
                    <div
                      onClick={() => router.push(`/profile/${item.id}`)}
                      className="relative h-56 sm:h-60 cursor-pointer group"
                    >
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {item.match} Match
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveShortlist(item.id);
                        }}
                        className="absolute top-3 left-3 sm:top-4 sm:left-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-colors"
                        title="Remove from shortlist"
                      >
                        <span className="material-symbols-outlined text-base">close</span>
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                        <h4 className="font-bold text-base sm:text-lg">{item.name}, {item.age}</h4>
                        <p className="text-xs text-white/80">{item.role}</p>
                        <p className="text-[11px] text-white/70 flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-xs">location_on</span>
                          {item.location}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                      <div className="p-2.5 sm:p-3 bg-surface-container rounded-2xl mb-3 sm:mb-4 border border-outline-variant/20">
                        <p className="text-[10px] uppercase font-bold text-outline tracking-wider mb-1">Personal Notes</p>
                        <p className="text-xs text-on-surface-variant leading-relaxed">{item.notes}</p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const idx = chatContacts.findIndex((c) => c.profileId === item.id);
                            setSelectedChatUser(idx !== -1 ? idx : 0);
                            setActiveTab("chat");
                          }}
                          className="flex-1 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-light flex items-center justify-center gap-1.5 transition-colors shadow-sm min-h-[42px]"
                        >
                          <span className="material-symbols-outlined text-sm">chat</span>
                          Send Message
                        </button>
                        <button
                          onClick={() => {
                            setActiveVideoProfileId(item.id);
                            setActiveTab("videocall");
                          }}
                          className="w-11 h-11 rounded-xl bg-secondary-container text-on-secondary-container hover:brightness-95 flex items-center justify-center transition-all shrink-0"
                          title="Start Video Call"
                        >
                          <span className="material-symbols-outlined text-base">videocam</span>
                        </button>
                        <Link
                          href={`/profile/${item.id}`}
                          className="w-11 h-11 rounded-xl bg-surface-container text-on-surface-variant hover:bg-surface-container-high flex items-center justify-center transition-colors shrink-0"
                          title="View Profile"
                        >
                          <span className="material-symbols-outlined text-base">visibility</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 4. CHAT SECTION (Responsive list & conversation view) */}
        {activeTab === "chat" && (
          <section className="bg-white rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden h-[calc(100vh-140px)] sm:h-[calc(100vh-160px)] min-h-[500px] flex flex-col md:flex-row">
            {/* Conversations Sidebar - full width on mobile unless viewing chat, or toggle */}
            <div className={`w-full md:w-80 border-r border-outline-variant/30 flex flex-col bg-surface-container-low shrink-0 ${
              selectedChatUser !== null && "hidden md:flex"
            }`}>
              <div className="p-3 sm:p-4 border-b border-outline-variant/20">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-base text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">forum</span>
                    Messages
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[10px]">
                    {chatContacts.length} Active
                  </span>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-sm">search</span>
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full bg-white rounded-xl pl-9 pr-4 py-2 text-xs border border-outline-variant/30 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Chat List */}
              <div className="flex-1 overflow-y-auto divide-y divide-outline-variant/10">
                {chatContacts.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedChatUser(c.id)}
                    className={`p-3.5 sm:p-4 flex items-center gap-3 cursor-pointer transition-colors ${
                      selectedChatUser === c.id ? "bg-white shadow-sm border-l-4 border-primary" : "hover:bg-white/60"
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img src={c.avatar} alt={c.name} className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border border-outline-variant/30" />
                      {c.online && (
                        <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-bold text-xs text-on-surface truncate">{c.name}</p>
                        <span className="text-[10px] text-outline font-medium">{c.match}</span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant truncate">{c.lastMsg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Chat Conversation Panel */}
            <div className={`flex-1 flex flex-col bg-white ${selectedChatUser === null ? "hidden md:flex" : "flex"}`}>
              {/* Header */}
              <div className="p-3 sm:p-4 px-4 sm:px-6 border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-lowest">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  {/* Mobile Back button to conversations list */}
                  <button
                    onClick={() => setSelectedChatUser(null)}
                    className="md:hidden p-1.5 -ml-1 text-on-surface hover:bg-surface-container rounded-lg"
                    title="Back to conversations"
                  >
                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                  </button>
                  <div className="relative shrink-0">
                    <img
                      src={chatContacts[selectedChatUser]?.avatar}
                      alt="Active chat"
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
                    />
                    {chatContacts[selectedChatUser]?.online && (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0"></span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-xs sm:text-sm text-on-surface truncate">{chatContacts[selectedChatUser]?.name}</h5>
                    <p className="text-[10px] sm:text-[11px] text-emerald-600 font-semibold truncate">{chatContacts[selectedChatUser]?.status}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <button
                    onClick={() => {
                      if (chatContacts[selectedChatUser]?.profileId) {
                        setActiveVideoProfileId(chatContacts[selectedChatUser].profileId);
                      }
                      setActiveTab("videocall");
                    }}
                    className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-xl bg-secondary-container text-on-secondary-container hover:brightness-95 text-xs font-bold transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined text-base">videocam</span>
                    <span className="hidden sm:inline">Video Call</span>
                  </button>
                  {chatContacts[selectedChatUser]?.profileId && chatContacts[selectedChatUser]?.profileId !== "concierge" && (
                    <Link
                      href={`/profile/${chatContacts[selectedChatUser].profileId}`}
                      className="p-2 rounded-xl text-outline hover:bg-surface-container transition-colors"
                      title="View Profile"
                    >
                      <span className="material-symbols-outlined text-lg">info</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Message History */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3 sm:space-y-4 bg-surface-container-low/40">
                <div className="text-center my-2">
                  <span className="text-[10px] sm:text-[11px] bg-white border border-outline-variant/30 text-outline px-3 py-1 rounded-full font-medium">
                    Encrypted End-to-End &middot; Aura Verified
                  </span>
                </div>

                {currentChatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] p-3 sm:p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                        msg.sender === "me"
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-white text-on-surface border border-outline-variant/30 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-outline mt-1 px-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="p-3 sm:p-4 bg-white border-t border-outline-variant/20 flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  className="p-2 text-outline hover:text-primary transition-colors shrink-0"
                  title="Attach file"
                >
                  <span className="material-symbols-outlined text-xl">attach_file</span>
                </button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a thoughtful message..."
                  className="flex-1 px-3 sm:px-4 py-2.5 bg-surface-container-low rounded-xl text-xs border border-outline-variant/30 focus:outline-none focus:border-primary min-w-0"
                />
                <button
                  type="submit"
                  className="px-4 sm:px-5 py-2.5 bg-primary hover:bg-primary-light text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm transition-all shrink-0"
                >
                  <span className="hidden sm:inline">Send</span>
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </form>
            </div>
          </section>
        )}

        {/* 5. VIDEO CALL SECTION */}
        {activeTab === "videocall" && (
          <section className="bg-slate-950 text-white rounded-3xl border border-outline-variant/30 shadow-2xl overflow-hidden p-4 sm:p-6 relative">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 z-10 relative">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm sm:text-base text-white truncate">
                    Aura HD Video Salon &middot; Room #{currentVideoProfile.id.slice(0, 4)}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-white/60 truncate">
                    Connected with {currentVideoProfile.name} ({currentVideoProfile.matchScore}% Compatibility)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 sm:px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] sm:text-[11px] font-semibold text-secondary-light flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-xs">lock</span>
                  Encrypted Aura Stream
                </span>
                <span className="px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] sm:text-[11px] font-semibold">
                  1080p Ultra HD
                </span>
              </div>
            </div>

            {/* Video Streams Container */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 min-h-[360px] sm:h-[460px] relative">
              {/* Remote Video Stream (Main) */}
              <div className="lg:col-span-3 bg-slate-900 rounded-2xl overflow-hidden relative shadow-inner border border-white/10 flex items-center justify-center min-h-[260px]">
                <img
                  src={currentVideoProfile.photos[0]?.src}
                  alt={`${currentVideoProfile.name} live call`}
                  className="w-full h-full object-cover"
                />

                {/* Overlaid badges */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  {currentVideoProfile.name} &middot; {currentVideoProfile.location}
                </div>

                {/* AI Conversation Starters overlay banner */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-black/65 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-white/15 flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-secondary text-base shrink-0">psychology</span>
                    <p className="text-[11px] sm:text-xs text-white/90 truncate sm:whitespace-normal">
                      <span className="font-bold text-secondary-light">AI Icebreaker:</span> {currentVideoProfile.name} is passionate about {currentVideoProfile.interests[0]}.
                    </p>
                  </div>
                  <span className="text-[10px] text-white/60 font-medium shrink-0 ml-2">Smart Assist</span>
                </div>
              </div>

              {/* Local Participant Preview & Call Sidebar */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
                {/* Alexander Self Stream */}
                <div className="h-36 sm:h-44 w-full sm:w-1/2 lg:w-full bg-slate-900 rounded-2xl overflow-hidden relative border border-white/15 shadow-md shrink-0">
                  {!isVideoCamOff ? (
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3y5qLdsohC6r_XeHXn_V9hAjXg0WCz4oab26h--A25rmHCZjlGU9gqZvHEz9Uh6u00DmztJH8H-aKl_LKa7PQvl4Tuq8zRFMYMaX5V0MqU-nDUm0Gd-HpmEnggBSI9dLlKYpSVeWZZKrAN0W0r2k7dtEwAa8tXKPrzd4wN3TMAhBaGrwwKjpxlu9hRsVkq85xeg5AYh_mZzp_pAqQP8F83YHM5tc7bfFnetGdK3NiwMYP3ea_G9n-rIhZ0hEEo64nG5weTBsU_Lw"
                      alt="Self Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-white/60 text-xs">
                      <span className="material-symbols-outlined text-3xl mb-1">videocam_off</span>
                      Camera Muted
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold">
                    You (Alexander)
                  </div>
                </div>

                {/* Quick Profile Summary during Call */}
                <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-secondary-light tracking-wider mb-2">Live Match Score</p>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-white/80">Psychological Fit</span>
                      <span className="text-xs font-bold text-emerald-400">{currentVideoProfile.matchScore}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-3">
                      <div className="bg-secondary h-full" style={{ width: `${currentVideoProfile.matchScore}%` }}></div>
                    </div>

                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-white/80">Lifestyle Harmony</span>
                      <span className="text-xs font-bold text-secondary-light">92%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-primary-container h-full w-[92%]"></div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <p className="text-[11px] text-white/70 italic">&ldquo;{currentVideoProfile.about.slice(0, 75)}...&rdquo;</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Call Controls Bottom Dock */}
            <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => setIsMicMuted(!isMicMuted)}
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
                  isMicMuted ? "bg-red-500 text-white" : "bg-white/10 hover:bg-white/20 text-white"
                }`}
                title={isMicMuted ? "Unmute Microphone" : "Mute Microphone"}
              >
                <span className="material-symbols-outlined text-xl">
                  {isMicMuted ? "mic_off" : "mic"}
                </span>
              </button>

              <button
                onClick={() => setIsVideoCamOff(!isVideoCamOff)}
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
                  isVideoCamOff ? "bg-red-500 text-white" : "bg-white/10 hover:bg-white/20 text-white"
                }`}
                title={isVideoCamOff ? "Turn Video On" : "Turn Video Off"}
              >
                <span className="material-symbols-outlined text-xl">
                  {isVideoCamOff ? "videocam_off" : "videocam"}
                </span>
              </button>

              <button
                onClick={() => {
                  const idx = chatContacts.findIndex((c) => c.profileId === currentVideoProfile.id);
                  setSelectedChatUser(idx !== -1 ? idx : 0);
                  setActiveTab("chat");
                }}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                title="Switch to Chat"
              >
                <span className="material-symbols-outlined text-xl">chat</span>
              </button>

              <button
                onClick={() => setActiveTab("dashboard")}
                className="px-5 sm:px-6 h-11 sm:h-12 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg"
              >
                <span className="material-symbols-outlined text-base">call_end</span>
                <span>End Call</span>
              </button>
            </div>
          </section>
        )}

      </div>

      {/* Mobile Bottom Navigation Bar (Visible only on < md screens) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-outline-variant/30 py-2 px-3 shadow-lg flex items-center justify-around">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`flex flex-col items-center justify-center p-1 rounded-xl transition-colors min-w-[56px] ${
            activeTab === "dashboard" ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
          }`}
        >
          <span className="material-symbols-outlined text-xl">dashboard</span>
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        <button
          onClick={() => setActiveTab("interests")}
          className={`flex flex-col items-center justify-center p-1 rounded-xl transition-colors min-w-[56px] relative ${
            activeTab === "interests" ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
          }`}
        >
          <span className="material-symbols-outlined text-xl">favorite</span>
          <span className="text-[10px] mt-0.5">Interests</span>
          <span className="absolute top-1 right-2.5 w-2 h-2 rounded-full bg-primary"></span>
        </button>

        {/* Highlighted Video Call Action in Bottom Nav */}
        <button
          onClick={() => setActiveTab("videocall")}
          className="flex flex-col items-center justify-center -mt-5 bg-gradient-to-tr from-primary to-primary-light text-white p-2.5 rounded-full shadow-lg transition-transform active:scale-95"
          title="Start Video Session"
        >
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            video_camera_front
          </span>
        </button>

        <button
          onClick={() => setActiveTab("shortlist")}
          className={`flex flex-col items-center justify-center p-1 rounded-xl transition-colors min-w-[56px] relative ${
            activeTab === "shortlist" ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
          }`}
        >
          <span className="material-symbols-outlined text-xl">star</span>
          <span className="text-[10px] mt-0.5">Shortlist</span>
          {shortlistData.length > 0 && (
            <span className="absolute top-0.5 right-2 text-[9px] bg-secondary-container text-on-secondary-container px-1 rounded-full font-bold">
              {shortlistData.length}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            setSelectedChatUser(0);
            setActiveTab("chat");
          }}
          className={`flex flex-col items-center justify-center p-1 rounded-xl transition-colors min-w-[56px] relative ${
            activeTab === "chat" ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
          }`}
        >
          <span className="material-symbols-outlined text-xl">chat</span>
          <span className="text-[10px] mt-0.5">Chat</span>
          <span className="absolute top-1 right-2.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </button>
      </nav>
    </div>
  );
}


export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
