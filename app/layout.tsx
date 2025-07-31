import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import ThemeProvider from "./components/ThemeProvider"; // Your theme provider

export const metadata: Metadata = {
  title: "Tech events",
  description: "Discover amazing tech events, workshops, and meetups happening near you!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

