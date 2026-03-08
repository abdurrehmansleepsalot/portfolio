import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Abdur Rehman | Portfolio",
  description:
    "Coder • Photographer • Creative — Portfolio of Muhammad Abdur Rehman, Data Science student at Punjab University.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
