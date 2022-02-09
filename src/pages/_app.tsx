import type { AppProps } from "next/app";
import HeaderComponent from "../components/HeaderComponent";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <main>
        <HeaderComponent childComponent={<Component {...pageProps} />} />
      </main>
    </div>
  );
}

export default MyApp;
