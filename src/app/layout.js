import Link from "next/link";
import Header from "../components/Header";
import "./globals.css";

export const metadata = {
  title: "Aura Matrimony | Elite AI Matchmaking",
  description: "Where sophisticated souls meet intelligence. Our proprietary Aura AI analyzes deep psychological compatibility to curate matches that resonate with your lifestyle and values.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased light">
      <head>
        {/* Material Icons and Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-body select-none">
        
        {/* Responsive Header Component */}
        <Header />

        {/* Page Content wrapper */}
        <main className="flex-grow pt-16 sm:pt-20">
          {children}
        </main>

        {/* Global Footer */}
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

      </body>
    </html>
  );
}
