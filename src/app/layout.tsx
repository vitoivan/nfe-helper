import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const poppinsSans = Poppins({
  // variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "NFE Helper",
};


function Header() {
  return (
    <header className="container flex justify-center my-10 mx-auto">
      <h1
        className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl"
      >
        Gerador de chave de acesso
      </h1>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppinsSans.className} antialiased`}
      >
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
