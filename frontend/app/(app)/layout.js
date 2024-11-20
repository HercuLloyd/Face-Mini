"use client";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "../util/PrivateRoute";
export default function RootLayout({ children }) {
  return <div className="flex w-full">{children}</div>;
}
