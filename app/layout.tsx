import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const IBMPLEX = IBM_Plex_Sans({ 
  subsets: ["latin"],
  weight: ['400','500','600','700'],
  variable: '--font-ibm-plex'
 });

export const metadata: Metadata = {
  title: "Visualizxr",
  description: "An Ad Libary Tracker Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      variables: {colorPrimary: '#624cf5'}
    }}>
      <html lang="en">
        <body className={cn("font-IBMPLEX antialiased", IBMPLEX.variable)}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
