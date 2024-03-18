import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/shared/providers/auth_provider";
import { Toaster } from "sonner";
import Navbar from "@/shared/components/navbar";
import WeatherProvider from "@/shared/weather_provider";
import ModalConfigs from "@/shared/components/modal_configs";
import ReadingsProvider from "@/shared/providers/readings_provider";

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
    <html lang="en">
      <AuthProvider>
        <WeatherProvider>
          <ReadingsProvider>
            <body className={`${font.className}`}>
              <Toaster
                position={"top-right"}
                closeButton
                richColors
                duration={4000}
              />
              <ModalConfigs />
              <Navbar />
              {children}
            </body>
          </ReadingsProvider>
        </WeatherProvider>
      </AuthProvider>
    </html>
  );
}
