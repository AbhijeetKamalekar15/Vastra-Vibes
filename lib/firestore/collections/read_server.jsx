import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const getCollection = async ({ id }) => {
  const data = await getDoc(doc(db, `collections/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
};

export const convertDocument = (snap, timestampFields = []) => {
  const data = snap.data();
  const converted = { id: snap.id, ...data };
  timestampFields.forEach((field) => {
    if (converted[field]?.toDate) {
      converted[field] = converted[field].toDate().toISOString();
    }
  });
  return converted;
};

export const getCollections = async () => {
  const list = await getDocs(collection(db, "collections"));
  return list.docs.map((snap) =>
    convertDocument(snap, ["timestampCreate"])
  );
};
