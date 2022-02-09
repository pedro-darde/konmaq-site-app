import { FormEvent, useState } from "react";
import { Category } from "../../interfaces/Category";
import { Product, RequiredFieldsProduct } from "../../interfaces/Product";
import { Grid, Paper, Chip, Divider, TextField, TextareaAutosize, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
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
    length: "0",
    price: "0",
    promotion: "",
    supplier: "",
    title: "",
    weight: "0",
    width: "0",
    categories: [],
  });

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit(product);
  };

  const handleChangeState = (
    field: RequiredFieldsProduct,
    value: string | number | number[]
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
                prefix={"R$ "}
                value={product.price as string}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                value={product.description}
                multiline
                variant="standard"
                color="success"
                label={"Descrição do produto"}
                onChange={e => {
                  handleChangeState('description', e.target.value)
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                value={product.alias}
                variant="standard"
                color="success"
                label={"Apelido do produto"}
                onChange={e => {
                  handleChangeState('alias', e.target.value)
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                value={product.keywords}
                multiline
                variant="standard"
                color="success"
                label={"Palavras chaves do produto"}
                onChange={e => {
                  handleChangeState('keywords', e.target.value)
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: "100%", margin: 0 }}>
                <InputLabel color="success"> Categorias do Produto </InputLabel>
                <Select
                  defaultValue={""}
                  color="success"
                  value={product.categories}
                  multiple
                  onChange={(e) => {
                    handleChangeState('categories', e.target.value as Array<number>)
                  }}>
                  {categories?.map((value, key) => {
                    return (
                      <MenuItem value={value.id} key={key}>
                        {value.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <Chip label="Informações técnicas" color="error" />
          </Divider>

          <Grid container spacing={2} alignItems={'flex-start'}>
            <Grid item xs={4}>
              <CurrencyFormat
                customInput={TextField}
                label="Peso do Produto"
                color="success"
                variant="standard"
                onValueChange={(values) => {
                  const { floatValue, formattedValue, value } = values;
                  if (value === "") return;
                  handleChangeState("weight", floatValue);
                }}
                fixedDecimalScale
                decimalScale={3}
                suffix={" kg"}
                prefix={""}
                value={product.weight as string} />
            </Grid>

            <Grid item xs={4}>
              <CurrencyFormat
                customInput={TextField}
                label="Comprimento do Produto"
                color="success"
                variant="standard"
                onValueChange={(values) => {
                  const { floatValue, formattedValue, value } = values;
                  if (value === "") return;
                  handleChangeState("length", floatValue);
                }}
                fixedDecimalScale
                decimalScale={2}
                suffix={" m"}
                prefix={""}
                value={product.length as string} />
            </Grid>

            <Grid item xs={4}>
              <CurrencyFormat
                customInput={TextField}
                label="Largura do Produto"
                color="success"
                variant="standard"
                onValueChange={(values) => {
                  const { floatValue, formattedValue, value } = values;
                  if (value === "") return;
                  handleChangeState("width", floatValue);
                }}
                fixedDecimalScale
                decimalScale={2}
                suffix={" m"}
                prefix={""}
                value={product.width as string} />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
