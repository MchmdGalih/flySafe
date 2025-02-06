import type { Metadata } from "next";
import localFont from "next/font/local";
import "../../globals.css";
import { Button } from "@/components/ui/button";
import { Plane, BookOpenCheck, Ticket, User } from "lucide-react";
import Link from "next/link";
import ButtonLogout from "./components/button-logout";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

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
  title: "Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, user } = await getUser();

  if (session === null || user.role === "CUSTOMER") {
    return redirect("/dashboard/signin");
  }
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <section>
          <nav className="border-b border-muted p-5">
            <div className="flex flex-row items-center justify-between">
              <span className="font-bold text-primary">FlySafe Dashboard</span>
            </div>
          </nav>

          <section className="flex flex-row gap-5 items-start flex-nowrap ">
            <section className="grow-0 w-[20%] h-screen shadow p-5 space-y-5 ">
              <div className="space-y-2">
                <Button
                  variant={"ghost"}
                  asChild
                  className="w-full justify-start"
                >
                  <Link href={"/dashboard"}>Dashboard</Link>
                </Button>
              </div>
              <div className="space-y-2">
                <div className="font-bold text-xs uppercase">Master Data</div>
                <Button
                  variant={"ghost"}
                  asChild
                  className="w-full justify-start"
                >
                  <Link href={"/dashboard/airplanes"}>
                    <Plane />
                    Airplanes
                  </Link>
                </Button>
                <Button
                  variant={"ghost"}
                  asChild
                  className="w-full justify-start"
                >
                  <Link href={"/dashboard/flights"}>
                    <BookOpenCheck />
                    Flights
                  </Link>
                </Button>
                <Button
                  variant={"ghost"}
                  asChild
                  className="w-full justify-start"
                >
                  <Link href={"/dashboard/tickets"}>
                    <Ticket />
                    Tickets
                  </Link>
                </Button>
                <Button
                  variant={"ghost"}
                  asChild
                  className="w-full justify-start"
                >
                  <Link href={"/dashboard/users"}>
                    <User />
                    User
                  </Link>
                </Button>

                <ButtonLogout />
              </div>
            </section>

            <section className="grow mr-5 mt-5 h-[87vh] overflow-y-auto">
              {children}
            </section>
          </section>
        </section>
      </body>
    </html>
  );
}
