"use client";

import useSWRSubscription from "swr/subscription";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export function useBrands() {
  const { data, error } = useSWRSubscription(
    ["brands"],
    ([path], { next }) => {
      const ref = collection(db, path);
      const unsub = onSnapshot(
        ref,
        (snapshot) =>
          next(
            null,
            snapshot.docs.length === 0
              ? null
              : snapshot.docs.map((snap) => snap.data())
          ),
        (err) => next(err, null)
      );
      return () => unsub();
    }
  );

  return {data, error: error?.message, isLoading: data === undefined};
}
