import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Job Finder",
  description: "Find your dream job easily",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
        {children}
      </body>
    </html>
  );
}
