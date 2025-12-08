// src/utils/orderItemsPreview.ts
import type { CartItem } from "../types/carts";

export interface OrderItemsPreview {
  previewText: string;       // за списъка в MyOrders
  tooltipText: string;       // пълен списък (за title/tooltip)
  uniqueItemsCount: number;  // колко различни продукта има
}

/**
 * Group items by title and sum quantities:
 * - 2 × Cones, 1 × Eclairs + more X
 */
export const buildOrderItemsPreview = (
  items: CartItem[],
  maxItemsToShow: number = 2
): OrderItemsPreview => { 
  const grouped = Object.values(
    items.reduce((acc, item) => {
      if (!acc[item.title]) {
        acc[item.title] = {
          title: item.title,
          quantity: 0,
        };
      }
      acc[item.title].quantity += item.quantity;    
      return acc;
    }, {} as Record<string, { title: string; quantity: number }>)
  );

  const uniqueItemsCount = grouped.length;

  // Preview for MyOrders – first N
  const previewParts = grouped
    .slice(0, maxItemsToShow)
    .map((i) => `${i.quantity} × ${i.title}`);

  const previewText = previewParts.join(", ");

  // Tooltip – full list
  const tooltipText = grouped
    .map((i) => `${i.quantity} × ${i.title}`)
    .join(", ");

  return {
    previewText,
    tooltipText,
    uniqueItemsCount,
  };
};
