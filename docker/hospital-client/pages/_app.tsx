import Header from "@/components/Header";
import { ThemeProvider } from "@/context/Themeprovider";
import "@/styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Patient Data Management In Hyperledger Fabric</title>
      </Head>
      <ThemeProvider>
        <Header />

        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
