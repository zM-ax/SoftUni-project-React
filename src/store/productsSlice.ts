import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "../services/db/myProducts"; 
import type { ProductType } from "../types/products";  
import { STATUS, type StatusType } from "../constants/statuses";

export const fetchProducts = createAsyncThunk<ProductType[]>(
  "products/fetchAll",
  async () => {
    const products = await getAllProducts();
    return products;
  }
);

interface ProductsState {
  items: ProductType[];
  status: StatusType;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: STATUS.IDLE,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
        state.status = STATUS.FAILED;
        state.error =
          action.error.message || "Грешка при зареждането на продуктите";
      });
  },
});

export default productsSlice.reducer;
