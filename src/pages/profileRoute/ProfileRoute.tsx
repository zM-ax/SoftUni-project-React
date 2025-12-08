import { useAppSelector } from "../../store/hooks";
import { Navigate } from "react-router-dom";
import MyProfilePage from "../MyProfile/MyProfilePage";

const ProfileRoute = () => {
  const { user } = useAppSelector((s) => s.user);

  // if (!initialized) {
  //   return <div>Зареждане...</div>; // тук по-късно можеш да сложиш красив спинър
  // }

  if (!user?.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <MyProfilePage />;
};

export default ProfileRoute;
