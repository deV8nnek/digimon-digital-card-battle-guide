import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/component/theme-provider"; // Use the correct path
import "@/style/globals.css";

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Digimon Digital Card Battle Guide",
  description: "A Game Guide for Digimon Digital Card Battle that shows card collection, card distribution, and predict card fusion.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning helps avoid React warnings
    <html lang="jp" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" key="charset" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.variable} font-sans`}>
        {/* Wrap the entire content that should react to theme changes */}
        <ThemeProvider>
          {/* e.g., <Header /> */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
