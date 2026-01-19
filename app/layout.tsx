import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import WhatsAppButton from "@/components/WhatsAppButton";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fabmorocco.com"),
  title: {
    default: "Fab Morocco | Private Tours with Local Experts",
    template: "%s | Fab Morocco",
  },
  description: "Private tours in Morocco. Desert trips, city tours, and custom itineraries.",
  keywords: ["morocco tours", "morocco private tours", "marrakech tours", "sahara desert tour", "morocco travel", "morocco day trips", "fes to chefchaouen", "morocco tour operator", "best morocco tours", "morocco vacation packages"],
  authors: [{ name: "Fab Morocco" }],
  creator: "Fab Morocco",
  publisher: "Fab Morocco",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fabmorocco.com",
    siteName: "Fab Morocco",
    title: "Fab Morocco | Private Morocco Tours with Local Experts",
    description: "Private tours in Morocco. Desert trips, city tours, and custom itineraries.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fab Morocco - Private tours with local experts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fab Morocco | Private Morocco Tours with Local Experts",
    description: "Book unforgettable private tours in Morocco. Desert trips, city tours, and custom itineraries with Mohammed & team.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://fabmorocco.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics - Replace with your own ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZG5QXS4P5D"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZG5QXS4P5D');
          `}
        </Script>
      </head>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
        <WhatsAppButton />
      </body>
    </html>
  );
}
