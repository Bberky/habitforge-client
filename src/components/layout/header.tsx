import { useGetLoggedUser } from "@/services/api/users";
import { clearCredentials } from "@/services/auth";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Flex, Menu, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { useSWRConfig } from "swr";

export const Header: FC = () => {
  const router = useRouter();
  const { cache } = useSWRConfig();
  const { data: user } = useGetLoggedUser();

  return (
    <Flex align="center" justify="space-between" className="h-full">
      <Link href="/">
        <Typography.Title className="!text-white !mb-0">
          HabitForge
        </Typography.Title>
      </Link>
      <Menu theme="dark" mode="horizontal" items={[]} />
      <Dropdown
        trigger={["click"]}
        arrow
        placement="bottomRight"
        className="cursor-pointer"
        overlayClassName="!min-w-fit"
        menu={{
          items: [
            {
              key: "sign-out",
              label: "Sign Out",
              danger: true,
              onClick: () => {
                for (const key of cache.keys()) {
                  cache.delete(key);
                }

                clearCredentials();
                router.push("/auth/sign-in");
              },
            },
          ],
        }}
      >
        <Flex gap={24} align="center">
          <Flex vertical align="end" className="!leading-none !text-white">
            <Typography.Text type="secondary" className="!text-white">
              {user?.fullName ?? "~~~"}
            </Typography.Text>
            <Typography.Text className="!text-white !text-opacity-80">
              {user?.email}
            </Typography.Text>
          </Flex>
          <Avatar icon={<UserOutlined />} />
        </Flex>
      </Dropdown>
    </Flex>
  );
};
