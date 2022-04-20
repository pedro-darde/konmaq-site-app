import { ProductAdded } from "../interfaces/Product";
import React, { createContext, useContext, useState } from "react";
import { baseService } from "../services/api";
import { Category } from "../interfaces/Category";

type ProductContextProp = {
  currentCategoryID: number;
  products: ProductAdded[];
  handleSearch: (category_id: number, parent: Category | null) => void;
  handleClear: () => void;
};

export const ProductContext = createContext({} as ProductContextProp);
export const useSearchProducts = () => useContext(ProductContext);

type ProductContextProviderProps = {
  children: React.ReactChild;
};

export function ProductContextProvider({
  children,
}: ProductContextProviderProps) {
  const [products, setProducts] = useState<ProductAdded[]>([]);
  const [currentCategoryID, setCurrentCategoryID] = useState<number>(-1);
  const handleSearch = (
    category_id: number,
    parent: Category | null = null
  ) => {
    setCurrentCategoryID(category_id);
    baseService
      .get<ProductAdded[]>(`product-category/${category_id}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("error fetching products by category", err);
      });

    if (parent) {
      baseService
        .get<ProductAdded[]>(`product-category/${parent.id}`)
        .then((res) => {
          setProducts((current) => [...current, ...res.data]);
        })
        .catch((err) => {
          console.log("error fetching products by parent category", err);
        });
    }
  };

  const handleClear = () => {
    setProducts([]);
    setCurrentCategoryID(-1);
  };

  return (
    <ProductContext.Provider
      value={{ products, handleSearch, handleClear, currentCategoryID }}>
      {children}
    </ProductContext.Provider>
  );
}
