import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import CompanyLogos from "../components/company-logos";
import Footer from "../components/Footer";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Booking Flight | Landing Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${geistSans.variable} ${geistMono.variable} text-white font-poppins bg-flysha-black`}
      >
        
        {children}
        <Footer />
      </body>
    </html>
  );
}
