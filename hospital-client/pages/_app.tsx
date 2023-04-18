import Header from "@/components/Header";
import type { AppProps } from "next/app";
import Head from "next/head";

import { ThemeProvider } from "@/context/Themeprovider";
import "@/styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import store from "../redux/store";
import ToastContainers from "@/utils/ToastContainers";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Patient Data Management In Hyperledger Fabric</title>
      </Head>
      <Provider store={store}>
        <ThemeProvider>
          <Header />
          <ToastContainers />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
}
