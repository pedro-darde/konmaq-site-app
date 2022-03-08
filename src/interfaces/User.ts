export type User = {
  [key in FieldNamesUser]: string | boolean | number;
};

export type UserAdd = {
  [key in FieldNamesUserAdd]: string | boolean | number;
};

export type FieldNamesUserAdd =
  | "id"
  | "document"
  | "name_social_name"
  | "insc_estadual"
  | "isento"
  | "email"
  | "phone_number"
  | "country"
  | "neighboor"
  | "street_name"
  | "street_number"
  | "additional"
  | "cep"
  | "password"
  | "city"
  | "city_name";

export type FieldNamesUser =
  | "document"
  | "name_social_name"
  | "insc_estadual"
  | "isento"
  | "email"
  | "phone_number"
  | "country"
  | "neighboor"
  | "street_name"
  | "street_number"
  | "additional"
  | "cep"
  | "password"
  | "city"
  | "city_name";

export type FirstFieldNames =
  | "name_social_name"
  | "document"
  | "insc_estadual"
  | "email"
  | "phone_number";

export type InputOptions = {
  type: string;
  useMask: boolean;
  maskType?: string;
  placeholder: string;
};

export type FirstFieldNamesObject = {
  [key in FirstFieldNames]: InputOptions;
};

export const FirstFieldNamesObjectWithValues: FirstFieldNamesObject = {
  name_social_name: {
    type: "text",
    useMask: true,
    maskType: "document",
    placeholder: "Nome completo",
  },
  document: {
    type: "text",
    useMask: true,
    maskType: "document",
    placeholder: "Documento (CPF/CNPJ)",
  },
  insc_estadual: {
    type: "text",
    useMask: false,
    placeholder: "Inscricao Estadual",
  },
  email: {
    type: "text",
    useMask: true,
    maskType: "email",
    placeholder: "Email",
  },
  phone_number: {
    type: "text",
    useMask: true,
    maskType: "celphone",
    placeholder: "Celular",
  },
};
