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
    if (!confirm("Are you sure?")) return;
    setIsLoading(true);
    try {
      if (!user) {
        throw new Error("Please Logged In First");
      }
      await deleteReview({
        uid: user?.uid,
        productId: productId,
      });
      toast.success("Successfully Deleted");
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
    

  };

  return (
    <div className="flex flex-col gap-3 p-3 rounded-xl border w-full">
      <h1 className="text-lg font-semibold">Reviews</h1>
      <div className="flex flex-col gap-4">
        {data?.map((item) => {
          console.log("photoURL:", item?.photoURL);
          return (
            <div className="flex gap-3">
              <div className="">
                <Avatar>
  <AvatarImage src={item?.photoURL} alt={item?.displayName ?? "User"} />
  <AvatarFallback>
    {item?.displayName?.charAt(0).toUpperCase() ?? "U"}
  </AvatarFallback>
</Avatar>

              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between">
                  <div>
                    <h1 className="font-semibold">{item?.displayName}</h1>
                    <Rating value={item?.rating} readOnly size="small" />
                  </div>
                  {user?.uid === item?.uid && (
                    <Button
                      
                      size="sm"
                      color="danger"
                      variant="flat"
                      disabled={isLoading}
                      onClick={handleDelete}
                    >
                      <Trash2 size={12} />
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