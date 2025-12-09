import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/user";

type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.user.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.user = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    authUser: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      if (state.user) {
        state.user.isLoggedIn = action.payload.isLoggedIn;
      }
    },
  },
});

export const { setUser, clearUser, updateUser, authUser } = userSlice.actions;
export default userSlice.reducer;
