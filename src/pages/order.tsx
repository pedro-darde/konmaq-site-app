import BaseComponent from "../components/BaseComponent";
import CreateOrder from "../components/order/CreateOrder";
import UserAuth from "../components/userAuth";

function Order() {
  return (
    <BaseComponent title="Konmaq - Pedido">
      <CreateOrder />
    </BaseComponent>
  );
}

export default UserAuth(Order, "order");
