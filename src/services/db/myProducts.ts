import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../config/firebase";
import type { ProductType } from "../../types/products";

export const fetchHomepageImages = async (): Promise<ProductType[]> => {
  const colRef = collection(db, "products");

  const qHomepage = query(
    colRef,
    where("isActive", "==", true),
    where("showOnHomepage", "==", true),
    orderBy("createdAt", "asc") // TODO: Adjust ordering field when we have our own admin panel
  );

  const snapshot = await getDocs(qHomepage);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...(data as Omit<ProductType, "id">),
    };
  });
};
