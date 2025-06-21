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
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="overflow-hidden mt-8 bg-[#F0F4F8] mr-3 ml-3 sm:mt-8">
  <Slider {...settings}>
    {featuredProducts?.map((product) => (
      <div key={product?.id}>
        <div className="max-w-[1420px] rounded-lg mx-auto flex flex-col-reverse md:flex-row gap-8 md:gap-12 bg-white shadow-lg p-6 md:px-32 md:py-10 items-center">
          {/* Text Section */}
          <div className="flex-1 flex flex-col gap-6 md:gap-10">
            <span className="text-[#2A9D8F] text-xs md:text-sm tracking-wider uppercase">
              New Fashion
            </span>

            <div className="flex flex-col gap-4 md:gap-6">
              <Link href={`/products/${product?.id}`}>
                <h1 className="text-2xl md:text-5xl font-extrabold text-[#111827] hover:text-[#2A9D8F] transition-colors duration-200">
                  {product?.title}
                </h1>
              </Link>

              <p className="text-[#374151] text-base md:text-lg max-w-2xl line-clamp-2">
                {product?.shortDescription}
              </p>
            </div>

            <AuthContextProvider>
              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                <Link href={`/checkout?type=buynow&productId=${product?.id}`}>
                  <button className="bg-[#2A9D8F] hover:bg-[#21867A] active:hover:bg-[#21867A] text-white text-sm px-5 py-[8.5px] rounded-full font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all duration-200">
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
                className="h-60 md:h-[22rem] object-contain transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-lg cursor-pointer"
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
