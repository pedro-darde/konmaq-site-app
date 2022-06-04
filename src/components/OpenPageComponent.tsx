import { Grid, Typography } from "@mui/material";
import { useCart } from "../hooks/useCart";
import { ProductWithFiles } from "../interfaces/Product";
import { Category, CategoryPage } from "../interfaces/Category";
import ListCategory from "./category/pages/ListCategory";
import ListProducts from "./product/ListProducts";
import { useSearchProducts } from "../hooks/useProducts";
import ChipCategoryFilter from "./filters/ChipCategoryFilter";
import CardProductRelease from "./product/CardProductRelease";
import CardProductPopular from "./product/CardProductPopular";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
type OpenPageProps = {
  product: { releases: ProductWithFiles[]; popular: ProductWithFiles[] };
  pageCategories: CategoryPage[];
  categories: Category[];
};
export default function OpenPageComponent({
  product,
  pageCategories,
  categories,
}: OpenPageProps) {
  const { add } = useCart();
  const { products, handleClear } = useSearchProducts();

  return (
    <div
      style={{
        justifyContent: "flex-start",
        width: "100%",
        height: "100%",
      }}
    >
      <div>
        <ChipCategoryFilter categories={categories} />
      </div>
      <Grid container spacing={2}>
        <Grid item xs={2}>
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
            <Grid container spacing={1}>
              <ListProducts products={products} />
            </Grid>
          </Grid>
        ) : (
          <>
            <Grid item xs={4}>
              <Typography
                variant="h5"
                sx={{ maxWidth: 350, textAlign: "start" }}
              >
                Lançamentos
              </Typography>
              {product.releases.map((product, _) => (
                <CardProductRelease key={_} product={product} />
              ))}
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h5"
                sx={{ maxWidth: 350, textAlign: "start" }}
              >
                Destaques
              </Typography>
              <Grid container spacing={2}>
                {product.popular.map((p, _) => (
                  <Grid item xs={4} key={_}>
                    <CardProductPopular product={p} />
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
