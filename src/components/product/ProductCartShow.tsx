import { Add, Delete, Remove, ShoppingCartCheckout } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { BoxProps } from "@mui/system";
import { useRouter } from "next/router";
import { useCart } from "../../hooks/useCart";

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        ...sx,
      }}
      {...other}
    />
  );
}

type ProductCartShowProps = {
  isOrderScreen: boolean;
};

export const ProductCartShow = ({ isOrderScreen }: ProductCartShowProps) => {
  const { products, changeQuantity, removeItem } = useCart();
  const router = useRouter();
  const localeStringOpts = {
    minimumFractionDigits: 2,
    style: "currency",
    currency: "BRL",
  };

  const getProductPrice = (
    price: number,
    discount: number,
    promotion: number,
    quantity: number
  ) => {
    if (discount === 0 && promotion === 0) return price * quantity;
    if (promotion > 0) return promotion * quantity;
    const percent = discount / 100;
    const discountValue = price * percent;
    return (price - discountValue) * quantity;
  };

  const getAllProductPrices = () => {
    return products.reduce(
      (sum, { product, quantity }) =>
        sum +
        getProductPrice(
          Number(product.price),
          Number(product.discount),
          Number(product.promotion),
          quantity
        ),
      0
    );
  };

  const getAllProductsQuantitys = () => {
    return products.reduce((sum, { quantity }) => sum + quantity, 0);
  };
  return (
    <div style={{ width: "100%", padding: 2 }}>
      {products?.map(({ product, quantity }, key) => {
        return (
          <>
            <Box
              key={key}
              sx={{
                display: "grid",
                alignItems: "center",
                gridTemplateColumns: "repeat(4, 1fr)",
              }}>
              <Item>
                <Typography variant="inherit">{product.description}</Typography>
              </Item>
              <Item sx={{ flexGrow: 1 }}>
                <FormControl fullWidth>
                  <InputLabel> Quantidade </InputLabel>
                  <Select
                    variant={"standard"}
                    value={quantity}
                    onChange={(event) => {
                      changeQuantity(
                        parseInt(product.id.toString()),
                        parseInt(event.target.value.toString())
                      );
                    }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                      (qtd, idx) => {
                        return (
                          <MenuItem value={qtd} key={idx}>
                            {qtd}
                          </MenuItem>
                        );
                      }
                    )}
                  </Select>
                </FormControl>
              </Item>
              <Item>
                <p>
                  {getProductPrice(
                    Number(product.price),
                    Number(product.discount),
                    Number(product.promotion),
                    quantity
                  ).toLocaleString("pt-BR", localeStringOpts)}
                </p>
              </Item>
              <Item>
                <IconButton
                  id="remove-item"
                  onClick={() => {
                    removeItem(parseInt(product.id.toString()));
                  }}>
                  <Delete color="error" />
                </IconButton>
              </Item>
            </Box>
          </>
        );
      })}
      <Box
        sx={{
          display: "grid",
          gridAutoColumns: "1fr",
          gap: 1,
        }}>
        <Item sx={{ gridRow: "1", gridColumn: "4 / 5" }}>
          <p style={{ fontSize: "12px" }}>
            <p style={{ fontWeight: "bold" }}> Subtotal: </p>
            {getAllProductPrices().toLocaleString("pt-BR", localeStringOpts)}
          </p>
          <p style={{ fontSize: "10px" }}>
            {" "}
            {getAllProductsQuantitys() + " item(ns)"}
          </p>
        </Item>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridAutoColumns: "1fr",
          gap: 1,
        }}>
        <Item sx={{ gridRow: "1", gridColumn: "4 / 5" }}>
          {!isOrderScreen && (
            <Button
              endIcon={<ShoppingCartCheckout />}
              disabled={products.length === 0}
              variant="contained"
              onClick={() => {
                router.push("/order");
              }}>
              Finalizar pedido
            </Button>
          )}
        </Item>
      </Box>
    </div>
  );
};
