"use client";
import AuthContext from "@/app/context/AuthContext";
import PrivateRoute from "@/app/util/PrivateRoute";
import NavBar from "@/app/util/components/navbar/navbar";

export default function RootLayout({ children }) {
  return (
    <div className="h-full w-full">
      <PrivateRoute children={<Content children={children} />}></PrivateRoute>
    </div>
  );
}
function Content({ children }) {
  return (
    <div className="flex h-full w-full flex-row-reverse">
      {children}
      <NavBar />
    </div>
  );
}
