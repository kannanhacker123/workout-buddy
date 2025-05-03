import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Chakra_Petch } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/my/NavBar";
import { Toaster } from "@/components/ui/sonner";
import SideBar from "@/components/my/SideBar";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});



// Add viewport export separately
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClasses = `${geistSans.variable} ${geistMono.variable} ${chakraPetch.variable}`;

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${fontClasses} antialiased min-h-screen`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <NavBar />
              <div className="flex flex-1 pt-16">
                <SideBar />
                <main className="flex-1 px-4 md:px-6 py-4 md:py-6 overflow-y-scroll h-[calc(100vh-64px)]">
                  <div className="max-w-7xl mx-auto">
                    {children}
                  </div>
                </main>
              </div>
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

export const metadata: Metadata = {
  title: 'Workout Buddy | AI-Powered Fitness Companion with Nero',
  description: 'Achieve your fitness goals with Workout Buddy and Nero, your AI personal trainer. Track workouts, get personalized plans, and receive real-time coaching.',
  keywords: 'workout app, fitness tracker, AI personal trainer, Nero, exercise planner',
  openGraph: {
    title: 'Workout Buddy | AI-Powered Fitness Companion',
    description: 'Train smarter with Nero, your AI fitness coach',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      }
    ],
    type: 'website',
    url: 'https://workout-buddy-gray.vercel.app/workout-buddy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workout Buddy | AI-Powered Fitness Companion',
    description: 'Train smarter with Nero, your AI fitness coach',
    images: ['/og-image.jpg'],
  },
}