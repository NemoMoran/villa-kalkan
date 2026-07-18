import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const description =
  "Hand-picked luxury villas for daily rental in Kalkan. Browse our villas, check live availability, and book directly on Airbnb or Booking.com.";

export const metadata: Metadata = {
  metadataBase: new URL("https://villa-kalkan.net"),
  title: {
    default: "Villa Kalkan | Luxury Villa Rentals in Kalkan",
    template: "%s | Villa Kalkan",
  },
  description,
  openGraph: {
    title: "Villa Kalkan | Luxury Villa Rentals in Kalkan",
    description,
    url: "https://villa-kalkan.net",
    siteName: "Villa Kalkan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Villa Kalkan | Luxury Villa Rentals in Kalkan",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunitoSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
