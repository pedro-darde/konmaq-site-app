import { FilterList, FilterListOff, Refresh } from "@mui/icons-material";
import { Box, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import colors from "../../constants/colors";
import { useSearchProducts } from "../../hooks/useProducts";
import { Category } from "../../interfaces/Category";

type ChipCategoryFilterProps = {
  categories: Category[];
};
export default function ChipCategoryFilter({
  categories,
}: ChipCategoryFilterProps) {
  const { handleSearch, currentCategoryID, products, handleClear } =
    useSearchProducts();

  return (
    <div>
      <Typography
        variant="subtitle1"
        sx={{ maxWidth: 350, textAlign: "start" }}>
        Busca rapida
        <Tooltip
          title={
            products.length
              ? "Os produtos estão filtrados"
              : "Selecione uma categoria abaixo para filtrar os produtos"
          }>
          <IconButton>
            {products.length ? <FilterList /> : <FilterListOff />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Desfazer pesquisa">
          <IconButton onClick={handleClear}>
            <Refresh />
          </IconButton>
        </Tooltip>
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          p: 1,
          m: 1,
          bgcolor: colors.header_color,
          borderRadius: 1,
          overflowY: "auto",
          width: '100%'
        }}>
        {categories.map(({ name, id }) => (
          <>
            <IconButton
              key={id}
              onClick={() => {
                handleSearch(id as number, null);
              }}>
              <Chip
                label={name}
                sx={{
                  bgcolor: currentCategoryID === id ? "Highlight" : "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </>
        ))}
      </Box>
    </div>
  );
}
