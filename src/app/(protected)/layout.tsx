import type { Metadata } from "next";
import "../../app/globals.css";
import { Providers } from "../../context/providers";
import { AuthProvider } from "@/context/AuthContext";
import { AuthGate } from "../../components/gates/AuthGate";
import { Header } from "@/components/Header/Header";
import OnBoardinggate from "../../components/gates/OnBoardingGate";

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
    // <html lang="en">
    //   <body className={`antialiased dark`}>
    <Providers>
      <AuthProvider>
        <AuthGate>
          <Header />
          <OnBoardinggate />
          {children}
        </AuthGate>
      </AuthProvider>
    </Providers>
    //   </body>
    // </html>
  );
}
