import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { auth } from "@clerk/nextjs/server";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "BSTCON Monitor",
  description: "App to monitor BSTCON registrations and payment transactions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { sessionClaims } = auth();
  const role = sessionClaims?.metadata.role;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <div className="flex flex-col justify-between h-screen">
            <div className="flex flex-col space-y-12">
              <Header userRole={role} />
              <main>{children}</main>
            </div>
            <Footer />
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
