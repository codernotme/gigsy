import './globals.css';
import './minecraft-theme.css';
import type { Metadata } from 'next';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";



export const metadata: Metadata = {
  title: 'Gigsy - Your Gaming-Inspired Freelance Platform',
  description: 'Join the Gigsy world - where freelancing meets gaming. Earn GigCoins, complete quests, and level up your freelance career!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="minecraft-style">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}