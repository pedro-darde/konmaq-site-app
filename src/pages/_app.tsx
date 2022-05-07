import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import HeaderComponent from "../components/HeaderComponent";
import { CartContextProvider } from "../hooks/useCart";
import { ProductContextProvider } from "../hooks/useProducts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <CartContextProvider>
        <ProductContextProvider>
          <div>
            <main>
              <HeaderComponent childComponent={<Component {...pageProps} />} />
            </main>
          </div>
        </ProductContextProvider>
      </CartContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
