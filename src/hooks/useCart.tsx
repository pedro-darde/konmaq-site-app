import React, { createContext, useContext, useState } from "react";
import { ProductAdded } from "../interfaces/Product";
import { KONMAP_PRODUCTS_KEY, storage } from "../services/konmaq_storage";
import useAlert from "./useAlert";

export type ProductCart = {
  product: ProductAdded;
  quantity: number;
};

interface CartContextProps {
  products: ProductCart[];
  load: () => void;
  add: (productCart: ProductCart) => void;
  changeQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clear: () => void;
}

export const CartContext = createContext({} as CartContextProps);
export const useCart = () => useContext(CartContext);

type CartContextProviderProps = {
  children: React.ReactChild;
};

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [productsCart, setProductsCart] = useState<ProductCart[]>([]);
  const alert = useAlert();
  const load = (): void => {
    const products = storage.get<ProductCart[]>(KONMAP_PRODUCTS_KEY);
    if (products && products.length > 0) {
      setProductsCart(products);
    } else {
      storage.set(KONMAP_PRODUCTS_KEY, JSON.stringify([]));
      setProductsCart([]);
    }
  };

  const add = (productCart: ProductCart): void => {
    let products = storage.get<ProductCart[]>(KONMAP_PRODUCTS_KEY);
    let newProducts: ProductCart[] = [];
    newProducts = [...products];

    // ver se o produto ja esta no cart, se ja tiver so aumenta a quantidade de produto, se nao so insere o produto no array
    const existsIndex = products.findIndex(
      (current) => current.product.id === productCart.product.id
    );
    if (existsIndex != -1) {
      products[existsIndex].quantity++;
    } else {
      newProducts.push(productCart);
    }
    setProductsCart(newProducts);
    storage.set(KONMAP_PRODUCTS_KEY, JSON.stringify(newProducts));
    alert.toast("Item adicionado", false, 1250, "bottom-right");
  };

  const changeQuantity = (id: number, quantity: number): void => {
    let products = storage.get<ProductCart[]>(KONMAP_PRODUCTS_KEY);
    const indexToChange = products.findIndex(
      (productCard) => productCard.product.id === id
    );
    products[indexToChange].quantity = quantity;
    setProductsCart(products);
    storage.set(KONMAP_PRODUCTS_KEY, JSON.stringify(products));
  };

  const removeItem = (id: number): void => {
    const newProductsCart = storage
      .get<ProductCart[]>(KONMAP_PRODUCTS_KEY)
      .filter((productCart) => productCart.product.id !== id);
    setProductsCart(newProductsCart);
    storage.set(KONMAP_PRODUCTS_KEY, JSON.stringify(newProductsCart));
  };

  const clear = () => {
    storage.remove(KONMAP_PRODUCTS_KEY);
    setProductsCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        add,
        changeQuantity,
        clear,
        load,
        products: productsCart,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
