import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { RootState } from "../store/root";
import { fetchProductById, clearCurrentProduct } from "../store/productsSlice";
import { STATUS } from "../constants/statuses";

export const useProductDetails = (id?: string) => {
  const dispatch = useAppDispatch();

  const { items, currentProduct, currentStatus, currentError } =
    useAppSelector((state: RootState) => state.products);

  // prevent re-rendering loops
  const productFromList = useMemo(
    () => items.find((p) => p.id === id),
    [items, id]
  );

  const product = productFromList || currentProduct;

  // no local product found, fetch from backend
  useEffect(() => {
    if (!id || productFromList) return;
    dispatch(fetchProductById(id));
  }, [dispatch, id, productFromList]);

  useEffect(
    () => () => {
      dispatch(clearCurrentProduct());
    },
    [dispatch]
  );

  const isLoading = currentStatus === STATUS.LOADING;
  const hasError = currentStatus === STATUS.FAILED;

  return {
    product,
    isLoading,
    hasError,
    error: currentError,
  };
};
