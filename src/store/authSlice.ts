// src/store/auth/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User as FirebaseUser } from "firebase/auth";
import type { UserProfile } from "../services/db/users";

type AuthState = {
  firebaseUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  initialized: boolean; // To track if the auth state has been initialized
};

const initialState: AuthState = {
  firebaseUser: null,
  userProfile: null,
  initialized: false,
};

type SetAuthPayload = {
  firebaseUser: FirebaseUser | null;
  userProfile: UserProfile | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<SetAuthPayload>) {
      state.firebaseUser = action.payload.firebaseUser;
      state.userProfile = action.payload.userProfile;
      state.initialized = true;
    },
  },
});

export const { setAuthState } = authSlice.actions;
export default authSlice.reducer;
