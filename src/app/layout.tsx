import type { Metadata } from "next";
import Providers from "./components/Provider";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import OCIDProvider from "./components/Provider/OCIDProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hasshadai",
  description: "First Learning launchpad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div data-theme='dark'>
          <OCIDProvider>
            <Providers>
              <Navbar/>
              <main className='flex justify-center'>
                <div className='container min-h-main'>{children}</div>
              </main>
              <Footer/>
            </Providers>
          </OCIDProvider>
        </div>
      </body>
    </html>
  );
}
