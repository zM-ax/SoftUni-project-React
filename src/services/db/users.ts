import { db } from '../../firebase';
import type { User } from '../../types/user';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';


const usersCollection = collection(db, 'users');

export async function createUser(user: User): Promise<void> {
  await setDoc(doc(usersCollection, user.id), user);
}

export async function getUser(userId: string): Promise<User | null> {
  const userDoc = await getDoc(doc(usersCollection, userId));
  if (userDoc.exists()) {
    return userDoc.data() as User;
  }
  return null;
}

export async function deleteUser(userId: string): Promise<void> {
  await deleteDoc(doc(usersCollection, userId));
}
