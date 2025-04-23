import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { ClerkProvider } from "@clerk/nextjs"; 
import { Toaster } from "@/components/ui/sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "QuickForms AI",
  description: "Let AI Build Your Forms",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en" data-theme="light">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header></Header>
        <Toaster/>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
