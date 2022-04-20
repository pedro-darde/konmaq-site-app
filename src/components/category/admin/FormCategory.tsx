import {
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { Category } from "../../../interfaces/Category";

type FormCategoryProps = {
  handleSubmit: (category: Category) => void;
  categories?: Array<Category>;
};
export default function FormCategory({
  handleSubmit,
  categories,
}: FormCategoryProps) {
  const [category, setCategory] = useState<Category>({
    category: "",
    name: "",
    id: "",
  });

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit(category);
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
                color="success"
                variant="standard"
                required
                value={category.name}
                label="Nome da categoria"
                onChange={(e) => {
                  setCategory((currentCategory) => {
                    let newCategory = Object.assign({}, currentCategory);
                    newCategory.name = e.target.value;
                    return newCategory;
                  });
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: "100%", margin: 0 }}>
                <InputLabel color="success"> Categoria Pai </InputLabel>
                <Select
                  defaultValue={""}
                  color="success"
                  value={category.category}
                  onChange={(e) => {
                    setCategory((currentCategory) => {
                      let newCategory = Object.assign({}, currentCategory);
                      newCategory.category = e.target.value;
                      return newCategory;
                    });
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

          <Grid container spacing={2} alignItems={"flex-start"} mt={2}>
            <Grid item xs={9}></Grid>
            <Grid item xs={3}>
              <Button
                color="error"
                variant="contained"
                type="submit"
                style={{ marginLeft: "3.25em" }}>
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
