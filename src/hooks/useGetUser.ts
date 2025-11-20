import { useAppSelector } from "../store/hooks";

export const useAuthUser = () => {
  return useAppSelector((state) => state.auth);
};