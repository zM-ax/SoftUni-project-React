// src/types/orders.ts
import type { CartItem } from "./carts";

export interface OrderAddress {
  street: string;
  building?: string;
  entrance?: string;
  notes?: string; // additional notes for the address
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";

export type PaymentStatus = "unpaid" | "paid" | "refunded";
export type PaymentMethod = "cash"; // only cash for the

export interface Order { 
  id?: string; // This id will come from Firestore document ID
  userId: string | null;

  status: OrderStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt: any; // Firestore Timestamp

  customerName: string;
  customerPhone: string;
  customerNotes?: string;

  fulfillmentType: "pickup" | "delivery";
  scheduledDate: string;        // specific date for this order
  address?: OrderAddress | null;

  subtotal: number;             // sum of products for this date
  deliveryFee: number;
  total: number;
  currency: "BGN";

  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;

  items: CartItem[];            // Only for a specific date
}
