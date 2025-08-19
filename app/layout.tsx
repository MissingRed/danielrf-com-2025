import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
// Add the import for AnalyticsTracker
import AnalyticsTracker from "@/components/analytics-tracker";
import { Suspense } from "react";
import FloatingChat from "@/components/floating-chat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daniel Rodríguez - Full-Stack Developer",
  description:
    "A professional portfolio showcasing the skills and projects of Daniel Rodríguez, a full-stack developer.",
  generator: "",
};

// Update the RootLayout function to include AnalyticsTracker
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense>
            <AnalyticsTracker />
            {children}
            <FloatingChat />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
