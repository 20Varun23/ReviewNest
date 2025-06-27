import React from "react";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ReviewNest",
  description: "Real reviews, Dream destinations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-600 min-h-screen flex flex-col`}
      >
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Emblema+One&family=Limelight&family=New+Rocker&family=Rye&display=swap');
        </style>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <br />
        <Footer />
      </body>
    </html>
  );
}
