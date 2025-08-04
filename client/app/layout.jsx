import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "@/components/common/Header";
import { Toaster } from "@/components/ui/sonner";

import { ThemeProvider } from "@/components/theme/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TicketSpot",
  description: "Ticketing Application for Buy and Selling Tickets!",
};

const RootLayout = async ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>

        <Toaster position="top-right" richColors expand={true} />
      </body>
    </html>
  );
};

export default RootLayout;
