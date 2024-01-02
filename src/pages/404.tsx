import { Flex, Result } from "antd";
import { NextPage } from "next";

const NotFoundPage: NextPage = () => (
  <Flex justify="center" align="center" className="h-full">
    <Result
      status={404}
      title={404}
      subTitle="The page you're trying to visit does not exist."
    />
  </Flex>
);

export default NotFoundPage;
