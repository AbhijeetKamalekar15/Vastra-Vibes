"use client";

import { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import toast from "react-hot-toast";
import {
  createNewBrand,
  updateBrand,
} from "../../../../lib/firestore/brands/write";
import { useRouter, useSearchParams } from "next/navigation";
import { getBrand } from "../../../../lib/firestore/brands/read_server";

export default function Form() {
  const [data, setData] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const fetchData = async () => {
    try {
      const res = await getBrand({ id: id });
      if (!res) {
        toast.error("Brand Not Found!");
      } else {
        setData(res);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleData = (key, value) => {
    setData((prevData) => {
      return {
        ...(prevData ?? {}),
        [key]: value,
      };
    });
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      await createNewBrand({ data: data, image: image });
      toast.success("Successfully Created");
      setData(null);
      setImage(null);
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await updateBrand({ data: data, image: image });
      toast.success("Successfully Updated!");
      setData(null);
      setImage(null);
      router.push(`/admin/brands`);
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]">
      <h1 className="font-semibold">{id ? "Update" : "Create"} Brand</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (id) {
            handleUpdate();
          } else {
            handleCreate();
          }
        }}
        className="flex flex-col gap-2"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="brand-name" className="text-gray-500 text-sm">
            Image <span className="text-red-500">*</span>
          </label>
          <div className="flex justify-center items-center p-3">
            {image && <img className="h-35" src={URL.createObjectURL(image)} />}
          </div>
          <input
            id="brand-image"
            name="brand-image"
            type="file"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setImage(e.target.files[0]);
              }
            }}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="category-name" className="text-gray-500 text-sm">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="brand-name"
            name="brand-name"
            type="text"
            placeholder="Enter Name"
            value={data?.name ?? ""}
            onChange={(e) => {
              handleData("name", e.target.value);
            }}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
        </div>
        
        <Button
          disabled={isLoading}
          type="submit"
          className="flex items-center justify-center gap-2"
        >
          {isLoading && (
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          )}
          {isLoading
            ? id
              ? "Updating..."
              : "Creating..."
            : id
            ? "Update"
            : "Create"}
        </Button>
      </form>
    </div>
  );
}
