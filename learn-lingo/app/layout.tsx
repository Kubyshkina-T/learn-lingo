import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header/Header";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LearnLingo",
  description: "Find your perfect language tutor",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <Header />

        {children}

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}
        />
      </body>
    </html>
  );
}
