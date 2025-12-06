// services/db/users.ts
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  type DocumentSnapshot,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import type { User } from "../../types/user";

const usersCollection = collection(db, "users");

const mapUserDoc = (snap: DocumentSnapshot): User => {
  //  eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = snap.data() as any;

  return {
    id: snap.id,
    name: data.name,
    email: data.email,
    userType: data.userType ?? "user",
    phoneNumber: data.phoneNumber ?? "",
    address: data.address ?? "",
    profileImageURL: data.profileImageURL ?? "",

    //  FIRESTORE TIMESTAMP → NUMBER (millis) (redux is throwing errors otherwise)
    createdAt: data.createdAt?.toMillis
      ? data.createdAt.toMillis()
      : data.createdAt ?? null,

    updatedAt: data.updatedAt?.toMillis
      ? data.updatedAt.toMillis()
      : data.updatedAt ?? null,

    // we need to manually set this as it never comes from Firestore
    isLoggedIn: false,
  };
};

export const createUserProfile = async (params: User): Promise<User> => {
  const { id, name, email, phoneNumber, address, profileImageURL } = params;

  const userRef = doc(usersCollection, id);

  await setDoc(
    userRef,
    {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      createdAt: serverTimestamp(),
      phoneNumber: phoneNumber || "",
      userType: "user",
      address: address || "",
      profileImageURL: profileImageURL || "",
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    throw new Error("Неуспешно създаване на профил в базата.");
  }

  // We return with serialized values
  return mapUserDoc(snap);
};

export const getUserByIdAsync = async (
  userId: string
): Promise<User | null> => {
  const userRef = doc(usersCollection, userId);
  const snap = await getDoc(userRef);

  if (!snap.exists()) return null;
  return mapUserDoc(snap);
};

export const updateUserAsync = async (
  userId: string,
  data: Partial<User>
): Promise<void> => {
  const userRef = doc(usersCollection, userId);

  await setDoc(
    userRef,
    {
      ...data,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

export const deleteUserAsync = async (userId: string): Promise<void> => {
  const userRef = doc(usersCollection, userId);
  await setDoc(
    userRef,
    {
      deletedAt: serverTimestamp(),
    },
    { merge: true }
  );
};
