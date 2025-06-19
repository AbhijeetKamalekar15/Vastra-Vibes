"use client";

import { useBrands } from "@/lib/firestore/brands/read";
import { useCategories } from "@/lib/firestore/categories/read";

export default function BasicDetails({ data, handleData }) {
  const { data: brands } = useBrands();
  const { data: categories } = useCategories();

  return (
    <section className="flex flex-col gap-6 bg-white rounded-2xl p-6 md:p-8 border shadow-sm">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
        Basic Details
      </h1>

      {/* Product Name */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-600 text-sm font-medium" htmlFor="product-title">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Product Name"
          id="product-title"
          name="product-title"
          value={data?.title ?? ""}
          onChange={(e) => {
            handleData("title", e.target.value);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Short Description */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-600 text-sm font-medium" htmlFor="product-short-decription">
          Short Description <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Short Description"
          id="product-short-decription"
          name="product-short-decription"
          value={data?.shortDescription ?? ""}
          onChange={(e) => {
            handleData("shortDescription", e.target.value);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Brand */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-600 text-sm font-medium" htmlFor="product-brand">
          Brand <span className="text-red-500">*</span>
        </label>
        <select
          id="product-brand"
          name="product-brand"
          value={data?.brandId ?? ""}
          onChange={(e) => {
            handleData("brandId", e.target.value);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Brand</option>
          {brands?.map((item) => (
            <option value={item?.id} key={item?.id}>
              {item?.name}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-600 text-sm font-medium" htmlFor="product-category">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="product-category"
          name="product-category"
          value={data?.categoryId ?? ""}
          onChange={(e) => {
            handleData("categoryId", e.target.value);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Category</option>
          {categories?.map((item) => (
            <option value={item?.id} key={item?.id}>
              {item?.name}
            </option>
          ))}
        </select>
      </div>

      {/* Stock & Price Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Stock */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 text-sm font-medium" htmlFor="product-stock">
            Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            placeholder="Enter Stock"
            id="product-stock"
            name="product-stock"
            value={data?.stock ?? ""}
            onChange={(e) => {
              handleData("stock", e.target.valueAsNumber);
            }}
            className="border px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 text-sm font-medium" htmlFor="product-price">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            placeholder="Enter Price"
            id="product-price"
            name="product-price"
            value={data?.price ?? ""}
            onChange={(e) => {
              handleData("price", e.target.valueAsNumber);
            }}
            className="border px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      {/* Sale Price & Featured Product */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sale Price */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 text-sm font-medium" htmlFor="product-sale-price">
            Sale Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            placeholder="Enter Sale Price"
            id="product-sale-price"
            name="product-sale-price"
            value={data?.salePrice ?? ""}
            onChange={(e) => {
              handleData("salePrice", e.target.valueAsNumber);
            }}
            className="border px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Is Featured Product */}
        <div className="flex flex-col gap-1">
          <label
            className="text-gray-600 text-sm font-medium"
            htmlFor="product-is-featured-product"
          >
            Is Featured Product <span className="text-red-500">*</span>
          </label>
          <select
            id="product-is-featured-product"
            name="product-is-featured-product"
            value={data?.isFeatured ? "yes" : "no"}
            onChange={(e) => {
              handleData("isFeatured", e.target.value === "yes");
            }}
            className="border px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value={"no"}>No</option>
            <option value={"yes"}>Yes</option>
          </select>
        </div>
      </div>
    </section>
  );
}
