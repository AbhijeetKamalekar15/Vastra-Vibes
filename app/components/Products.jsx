import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "../../context/AuthContext";
import AddToCartButton from "./AddToCartButton";
import { getProductReviewCounts } from "../../lib/firestore/products/count/read";
import { Suspense } from "react";
import MyRating from "./MyRating";

export default function ProductsGridView({ products }) {
  return (
    <section className="w-full flex justify-center bg-[#F0F4F8] py-10 px-4">
  <div className="flex flex-col gap-6 max-w-[1200px] w-full">
    <h1 className="text-center font-bold text-2xl text-[#111827]">Products</h1>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products?.map((item) => {
        return <ProductCard product={item} key={item?.id} />;
      })}
    </div>
  </div>
</section>

  );
}

export function ProductCard({ product }) {
  return (
    <div className="flex flex-col gap-2 bg-white rounded-xl p-3 shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
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

      {/* Title */}
      <Link href={`/products/${product?.id}`}>
        <h1 className="font-semibold line-clamp-2 text-sm md:text-base text-[#111827] hover:text-[#2A9D8F] transition-colors">
          {product?.title}
        </h1>
      </Link>

      {/* Price */}
      <div>
        <h2 className="text-green-600 text-sm font-semibold">
          ₹ {product?.salePrice}{" "}
          <span className="line-through text-xs text-gray-500">
            ₹ {product?.price}
          </span>
        </h2>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-600 line-clamp-2">{product?.shortDescription}</p>

      {/* Rating */}
      <Suspense>
        <RatingReview product={product} />
      </Suspense>

      {/* Out of stock */}
      {product?.stock <= (product?.orders ?? 0) && (
        <div className="flex">
          <h3 className="text-red-500 rounded-lg text-xs font-semibold">
            Out Of Stock
          </h3>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-2 mt-auto w-full">
        <Link href={`/checkout?type=buynow&productId=${product?.id}`} className="w-full">
          <button className=" h-9 w-full bg-[#2A9D8F] hover:bg-[#21867A] text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-all">
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
        <span>{counts?.averageRating?.toFixed(1)}</span> ({counts?.totalReviews}
        )
      </h1>
    </div>
  );
}