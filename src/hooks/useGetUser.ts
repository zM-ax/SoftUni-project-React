import { useAppSelector } from "../store/hooks";

export const useGetUserRedux = () => {
  return useAppSelector((state) => state.user.user);
};