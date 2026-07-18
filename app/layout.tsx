import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sambit OS — Backend Engineer",
  description: "Sambit Pradhan's developer workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
