import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const getFeaturedProducts = async () => {
  const list = await getDocs(
    query(collection(db, "products"), where("isFeatured", "==", true))
  );

  return list.docs.map((snap) => {
    const data = snap.data();
    return {
      id: snap.id,
      ...data,
      timestampCreate: data.timestampCreate?.toDate().toISOString() ?? null,
      timestampUpdate: data.timestampUpdate?.toDate().toISOString() ?? null,
    };
  });
};

export const getProducts = async () => {
  const list = await getDocs(
    query(collection(db, "products"), orderBy("timestampCreate", "desc"))
  );

  return list.docs.map((snap) => {
    const data = snap.data();
    return {
      id: snap.id,
      ...data,
      timestampCreate: data.timestampCreate?.toDate().toISOString() ?? null,
      timestampUpdate: data.timestampUpdate?.toDate().toISOString() ?? null,
    };
  });
};

export const getProductsByCategory = async ({ categoryId }) => {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where("categoryId", "==", categoryId),
      orderBy("timestampCreate", "desc")
    )
  );

  return list.docs.map((snap) => {
    const data = snap.data();
    return {
      id: snap.id,
      ...data,
      timestampCreate: data.timestampCreate?.toDate().toISOString() ?? null,
      timestampUpdate: data.timestampUpdate?.toDate().toISOString() ?? null,
    };
  });
};

export const getProduct = async ({ id }) => {
  const snap = await getDoc(doc(db, `products/${id}`));
  if (snap.exists()) {
    const data = snap.data();
    return {
      id: snap.id,
      ...data,
      timestampCreate: data.timestampCreate?.toDate().toISOString() ?? null,
      timestampUpdate: data.timestampUpdate?.toDate().toISOString() ?? null,
    };
  } else {
    return null;
  }
};
