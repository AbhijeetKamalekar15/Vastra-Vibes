import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "../../context/AuthContext";
import AddToCartButton from "./AddToCartButton";
import { getProductReviewCounts } from "../../lib/firestore/products/count/read";
import { Suspense } from "react";
import MyRating from "./MyRating";

export default function ProductsGridView({ products }) {
  return (
    <section className="w-full flex justify-center">
      <div className="flex flex-col gap-6 max-w-[1200px] p-5 md:p-8 w-full">
        <h1 className="text-center text-xl md:text-2xl font-bold text-gray-900">
          Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products?.map((item) => (
            <ProductCard product={item} key={item?.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductCard({ product }) {
  return (
    <div className="flex flex-col gap-4 border border-gray-200 p-4 rounded-xl shadow-sm transition-transform duration-300 hover:scale-[1.02] bg-white">
      {/* Image Section */}
      <div className="relative w-full aspect-square overflow-hidden rounded-lg">
        <img
          src={product?.featureImageURL}
          className="h-full w-full object-cover"
          alt={product?.title}
        />
        <div className="absolute top-2 right-2 z-10">
          <AuthContextProvider>
            <FavoriteButton productId={product?.id} />
          </AuthContextProvider>
        </div>
      </div>

      {/* Title */}
      <Link href={`/products/${product?.id}`}>
        <h1 className="font-semibold text-sm md:text-base text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
          {product?.title}
        </h1>
      </Link>

      {/* Price */}
      <div>
        <h2 className="text-green-600 text-sm font-semibold">
          ₹ {product?.salePrice}{" "}
          <span className="line-through text-xs text-gray-500 ml-1">
            ₹ {product?.price}
          </span>
        </h2>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500 line-clamp-2">{product?.shortDescription}</p>

      {/* Ratings */}
      <Suspense>
        <RatingReview product={product} />
      </Suspense>

      {/* Stock Status */}
      {product?.stock <= (product?.orders ?? 0) && (
        <div className="flex">
          <h3 className="text-red-600 bg-red-100 px-2 py-0.5 rounded-md text-xs font-medium">
            Out Of Stock
          </h3>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 w-full mt-auto">
        <Link href={`/checkout?type=buynow&productId=${product?.id}`} className="flex-1">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors duration-200">
            Buy Now
          </button>
        </Link>

        <AuthContextProvider>
          <AddToCartButton productId={product?.id} />
        </AuthContextProvider>
      </div>
    </div>
  );
}

async function RatingReview({ product }) {
  const counts = await getProductReviewCounts({ productId: product?.id });

  return (
    <div className="flex gap-2 items-center">
      <MyRating value={counts?.averageRating ?? 0} />
      <h1 className="text-xs text-gray-400">
        {counts?.averageRating?.toFixed(1)} ({counts?.totalReviews})
      </h1>
    </div>
  );
}
