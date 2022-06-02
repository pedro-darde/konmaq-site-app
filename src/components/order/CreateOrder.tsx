import { Button, Container, Grid, Typography } from "@mui/material";
import { ProductCartShow } from "../product/ProductCartShow";
export default function CreateOrder() {
  return (
    <Container maxWidth="xl">
      <ProductCartShow isOrderScreen={true} />
      <Button variant="contained" className="checkout-button" sx={{ float: 'right'}}>
        Realizar checkout
      </Button>
    </Container>
  );
}
