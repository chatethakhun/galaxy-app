import type { Metadata } from "next";
import { Inter, Rubik } from "next/font/google";
import "./globals.css";
import "react-tooltip/dist/react-tooltip.css";
import ClerkClientProvider from "@/providers/ClerkClientProvider";
import MainNav from "@/components/shared/MainNav";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { useTheme } from "next-themes";

const inter = Rubik({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

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
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkClientProvider>
            <MainNav />
            {children}
          </ClerkClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
