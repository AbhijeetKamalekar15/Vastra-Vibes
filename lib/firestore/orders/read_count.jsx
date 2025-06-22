"use client";

import { db } from "../firebase";
import {
  collection,
  count,
  getAggregateFromServer,
  query,
  sum,
  where,
} from "firebase/firestore";
import useSWR from "swr";

// Single day counts
export const getOrdersCounts = async ({ date }) => {
  const ref = collection(db, "orders");
  let q = query(ref);

  if (date) {
    const fromDate = new Date(date);
    fromDate.setHours(0, 0, 0, 0);
    const toDate = new Date(date);
    toDate.setHours(23, 59, 59, 999);

    q = query(
      q,
      where("timestampCreate", ">=", fromDate),
      where("timestampCreate", "<=", toDate),
      where("payment.amount", ">", 0) // 🔸 Important: avoid "missing field" Firestore error
    );
  } else {
    // Only filter valid orders (for total)
    q = query(q, where("payment.amount", ">", 0));
  }

  const snap = await getAggregateFromServer(q, {
    totalRevenue: sum("payment.amount"),
    totalOrders: count(),
  });

  const result = snap.data();

  if (date) {
    return {
      date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
      data: result,
    };
  }

  return result;
};

// Multiple days counts
const getTotalOrdersCounts = async (dates) => {
  const sortedDates = dates?.sort((a, b) => a?.getTime() - b?.getTime());
  const promises = sortedDates?.map((date) => getOrdersCounts({ date }));
  const results = await Promise.all(promises);
  return results;
};

// SWR Hooks
export function useOrdersCounts() {
  const { data, error, isLoading } = useSWR("orders_counts", () =>
    getOrdersCounts({ date: null })
  );

  if (error) {
    console.log("useOrdersCounts error:", error?.message);
  }

  return { data, error, isLoading };
}

export function useOrdersCountsByTotalDays({ dates = [] }) {
  const sortedDates = dates.sort((a, b) => a?.getTime() - b?.getTime());

  const { data, error, isLoading } = useSWR(
    ["orders_counts_by_total_days", sortedDates],
    () => getTotalOrdersCounts(sortedDates)
  );

  if (error) {
    console.log("useOrdersCountsByTotalDays error:", error?.message);
  }

  return { data, error, isLoading };
}
