"use client";

import { Loader2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useUser } from "../../../lib/firestore/user/read";
import { useSearchParams } from "next/navigation";

export default function Layout({ children }) {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const productId = searchParams.get("productId");

  const { user } = useAuth();
  const { data, error, isLoading } = useUser({ uid: user?.uid });

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (type === "cart" && (!data?.carts || data?.carts?.length === 0)) {
    return (
      <div>
        <h2>Your Cart Is Empty</h2>
      </div>
    );
  }
  if (type === "buynow" && !productId) {
    return (
      <div>
        <h2>Product Not Found!</h2>
      </div>
    );
  }
  
  return <>{children}</>;
}