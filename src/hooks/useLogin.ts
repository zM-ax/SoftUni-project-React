// src/hooks/useLogin.ts
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import type { FirebaseError } from "firebase/app";
import { auth } from "../config/firebase";
import { getUserByIdAsync } from "../services/db/users";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/userSlice";
 
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
      const firebaseCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = firebaseCredentials.user;  

      const profile = await getUserByIdAsync(user.uid);

      console.log("Fetched user profile:", profile);
      const plainProfile = serializeProfile(profile);
      console.log("Serialized user profile:", plainProfile);
      // Запази потребителя в Redux
      dispatch(
        setUser({
          id: plainProfile.id,
          name: plainProfile.name,
          email: plainProfile.email,
          phoneNumber: plainProfile.phone || "",
          address: plainProfile.address || "",
          profileImageURL: plainProfile.photoUrl || "",
        })
      );

      setLoading(false);
      setError(null);
      return true;
    } catch (err) {
      setLoading(false);
      if (err && typeof err === "object" && "code" in err) {
        const code = (err as FirebaseError).code;
        if (code === "auth/user-not-found") {
          setError("Няма такъв потребител.");
        } else if (code === "auth/wrong-password") {
          setError("Грешна парола.");
        } else {
          setError("Грешка при вход.");
        }
      } else {
        setError("Грешка при вход.");
      }
      return false;
    }
  };

  return { login, loading, error, setError };
};
