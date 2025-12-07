import { addDoc, collection, serverTimestamp } from "firebase/firestore";
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
