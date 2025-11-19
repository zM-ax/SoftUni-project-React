import { useAppSelector } from "../../store/hooks";

import LoginPage from "../Authentication/LoginPage/LoginPage";

const ProfileRoute = () => {
  const { firebaseUser, initialized } = useAppSelector((s) => s.auth);

  if (!initialized) {
    return <div>Зареждане...</div>; // тук по-късно можеш да сложиш красив спинър
  }

  if (!firebaseUser) {
    return <LoginPage />;
  }


};

export default ProfileRoute;
