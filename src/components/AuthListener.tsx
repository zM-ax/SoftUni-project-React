import { useEffect, type ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { getUserProfile } from "../services/db/users";
import { setAuthState } from "../store/authSlice";
import { useAppDispatch } from "../store/hooks";

type Props = { children: ReactNode };

const AuthListener = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      function serializeFirebaseUser(user: typeof auth.currentUser) {
        return user
          ? {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              phoneNumber: user.phoneNumber,
              providerId: user.providerId,
            }
          : null;
      }
      if (user) {
        const profile = await getUserProfile(user.uid);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function serializeUserProfile(profile: any) {
          return profile
            ? {
                ...profile,
                createdAt:
                  profile.createdAt && typeof profile.createdAt !== "number" && typeof profile.createdAt.toMillis === "function"
                    ? profile.createdAt.toMillis()
                    : profile.createdAt ?? null,
                updatedAt:
                  profile.updatedAt && typeof profile.updatedAt !== "number" && typeof profile.updatedAt.toMillis === "function"
                    ? profile.updatedAt.toMillis()
                    : profile.updatedAt ?? null,
              }
            : null;
        }
        dispatch(
          setAuthState({
            firebaseUser: serializeFirebaseUser(user),
            userProfile: serializeUserProfile(profile),
          })
        );
      } else {
        dispatch(
          setAuthState({
            firebaseUser: null,
            userProfile: null,
          })
        );
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthListener;
