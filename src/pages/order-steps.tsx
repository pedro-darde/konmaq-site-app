import { Container } from "@mui/material";
import BaseComponent from "../components/BaseComponent";
import OrderStepsComponent from "../components/order/OrderSteps";
import UserAuth from "../components/userAuth";
import { PaymentType } from "../interfaces/PaymentType";
import { baseService } from "../services/api";
type OrderStepsProps = {
  paymentTypes: PaymentType[];
};
function OrderSteps({ paymentTypes }: OrderStepsProps) {
  return (
    <BaseComponent title="Passos do pedido">
      <Container maxWidth="xl">
        <OrderStepsComponent paymentTypes={paymentTypes} />
      </Container>
    </BaseComponent>
  );
}

/** @ts-ignore */
export default UserAuth(OrderSteps, "order-steps");

export async function getServerSideProps({ query }: any) {
  const res = await baseService.get<PaymentType[]>("/payment-type");
  const data = res.data;

  return { props: { paymentTypes: data } };
}
