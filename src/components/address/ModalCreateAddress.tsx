import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { FormEvent, useState } from "react";
import colors from "../../constants/colors";
import { estadoOptions } from "../../fixed/estado-options";
import useAlert from "../../hooks/useAlert";
import { Municipio } from "../../interfaces/Municipio";
import { UserAddress, UserAddressFields } from "../../interfaces/User";
import { baseService } from "../../services/api";

type ModalCreateAddressProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleSumbit: (adr: UserAddress) => void;
};
export default function ModalCreateAddress({
  handleSumbit,
  handleClose,
  isOpen,
}: ModalCreateAddressProps) {
  const [userAddress, setUserAddress] = useState<UserAddress>(
    {} as UserAddress
  );
  const [municipios, setMunicipios] = useState<Municipio[]>([]);

  const { toast } = useAlert();

  const setCityName = (codigo: any) => {
    const { nome } = municipios.filter(
      (municipio) => municipio.cod_municipio == codigo
    )[0];

    handleChangeStateUserAddress("city_name", nome);
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

  const maskCEP = (v: string) => {
    if (v) return v.replace(/(\d{5})(\d{3})/, "$1-$2");
    return "";
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

  const handleCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSumbit(userAddress);
    handleClose();
    toast("Endereço inserido");
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={isOpen}
      onClose={(e) => {
        handleClose();
        setUserAddress({} as UserAddress);
      }}
      fullScreen={fullScreen}
    >
      <form onSubmit={handleCreate}>
        <DialogTitle>Adicionar endereço</DialogTitle>
        <DialogContent sx={{ p: 3 }}>
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
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              setUserAddress({} as UserAddress);
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            autoFocus
            sx={{ bgcolor: colors.primary_color }}
            variant="contained"
          >
            Salvar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
