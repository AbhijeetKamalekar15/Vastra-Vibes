"use client";

import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../lib/firestore/user/read";
import { updateCarts } from "../../lib/firestore/user/write";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/navigation";

export default function AddToCartButton({ productId, type }) {
  const { user } = useAuth();
  const { data } = useUser({ uid: user?.uid });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isAdded = data?.carts?.find((item) => item?.id === productId);

  const handlClick = async () => {
    setIsLoading(true);
    try {
      if (!user?.uid) {
        router.push("/login");
        throw new Error("Please log in first!");
      }
      if (isAdded) {
        const newList = data?.carts?.filter((item) => item?.id !== productId);
        await updateCarts({ list: newList, uid: user?.uid });
      } else {
        await updateCarts({
          list: [...(data?.carts ?? []), { id: productId, quantity: 1 }],
          uid: user?.uid,
        });
      }
      toast.success(isAdded ? "Removed from cart" : "Added to cart");
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  // Responsive button classes
  const buttonClass =
    type === "large"
      ? "flex items-center justify-center gap-2 px-5 py-2 rounded-full text-white font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
      : "flex items-center justify-center gap-2 px-3 py-1 rounded-md text-white font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 text-[10px] md:text-xs";

  const bgClass = isAdded
    ? "bg-[#2c58b9] hover:bg-green-600 active:bg-green-700"
    : "bg-[#4a7c79] hover:bg-[#3a6663] active:bg-blue-800";

  const loadingClass = isLoading ? "opacity-50 cursor-not-allowed" : "";

  return (
    <Button
      disabled={isLoading}
      onClick={handlClick}
      aria-label={isAdded ? "Remove from cart" : "Add to cart"}
      className={`${buttonClass} ${bgClass} ${loadingClass}`}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      )}
      {!isLoading && !isAdded && <AddShoppingCartIcon className="text-sm" />}
      {!isLoading && isAdded && <ShoppingCartIcon className="text-sm" />}
      {!isLoading && !isAdded && <span>Add To Cart</span>}
      {!isLoading && isAdded && <span>Added!</span>}
    </Button>
  );
}

