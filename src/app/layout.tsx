import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/modules/core/components/NavigationBar";
import Image from 'next/image';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog",
  description: "He Quanjie Boey's Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const navItems = [
    { linkName: 'HOME', linkUrl: '#', accessibleRoles: [] },
    { linkName: 'ABOUT US', linkUrl: '#', accessibleRoles: [] },
  ];

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={`z-20 fixed top-0 mb-8 h-20 w-screen bg-slate-800`}>
          <Image
            src="./navigation/wave.svg"
            alt="Wave"
            className="relative top-0 h-20 w-screen"
            fill
          />
        </div>
        <NavigationBar
          brandName={'Blog'}
          navItems={navItems}
          imageSrcPath="./navigation/logo.svg"
          className="z-30 fixed left-0 right-0 top-0 mx-auto mt-10 w-screen max-w-screen-lg shadow-xl lg:rounded-xl"
        />
        <div className={`relative top-32`}>
          {children}
        </div>
      </body>
    </html>
  );
}
