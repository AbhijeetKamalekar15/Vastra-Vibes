"use client";

import { useCategories } from "../../../../lib/firestore/categories/read";
import {Button} from "../../../../components/ui/button"
import { Edit2, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { deleteCategory } from "../../../../lib/firestore/categories/write";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function ListView() {
  const { data: categories, error, isLoading } = useCategories();
  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="flex-1 flex flex-col gap-3 md:pr-5 md:px-0 px-5 rounded-xl ">
      <h1 className="text-xl">Categories</h1>
      <table className="border-separate border-spacing-y-3">
        <thead>
          <tr>
            <th className="font-semibold border-y bg-white px-3 py-2 border-l rounded-l-lg">SN</th>
            <th className="font-semibold border-y bg-white px-3 py-2">Image</th>
            <th className="font-semibold border-y bg-white px-3 py-2 text-left">Name</th>
            <th className="font-semibold border-y bg-white px-3 py-2  border-r rounded-r-lg text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((item, index) => {
            return (
              <Row index={index} item={item} key={item?.id ?? index} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Row({ item, index }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if(!confirm("Are you sure?")) return;
    setIsDeleting(true);
    try {
      await deleteCategory({ id: item?.id });
      toast.success("Successfully Deleted");
    } catch (error) {
      toast.error(error?.message);
    }
    setIsDeleting(false);
  };

  const handleUpdate = () => {
    router.push(`/admin/categories?id=${item?.id}`);

  }

  return (
    <tr>
      <td className="border-y bg-white px-3 py-2 border-l rounded-l-lg text-center">
        {index + 1}
      </td>
      <td className="border-y bg-white px-3 py-2">
        <div className="flex justify-center">
          <img
            className="h-12 w-12 object-contain"
            src={item?.imageURL}
            alt=""
          />
        </div>
      </td>
      <td className="border-y bg-white px-3 py-2">{item?.name}</td>
      <td className="border-y bg-white px-3 py-2 border-r rounded-r-lg">
        <div className="flex gap-2 items-center justify-center">
          <Button onClick={handleUpdate} disabled={isDeleting} size="sm">
            <Edit2 size={13} />
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            size="sm"
            className="bg-red-500 text-white flex gap-1 items-center justify-center"
          >
            {isDeleting ? (
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
            ) : (
              <Trash2 size={13} />
            )}
          </Button>
        </div>
      </td>
    </tr>
  );
}
