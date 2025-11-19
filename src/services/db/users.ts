import { db } from '../../config/firebase'; 
import {
  collection,
  doc,
  setDoc,
  getDoc, 
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';

export const usersCollection = collection(db, "users");

// When registering a new user, we only create a basic profile with name and email.
export type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  photoUrl?: string;
  createdAt?: import('firebase/firestore').Timestamp | number | null;
  updatedAt?: import('firebase/firestore').Timestamp | number | null;
};

type UpdateUserProfileParams = {
  uid: string;
  data: {
    name?: string;
    phone?: string;
    address?: string;
    photoUrl?: string;
  };
};

type CreateUserProfileParams = {
  uid: string;
  name: string;
  email: string;
};

export const createUserProfile = async (
  params: CreateUserProfileParams
): Promise<UserProfile> => {
  const { uid, name, email } = params;

  const userRef = doc(usersCollection, uid);

  await setDoc(
    userRef,
    {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );

  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    throw new Error("Неуспешно създаване на профил в базата.");
  }

  const data = snap.data();

  return {
    id: snap.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    address: data.address,
    photoUrl: data.photoUrl,
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
  };
};

export const getUserProfile = async (
  uid: string
): Promise<UserProfile | null> => {
  const userRef = doc(usersCollection, uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) return null;

  const data = snap.data();

  return {
    id: snap.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    address: data.address,
    photoUrl: data.photoUrl,
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
  };
};



export const updateUserProfile = async ({
  uid,
  data,
}: UpdateUserProfileParams): Promise<void> => {
  const userRef = doc(usersCollection, uid);

  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};