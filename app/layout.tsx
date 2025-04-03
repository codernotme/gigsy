import './globals.css';
import './minecraft-theme.css';
import '@/styles/minecraft-toast.css';
import type { Metadata } from 'next';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";
import { MinecraftToaster } from '@/components/minecraft-toaster';
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Provider } from '@/components/Provider';


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
    <ConvexAuthNextjsServerProvider>
      <Provider>
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
          <MinecraftToaster />
        </ThemeProvider>
      </body>
    </html>
    </Provider>
    </ConvexAuthNextjsServerProvider>
  );
}