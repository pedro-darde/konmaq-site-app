import type { AppProps } from "next/app";

import HeaderComponent from "../components/HeaderComponent";
import { CartContextProvider } from "../hooks/useCart";
import { ProductContextProvider } from "../hooks/useProducts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <ProductContextProvider>
        <div>
          <main>
            <HeaderComponent childComponent={<Component {...pageProps} />} />
          </main>
        </div>
      </ProductContextProvider>
    </CartContextProvider>
  );
}

export default MyApp;
