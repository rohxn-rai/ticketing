import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "@/components/common/Header";

import { getCurrentUser } from "@/utils/getCurrentUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GitTix",
  description: "Ticketing Application for Buy and Selling Tickets!",
};

const RootLayout = async ({ children }) => {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
