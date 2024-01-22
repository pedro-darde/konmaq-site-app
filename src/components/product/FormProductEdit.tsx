import { FormEvent, useState } from "react";
import { Category } from "../../interfaces/Category";
import {
  Product,
  ProductAdded,
  RequiredFieldsProduct,
} from "../../interfaces/Product";
import {
  Grid,
  Paper,
  Chip,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import CurrencyFormat from "react-currency-format";
import { AddedSupplier } from "../../interfaces/Supplier";
// import { DropzoneArea } from "mui-file-dropzone";
type FormProductProps = {
  handleSubmit: (product: ProductAdded, files: File[]) => void;
  categories: Category[];
  suppliers: AddedSupplier[];
  productEdit: ProductAdded;
};

export default function FormProductEdit({
  categories,
  handleSubmit,
  suppliers,
  productEdit,
}: FormProductProps) {
  const [product, setProduct] = useState<ProductAdded>(productEdit);

  const [files, setFiles] = useState<Array<File>>([]);
  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit(product, files);
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
            <Grid item xs={6}>
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

            <Grid item xs={6}>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: "100%", margin: 0 }}
              >
                <InputLabel color="success"> Fornecedor do Produto </InputLabel>
                <Select
                  defaultValue={""}
                  color="success"
                  value={product.supplier}
                  onChange={(e) => {
                    handleChangeState(
                      "supplier",
                      e.target.value as Array<number>
                    );
                  }}
                >
                  {suppliers?.map((value, key) => {
                    return (
                      <MenuItem value={value.id} key={key}>
                        {value.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
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
                onChange={(e) => {
                  handleChangeState("description", e.target.value);
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
                onChange={(e) => {
                  handleChangeState("alias", e.target.value);
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
                onChange={(e) => {
                  handleChangeState("keywords", e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: "100%", margin: 0 }}
              >
                <InputLabel color="success"> Categorias do Produto </InputLabel>
                <Select
                  defaultValue={""}
                  color="success"
                  value={product.categories}
                  multiple
                  onChange={(e) => {
                    handleChangeState(
                      "categories",
                      e.target.value as Array<number>
                    );
                  }}
                >
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

          <Grid container spacing={2} alignItems={"flex-start"}>
            <Grid item xs={3}>
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
                suffix={" g"}
                prefix={""}
                value={product.weight as string}
              />
            </Grid>
            <Grid item xs={3}>
              <CurrencyFormat
                customInput={TextField}
                label="Altura do Produto"
                color="success"
                variant="standard"
                onValueChange={(values) => {
                  const { floatValue, formattedValue, value } = values;
                  if (value === "") return;
                  handleChangeState("height", floatValue);
                }}
                fixedDecimalScale
                decimalScale={2}
                suffix={" cm"}
                prefix={""}
                value={product.height as string}
              />
            </Grid>
            <Grid item xs={3}>
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
                suffix={" cm"}
                prefix={""}
                value={product.length as string}
              />
            </Grid>

            <Grid item xs={3}>
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
                suffix={" cm"}
                prefix={""}
                value={product.width as string}
              />
            </Grid>
          </Grid>

          <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <Chip label="Informações sobre cobrancas" color="error" />
          </Divider>

          <Grid container spacing={2}>
            <Grid item xs={3}>
              <CurrencyFormat
                customInput={TextField}
                required
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
                thousandSeparator={"."}
                decimalSeparator={","}
                prefix={"R$ "}
                value={product.price as string}
              />
            </Grid>

            <Grid item xs={3}>
              <CurrencyFormat
                customInput={TextField}
                label="Desconto do Produto"
                color="success"
                variant="standard"
                onValueChange={(values) => {
                  const { floatValue, formattedValue, value } = values;
                  if (value === "") return;
                  handleChangeState("discount", floatValue);
                }}
                fixedDecimalScale
                decimalScale={0}
                suffix={" %"}
                value={product.discount as string}
              />
            </Grid>

            <Grid item xs={3}>
              <CurrencyFormat
                customInput={TextField}
                label="Promocao do Produto"
                color="success"
                variant="standard"
                onValueChange={(values) => {
                  const { floatValue, formattedValue, value } = values;
                  if (value === "") return;
                  handleChangeState("promotion", floatValue);
                }}
                fixedDecimalScale
                thousandSeparator={"."}
                decimalSeparator={","}
                decimalScale={2}
                prefix={"R$ "}
                value={product.promotion as string}
              />
            </Grid>

            <Grid item xs={3}>
              <CurrencyFormat
                customInput={TextField}
                label="Prazo de entrega"
                color="success"
                variant="standard"
                onValueChange={(values) => {
                  const { floatValue, formattedValue, value } = values;
                  if (value === "") return;
                  handleChangeState("deadline", floatValue);
                }}
                fixedDecimalScale
                decimalScale={0}
                suffix={" dias"}
                value={product.deadline as string}
              />
            </Grid>
          </Grid>

          <Grid container sx={{ marginTop: "1.5em" }}>
            aaa
            <Grid item xs={12}>
              {/* <DropzoneArea
                onChange={(files) => {
                  setFiles(files)
                }}
                fileObjects={''}
                acceptedFiles={[".png", ".jpg", ".jpeg"]}
                dropzoneText={"Arraste e solte o arquivo aqui"}
                showPreviewsInDropzone={true}
                showFileNames={true}
                previewText={"Arquivo selecionado: "}
              /> */}
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            alignItems={"flex-start"}
            sx={{ marginTop: "1.25em" }}
          >
            <Grid item xs={9}></Grid>
            <Grid item xs={3}>
              <Button
                color="error"
                variant="contained"
                style={{ marginRight: "1em" }}
                type="submit"
              >
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
