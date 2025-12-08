// src/types/cart.ts
export type CartItemType = "catalog" | "custom";

export interface CustomBoxItem {
  code: string;      // example: "ekler", "funiika", "skala"
  title: string;     // name for UI
  quantity: number;  // quantity of the dessert
}

export interface CartItem {
  /** Unique ID of the cart item (not productId!) */
  id: string;

  /** catalog = from ProductsPage, custom = from "Make your own" */
  cartItemType: CartItemType;

  /** For catalog products this is the Firestore product.id. For custom it may be missing */
  productId?: string;

  /** Name to display in the cart */
  title: string;

  /** Main image for UI */
  imageUrl?: string;

  /** Quantity of this line item (number of boxes, cakes, etc.) */
  quantity: number;

  /** Unit price of the product/box */
  unitPrice: number;

  /** quantity * unitPrice (we calculate it for convenience) */
  totalPrice: number;

  /** Date for pickup/delivery */
  selectedDate: string;

  /**
   * За custom кутии: вътрешната конфигурация:
   *  - 2 еклера, 2 фунийки, 6 скалички и т.н.
   */
  customBoxItems?: CustomBoxItem[];
}
