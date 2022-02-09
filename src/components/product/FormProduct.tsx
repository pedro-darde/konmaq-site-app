import { FormEvent, useState } from "react";
import { Category } from "../../interfaces/Category";
import { Product, RequiredFieldsProduct } from "../../interfaces/Product";
import { Grid, Paper, Chip, Divider, TextField } from "@mui/material";
import CurrencyFormat from "react-currency-format";
type FormProductProps = {
  handleSubmit: (product: Product) => void;
  categories: Category[];
};

export default function FormProduct({
  categories,
  handleSubmit,
}: FormProductProps) {
  const [product, setProduct] = useState<Product>({
    alias: "",
    deadline: "",
    description: "",
    discount: "",
    keywords: "",
    length: "",
    price: "0",
    promotion: "",
    supplier: "",
    title: "",
    weight: "",
    width: "",
    categories: "",
  });

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit(product);
  };

  const handleChangeState = (
    field: RequiredFieldsProduct,
    value: string | number
  ) => {
    setProduct((currentProduct) => {
      let newProduct = Object.assign({}, currentProduct);
      newProduct[field] = value;

      return newProduct;
    });
  };

  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 800 }}>
      <Paper style={{ padding: 10 }}>
        <Divider>
          <Chip label="Informações cadastrais" color="error" />
        </Divider>

        <form onSubmit={formSubmit}>
          <Grid container spacing={2} alignItems={"flex-start"}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                required
                value={product.title}
                label="Titulo do Produto"
                color="success"
                variant="standard"
                onChange={(e) => {
                  handleChangeState("title", e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={4}>
              <CurrencyFormat
                customInput={TextField}
                label="Valor do Produto"
                color="success"
                variant="standard"
                onValueChange={(values) => {
                  const { floatValue, formattedValue, value } = values;
                  if (value === "") return;
                  handleChangeState("price", floatValue);
                }}
                fixedDecimalScale
                decimalScale={2}
                thousandSeparator={'.'}
                decimalSeparator={','}
                prefix={"R$"}
                value={product.price as string}
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
