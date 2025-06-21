"use client";

import Link from "next/link";
import Slider from "react-slick";

export default function Categories({ categories }) {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  if (categories.length === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-8 justify-center overflow-hidden md:p-10 p-5 bg-[#F0F4F8]">
  {/* Section Title */}
  <div className="flex justify-center w-full">
    <h1 className="text-xl md:text-2xl font-bold text-[#111827]">
      Shop By Category
    </h1>
  </div>

  {/* Category Slider */}
  <Slider {...settings}>
    {(categories.length <= 2
      ? [...categories, ...categories, ...categories]
      : categories
    ).map((category) => (
      <Link href={`/categories/${category?.id}`} key={category?.id}>
        <div className="px-3">
          <div className="flex flex-col gap-3 items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer">
            <div className="md:h-32 md:w-32 h-24 w-24 rounded-full p-2 md:p-4 border border-[#E5E7EB] shadow-md bg-white overflow-hidden flex items-center justify-center transition-shadow duration-300 hover:shadow-lg">
              <img
                src={category?.imageURL}
                alt={category?.name}
                className="h-full w-full object-contain"
              />
            </div>
            <h1 className="text-sm md:text-base font-medium text-[#111827] text-center">
              {category?.name}
            </h1>
          </div>
        </div>
      </Link>
    ))}
  </Slider>
</div>

  );
}
