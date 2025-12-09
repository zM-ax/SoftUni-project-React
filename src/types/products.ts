export type ProductType = {
  id: string;

  title: string;
  type: "cake" | "dessert";
  singleSmallImageUrl: string;
  imageUrls: string[];

  price: number;
  quantity: number;
  rating: number;
  reviewsCount: number;
  weight: number;

  shortDescription: string;
  longDescription: string;
  extraInfo: string;
  ingredients: string[];

  showOnHomepage: boolean;
  homepageOrder: number;
  isActive: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatedAt?: any;
};
