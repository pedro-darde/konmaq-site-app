import { ProductAdded, ProductWithFiles } from "../interfaces/Product";
import React, { createContext, useContext, useState } from "react";
import { baseService } from "../services/api";
import { Category } from "../interfaces/Category";
import { Cached } from "../services/cached";

type ProductContextProp = {
  currentCategoryID: number;
  products: ProductWithFiles[];
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
  
  const [products, setProducts] = useState<ProductWithFiles[]>([]);
  const [currentCategoryID, setCurrentCategoryID] = useState<number>(-1);
  
  const handleSearch = async (
    category_id: number,
    parent: Category | null = null
  ) => {
    const cached = new Cached()
    setCurrentCategoryID(category_id);
    const modelCategory = `product-category/${category_id}`
    const items = await cached.get<ProductWithFiles[]>(modelCategory)
    setProducts(items);


    if (parent) {
      const modelParent = `product-category/${parent.id}`
      const items = await cached.get<ProductWithFiles[]>(modelParent)
      setProducts((current) => [...current, ...items]);
    }
  };

  const handleClear = () => {
    setProducts([]);
    setCurrentCategoryID(-1);
  };

  return (
    <ProductContext.Provider
      value={{ products, handleSearch, handleClear, currentCategoryID }}
    >
      {children}
    </ProductContext.Provider>
  );
}
