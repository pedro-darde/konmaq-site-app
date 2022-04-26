import { ProductAdded, ProductWithFiles } from "../../interfaces/Product";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  IconButtonProps,
  styled,
  Typography,
} from "@mui/material";
import colors from "../../constants/colors";
import {
  ExpandMoreOutlined,
  ShoppingCartCheckoutSharp,
} from "@mui/icons-material";
import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import ProductImageListShow from "./ProductImageListShow";
import { priceWrappedWithLocaleString } from "../../helpers/ProductHelper";

type ListProductsProps = {
  products: ProductWithFiles[];
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

type IsOpen = {
  [key: number]: boolean;
};

export default function ListProducts({ products }: ListProductsProps) {
  const [open, setOpen] = useState<IsOpen>({} as IsOpen);

  const handleOpen = (key: number) => {
    setOpen((current) => {
      let newOpen = Object.assign({}, current);
      newOpen[key] = current[key] ? false : true;
      return newOpen;
    });
  };

  const { add } = useCart();
  return (
    <>
      {products.map((product, key) => {
        return (
          <Grid item xs={4} md={4}>
            <Card key={key} sx={{ maxWidth: 350, marginBottom: "1em" }}>
              <CardHeader
                avatar={
                  product.discount > 0 && (
                    <Avatar
                      sx={{ bgcolor: colors.price_color, p: 3 }}
                      aria-label="recipe"
                    >
                      {product.discount + "%"}
                    </Avatar>
                  )
                }
                title={product.title}
                sx={{ backgroundColor: colors.header_color, color: "white" }}
                subheaderTypographyProps={{ style: { color: "white" } }}
                subheader={"Cod: " + product.id}
                titleTypographyProps={{ style: { fontSize: 16 } }}
              />
              {product.files.length ? (
                <ProductImageListShow files={product.files} />
              ) : (
                <CardMedia
                  component="img"
                  height="194"
                  image={
                    "https://www.konmaq.com.br/media/produtos/5429/-1644523603.27_450_300.jpg"
                  }
                  alt="Paella dish"
                />
              )}

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {product.description} <br />
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Typography
                  variant="h5"
                  gutterBottom
                  color={colors.price_color}
                >
                  {priceWrappedWithLocaleString(
                    parseFloat(product.price.toString()),
                    parseFloat(product.discount.toString()),
                    parseFloat(product.promotion.toString()),
                    1
                  )}
                </Typography>

                <IconButton
                  onClick={() => {
                    add({ product, quantity: 1 });
                  }}
                >
                  <ShoppingCartCheckoutSharp color="primary" />
                </IconButton>

                <ExpandMore
                  key={key}
                  expand={open[key]}
                  onClick={() => {
                    handleOpen(key);
                  }}
                >
                  <ExpandMoreOutlined />
                </ExpandMore>
              </CardActions>
              <Collapse in={open[key]} timeout="auto" unmountOnExit key={key}>
                <CardContent>
                  <Typography paragraph> Peso: {product.weight}</Typography>
                  <Typography paragraph> Altura: {product.height}</Typography>
                  <Typography paragraph> Largura: {product.width}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        );
      })}
    </>
  );
}
