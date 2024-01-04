import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormEvent, useState } from "react";
import { estadoOptions } from "../../fixed/estado-options";
import { isentoOptions } from "../../fixed/isento-options";
import { baseService } from "../../services/api";
import { Municipio } from "../../interfaces/Municipio";
import { FieldNamesSupplier, Supplier } from "../../interfaces/Supplier";
interface FormSupplierProps {
  handleSubmit(supplier: Supplier): void;
}
export default function FormSupplierComponent({
  handleSubmit,
}: FormSupplierProps) {
  const [supplier, setSupplier] = useState<Supplier>({
    additional: "",
    country: "",
    email: "",
    name: "",
    description: "",
    neighboor: "",
    phone_number: "",
    street_name: "",
    street_number: "",
    city: "",
    city_name: "",
  });
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  
  const handleChangeState = (
    fieldName: FieldNamesSupplier,
    value: string | number
  ) => {
    setSupplier((currentSupplier) => {
      let newSupplier = Object.assign({}, currentSupplier);
      newSupplier[fieldName] = value;
      return newSupplier;
    });
  };

  const maskCpfOrCnpj = (v: string) => {
    if (v) {
      v = v.replace(/\D/g, "");

      if (v.length <= 11) {
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      } else {
        v = v.replace(/^(\d{2})(\d)/, "$1.$2");
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
        v = v.replace(/(\d{4})(\d)/, "$1-$2");
      }

      return v;
    }
    return "";
  };

  const maskCellPhone = (v: string) => {
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    return v;
  };

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit(supplier);
  };

  const handleChangeSelectState = (value: number) => {
    if (value) {
      baseService
        .get<Municipio[]>(`municipios/${value}`)
        .then((res) => {
          setMunicipios(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 800 }}>
      <Paper style={{ padding: 10 }}>
        <Divider>
          <Chip label="Informacoes Cadastrais" color="error" />
        </Divider>
        <form onSubmit={formSubmit}>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={6}>
              <TextField
                fullWidth
                color="success"
                variant="standard"
                required
                value={supplier.name}
                label="Nome Completo"
                onChange={(e) => {
                  handleChangeState("name", e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="standard"
                fullWidth
                required
                color="success"
                type="email"
                label="Email"
                value={supplier.email}
                onChange={(e) => {
                  handleChangeState("email", e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="standard"
                fullWidth
                color="success"
                label="Telefone"
                required
                inputProps={{ maxLength: 15 }}
                value={maskCellPhone(supplier.phone_number as string)}
                onChange={(e) => {
                  handleChangeState("phone_number", e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="standard"
                fullWidth
                color="success"
                label="Descricao"
                required
                value={supplier.description}
                onChange={(e) => {
                  handleChangeState("description", e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <Chip label="Informacoes do endereco" color="error" />
          </Divider>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={4}>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: "100%", margin: 0 }}>
                <InputLabel color="success"> Estado </InputLabel>
                <Select
                  label="Estado"
                  defaultValue={""}
                  color="success"
                  required
                  value={supplier.country}
                  onChange={(e) => {
                    handleChangeState("country", e.target.value);
                    handleChangeSelectState(e.target.value as number);
                  }}>
                  {Object.keys(estadoOptions).map((value, key) => {
                    return (
                      <MenuItem value={estadoOptions[value].sigla} key={key}>
                        {estadoOptions[value].sigla}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: "100%", margin: 0 }}>
                <InputLabel color="success"> Cidade </InputLabel>
                <Select
                  label="Cidade"
                  defaultValue={0}
                  value={supplier.city}
                  onChange={(e) => {
                    handleChangeState("city", e.target.value);
                  }}
                  color="success"
                  required>
                  {municipios.map((value, key) => {
                    return (
                      <MenuItem value={value.cod_municipio} key={key}>
                        {value.nome}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="standard"
                fullWidth
                required
                color="success"
                label="Bairro"
                value={supplier.neighboor}
                onChange={(e) => {
                  handleChangeState("neighboor", e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={10}>
              <TextField
                variant="standard"
                fullWidth
                required
                color="success"
                label="Rua"
                value={supplier.street_name}
                onChange={(e) => {
                  handleChangeState("street_name", e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                variant="standard"
                fullWidth
                color="success"
                label="Numero"
                value={supplier.street_number}
                onChange={(e) => {
                  handleChangeState("street_number", e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={8}>
              <TextField
                variant="standard"
                fullWidth
                color="success"
                label="Complemento"
                value={supplier.additional}
                onChange={(e) => {
                  handleChangeState("additional", e.target.value);
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems={"flex-start"}>
            <Grid item xs={10}></Grid>
            <Grid item xs={2}>
              <Button color="error" variant="contained" type="submit">
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
