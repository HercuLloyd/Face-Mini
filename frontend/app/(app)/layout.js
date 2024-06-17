"use client";
import { AuthProvider } from "../context/AuthContext";
export default function RootLayout({ children }) {
  return (
      <div className="flex w-full">{children}</div>
  );
}
