import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import type { ProductType } from "../../types/products";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export type UploadProductType = {
  title: string;
  type: "cake" | "dessert";
  price: string;
  quantity: number;
  rating: string;
  weight: string;
  shortDescription: string;
  longDescription: string;
  ingredients: string[];
  showOnHomepage: boolean;
};

export type UploadProductResult = {
  fileName: string;
  status: "success" | "error";
  message: string;
};

export const fetchHomepageImages = async (): Promise<ProductType[]> => {
  const colRef = collection(db, "products");

  const qHomepage = query(
    colRef,
    where("isActive", "==", true),
    where("showOnHomepage", "==", true),
    orderBy("createdAt", "asc")
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

const getStoragePathForFile = (file: File, type: "cake" | "dessert") => {
  const base = type === "cake" ? "cakes" : "desserts";
  return `${base}/${file.name}`;
};

export const uploadProduct = async (
  files: FileList | File[],
  baseData: UploadProductType
): Promise<UploadProductResult[]> => {
  const fileArray = Array.from(files as FileList | File[]);
  const colRef = collection(db, "products");
  const results: UploadProductResult[] = [];

  for (const file of fileArray) {
    try {
      // 1) path to Storage + upload
      const storagePath = getStoragePathForFile(file, baseData.type);
      const fileRef = ref(storage, storagePath);
      await uploadBytes(fileRef, file);

      // 2) download URL
      const downloadURL = await getDownloadURL(fileRef);

      // 3) product for Firestore
      const product: Omit<ProductType, "id"> = {
        ...baseData,
        imageUrl: downloadURL,
        storagePath,
        isActive: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // 4) add to Firestore
      await addDoc(colRef, product);

      results.push({
        fileName: file.name,
        status: "success",
        message: "uploaded and saved",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      results.push({
        fileName: file.name,
        status: "error",
        message: err?.message || String(err),
      });
    }
  }

  return results;
};
