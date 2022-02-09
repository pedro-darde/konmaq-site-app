export type Product = {
  [key in RequiredFieldsProduct]: string | number | boolean | Array<number>;
};

export type RequiredFieldsProduct =
  | "title"
  | "price"
  | "promotion"
  | "discount"
  | "description"
  | "deadline"
  | "keywords"
  | "alias"
  | "supplier"
  | "weight"
  | "length"
  | "width"
  | "categories";
