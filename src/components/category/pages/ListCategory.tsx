import { List, ListItemButton, Collapse, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import { Category, CategoryPage } from "../../../interfaces/Category";
import { useSearchProducts } from "../../../hooks/useProducts";

type ListCategoryProps = {
  padding: number;
  pageCategory: CategoryPage;
};

export default function ListCategory({
  pageCategory,
  padding,
}: ListCategoryProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { handleSearch, handleClear, currentCategoryID } = useSearchProducts();

  const handleClick = (category_id: number, parent: Category | null = null) => {
    if (open) handleClear();
    else handleSearch(category_id, parent);
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav">
      <ListItemButton
        onClick={() => {
          handleClick(pageCategory.id, pageCategory.category);
        }}
        style={{
          paddingLeft: padding,
          backgroundColor: pageCategory.id === currentCategoryID ? "Highlight": '',
        }}>
        <ListItemText primary={pageCategory.name} />
        {pageCategory.children.length > 0 && (
          <>{open ? <ExpandMore /> : <ExpandLess />}</>
        )}
      </ListItemButton>
      {pageCategory.children.length > 0 && (
        <>
          <Collapse in={open} timeout={"auto"} unmountOnExit>
            {pageCategory.children.map((childrenPage) => {
              return (
                <ListCategory
                  pageCategory={childrenPage}
                  padding={padding + 2}
                  key={childrenPage.id}
                />
              );
            })}
          </Collapse>
        </>
      )}
    </List>
  );
}
