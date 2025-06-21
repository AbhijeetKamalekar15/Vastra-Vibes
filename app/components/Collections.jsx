"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import Slider from "react-slick";

export default function Collections({ collections }) {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (collections.length === 0) {
    return <></>;
  }

  return (
    <div className="overflow-hidden md:p-10 p-5 bg-[#F0F4F8]">
  <Slider {...settings}>
    {(collections.length <= 2
      ? [...collections, ...collections, ...collections]
      : collections
    ).map((collection) => (
      <div key={collection?.id} className="px-2">
        <div className="flex flex-col md:flex-row gap-5 bg-white p-6 md:p-8 w-full rounded-xl h-full shadow-md transition-transform duration-300 hover:scale-[1.02]">
          {/* Text Section */}
          <div className="flex-1 flex flex-col gap-3 justify-between">
            <div className="flex flex-col gap-3">
              <h1 className="text-base md:text-lg font-semibold text-[#111827]">
                {collection?.title}
              </h1>
              <p className="text-[#374151] text-xs md:text-sm line-clamp-2 max-w-md">
                {collection?.subTitle}
              </p>
            </div>

            <Link href={`/collections/${collection?.id}`}>
              <button className="mt-3 md:mt-5 bg-[#2A9D8F] hover:bg-[#21867A] text-white text-xs md:text-sm px-5 py-2 rounded-lg font-medium transition-colors duration-200">
                Shop Now
              </button>
            </Link>
          </div>

          {/* Image Section */}
          <div className="flex justify-center items-center w-full md:w-auto">
            <img
              className="h-20 md:h-36 object-contain transition-transform duration-300 hover:scale-105"
              src={collection?.imageURL}
              alt={collection?.title}
            />
          </div>
        </div>
      </div>
    ))}
  </Slider>
</div>

  );
}
