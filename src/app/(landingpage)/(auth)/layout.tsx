import type { Metadata } from "next";
import localFont from "next/font/local";
import "../../globals.css";
import Navbar from "../components/Navbar";
import CompanyLogos from "../components/company-logos";

const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FlightSafe - Website booking ticket",
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
        <section
          id="Signup"
          className="bg-[url('/assets/images/background/airplane.png')] bg-no-repeat bg-cover bg-left-top -z-10 min-h-screen"
        >
          <div className="Header-content bg-gradient-to-r from-[#080318] text-white to-[rgba(8,3,24,0)] z=0 min-h-screen">
            <Navbar />
            <div className="flex flex-col justify-between min-h-[calc(100vh-78px)]">
              {children}
              <CompanyLogos />
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
