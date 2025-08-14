export type Shop = {
  _id: string;
  name: string;
  owner: string;
  location: string;
  createdAt: string;
  totalCategories: number;
  totalProducts: number;
  totalStock: number;
  data: [];
};

export type Category = {
  _id: string;
  name: string;
}

export type Brand = {
  _id: string;
  name: string;
}