import type { AppProps } from "next/app";

import HeaderComponent from "../components/HeaderComponent";
import { AuthContextProvider } from "../hooks/useAuth";
import { CartContextProvider } from "../hooks/useCart";
import { ProductContextProvider } from "../hooks/useProducts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <ProductContextProvider>
          <div>
            <main>
              <HeaderComponent childComponent={<Component {...pageProps} />} />
            </main>
          </div>
        </ProductContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
