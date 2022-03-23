import { Button, Container, Grid, Typography } from "@mui/material";
import { useCart } from "../../hooks/useCart";
import { ProductCartShow } from "../product/ProductCartShow";
export default function CreateOrder() {
  return (
    <Container maxWidth="xl">
      <ProductCartShow />
      <Button> Finalizar pedido </Button>
    </Container>
  );
}
