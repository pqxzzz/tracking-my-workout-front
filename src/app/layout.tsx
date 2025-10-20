// src/app/layout.tsx
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* TODO: arrumar erro antialiased dark  */}
      <body className="antialiased dark">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
