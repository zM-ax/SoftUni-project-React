import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import type { Review } from "../../types/review";

export type CreateProductReviewInput = {
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
};

export const createProductReviewAsync = async ({
  productId,
  userId,
  userName,
  rating,
  comment,
}: CreateProductReviewInput): Promise<void> => {
  if (!productId) {
    throw new Error("Missing productId");
  }
  if (!userId) {
    throw new Error("Missing userId");
  }

  const productRef = doc(db, "products", productId);
  const reviewsCollectionRef = collection(db, "products", productId, "reviews");
  const reviewRef = doc(reviewsCollectionRef, userId); // doc ID = userId

  await runTransaction(db, async (transaction) => {
    const productSnap = await transaction.get(productRef);
    if (!productSnap.exists()) {
      throw new Error("Product not found");
    }

    const productData = productSnap.data() as {
      rating?: number;
      reviewsCount?: number;
    };

    const oldAvg =
      typeof productData.rating === "number" ? productData.rating : 0;
    const oldCount =
      typeof productData.reviewsCount === "number"
        ? productData.reviewsCount
        : 0;

    // Check if the user has an existing review
    const existingReviewSnap = await transaction.get(reviewRef);

    let newAvg = oldAvg;
    let newCount = oldCount;

    if (existingReviewSnap.exists()) {
      // user updates an existing review
      const existingData = existingReviewSnap.data() as { rating?: number };
      const oldUserRating =
        typeof existingData.rating === "number" ? existingData.rating : 0;

      const total = oldAvg * oldCount - oldUserRating + rating;
      newAvg = oldCount > 0 ? total / oldCount : rating;
      newCount = oldCount; // the number of reviews does NOT increase
    } else {
      // new review from this user
      const total = oldAvg * oldCount + rating;
      newCount = oldCount + 1;
      newAvg = newCount > 0 ? total / newCount : rating;
    }

    transaction.set(reviewRef, {
      productId,
      userId,
      userName,
      rating,
      comment,
      createdAt: serverTimestamp(),
    });

    transaction.update(productRef, {
      rating: newAvg,
      reviewsCount: newCount,
    });
  });
};

export const getProductReviewsAsync = async (
  productId: string
): Promise<Review[]> => {
  if (!productId) return [];

  const reviewsRef = collection(db, "products", productId, "reviews");
  const q = query(reviewsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data() as {
      userId?: string;
      userName?: string;
      rating?: number;
      comment?: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      createdAt?: any;
    };

    let createdAtText = "";
    if (data.createdAt?.toDate) {
      createdAtText = data.createdAt
        .toDate()
        .toLocaleDateString("bg-BG", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
    }

    return {
      id: docSnap.id,
      userId: data.userId ?? "",
      userName: data.userName ?? "Клиент",
      rating: data.rating ?? 0,
      comment: data.comment ?? "",
      createdAt: createdAtText,
    } as Review;
  });
};
