import type { Metadata } from "next";
import { Inter } from "next/font/google";
//created two folders and change the directory 
import '../globals.css'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Huellas Familiares",
  description: "Family tracking made easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    //this file has to be a server component 
    <html lang="en">
      <body className={inter.className}>

        {children} {/* This is passed into <SignedIn> inside comp  */}


      </body>
    </html>

  );
}
