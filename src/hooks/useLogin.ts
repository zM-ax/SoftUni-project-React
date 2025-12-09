// src/hooks/useLogin.ts
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import type { FirebaseError } from "firebase/app";
import { auth } from "../config/firebase";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
 
      setLoading(false);
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
