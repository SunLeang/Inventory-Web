import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Legendary Inventory",
  description: "Manage your epic gaming inventory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased dark">{children}</body>
    </html>
  );
}
