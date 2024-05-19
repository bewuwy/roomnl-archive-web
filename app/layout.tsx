import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ROOM.nl archive",
  description: "Archive of ROOM.nl recently rented rooms data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <NavBar />
        
        <main className="flex min-h-screen flex-col items-center justify-center p-24 pb-10">
        {children}
        </main>
      
      </body>
    </html>
  );
}
