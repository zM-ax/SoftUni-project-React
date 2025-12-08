import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { getAllProducts, getProductById } from "../services/db/myProducts";
import type { ProductType } from "../types/products";
import { STATUS, type StatusType } from "../constants/statuses";

interface ProductsState {
  items: ProductType[];
  status: StatusType;
  error: string | null;

  // ProductDetails
  currentProduct: ProductType | null;
  currentStatus: StatusType;
  currentError: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: STATUS.IDLE,
  error: null,

  currentProduct: null,
  currentStatus: STATUS.IDLE,
  currentError: null,
};

export const fetchProducts = createAsyncThunk<ProductType[]>(
  "products/fetchAll",
  async () => {
    const products = await getAllProducts();

    const normalized = products.map((p) => ({
      ...p,
      price: typeof p.price === "number" ? p.price : Number(p.price),
    }));

    return normalized;
  }
);

export const fetchProductById = createAsyncThunk<ProductType, string>(
  "products/fetchById",
  async (id) => {
    const product = await getProductById(id);

    if (!product) {
      throw new Error("Продуктът не е намерен");
    }

    return product;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Workaround for setting current product directly
    setCurrentProduct: (state, action: PayloadAction<ProductType | null>) => {
      state.currentProduct = action.payload;
      state.currentStatus = action.payload ? STATUS.SUCCEEDED : STATUS.IDLE;
      state.currentError = null;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
      state.currentStatus = STATUS.IDLE;
      state.currentError = null;
    },
  },
  extraReducers: (builder) => {
    // ************* GET ALL PRODUCTS *************
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        // if (action.meta.aborted) {
        //   // The request was intentionally aborted → do not count it as an error
        //   state.status = STATUS.IDLE;
        //   state.error = null;
        //   return;
        // }
        console.log("FAILED fetchProducts", action.error);
        state.status = STATUS.FAILED;
        state.error =
          action.error.message || "Грешка при зареждането на продуктите";
      });

    // ************* GET PRODUCT BY ID *************
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.currentStatus = STATUS.LOADING;
        state.currentError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentStatus = STATUS.SUCCEEDED;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.currentStatus = STATUS.FAILED;
        state.currentError =
          action.error.message || "Грешка при зареждането на продукта";
      });
  },
});

export const { setCurrentProduct, clearCurrentProduct } = productsSlice.actions;

export default productsSlice.reducer;
