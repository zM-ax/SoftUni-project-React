import { useAppSelector } from "../../store/hooks";
import LoginPage from "../Authentication/LoginPage/LoginPage";
import MyProfilePage from "../MyProfile/MyProfilePage";

const ProfileRoute = () => {
  const { firebaseUser, initialized } = useAppSelector((s) => s.auth);

  if (!initialized) {
    return <div>Зареждане...</div>; // тук по-късно можеш да сложиш красив спинър
  }

  if (!firebaseUser) {
    return <LoginPage />;
  }

  return <MyProfilePage />;
};

export default ProfileRoute;
