import { Container } from "@mui/material";
import { useRouter } from "next/router";
import BaseComponent from "../../../components/BaseComponent";
import FormPaymentType from "../../../components/payment-type/FormPaymentType";
import TitleComponent from "../../../components/TitleComponent";
import { PaymentType } from "../../../interfaces/PaymentType";

export default function Create() {
  const router = useRouter();
  const handleSubmit = (paymentType: PaymentType) => {};
  return (
    <BaseComponent title="Adicionar forma de pagamento">
      <Container maxWidth="xl">
        <TitleComponent title="Criar usuário" />
        <FormPaymentType handleSubmit={handleSubmit} />
      </Container>
    </BaseComponent>
  );
}
