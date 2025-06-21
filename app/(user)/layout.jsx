"use client";

import { Loader2 } from "lucide-react";
import AuthContextProvider, { useAuth } from "../../context/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <main>
      <Header />
      <AuthContextProvider>
        <UserChecking>
          <section className="min-h-screen">{children}</section>
        </UserChecking>
      </AuthContextProvider>
      <Footer />
    </main>
  );
}

function UserChecking({ children }) {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }
  if (!user) {
    return (
      <div className="h-screen w-full flex flex-col gap-3 justify-center items-center">
        <h1 className="text-sm text-gray-600">You are not logged In!</h1>
        <Link href={"/login"}>
          <button className="text-white bg-blue-500 px-4 py-2 text-sm rounded-xl">
            Login
          </button>
        </Link>
      </div>
    );
  }
  return <>{children}</>;
}