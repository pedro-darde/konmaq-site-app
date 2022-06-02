import { TextFields } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { PaymentType, PaymentTypeKeys } from "../../interfaces/PaymentType";
import { baseService } from "../../services/api";

type FormPaymentTypeEditProps = {
  handleSubmit(paymentType: PaymentType): void;
  paymentTypeId: string;
};

export default function FormPaymentTypeEdit({
  handleSubmit,
  paymentTypeId,
}: FormPaymentTypeEditProps) {
  const [paymentType, setPaymentType] = useState<PaymentType>(
    {} as PaymentType
  );

  const handleChangeState = (key: PaymentTypeKeys, value: any) => {
    setPaymentType((current) => {
      let newPaymentType = Object.assign({}, current);
      newPaymentType[key] = value;
      return newPaymentType;
    });
  };

  useEffect(() => {
    baseService
      .get<PaymentType>(`payment-type/${paymentTypeId}`)
      .then((res) => {
        console.log(res.data)
        setPaymentType(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [paymentTypeId]);

  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 800 }}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(paymentType);
        }}>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={10}>
            <TextField
              fullWidth
              color="success"
              variant="standard"
              required
              value={paymentType.description}
              label="Descrição"
              onChange={(e) => {
                handleChangeState("description", e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl
              variant="standard"
              sx={{ m: 1, width: "100%", margin: 0 }}>
              <FormControlLabel
                control={
                  <Switch
                    color={"error"}
                    value={paymentType.active}
                    checked={paymentType.active as boolean}
                    onChange={(event) => {
                      console.log(event.target.checked);
                      handleChangeState("active", event.target.checked);
                    }}
                  />
                }
                label="Ativo"
              />
            </FormControl>
          </Grid>
          <Grid item xs={10}></Grid>
          <Grid item xs={2} alignSelf={"center"}>
            <Button type={"submit"} color="error" variant="contained">
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
