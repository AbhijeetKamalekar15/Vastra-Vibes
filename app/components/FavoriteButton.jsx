"use client";

import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../lib/firestore/user/read";
import { updateFavorites } from "../../lib/firestore/user/write";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/navigation";

export default function FavoriteButton({ productId }) {
  const { user } = useAuth();
  const { data } = useUser({ uid: user?.uid });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlClick = async () => {
    setIsLoading(true);
    try {
      if (!user?.uid) {
        router.push("/login");
        throw new Error("Please log in first!");
      }
      if (data?.favorites?.includes(productId)) {
        const newList = data?.favorites?.filter((item) => item != productId);
        await updateFavorites({ list: newList, uid: user?.uid });
        toast.success("Removed from favorites");
      } else {
        await updateFavorites({
          list: [...(data?.favorites ?? []), productId],
          uid: user?.uid,
        });
        toast.success("Added to favorites");
      }
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  const isLiked = data?.favorites?.includes(productId);

  const buttonClass =
    "flex items-center justify-center h-8 w-8 rounded-full border border-gray-300 text-[#DF6945] hover:bg-red-50 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md";

  const loadingClass = isLoading ? "opacity-50 cursor-not-allowed" : "";

  return (
    <Button
      disabled={isLoading}
      onClick={handlClick}
      aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
      className={`${buttonClass} ${loadingClass}`}
      size="icon"
      variant="ghost"
    >
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4 text-red-500"
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
      ) : isLiked ? (
        <FavoriteIcon fontSize="small" />
      ) : (
        <FavoriteBorderOutlinedIcon fontSize="small" />
      )}
    </Button>
  );
}
