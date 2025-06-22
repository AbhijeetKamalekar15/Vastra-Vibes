import AddToCartButton from "@/app/components/AddToCartButton";
import FavoriteButton from "@/app/components/FavoriteButton";
import MyRating from "@/app/components/MyRating";
import AuthContextProvider from "../../../../../context/AuthContext";
import { getBrand } from "../../../../../lib/firestore/brands/read_server";
import { getCategory } from "../../../../../lib/firestore/categories/read_server";
import { getProductReviewCounts } from "../../../../../lib/firestore/products/count/read";
import Link from "next/link";
import { Suspense } from "react";

export default function Details({ product }) {
  return (
    <div className="w-full flex flex-col gap-5 p-4 md:p-6 bg-white rounded-2xl border shadow-sm">
      
      {/* Category + Brand */}
      <div className="flex gap-3 flex-wrap">
        <Category categoryId={product?.categoryId} />
        <Brand brandId={product?.brandId} />
      </div>

      {/* Title */}
      <h1 className="font-bold text-xl md:text-3xl text-gray-900">{product?.title}</h1>

      {/* Rating */}
      <Suspense fallback="Failed To Load">
        <RatingReview product={product} />
      </Suspense>

      {/* Short Description */}
      <p className="text-gray-600 text-sm md:text-base line-clamp-3 md:line-clamp-4">
        {product?.shortDescription}
      </p>

      {/* Price */}
      <h3 className="text-green-600 font-bold text-xl">
        ₹ {product?.salePrice}{" "}
        <span className="line-through text-gray-500 text-sm">
          ₹ {product?.price}
        </span>
      </h3>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 items-center pt-2">
        <Link href={`/checkout?type=buynow&productId=${product?.id}`}>
          <button className="bg-[#111827] hover:bg-[#333] text-white text-sm px-5 py-2 rounded-full transition-all">
            Buy Now
          </button>
        </Link>
        <AuthContextProvider>
          <AddToCartButton type={"cute"} productId={product?.id} />
        </AuthContextProvider>
        <AuthContextProvider>
          <FavoriteButton productId={product?.id} />
        </AuthContextProvider>
      </div>

      {/* Out Of Stock */}
      {product?.stock <= (product?.orders ?? 0) && (
        <div className="pt-2">
          <h3 className="text-red-500 py-1 rounded-lg text-sm font-semibold">
            Out Of Stock
          </h3>
        </div>
      )}

      {/* Full Description */}
      <div className="flex flex-col gap-2 py-2 text-sm text-gray-700 leading-relaxed">
        <div
          dangerouslySetInnerHTML={{ __html: product?.description ?? "" }}
        ></div>
      </div>
    </div>
  );
}

async function Category({ categoryId }) {
  const category = await getCategory({ id: categoryId });
  return (
    <Link href={`/categories/${categoryId}`}>
      <div className="flex items-center bg-gray-100 gap-2 border px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-all cursor-pointer">
        <img className="h-4 w-4 object-cover rounded-sm" src={category?.imageURL} alt="" />
        <span className="font-medium">{category?.name}</span>
      </div>
    </Link>
  );
}

async function Brand({ brandId }) {
  const brand = await getBrand({ id: brandId });
  return (
    <div className="flex items-center bg-gray-100 gap-2 border px-3 py-1 rounded-full text-sm">
      <img className="h-4 object-cover rounded-sm" src={brand?.imageURL} alt="" />
      <span className="font-medium">{brand?.name}</span>
    </div>
  );
}

async function RatingReview({ product }) {
  const counts = await getProductReviewCounts({ productId: product?.id });
  return <ClientRatingReview counts={counts} />;
}

function ClientRatingReview({ counts }) {
  return (
    <div className="flex gap-2 items-center">
      <MyRating value={counts?.averageRating ?? 0} />
      <p className="text-sm text-gray-500">
        {counts?.averageRating?.toFixed(1)} ({counts?.totalReviews})
      </p>
    </div>
  );
}
