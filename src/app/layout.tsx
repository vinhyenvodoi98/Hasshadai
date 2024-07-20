import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./components/Provider";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme='dark'>
      <body className={inter.className}>
        <Providers>
          <Navbar/>
          <main className='flex justify-center'>
            <div className='container'>{children}</div>
          </main>
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
