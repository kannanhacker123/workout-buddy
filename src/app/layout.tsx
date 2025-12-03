import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Chakra_Petch } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/my/NavBar";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from '@vercel/analytics/next';

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
            {children}
          </div>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL('https://workout-buddy-gray.vercel.app'),
  title: {
    default: 'Workout Buddy | AI-Powered Fitness Companion',
    template: '%s | Workout Buddy'
  },
  description: 'Achieve your fitness goals with Workout Buddy and Nero, your AI personal trainer. Track workouts, get personalized plans, and receive real-time coaching.',
  keywords: ['workout app', 'fitness tracker', 'AI personal trainer', 'Nero', 'exercise planner', 'gym log', 'health', 'wellness'],
  authors: [{ name: 'Kannan', url: 'https://github.com/kannanhacker123' }],
  creator: 'Kannan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://workout-buddy-gray.vercel.app',
    title: 'Workout Buddy | AI-Powered Fitness Companion',
    description: 'Train smarter with Nero, your AI fitness coach. Personalized workout plans and real-time tracking.',
    siteName: 'Workout Buddy',
    images: [
      {
        url: 'https://github.com/kannanhacker123/workout-buddy/blob/master/public/Nero.png?raw=true',
        width: 1200,
        height: 630,
        alt: 'Workout Buddy - AI Fitness Companion',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workout Buddy | AI-Powered Fitness Companion',
    description: 'Train smarter with Nero, your AI fitness coach.',
    images: ['https://github.com/kannanhacker123/workout-buddy/blob/master/public/Nero.png?raw=true'],
    creator: '@kannanhacker123', 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};