"use client";

import { Button } from "@/components/ui/button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import toast from "react-hot-toast";
import { auth } from "../../../lib/firestore/firebase";
import { useState } from "react";

export default function Page() {
  return (
    <main className="w-full flex justify-center items-center bg-[#f9f9f7] md:p-24 p-10 min-h-screen">
      <section className="flex flex-col gap-5 w-full max-w-[480px]">
        <div className="flex justify-center w-full">
          <img className="h-12" src="/logo.svg" alt="Logo" />
        </div>
        <div className="flex flex-col gap-4 bg-white md:p-10 p-6 rounded-xl w-full shadow-md">
          <h1 className="font-bold text-xl text-center text-gray-800">
            Login With Email
          </h1>
          <form className="flex flex-col gap-3" action="">
            <input
              placeholder="Enter Your Email"
              type="email"
              name="user-email"
              id="user-email"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              placeholder="Enter Your Password"
              type="password"
              name="user-password"
              id="user-password"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-all"
            >
              Login
            </Button>
          </form>
          <div className="flex justify-between flex-wrap gap-2">
            <Link href="/sign-up">
              <button className="font-semibold md:text-sm text-xs text-indigo-600 hover:text-indigo-800 transition-colors">
                New? Create Account
              </button>
            </Link>
            <Link href="/forget-password">
              <button className="font-semibold md:text-sm text-xs text-indigo-600 hover:text-indigo-800 transition-colors">
                Forget Password?
              </button>
            </Link>
          </div>
          <hr className="my-4" />
          <SignInWithGoogleComponent />
        </div>
      </section>
    </main>
  );
}

function SignInWithGoogleComponent() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const user = await signInWithPopup(auth, new GoogleAuthProvider());
      toast.success("Signed in successfully!");
      console.log("Google user:", user);
    } catch (error) {
      toast.error(error?.message || "Google sign-in failed");
    }
    setIsLoading(false);
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleLogin}
      disabled={isLoading}
      className="flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <>
          <span className="w-4 h-4 border-2 border-t-transparent border-gray-500 rounded-full animate-spin"></span>
          Signing in...
        </>
      ) : (
        <>
          <img className="h-5 w-5" src="/google.svg" alt="Google" />
          Sign In With Google
        </>
      )}
    </Button>
  );
}
