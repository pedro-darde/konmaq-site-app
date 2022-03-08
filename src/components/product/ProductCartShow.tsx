import { Add, Delete, Remove } from "@mui/icons-material";
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  MenuList,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useCart } from "../../hooks/useCart";

export const ProductCartShow = () => {
  const { products, changeQuantity, removeItem } = useCart();

  return (
    <div>
      <MenuList>
        {products?.map(({ product, quantity }, key) => {
          return (
            <MenuItem key={key}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="inherit" noWrap>
                    {product.description}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <FormControl fullWidth>
                    <InputLabel> Quantidade </InputLabel>
                    <Select
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
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    id="remove-item"
                    onClick={() => {
                      removeItem(parseInt(product.id.toString()));
                    }}>
                    <Delete color="error" />
                  </IconButton>
                </Grid>
              </Grid>
            </MenuItem>
          );
        })}
      </MenuList>
    </div>
  );
};
