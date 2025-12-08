import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import type { Order } from "../../types/orders";

const ORDERS_COLLECTION = "orders";

export const createOrder = async (
  payload: Omit<Order, "id" | "createdAt">
): Promise<string> => {
  const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
    ...payload,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
};

export const getOrdersForUser = async (userId: string): Promise<Order[]> => {
  const q = query(
    collection(db, ORDERS_COLLECTION),
    where("userId", "==", userId),
    //  or "createdAt" ?
    orderBy("scheduledDate", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data() as Order;
    return {
      ...data,
      id: doc.id,
    };
  });
};

export const cancelOrder = async (orderId: string): Promise<void> => {
  await updateDoc(doc(db, ORDERS_COLLECTION, orderId), {
    status: "cancelled",
  });
};

export const getOrderById = async (orderId: string): Promise<Order | null> => {
  const docRef = doc(db, ORDERS_COLLECTION, orderId);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;

  const data = snapshot.data() as Order;

  return {
    ...data,
    id: snapshot.id,
  };
};