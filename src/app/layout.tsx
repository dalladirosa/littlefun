import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { clsx } from "clsx";

import Header from "@/components/header";

import "@mantine/core/styles.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <head>
        <title>LittleLives</title>
        <ColorSchemeScript />
      </head>
      <body className={clsx(inter.className)}>
        <MantineProvider>
          <DatesProvider
            settings={{
              locale: "en-US",
              firstDayOfWeek: 0,
              weekendDays: [0],
              timezone: "UTC",
            }}
          >
            <Header />
            {children}
          </DatesProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
