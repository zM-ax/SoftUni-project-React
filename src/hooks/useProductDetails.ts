import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { RootState } from "../store/root";
import { fetchProductById, clearCurrentProduct } from "../store/productsSlice";
import { STATUS } from "../constants/statuses";

export const useProductDetails = (id?: string) => {
  const dispatch = useAppDispatch();

  const { items, currentProduct, currentStatus, currentError } = useAppSelector(
    (state: RootState) => state.products
  );

  // prevent re-rendering loops
  const productFromRedux = useMemo(
    () => items.find((p) => p.id === id),
    [items, id]
  );

  const product = productFromRedux || currentProduct;

  // no local product found, fetch from backend
  useEffect(() => {
    if (!id || productFromRedux) {
      return;
    }

    dispatch(fetchProductById(id));
  }, [dispatch, id, productFromRedux]);

  // clean up current product on unmount
  useEffect(
    () => () => {
      dispatch(clearCurrentProduct());
    },
    [dispatch]
  );

  const isLoading = currentStatus === STATUS.LOADING;
  const hasError = currentStatus === STATUS.FAILED;

  // WE use this to allow manual reloads of the product details (upon leaving a review)
  const reloadProduct = () => {
    if (!id) return;
    dispatch(fetchProductById(id));
  };

  return {
    product,
    isLoading,
    hasError,
    error: currentError,
    reloadProduct,
  };
};
