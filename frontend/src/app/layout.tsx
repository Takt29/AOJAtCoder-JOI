import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";
import { Header } from "@/components/header/Header";

export const metadata: Metadata = {
  title: "AOJ/AtCoder-JOI",
  description: "日本情報オリンピック(JOI)の過去問の正答状況表示サイト (非公式)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="min-h-screen w-full bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 dark:from-slate-900 dark:via-gray-800 dark:to-neutral-900">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="container mx-auto px-4 py-8">
              {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
