import { useAppSelector } from "../../store/hooks";
import { Navigate } from "react-router-dom";
import MyProfilePage from "../MyProfile/MyProfilePage";

const ProfileRoute = () => {
  const { firebaseUser, initialized } = useAppSelector((s) => s.auth);

  if (!initialized) {
    return <div>Зареждане...</div>; // тук по-късно можеш да сложиш красив спинър
  }

  if (!firebaseUser) {
    return <Navigate to="/login" replace />;
  }

  return <MyProfilePage />;
};

export default ProfileRoute;
