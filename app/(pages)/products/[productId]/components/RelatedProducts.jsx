import Link from "next/link";
import { getProductsByCategory } from "../../../../../lib/firestore/products/read_server";
import AddToCartButton from "@/app/components/AddToCartButton";
import FavoriteButton from "@/app/components/FavoriteButton";
import AuthContextProvider from "../../../../../context/AuthContext";
import MyRating from "@/app/components/MyRating";
import { getProductReviewCounts } from "../../../../../lib/firestore/products/count/read";
import { Suspense } from "react";

export default async function RelatedProducts({ categoryId }) {
  const products = await getProductsByCategory({ categoryId, limit: 8 });

  if (products?.length === 0) return null;

  return (
    <section className="w-full flex flex-col gap-6 py-12 bg-[#F9FAFB] px-4 md:px-10">
      <h1 className="text-center text-2xl font-bold text-[#111827]">Related Products</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-[1200px] mx-auto">
        {products.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  return (
    <div className="flex flex-col gap-2 bg-white rounded-xl p-3 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-lg">
        <img
          src={product?.featureImageURL}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
          alt={product?.title}
        />
        <div className="absolute top-2 right-2">
          <AuthContextProvider>
            <FavoriteButton productId={product?.id} />
          </AuthContextProvider>
        </div>
      </div>

      <Link href={`/products/${product?.id}`}>
        <h1 className="font-semibold line-clamp-2 text-sm md:text-base text-[#111827] hover:text-[#2A9D8F] transition-colors">
          {product?.title}
        </h1>
      </Link>

      <h2 className="text-green-600 text-sm font-semibold">
        ₹ {product?.salePrice}{" "}
        <span className="line-through text-xs text-gray-500">
          ₹ {product?.price}
        </span>
      </h2>

      <p className="text-xs text-gray-600 line-clamp-2">{product?.shortDescription}</p>

      <Suspense>
        <RatingReview product={product} />
      </Suspense>

      {product?.stock <= (product?.orders ?? 0) && (
        <div className="flex">
          <h3 className="text-red-500 rounded-lg text-xs font-semibold">
            Out Of Stock
          </h3>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-2 mt-auto w-full">
        <Link href={`/checkout?type=buynow&productId=${product?.id}`} className="w-full">
          <button className="h-9 w-full bg-[#2A9D8F] hover:bg-[#21867A] text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-all">
            Buy Now
          </button>
        </Link>
        <AuthContextProvider>
          <AddToCartButton productId={product?.id} type="small" />
        </AuthContextProvider>
      </div>
    </div>
  );
}

async function RatingReview({ product }) {
  const counts = await getProductReviewCounts({ productId: product?.id });
  return (
    <div className="flex gap-3 items-center">
      <MyRating value={counts?.averageRating ?? 0} />
      <h1 className="text-xs text-gray-400">
        <span>{counts?.averageRating?.toFixed(1)}</span> ({counts?.totalReviews})
      </h1>
    </div>
  );
}
