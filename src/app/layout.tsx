import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { AuthProvider } from "@/context/AuthContext";
import { AuthGate } from "./AuthGate";

export const metadata: Metadata = {
  title: "tracking my workout",
  description: "tracking my workout"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased dark`}>
        <Providers>
          <AuthProvider>
            <AuthGate>{children}</AuthGate>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
