import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { PaymentType } from "../../interfaces/PaymentType";
import { usePaymentInputs, PaymentInputsWrapper } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import { UserPaymentTypeInfo } from "../../interfaces/UserPaymentTypeInfo";

type PaymentTypeStepProps = {
  paymentTypes: PaymentType[];
  handleSelectPaymentType: (payment_type_id: number) => void;
  currentPaymentType: number;
  mainPaymentType: UserPaymentTypeInfo;
};
export default function PaymentTypeStep({
  paymentTypes,
  handleSelectPaymentType,
  mainPaymentType,
  currentPaymentType,
}: PaymentTypeStepProps) {
  const ERROR_MESSAGES = {
    emptyCardNumber: "Informe um número",
    invalidCardNumber: "Número informado inválido",
    emptyExpiryDate: "Informe uma data de expiração",
    monthOutOfRange: "Mês informado inválido",
    yearOutOfRange: "Ano informado inválido",
    dateOutOfRange: "Data informada inválida",
    invalidExpiryDate: "Data informada inválida",
    emptyCVC: "CVC inválido",
    invalidCVC: "CVC inválido",
  };

  const [t, setT] = useState<string>("");

  const [selectedPaymentType, setSelectedPaymentType] =
    useState<number>(currentPaymentType);

  const handleSelect = (evt: SelectChangeEvent<number>) => {
    setSelectedPaymentType(parseInt(evt.target.value as string));
    handleSelectPaymentType(parseInt(evt.target.value as string));
  };

  const {
    getCVCProps,
    getCardImageProps,
    getExpiryDateProps,
    getCardNumberProps,
    wrapperProps,
    meta,
  } = usePaymentInputs({
    errorMessages: ERROR_MESSAGES,
  });

  return (
    <Paper>
      <FormControl sx={{ m: 1, width: "95%" }}>
        <InputLabel> Selecione a forma de pagamento</InputLabel>
        <Select
          fullWidth
          value={selectedPaymentType}
          label="Selecione a forma de pagamento"
          onChange={handleSelect}
        >
          <MenuItem value={-1}>Selecione</MenuItem>
          {paymentTypes.map((paymentType) => (
            <MenuItem value={paymentType.id?.toString()!} key={parseInt(paymentType.id?.toString()!)}>
              {paymentType.description}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {[2, 3].includes(selectedPaymentType) && (
        <div style={{ padding: "10px" }}>
          <PaymentInputsWrapper {...wrapperProps}>
            {/** @ts-ignore */}
            <svg {...getCardImageProps({ images })} />
            <input
              {...getCardNumberProps()}
              placeholder="Número do cartão"
              value={t}
            />
            <input {...getExpiryDateProps()} placeholder="MM/AA" />
            <input {...getCVCProps()} />
          </PaymentInputsWrapper>
        </div>
      )}
    </Paper>
  );
}
