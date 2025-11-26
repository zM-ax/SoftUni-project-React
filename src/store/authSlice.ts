// src/store/auth/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { UserProfile } from "../services/db/users";

type PlainFirebaseUser = {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  phoneNumber?: string | null;
  providerId?: string;
};

type AuthState = {
  firebaseUser: PlainFirebaseUser | null;
  userProfile: UserProfile | null;
  initialized: boolean;
};

const initialState: AuthState = {
  firebaseUser: null,
  userProfile: null,
  initialized: false,
};

type SetAuthPayload = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  firebaseUser: any | null; // Accepts the real FirebaseUser, but we will extract only plain fields
  userProfile: UserProfile | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<SetAuthPayload>) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function toMillisSafe(val: any) {
        return val &&
          typeof val !== "number" &&
          typeof val.toMillis === "function"
          ? val.toMillis()
          : val ?? null;
      }

      const user = action.payload.firebaseUser;
      state.firebaseUser = user
        ? {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            phoneNumber: user.phoneNumber,
            providerId: user.providerId,
          }
        : null;

      //Serialize Timestamp fields in userProfile
      const profile = action.payload.userProfile;
      state.userProfile = profile
        ? {
            ...profile,
            createdAt: toMillisSafe(profile.createdAt),
            updatedAt: toMillisSafe(profile.updatedAt),
          }
        : null;
      state.initialized = true;
    },
  },
});

export const { setAuthState } = authSlice.actions;
export default authSlice.reducer;
