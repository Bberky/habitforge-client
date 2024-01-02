import { Flex, Result } from "antd";
import { NextPage } from "next";

const ForbiddenPage: NextPage = () => (
  <Flex justify="center" align="center" className="h-full">
    <Result
      status={403}
      title={403}
      subTitle="You are not authorized to access this page."
    />
  </Flex>
);

export default ForbiddenPage;
