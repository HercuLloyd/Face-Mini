import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Face Mini",
  description: "Face Mini MVP",
};

export default function RootLayout({ children }) {
  return (
    <html className="" lang="en">
      <body className={`${inter.className} flex w-full overflow-y-scroll`}>{children}</body>
    </html>
  );
}
