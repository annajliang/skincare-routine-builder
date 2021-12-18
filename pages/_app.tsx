import "../client/styles/normalize.css";
import "../client/styles/globals.css";
import Layout from "../client/components/Layout";
import type { AppProps } from "next/app";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
