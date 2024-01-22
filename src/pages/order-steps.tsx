import { Container } from "@mui/material";
import BaseComponent from "../components/BaseComponent";
import OrderStepsComponent from "../components/order/OrderSteps";
import { PaymentType } from "../interfaces/PaymentType";
import { baseService } from "../services/api";
import { useEffect, useState } from "react";
import FetchLoadingComponent from "../components/loaders/FetchLoadingComponent";
type OrderStepsProps = {
  paymentTypes: PaymentType[];
};
function OrderSteps() {
  const [paymentTypes, setPaymentType] = useState<PaymentType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await baseService.get<PaymentType[]>("/payment-type");
      setPaymentType(res.data);
    };
    getData();
    return () => {
      setPaymentType([]);
    };
  }, []);

  return (
    <BaseComponent title="Passos do pedido">
      <Container maxWidth="xl">
        {!paymentTypes ? (
          <FetchLoadingComponent isLoading={true} />
        ) : (
          <OrderStepsComponent paymentTypes={paymentTypes} />
        )}
      </Container>
    </BaseComponent>
  );
}

/** @ts-ignore */
export default UserAuth(OrderSteps, "order-steps");
