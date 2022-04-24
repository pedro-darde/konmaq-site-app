import { ProductWithFiles } from "../../interfaces/Product";
import {
  ExpandMoreOutlined,
  ShoppingCartCheckoutSharp,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  IconButtonProps,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import colors from "../../constants/colors";
import { useCart } from "../../hooks/useCart";
import { red } from "@mui/material/colors";
type CardProductPopularProps = {
  product: ProductWithFiles;
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
export default function CardProductPopular({
  product,
}: CardProductPopularProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { add } = useCart();
  const handleOpen = () => setOpen(!open);

  return (
    <Card sx={{ maxWidth: 350, marginBottom: "1em" }}>
      <CardHeader
        avatar={
          product.discount > 0 && (
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {product.discount + "%"}
            </Avatar>
          )
        }
        title={product.title}
        subheader={"Cod: " + product.id}
        sx={{
          backgroundColor: colors.header_color,
          color: "white",
        }}
        subheaderTypographyProps={{ style: { color: "white" } }}
        titleTypographyProps={{ style: { fontSize: 16 } }}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://www.konmaq.com.br/media/produtos/5429/-1644523603.27_450_300.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {product.description} <br />
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography variant="h5" gutterBottom color={colors.price_color}>
          {product.price.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </Typography>

        <IconButton
          onClick={() => {
            add({ product: product, quantity: 1 });
          }}>
          <ShoppingCartCheckoutSharp color="primary" />
        </IconButton>

        <ExpandMore expand={open} onClick={handleOpen}>
          <ExpandMoreOutlined />
        </ExpandMore>
      </CardActions>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph> Peso: {product.weight}</Typography>
          <Typography paragraph>Altura: {product.height}</Typography>
          <Typography paragraph>Largura: {product.width}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
