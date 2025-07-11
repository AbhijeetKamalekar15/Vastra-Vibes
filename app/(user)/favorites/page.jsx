"use client";

import { ProductCard } from "@/app/components/Products";
import { useAuth } from "../../../context/AuthContext";
import { useProduct } from "../../../lib/firestore/products/read";
import { useUser } from "../../../lib/firestore/user/read";
import { Loader2 } from "lucide-react";

export default function Page() {
  const { user } = useAuth();
  const { data, isLoading } = useUser({ uid: user?.uid });
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }
  return (
    <main className="flex flex-col gap-3 justify-center items-center p-5">
      <h1 className="text-2xl font-semibold">Favorites</h1>
      {(!data?.favorites || data?.favorites?.length === 0) && (
        <div className="flex flex-col gap-5 justify-center items-center h-full w-full py-20">
          <div className="flex justify-center">
            <img className="h-[200px]" src="/Empty-pana.svg" alt="" />
          </div>
          <h1 className="text-gray-600 font-semibold">
            Please Add Products To Favorites
          </h1>
        </div>
      )}
      <div className="p-5 w-full md:max-w-[900px] gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {data?.favorites?.map((productId) => {
          return <ProductItem productId={productId} key={productId} />;
        })}
      </div>
    </main>
  );
}

function ProductItem({ productId }) {
  const { data: product } = useProduct({ productId: productId });
  return <ProductCard product={product} />;
}