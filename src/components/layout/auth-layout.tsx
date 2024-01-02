import { FC, PropsWithChildren } from "react";
import { PageLayout } from "./page-layout";
import { Typography } from "antd";

type AuthLayoutProps = {
  title?: string;
  heading?: string;
};

export const AuthLayout: FC<PropsWithChildren<AuthLayoutProps>> = (props) => {
  const { children, title, heading } = props;

  return (
    <PageLayout title={title} className="max-w-sm mt-32">
      {heading && (
        <Typography.Title level={2} className="text-center">
          {heading}
        </Typography.Title>
      )}
      {children}
    </PageLayout>
  );
};
