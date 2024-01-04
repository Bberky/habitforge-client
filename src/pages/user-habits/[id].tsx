import { withAuth } from "@/components/hoc/with-auth";
import { HomeLayout } from "@/components/layout/home-layout";
import { NewEntryModal } from "@/components/new-entry-modal";
import {
  HabitEntry,
  useDeleteHabitEntryMutation,
  useGetHabitEntries,
} from "@/services/api/habit-entry";
import { useGetHabit } from "@/services/api/habits";
import {
  useGetUserHabit,
  useGetUserHabitCompletion,
} from "@/services/api/user-habits";
import { DeleteOutlined } from "@ant-design/icons";
import { App, Button, Flex, Menu, Progress, Table, Typography } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

const UserHabitPage: NextPage = () => {
  const { message } = App.useApp();
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useGetHabitEntries(parseInt(id as string));
  const { data: completion } = useGetUserHabitCompletion(
    parseInt(id as string),
  );
  const { data: userHabit } = useGetUserHabit(parseInt(id as string));
  const { data: habit } = useGetHabit(userHabit?.habitId ?? 0);
  const { trigger: deleteEntry } = useDeleteHabitEntryMutation(
    parseInt(id as string),
  );
  const [selectedMenuItem, setSelectedMenuItem] = useState("entries");
  const [isCreatingNewEntry, setIsCreatingNewEntry] = useState(false);
  const { mutate: updateCompletion } = useGetUserHabitCompletion(
    parseInt(id as string),
  );
  const body = useMemo(() => {
    switch (selectedMenuItem) {
      case "entries":
        return (
          <>
            <Flex align="center" gap={24} className="mb-4">
              <Button
                type="primary"
                onClick={() => setIsCreatingNewEntry(true)}
              >
                New Entry
              </Button>
              <Typography.Text>
                Total: {data?.reduce((i, e) => i + e.value, 0)} {habit?.unit}
              </Typography.Text>
            </Flex>
            <Table<HabitEntry>
              loading={isLoading}
              dataSource={data}
              rowKey="id"
              summary={(data) => (
                <Table.Summary>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      {data.reduce((acc, curr) => acc + curr.value, 0)}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
              bordered
              columns={[
                {
                  title: "Created At",
                  dataIndex: "createdAt",
                  render: (val) => new Date(val).toUTCString(),
                },
                { title: "Value", dataIndex: "value" },
                {
                  title: "Actions",
                  render: (_, r) => (
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={async () => {
                        await deleteEntry(r.id);
                        message.success("Entry deleted");
                        await updateCompletion();
                      }}
                    />
                  ),
                },
              ]}
            />
          </>
        );
      case "settings":
        return null;
    }
  }, [
    data,
    deleteEntry,
    habit?.unit,
    isLoading,
    message,
    selectedMenuItem,
    updateCompletion,
  ]);

  return (
    <HomeLayout>
      <NewEntryModal
        userHabitId={parseInt(id as string)}
        open={isCreatingNewEntry}
        onCancel={() => setIsCreatingNewEntry(false)}
      />
      <Flex align="center" gap={24} className="my-8">
        <Progress type="circle" percent={Math.round((completion ?? 0) * 100)} />
        <Flex vertical>
          <Typography.Title level={4}>
            {habit?.name}{" "}
            <Typography.Text type="secondary">[{habit?.unit}]</Typography.Text>
          </Typography.Title>
          <Typography.Text>{habit?.description}</Typography.Text>
        </Flex>
        <Flex vertical>
          <Typography.Text>
            Goal interval: {userHabit?.goalInterval}
          </Typography.Text>
          <Typography.Text>
            Goal threshold: {userHabit?.goalThreshold}
          </Typography.Text>
        </Flex>
      </Flex>
      <Menu
        mode="horizontal"
        items={[{ key: "entries", label: "Entries" }]}
        selectedKeys={[selectedMenuItem]}
        onSelect={({ key }) => setSelectedMenuItem(key)}
        className="mb-4"
      />
      {body}
    </HomeLayout>
  );
};

export default withAuth(UserHabitPage);
