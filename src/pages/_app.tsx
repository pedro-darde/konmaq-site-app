import type { AppProps } from "next/app";

import HeaderComponent from "../components/HeaderComponent";
import { AuthContextProvider } from "../hooks/useAuth";
import { CartContextProvider } from "../hooks/useCart";
import { ProductContextProvider } from "../hooks/useProducts";
import { WithAuthAdminContextProvider } from "../hooks/withAuth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <ProductContextProvider>
          <WithAuthAdminContextProvider>
            <div>
              <main>
                <HeaderComponent
                  childComponent={<Component {...pageProps} />}
                />
              </main>
            </div>
          </WithAuthAdminContextProvider>
        </ProductContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
