import BaseComponent from "../components/BaseComponent";
import CreateOrder from "../components/order/CreateOrder";

export default function Order() {
  return (
    <BaseComponent title="Konmaq - Pedido">
      <CreateOrder />
    </BaseComponent>
  );
}
