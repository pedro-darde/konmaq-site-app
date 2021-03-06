export type Supplier = {
  [key in FieldNamesSupplier]: string | number;
};

export type FieldNamesSupplier =
  | "name"
  | "email"
  | "phone_number"
  | "description"
  | "neighboor"
  | "country"
  | "city"
  | "city_name"
  | "street_name"
  | "street_number"
  | "additional"
  | "additional";

export type AddedSupplier = {
  [key in FieldNamesSupplierAdded]: string | number;
};

export type FieldNamesSupplierAdded = FieldNamesSupplier | "id";
