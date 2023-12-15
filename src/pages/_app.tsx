import "@/styles/index.scss";
import { inter } from "@/styles/fonts";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>HabitForge</title>
      </Head>

      <main className={`${inter.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
