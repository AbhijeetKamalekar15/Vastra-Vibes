import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

// Reuse the helper you wrote earlier
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

const TIMESTAMP_FIELDS = ["timestampCreate", "timestampUpdate"]; // DRY

export const getBrand = async ({ id }) => {
  const snap = await getDoc(doc(db, `brands/${id}`));
  if (snap.exists()) {
    return convertDocument(snap, TIMESTAMP_FIELDS);
  } else {
    return null;
  }
};

export const getBrands = async () => {
  const list = await getDocs(collection(db, "brands"));
  return list.docs.map((snap) => convertDocument(snap, TIMESTAMP_FIELDS));
};
