import "@/styles/index.scss";
import { inter } from "@/styles/fonts";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ConfigProvider } from "antd";
import { antdTheme } from "@/styles/antd";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>HabitForge</title>
      </Head>

      <ConfigProvider theme={antdTheme}>
        <main className={`${inter.variable} font-sans`}>
          <Component {...pageProps} />
        </main>
      </ConfigProvider>
    </>
  );
}
