import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "문서 요약 AI",
  description: "AI 기반 문서 요약 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
