import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/shared/providers/auth_provider";
import { Toaster } from "sonner";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Farm Choice",
  description: "Revolutionary way to manage your farm",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
        <Toaster
          position={"top-right"}
          closeButton
          richColors
          duration={4000}
        />
        <body className={font.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}
