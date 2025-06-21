"use client";

import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../lib/firestore/user/read";
import { Badge } from "../../components/ui/badge";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function HeaderClientButtons() {
  const { user } = useAuth();
  const { data } = useUser({ uid: user?.uid });

  const favoritesCount = data?.favorites?.length ?? 0;
  const cartCount = data?.carts?.length ?? 0;

  return (
    <div className="flex items-center gap-2 relative">
      {/* Favorites Button */}
      <Link href={`/favorites`} className="relative">
        <button
          title="My Favorites"
          className="h-8 w-8 flex justify-center items-center rounded-full text-[#111827] hover:text-[#2A9D8F] relative"
        >
          <Heart size={16} />
          {favoritesCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] h-4 w-4 flex items-center justify-center rounded-full p-0"
            >
              {favoritesCount}
            </Badge>
          )}
        </button>
      </Link>

      {/* Cart Button */}
      <Link href={`/cart`} className="relative">
        <button
          title="My Cart"
          className="h-8 w-8 flex justify-center items-center rounded-full text-[#111827] hover:text-[#2A9D8F] relative"
        >
          <ShoppingCart size={16} />
          {cartCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] h-4 w-4 flex items-center justify-center rounded-full p-0"
            >
              {cartCount}
            </Badge>
          )}
        </button>
      </Link>
    </div>
  );
}
