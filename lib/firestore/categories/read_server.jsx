import { db } from "../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export const getCategory = async ({ id }) => {
  const data = await getDoc(doc(db, `categories/${id}`));
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



export const getCategories = async () => {
  const list = await getDocs(collection(db, "categories"));
  return list.docs.map((snap) =>
    convertDocument(snap, ["timestampCreate", "timestampUpdate"]) // ✅ include both
  );
};

