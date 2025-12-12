import { useEffect, useState } from "react";
import type { Review } from "../types/review";
import { getProductReviewsAsync } from "../services/db/productReviews";

export const useProductReviews = (productId?: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  const loadReviews = async (id: string) => {
    try {
      setIsLoadingReviews(true);
      setReviewsError(null);
      const data = await getProductReviewsAsync(id);
      setReviews(data);
    } catch (err) {
      console.error(err);
      setReviewsError("Грешка при зареждане на ревютата.");
    } finally {
      setIsLoadingReviews(false);
    }
  };

  useEffect(() => {
    if (!productId) return;
    void loadReviews(productId);
  }, [productId]);

  const reloadReviews = () => {
    if (!productId) return;
    void loadReviews(productId);
  };

  return { reviews, isLoadingReviews, reviewsError, reloadReviews };
};
