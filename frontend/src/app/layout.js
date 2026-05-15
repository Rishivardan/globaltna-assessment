import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-primary",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-secondary",
  subsets: ["latin"],
});

export const metadata = {
  title: "TradeMatch",
  description: "Find the right tradesperson for every job.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
