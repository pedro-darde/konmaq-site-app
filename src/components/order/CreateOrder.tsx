import { Button, Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCart } from "../../hooks/useCart";
import { ProductCartShow } from "../product/ProductCartShow";
export default function CreateOrder() {
  const router = useRouter();
  const handleCheckout = () => {
    router.push("order-steps");
  };

  return (
    <Container maxWidth="xl">
      <ProductCartShow isOrderScreen={true} />
      <Button
        variant="contained"
        className="checkout-button"
        sx={{ float: "right" }}
        onClick={() => {
          handleCheckout();
        }}
      >
        Realizar checkout
      </Button>
    </Container>
  );
}
