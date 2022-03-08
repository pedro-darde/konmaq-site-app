import type { AppProps } from "next/app";

import HeaderComponent from "../components/HeaderComponent";
import { CartContextProvider } from "../hooks/useCart";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <div>
        <main>
          <HeaderComponent childComponent={<Component {...pageProps} />} />
        </main>
      </div>
    </CartContextProvider>
  );
}

export default MyApp;
