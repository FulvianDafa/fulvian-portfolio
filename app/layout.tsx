import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fulvian — Software Engineering, Quality & Delivery",
  description: "Mochammad Fulvian Dafa Pranaja's portfolio across software engineering, quality assurance, project ownership, web development, and delivery.",
  robots: { index: false, follow: false },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
