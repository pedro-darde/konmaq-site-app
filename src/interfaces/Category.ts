export type Category = {
  [key in CategoryFields]: string | number;
};
export type CategoryFields = "id" | "name" | "category";
