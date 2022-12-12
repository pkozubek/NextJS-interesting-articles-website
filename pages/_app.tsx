import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Head from "next/head";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>INTERESTING ARTICLES</title>
        <meta
          name="description"
          content="Simple site, just for practicing nextjs and tailwind"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
      <ToastContainer position="bottom-right" />
    </Fragment>
  );
}
