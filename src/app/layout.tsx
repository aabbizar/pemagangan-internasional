import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { Preloader } from "@/components/common/preloader";
import { NoiseOverlay } from "@/components/common/noise-overlay";
import { SmoothScrollProvider } from "@/components/common/smooth-scroll";
import { Toaster } from "sonner";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#121212",
};

export const metadata: Metadata = {
  title: "Lembaga Pemagangan Internasional • Kemnaker RI",
  description: "Portal resmi pendaftaran, kualifikasi seleksi, dan penempatan program pemagangan luar negeri ke Jepang, Jerman, dan Korea Selatan di bawah pembinaan Ditjen Binalavotas, Kementerian Ketenagakerjaan Republik Indonesia.",
  authors: [{ name: "Kementerian Ketenagakerjaan RI" }],
  openGraph: {
    title: "Lembaga Pemagangan Internasional • Kemnaker RI",
    description: "Portal resmi seleksi dan penempatan program pemagangan luar negeri Republik Indonesia.",
    siteName: "Lembaga Pemagangan Internasional Kemnaker RI",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-[#E3E1DC] text-[#121212] selection:bg-[#1D4ED8] selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-5 focus:py-2.5 focus:bg-black focus:text-white focus:font-mono focus:text-xs focus:uppercase focus:tracking-wider"
        >
          Lewati ke Konten Utama
        </a>
        <Preloader />
        <NoiseOverlay />
        <SmoothScrollProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </SmoothScrollProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
