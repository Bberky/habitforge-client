import { Layout } from "antd";
import Head from "next/head";
import { FC, PropsWithChildren, ReactNode } from "react";

export type PageLayoutProps = {
  title?: string;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export const PageLayout: FC<PropsWithChildren<PageLayoutProps>> = (props) => {
  const { children, title = "HabitForge", header, footer, className } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Layout>
        {header && <Layout.Header>{header}</Layout.Header>}
        <Layout.Content className={`container ${className}`}>
          {children}
        </Layout.Content>
        {footer && <Layout.Footer>{footer}</Layout.Footer>}
      </Layout>
    </>
  );
};
