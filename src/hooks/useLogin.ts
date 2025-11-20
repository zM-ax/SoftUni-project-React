// src/hooks/useLogin.ts
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import type { FirebaseError } from "firebase/app";
import { auth } from "../config/firebase";
import { getUserProfile } from "../services/db/users";
import { useAppDispatch } from "../store/hooks";
import { setAuthState } from "../store/authSlice";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const serializeFirebaseUser = (user: any) =>
  user
    ? {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        providerId: user.providerId,
      }
    : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const serializeProfile = (profile: any) =>
  profile
    ? {
        ...profile,
        createdAt:
          profile.createdAt &&
          typeof profile.createdAt !== "number" &&
          typeof profile.createdAt.toMillis === "function"
            ? profile.createdAt.toMillis()
            : profile.createdAt ?? null,
        updatedAt:
          profile.updatedAt &&
          typeof profile.updatedAt !== "number" &&
          typeof profile.updatedAt.toMillis === "function"
            ? profile.updatedAt.toMillis()
            : profile.updatedAt ?? null,
      }
    : null;

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setError(null);
    setLoading(true);

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const user = cred.user;
      const plainUser = serializeFirebaseUser(user);

      const profile = await getUserProfile(user.uid);
      const plainProfile = serializeProfile(profile);

      dispatch(
        setAuthState({
          firebaseUser: plainUser,
          userProfile: plainProfile,
        })
      );

      return { user: plainUser, profile: plainProfile };
    } catch (err: unknown) {
      let code = "";
      if (err && typeof err === "object" && "code" in err) {
        code = (err as FirebaseError).code || "";
      }

      const message =
        code === "auth/wrong-password" || code === "auth/user-not-found"
          ? "Грешен имейл или парола."
          : "Възникна грешка. Опитайте отново.";

      setError(message);
      throw new Error(message); // handle in LoginPage
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, setError };
};
