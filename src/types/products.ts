export type ProductType = {
  id: string;

  title: string;
  type: "cake" | "dessert";
  imageUrl: string;
  storagePath: string;

  price: string;
  quantity: number;
  rating: string;
  weight: string;

  shortDescription: string;
  longDescription: string;
  ingredients: string[];

  showOnHomepage: boolean;
  isActive: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatedAt?: any;
};
