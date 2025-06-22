"use client";

import { useAuth } from "../../../../../context/AuthContext";
import { useReviews } from "../../../../../lib/firestore/reviews/read";
import { deleteReview } from "../../../../../lib/firestore/reviews/write";
import { useUser } from "../../../../../lib/firestore/user/read";
import { Rating } from "@mui/material";
import { Button } from "../../../../../components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../../../../../components/ui/avatar";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Reviews({ productId }) {
  const { data } = useReviews({ productId: productId });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { data: userData } = useUser({ uid: user?.uid });

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    setIsLoading(true);
    try {
      if (!user) {
        throw new Error("Please log in first.");
      }
      await deleteReview({
        uid: user?.uid,
        productId: productId,
      });
      toast.success("Review deleted.");
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 p-5 bg-white rounded-2xl border shadow-sm w-full">
      <h1 className="text-xl font-bold text-gray-900">Reviews</h1>
      {data?.length === 0 && (
        <p className="text-sm text-gray-500">No reviews yet.</p>
      )}
      <div className="flex flex-col gap-4">
        {data?.map((item) => {
          return (
            <div key={item?.uid} className="flex gap-3 border-b pb-4 last:border-b-0">
              <div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={item?.photoURL} alt={item?.displayName ?? "User"} />
                  <AvatarFallback>
                    {item?.displayName?.charAt(0).toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="font-semibold text-sm">{item?.displayName}</h1>
                    <Rating value={item?.rating} readOnly size="small" />
                  </div>
                  {user?.uid === item?.uid && (
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={isLoading}
                      onClick={handleDelete}
                      className="text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                    </Button>
                  )}
                </div>
                <p className="text-sm text-gray-700 pt-1">{item?.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
