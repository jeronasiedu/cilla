import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/shared/providers/auth_provider";
import { Toaster } from "sonner";
import Navbar from "@/shared/components/navbar";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Farm House",
  description: "Revolutionary way to manage your farm",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${font.className}`}>
          <Toaster
            position={"top-right"}
            closeButton
            richColors
            duration={4000}
          />
          <Navbar />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
