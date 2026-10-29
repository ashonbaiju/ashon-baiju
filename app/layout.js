
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/Providers/Theme";
import Header from "@/components/Header";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
import CustomCursor from "@/components/CustomCursor";
import MinimalGlow from "@/components/MinimalGlow";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata = {
  metadataBase: new URL("https://ashon-baiju.vercel.app"),

  title: {
    default: "Ashon Baiju | Full Stack Developer",
    template: "%s | Ashon Baiju",
  },

  description:
    "Ashon Baiju is a full stack developer specializing in modern web technologies. Explore projects, technical skills, and experience.",

  applicationName: "Ashon Baiju Portfolio",

  authors: [{ name: "Ashon Baiju" }],
  creator: "Ashon Baiju",
  publisher: "Ashon Baiju",

  verification: {
    google: "AP2OEOvaTH03gPvTrE8DIywtw6OrbBFsbltyRddMNeE",
  },

  keywords: [
    "Ashon Baiju",
    "Ashon Baiju portfolio",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
    "React",
    "Next.js",
    "JavaScript",
    "Node.js",
    "Web Development",
  ],

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: "https://ashon-baiju.vercel.app/",
    siteName: "Ashon Baiju Portfolio",
    title: "Ashon Baiju | Full Stack Developer",
    description:
      "Explore Ashon Baiju's portfolio, projects, skills, and experience.",
    images: [
      {
        url: "/logo.png",
        alt: "Ashon Baiju portfolio logo",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: "Ashon Baiju | Full Stack Developer",
    description:
      "Explore Ashon Baiju's portfolio, projects, skills, and experience.",
    images: ["/logo.png"],
  },

  icons: {
    icon: "/logo.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} antialiased overflow-x-hidden max-w-full`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />

          <NextTopLoader />

          <Header />

          <main className="w-full min-h-screen overflow-x-hidden">
            {children}
          </main>

          <Footer />

          <Toaster
            position="top-right"
            toastOptions={{
              className:
                "font-semibold backdrop-blur-md text-black rounded-3xl",
            }}
          />

          <MinimalGlow />

          <GridPattern
            width={200}
            height={200}
            x={-1}
            y={-1}
            className={cn(
              "[mask-image:linear-gradient(to_bottom,white,transparent)]"
            )}
          />

          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
