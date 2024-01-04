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
import {
  FieldNamesUser,
  User,
  UserAddress,
  UserAddressFields,
} from "../../interfaces/User";
import { baseService } from "../../services/api";
import { Municipio } from "../../interfaces/Municipio";
interface FormUserProps {
  handleSubmit(user: User, userAddress: UserAddress): void;
}
export default function FormUserComponent({ handleSubmit }: FormUserProps) {
  const [user, setUser] = useState<User>({
    email: "",
    insc_estadual: "",
    isento: 0,
    name_social_name: "",
    password: "",
    phone_number: "",
    document: "",
    type: "user",
    additional: "",
    cep: "",
    country: "",
    neighboor: "",
    street_name: "",
    street_number: "",
    city: ""
  });
  const [userAddress, setUserAddress] = useState<UserAddress>({
    additional: "",
    cep: "",
    city: "",
    city_name: "",
    country: "",
    neighboor: "",
    street_name: "",
    street_number: "",
    nickname: "",
  });
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);

  const handleChangeState = (
    fieldName: FieldNamesUser,
    value: string | number | boolean
  ) => {
    setUser((currentUser) => {
      let newUser = Object.assign({}, currentUser);
      newUser[fieldName] = value;
      return newUser;
    });
  };

  const handleChangeStateUserAddress = (
    field: UserAddressFields,
    value: any
  ) => {
    if (field === "city") {
      setCityName(value);
    }

    setUserAddress((current) => {
      let newUserAddress = Object.assign({}, current);
      newUserAddress[field] = value;
      return newUserAddress;
    });
  };

  const setCityName = (codigo: any) => {
    const { nome } = municipios.filter(
      (municipio) => municipio.cod_municipio == codigo
    )[0];

    handleChangeStateUserAddress("city_name", nome);
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

  const maskCEP = (v: string) => {
    return v.replace(/(\d{5})(\d{3})/, "$1-$2");
  };

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    treatUserInfo();
    handleSubmit(user, userAddress);
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

  const treatUserInfo = () => {
    switch (user.isento) {
      case 2:
        handleChangeState("isento", true);
        break;
      default:
        handleChangeState("isento", false);
    }
  };

  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 800 }}>
      <Paper style={{ padding: 10 }} title="teste">
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
                value={user.name_social_name}
                label="Nome Completo"
                onChange={(e) => {
                  handleChangeState("name_social_name", e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                color="success"
                type="text"
                inputProps={{ maxLength: 18 }}
                required
                variant="standard"
                label="Documento (CPF, CNPJ)"
                value={maskCpfOrCnpj(user.document as string)}
                onChange={(e) => {
                  handleChangeState("document", e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="standard"
                fullWidth
                color="success"
                disabled={user.document.toString().length < 15}
                required={user.document.toString().length > 15}
                label="Inscricao Estadual"
                value={user.insc_estadual}
                onChange={(e) => {
                  handleChangeState("insc_estadual", e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: "100%", margin: 0 }}
              >
                <InputLabel color="success"> Isento </InputLabel>
                <Select
                  label="Isento"
                  value={user.isento}
                  onChange={(e) => {
                    handleChangeState("isento", e.target.value);
                  }}
                  color="success"
                  disabled={user.document.toString().length < 15}
                  required={user.document.toString().length > 15}
                >
                  {isentoOptions.map((value, key) => {
                    return (
                      <MenuItem value={value.value} key={key}>
                        {value.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="standard"
                fullWidth
                required
                color="success"
                type="email"
                label="Email"
                value={user.email}
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
                value={maskCellPhone(user.phone_number as string)}
                onChange={(e) => {
                  handleChangeState("phone_number", e.target.value);
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
                sx={{ m: 1, width: "100%", margin: 0 }}
              >
                <InputLabel color="success"> Estado </InputLabel>
                <Select
                  label="Estado"
                  defaultValue={""}
                  color="success"
                  required
                  value={userAddress.country}
                  onChange={(e) => {
                    handleChangeStateUserAddress("country", e.target.value);
                    handleChangeSelectState(parseInt(e.target.value!));
                  }}
                >
                  {Object.keys(estadoOptions).map((value, key) => {
                    return (
                      <MenuItem value={value} key={key}>
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
                sx={{ m: 1, width: "100%", margin: 0 }}
              >
                <InputLabel color="success"> Cidade </InputLabel>
                <Select
                  label="Cidade"
                  defaultValue={0}
                  value={parseInt(userAddress.city)}
                  onChange={(e) => {
                    handleChangeStateUserAddress("city", e.target.value);
                  }}
                  color="success"
                >
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
                value={userAddress.neighboor}
                onChange={(e) => {
                  handleChangeStateUserAddress("neighboor", e.target.value);
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
                value={userAddress.street_name}
                onChange={(e) => {
                  handleChangeStateUserAddress("street_name", e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                variant="standard"
                fullWidth
                color="success"
                label="Numero"
                value={userAddress.street_number}
                onChange={(e) => {
                  handleChangeStateUserAddress("street_number", e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="standard"
                fullWidth
                color="success"
                label="Complemento"
                value={userAddress.additional}
                onChange={(e) => {
                  handleChangeStateUserAddress("additional", e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant="standard"
                fullWidth
                color="success"
                label="CEP"
                inputProps={{ maxLength: 9 }}
                value={maskCEP(userAddress.cep as string)}
                onChange={(e) => {
                  handleChangeStateUserAddress("cep", e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="standard"
                fullWidth
                color="success"
                label="Apelido"
                value={userAddress.nickname}
                onChange={(e) => {
                  handleChangeStateUserAddress("nickname", e.target.value);
                }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <Chip label="Informacoes do usuario" color="error" />
          </Divider>
          <Grid container spacing={2} alignItems={"flex-start"}>
            <Grid item xs={6}>
              <TextField
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                variant="standard"
                fullWidth
                color="success"
                label="Senha"
                value={user.password}
                onChange={(e) => {
                  handleChangeState("password", e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="standard"
                fullWidth
                type={showRepeatPassword ? "text" : "password"}
                color="success"
                label="Repetir senha"
                value={repeatPassword}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={(e) =>
                        setShowRepeatPassword(!showRepeatPassword)
                      }
                    >
                      {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                onChange={(e) => {
                  setRepeatPassword(e.target.value);
                }}
              />
            </Grid>
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
