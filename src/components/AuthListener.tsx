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
      if (user) {
        const profile = await getUserProfile(user.uid);
        dispatch(
          setAuthState({
            firebaseUser: user,
            userProfile: profile,
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
