import { useGetLoggedUser } from "@/services/api/users";
import { Flex, Spin } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const withAuth = <T extends JSX.IntrinsicAttributes>(
  Page: NextPage<T>,
) => {
  // eslint-disable-next-line react/display-name
  return (props: T) => {
    const router = useRouter();
    const [isVerified, setIsVerified] = useState(false);
    const { data: user, isLoading } = useGetLoggedUser();

    useEffect(() => {
      if (user) {
        setIsVerified(true);
      } else if (!isLoading) router.push("/auth/sign-in");
    }, [isLoading, router, user]);

    if (isVerified) return <Page {...props} />;
    else if (isLoading)
      return (
        <Flex>
          <Spin size="large" />
        </Flex>
      );
    else return null;
  };
};
