import Shell from "../components/Shell";
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
      <body className="h-full bg-background text-foreground font-body">
        <Shell>
          {children}
        </Shell>
      </body>
    </html>
  );
}
