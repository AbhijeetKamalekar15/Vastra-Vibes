"use client";

import Link from "next/link";
import Slider from "react-slick";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "../../context/AuthContext";
import AddToCartButton from "./AddToCartButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function FeaturedProductSlider({ featuredProducts }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="overflow-hidden bg-white">
      <Slider {...settings}>
        {featuredProducts?.map((product) => (
          <div key={product?.id}>
            <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-12 bg-gray-50 p-6 md:px-20 md:py-16 w-full items-center">
              {/* Text Section */}
              <div className="flex-1 flex flex-col gap-5 md:gap-8">
                <span className="text-blue-500 text-xs md:text-sm tracking-wider uppercase">
                  New Fashion
                </span>

                <div className="flex flex-col gap-3 md:gap-5">
                  <Link href={`/products/${product?.id}`}>
                    <h1 className="text-xl md:text-4xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                      {product?.title}
                    </h1>
                  </Link>

                  <p className="text-gray-600 text-sm md:text-base max-w-xl line-clamp-2">
                    {product?.shortDescription}
                  </p>
                </div>

                <AuthContextProvider>
                  <div className="flex items-center gap-3 md:gap-5 flex-wrap">
                    <Link href={`/checkout?type=buynow&productId=${product?.id}`}>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm px-5 py-2 rounded-lg font-medium shadow-sm transition-colors duration-200">
                        Buy Now
                      </button>
                    </Link>

                    <AddToCartButton productId={product?.id} type={"large"} />
                    <FavoriteButton productId={product?.id} />
                  </div>
                </AuthContextProvider>
              </div>

              {/* Image Section */}
              <div className="flex justify-center items-center">
                <Link href={`/products/${product?.id}`}>
                  <img
                    className="h-56 md:h-96 object-contain transition-transform duration-300 hover:scale-105 cursor-pointer"
                    src={product?.featureImageURL}
                    alt={product?.title || "Product image"}
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
