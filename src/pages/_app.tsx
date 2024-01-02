import "@/styles/index.scss";
import { inter } from "@/styles/fonts";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ConfigProvider, App as AntdApp } from "antd";
import { antdTheme } from "@/styles/antd";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>HabitForge</title>
      </Head>

      <SWRConfig value={{ shouldRetryOnError: false }}>
        <ConfigProvider theme={antdTheme}>
          <AntdApp className={`${inter.variable} font-sans h-full`}>
            <Component {...pageProps} />
          </AntdApp>
        </ConfigProvider>
      </SWRConfig>
    </>
  );
}
