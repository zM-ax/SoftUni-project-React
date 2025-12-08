import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import type { ProductType } from "../../types/products";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export type UploadProductType = {
  title: string;
  type: "cake" | "dessert";
  price: number;
  quantity: number;
  weight: string;
  shortDescription: string;
  longDescription: string;
  extraInfo: string;
  ingredients: string[];
};

export type UploadProductResult = {
  fileName: string;
  status: "success" | "error";
  message: string;
};

const productsCollection = collection(db, "products");

/**
 * Uploads a new product with images to Firestore and Firebase Storage.
 * - smallImageFile -> singleSmallImageUrl (for homepage preview)
 * - galleryFiles -> imageUrls[] (for product details page)
 * All in one document products/{productId}
 */
export const uploadProduct = async (
  smallImageFile: File,
  galleryFiles: FileList | File[] | null,
  baseData: UploadProductType
): Promise<UploadProductResult[]> => {
  // Create the product document first to get the ID
  const docRef = await addDoc(productsCollection, {
    ...baseData,
    rating: 0,
    reviewsCount: 0,
    showOnHomepage: false,
    homepageOrder: 0,
    singleSmallImageUrl: "",
    imageUrls: [],
    isActive: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const productId = docRef.id;
  const results: UploadProductResult[] = [];

  // Upload the small image (required)
  let singleSmallImageUrl = "";
  try {
    const smallRef = ref(
      storage,
      `products/${productId}/small-${smallImageFile.name}`
    );
    const smallSnap = await uploadBytes(smallRef, smallImageFile);
    singleSmallImageUrl = await getDownloadURL(smallSnap.ref);

    results.push({
      fileName: smallImageFile.name,
      status: "success",
      message: "small image uploaded",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    results.push({
      fileName: smallImageFile.name,
      status: "error",
      message: err?.message || "Small image upload failed",
    });
  }

  // Upload the gallery images (can be empty)
  const galleryUrls: string[] = [];
  if (galleryFiles) {
    const galleryArray = Array.from(galleryFiles);
    for (let i = 0; i < galleryArray.length; i++) {
      const file = galleryArray[i];

      try {
        const storageRef = ref(
          storage,
          `products/${productId}/gallery-${i}-${file.name}`
        );
        const snap = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snap.ref);

        galleryUrls.push(url);

        results.push({
          fileName: file.name,
          status: "success",
          message: "gallery image uploaded",
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        results.push({
          fileName: file.name,
          status: "error",
          message: err?.message || "Gallery image upload failed",
        });
      }
    }
  }

  // 4) Update the document with the image URLs
  await updateDoc(doc(productsCollection, productId), {
    singleSmallImageUrl,
    imageUrls: galleryUrls,
    updatedAt: serverTimestamp(),
  });

  return results;
};

export const getAllProducts = async (): Promise<ProductType[]> => {
  const snapshot = await getDocs(productsCollection);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data() as Omit<ProductType, "id">;
    // Convert Firestore Timestamps to millis (number) if present. (It throws error otherwise)
    const createdAt =
      data.createdAt && typeof data.createdAt.toMillis === "function"
        ? data.createdAt.toMillis()
        : data.createdAt;
    const updatedAt =
      data.updatedAt && typeof data.updatedAt.toMillis === "function"
        ? data.updatedAt.toMillis()
        : data.updatedAt;
    return { id: docSnap.id, ...data, createdAt, updatedAt };
  });
};

export const getProductById = async (
  id: string
): Promise<ProductType | null> => {
  const docRef = doc(productsCollection, id);
  const snap = await getDoc(docRef);

  if (!snap.exists()) {
    return null;
  }

  const data = snap.data() as Omit<ProductType, "id">;

  const createdAt =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data.createdAt && typeof (data as any).createdAt?.toMillis === "function"
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data as any).createdAt.toMillis()
      : data.createdAt;

  const updatedAt =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data.updatedAt && typeof (data as any).updatedAt?.toMillis === "function"
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data as any).updatedAt.toMillis()
      : data.updatedAt;

  return {
    id: snap.id,
    ...data,
    createdAt,
    updatedAt,
  };
};

export const deleteProductByIdAsync = async (id: string): Promise<void> => {
  const docRef = doc(productsCollection, id);
  await deleteDoc(docRef);
};