import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";

import { auth } from "../config/firebase";
import { useAppDispatch } from "../store/hooks";
import { setUser, clearUser } from "../store/userSlice";
import { getUserByIdAsync } from "../services/db/users";
import type { User } from "../types/user";

interface AuthListenerProps {
  children: ReactNode;
}

const AuthListener = ({ children }: AuthListenerProps) => {
  const dispatch = useAppDispatch();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const user = await syncUserFromFirebase(firebaseUser);
          console.log("THE USER IS BEING SYNCED:")
          console.log(user)
          
          if (user) {
            dispatch(
              setUser({
                ...user,
                isLoggedIn: true,
              })
            );
          } else {
            dispatch(clearUser());
          }
        } else {
          // No logged-in user in Auth
          dispatch(clearUser());
        }
      } catch (error) {
        console.error("[AuthListener] Error syncing user:", error);
        dispatch(clearUser());
      } finally {
        setInitializing(false);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (initializing) {
    return null; // може да сложиш loader
  }

  return <>{children}</>;
};

// *********************** HELPER ***********************

const syncUserFromFirebase = async (
  firebaseUser: FirebaseUser
): Promise<User | null> => {
  const existingProfile = await getUserByIdAsync(firebaseUser.uid);

  if (!existingProfile) {
    return null;
  }

  return existingProfile;
};

export default AuthListener;
