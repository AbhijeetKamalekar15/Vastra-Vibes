"use client";

import { useProducts } from "@/lib/firestore/products/read";
import { deleteProduct } from "@/lib/firestore/products/write";
import { Edit2, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

export default function ListView() {
  const [pageLimit, setPageLimit] = useState(10);
  const [lastSnapDocList, setLastSnapDocList] = useState([]);

  useEffect(() => {
    setLastSnapDocList([]);
  }, [pageLimit]);

  const {
    data: products,
    error,
    isLoading,
    lastSnapDoc,
  } = useProducts({
    pageLimit,
    lastSnapDoc:
      lastSnapDocList.length === 0
        ? null
        : lastSnapDocList[lastSnapDocList.length - 1],
  });

  const handleNextPage = () => {
    setLastSnapDocList((prev) => [...prev, lastSnapDoc]);
  };

  const handlePrePage = () => {
    setLastSnapDocList((prev) => prev.slice(0, -1));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 py-4 text-center">{error}</div>;
  }

  return (
    <div className="flex-1 flex flex-col gap-5 md:pr-5 md:px-0 px-4 w-full overflow-x-auto">
      <div className="rounded-2xl border shadow-sm overflow-hidden">
        <table className="min-w-full border-separate border-spacing-y-2 text-sm text-gray-700">
          <thead>
            <tr>
              {["SN", "Image", "Title", "Price", "Stock", "Orders", "Status", "Actions"].map((label, i) => (
                <th
                  key={i}
                  className={`px-4 py-3 bg-gray-50 font-semibold ${
                    i === 0 ? "rounded-l-lg text-center" : ""
                  } ${
                    i === 7 ? "rounded-r-lg text-center" : "text-left"
                  }`}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products?.map((item, index) => (
              <Row
                index={index + lastSnapDocList.length * pageLimit}
                item={item}
                key={item?.id}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm py-3">
        <Button
          disabled={isLoading || lastSnapDocList.length === 0}
          onClick={handlePrePage}
          variant="outline"
        >
          Previous
        </Button>

        <Select
          value={pageLimit.toString()}
          onValueChange={(value) => setPageLimit(Number(value))}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50, 100].map((value) => (
              <SelectItem key={value} value={value.toString()}>
                {value} Items
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          disabled={isLoading || products?.length === 0}
          onClick={handleNextPage}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

function Row({ item, index }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setIsDeleting(true);
    try {
      await deleteProduct({ id: item?.id });
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error(error?.message);
    }
    setIsDeleting(false);
  };

  const handleUpdate = () => {
    router.push(`/admin/products/form?id=${item?.id}`);
  };

  return (
    <tr>
      <td className="px-4 py-2 bg-white text-center">{index + 1}</td>
      <td className="px-4 py-2 bg-white text-center">
        <div className="flex justify-center">
          <img
            className="h-10 w-10 object-cover rounded-md border"
            src={item?.featureImageURL}
            alt=""
          />
        </div>
      </td>
      <td className="px-4 py-2 bg-white whitespace-nowrap">
        {item?.title}{" "}
        {item?.isFeatured && (
          <span className="ml-2 inline-block bg-gradient-to-tr from-blue-500 to-indigo-400 text-white text-[10px] rounded-full px-3 py-1">
            Featured
          </span>
        )}
      </td>
      <td className="px-4 py-2 bg-white whitespace-nowrap">
        {item?.salePrice < item?.price && (
          <span className="text-xs text-gray-500 line-through mr-1">
            ₹{item?.price}
          </span>
        )}
        ₹{item?.salePrice}
      </td>
      <td className="px-4 py-2 bg-white text-center">{item?.stock}</td>
      <td className="px-4 py-2 bg-white text-center">{item?.orders ?? 0}</td>
      <td className="px-4 py-2 bg-white text-center">
        {item?.stock - (item?.orders ?? 0) > 0 ? (
          <span className="px-2 py-1 text-xs text-green-600 bg-green-100 font-medium rounded-md">
            Available
          </span>
        ) : (
          <span className="px-2 py-1 text-xs text-red-600 bg-red-100 rounded-md">
            Out of Stock
          </span>
        )}
      </td>
      <td className="px-4 py-2 bg-white text-center">
        <div className="flex gap-2 justify-center items-center">
          <Button
            onClick={handleUpdate}
            disabled={isDeleting}
            size="icon"
            variant="outline"
          >
            <Edit2 size={16} />
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            size="icon"
            variant="destructive"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
          </Button>
        </div>
      </td>
    </tr>
  );
}
