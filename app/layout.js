import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import style from "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ExamMax",
  description: "An AI app that helps you prepare for exam better",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
