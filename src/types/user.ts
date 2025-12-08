export interface User {
  id: string;
  name: string;
  email: string;
  userType?: 'user' | 'admin';
  phoneNumber?: string;
  address?: string;
  profileImageURL?: string;
  isLoggedIn?: boolean; 
  createdAt?: import("firebase/firestore").Timestamp | number | null;
  updatedAt?: import("firebase/firestore").Timestamp | number | null; 
} 

export interface UpdateUserProfileParams {
  userId: string;
  data: {
    name?: string;
    phone?: string;
    address?: string;
    photoUrl?: string;
  };
}
