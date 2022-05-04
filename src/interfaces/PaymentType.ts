export type PaymentType = {
  [key in PaymentTypeKeys]: undefined | number | boolean | string;
};

export type PaymentTypeKeys = "id" | "active" | "description";
