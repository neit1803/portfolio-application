import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Developer Portfolio",
  description: "Interactive developer workspace portfolio in development.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
