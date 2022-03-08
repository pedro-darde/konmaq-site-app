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
  | "categories"
  | "height";

export type FieldsOfProductAdded = RequiredFieldsProduct | "id";

export type ProductAdded = {
  [key in FieldsOfProductAdded]: string | number | boolean | Array<number>;
};
