import localFont from "next/font/local";
import "./globals.css";
import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/Providers/Theme";
import Header from "@/components/Header";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
import CustomCursor from "@/components/CustomCursor";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata = {
  title: "Ashon Baiju",
  icons: {
    icon: "/logo.png",
  },
  description:
    "Experienced fullstack developer specializing in modern web technologies. View my projects, skills, and experience.",
  keywords:
    "fullstack developer,backend developer, frontend developer, web development, JavaScript,JS, C#, CSharp, React, Node.js, portfolio",
  author: "Huzaif Ahmed",
  robots: "index, follow",
};

// optional but good: make viewport explicit
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

          <GridPattern
            width={200}
            height={200}
            x={-1}
            y={-1}
            className={cn(
              "[mask-image:linear-gradient(to_bottom,white,transparent)]"
            )}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
