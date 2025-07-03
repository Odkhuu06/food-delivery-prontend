export type Category = {
  cleatedAt: string;
  _id: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Food = {
  _id: string;
  price: number;
  foodName: string;
  image: string;
  ingredients: string;
  category: string;
};

export type FoodsWithCategory = {
  categoryName: string;
  foods: Food[];
  count: number;
  _id: string;
};