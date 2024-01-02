import { FC, PropsWithChildren } from "react";
import { PageLayout, PageLayoutProps } from "./page-layout";
import { Header } from "./header";

type HomeLayoutProps = PageLayoutProps & {};

export const HomeLayout: FC<PropsWithChildren<HomeLayoutProps>> = (props) => {
  const { ...pageLayoutProps } = props;

  return <PageLayout {...pageLayoutProps} header={<Header />} />;
};
