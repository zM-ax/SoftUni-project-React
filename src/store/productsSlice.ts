import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "../services/db/myProducts"; 
import type { ProductType } from "../types/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const products = await getAllProducts();
    return products;
  }
);

interface ProductsState {
  items: ProductType[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Грешка при зареждането на продуктите";
      });
  },
});

export default productsSlice.reducer;
