"use client";
import AuthContext from "@/app/context/AuthContext";
import PrivateRoute from "@/app/util/PrivateRoute";
import Sidebar from "@/app/util/components/sidebar/sidebar";

export default function RootLayout({ children }) {
  return (
    <div className="flex w-full">
      <AuthContext>
        <PrivateRoute children={children}></PrivateRoute>
      </AuthContext>
    </div>
  );
}
