import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "Atchayas - Pre-Booking System",
  description: "Skip the queue. Pre-order your favorite dishes from Atchayas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans text-[#3d3d33] antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}