import {
  FilterList,
  ExpandMoreOutlined,
  ShoppingCartCheckoutSharp,
  Refresh,
  FilterListOff,
} from "@mui/icons-material";
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
  Tooltip,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useState } from "react";
import colors from "../constants/colors";
import { useCart } from "../hooks/useCart";
import { ProductAdded } from "../interfaces/Product";
import { Category, CategoryPage } from "../interfaces/Category";
import ListCategory from "./category/pages/ListCategory";
import ListProducts from "./product/ListProducts";
import { useSearchProducts } from "../hooks/useProducts";
import ChipCategoryFilter from "./filters/ChipCategoryFilter";

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

type OpenPageProps = {
  product: { releases: ProductAdded[]; popular: ProductAdded[] };
  pageCategories: CategoryPage[];
  categories: Category[];
};
export default function OpenPageComponent({
  product,
  pageCategories,
  categories,
}: OpenPageProps) {
  const [expandedPopuplar, setExpandedPopular] = useState(false);
  const [expandedRelease, setExpandedRelease] = useState(false);
  const [selectedIndexPopuplar, setSelectedIndexPopular] = useState<number>();
  const [selectedIndexRelease, setSelectedIndexRelease] = useState<number>();
  const { add } = useCart();
  const { products, handleClear } = useSearchProducts();

  const handleExpandClickPopular = (index: number) => {
    setExpandedPopular(!expandedPopuplar);
    setSelectedIndexPopular(index);
  };

  const handleExpandClickRelease = (index: number) => {
    setExpandedRelease(!expandedRelease);
    setSelectedIndexRelease(index);
  };

  return (
    <div
      style={{
        justifyContent: "flex-start",
        width: "100%",
        height: "100%",
      }}>
      <Grid container spacing={2}>
        <div>
          
          <ChipCategoryFilter categories={categories} />
        </div>
        <Grid item xs={2}>
          <div
            style={{
              backgroundColor: colors.header_color,
              padding: 10,
              borderRadius: 10,
            }}>
            <Typography
              variant="h5"
              sx={{ maxWidth: 350, textAlign: "center", color: "white" }}>
              Categorias
            </Typography>
          </div>
          {pageCategories.map((pageCategory) => {
            return (
              <ListCategory
                pageCategory={pageCategory}
                padding={0}
                key={pageCategory.id}
              />
            );
          })}
        </Grid>
        {products.length ? (
          <Grid item xs={10}>
            <div
              style={{
                backgroundColor: colors.header_color,
                padding: 10,
                borderRadius: 10,
                flex: 1,
                alignItems: "center",
                marginBottom: "0.25rem",
              }}>
              <Typography
                variant="h5"
                sx={{ textAlign: "center", color: "white" }}>
                Produtos
              </Typography>
            </div>
            <ListProducts products={products} />
          </Grid>
        ) : (
          <>
            <Grid item xs={4}>
              <Typography
                variant="h5"
                sx={{ maxWidth: 350, textAlign: "center" }}>
                Lancamentos
              </Typography>
              {product.releases.map((product, _) => (
                <Card key={_} sx={{ maxWidth: 350, marginBottom: "1em" }}>
                  <CardHeader
                    avatar={
                      product.discount > 0 && (
                        <Avatar
                          sx={{ bgcolor: colors.price_color, p: 3 }}
                          aria-label="recipe">
                          {product.discount + "%"}
                        </Avatar>
                      )
                    }
                    title={product.title}
                    sx={{
                      backgroundColor: colors.header_color,
                      color: "white",
                    }}
                    subheaderTypographyProps={{ style: { color: "white" } }}
                    subheader={"Cod: " + product.id}
                    titleTypographyProps={{ style: { fontSize: 16 } }}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={
                      "https://www.konmaq.com.br/media/produtos/5429/-1644523603.27_450_300.jpg"
                    }
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {product.description} <br />
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Typography
                      variant="h5"
                      gutterBottom
                      color={colors.price_color}>
                      {product.price.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Typography>

                    <IconButton
                      onClick={() => {
                        add({ product, quantity: 1 });
                      }}>
                      <ShoppingCartCheckoutSharp color="primary" />
                    </IconButton>

                    <ExpandMore
                      expand={expandedRelease}
                      onClick={() => {
                        handleExpandClickRelease(_);
                      }}>
                      <ExpandMoreOutlined />
                    </ExpandMore>
                  </CardActions>
                  <Collapse
                    in={_ === selectedIndexRelease && expandedRelease}
                    timeout="auto"
                    unmountOnExit>
                    <CardContent>
                      <Typography paragraph> Peso: {product.weight}</Typography>
                      <Typography paragraph>
                        {" "}
                        Altura: {product.height}
                      </Typography>
                      <Typography paragraph>
                        {" "}
                        Largura: {product.width}
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              ))}
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h5"
                sx={{ maxWidth: 350, textAlign: "center" }}>
                Destaques
              </Typography>
              <Grid container spacing={2}>
                {product.popular.map((p, _) => (
                  <Grid item xs={4} key={_}>
                    <Card key={_} sx={{ maxWidth: 350, marginBottom: "1em" }}>
                      <CardHeader
                        avatar={
                          p.discount > 0 && (
                            <Avatar
                              sx={{ bgcolor: red[500] }}
                              aria-label="recipe">
                              {p.discount + "%"}
                            </Avatar>
                          )
                        }
                        title={p.title}
                        subheader={"Cod: " + p.id}
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
                          {p.description} <br />
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                        <Typography
                          variant="h5"
                          gutterBottom
                          color={colors.price_color}>
                          {p.price.toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </Typography>

                        <IconButton
                          onClick={() => {
                            add({ product: p, quantity: 1 });
                          }}>
                          <ShoppingCartCheckoutSharp color="primary" />
                        </IconButton>

                        <ExpandMore
                          expand={expandedPopuplar}
                          onClick={() => {
                            handleExpandClickPopular(_);
                          }}>
                          <ExpandMoreOutlined />
                        </ExpandMore>
                      </CardActions>
                      <Collapse
                        in={_ === selectedIndexPopuplar && expandedPopuplar}
                        timeout="auto"
                        unmountOnExit>
                        <CardContent>
                          <Typography paragraph> Peso: {p.weight}</Typography>
                          <Typography paragraph>Altura: {p.height}</Typography>
                          <Typography paragraph>Largura: {p.width}</Typography>
                        </CardContent>
                      </Collapse>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
}
