import { useGetHabit } from "@/services/api/habits";
import {
  useDeleteHabitTagMutation,
  useGetHabitTags,
} from "@/services/api/tags";
import {
  USER_HABITS_API_URL,
  UserHabit,
  useDeleteUserHabitMutation,
  useGetUserHabitCompletion,
} from "@/services/api/user-habits";
import { USERS_API_URL, useGetLoggedUser } from "@/services/api/users";
import {
  DeleteOutlined,
  PlusOutlined,
  SettingOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { App, Button, Flex, Popconfirm, Progress, Tag, Typography } from "antd";
import Link from "next/link";
import { FC, useState } from "react";
import { useSWRConfig } from "swr";
import { AssignTagModal } from "./assign-tag-modal";
import { NewEntryModal } from "./new-entry-modal";

type UserHabitCardProps = UserHabit;

export const UserHabitCard: FC<UserHabitCardProps> = (props) => {
  const { id, habitId, goalInterval, goalThreshold } = props;
  const { message } = App.useApp();
  const [isNewEntry, setIsNewEntry] = useState(false);
  const [assigningTag, setAssigningTag] = useState(false);
  const { data: loggedUser } = useGetLoggedUser();
  const { data: habit } = useGetHabit(habitId);
  const { trigger: deleteUserHabit } = useDeleteUserHabitMutation(id);
  const { mutate } = useSWRConfig();
  const { data: completion } = useGetUserHabitCompletion(id);
  const { data: tags } = useGetHabitTags(habitId);
  const { trigger: deleteTag } = useDeleteHabitTagMutation(habitId);

  return (
    <>
      <NewEntryModal
        userHabitId={id}
        open={isNewEntry}
        onCancel={() => setIsNewEntry(false)}
      />
      <AssignTagModal
        habitId={habitId}
        assignedTags={tags?.map((i) => i.id) ?? []}
        open={assigningTag}
        onCancel={() => setAssigningTag(false)}
      />
      <Flex vertical className="border pt-6 rounded-md w-64">
        <Flex vertical className="px-6 pb-2">
          <Typography.Title level={4}>
            {habit?.name}{" "}
            <Typography.Text type="secondary">[{habit?.unit}]</Typography.Text>
          </Typography.Title>
          <Typography.Text>{habit?.description}</Typography.Text>
          <Typography.Text>Goal interval: {goalInterval}</Typography.Text>
          <Typography.Text>Goal threshold: {goalThreshold}</Typography.Text>
          <Progress percent={Math.round((completion ?? 0) * 100)} />
          <Flex wrap="wrap">
            {tags?.map((i) => (
              <Tag
                key={i.id}
                color={`#${i.color.toString(16)}`}
                closeIcon
                onClose={async () => await deleteTag(i.id)}
                className="mb-2"
              >
                {i.name}
              </Tag>
            ))}
          </Flex>
        </Flex>
        <Flex
          className="!divide-x !divide-[#e5e7eb] border-t"
          justify="space-evenly"
        >
          <Button
            className="!border-0"
            icon={<PlusOutlined />}
            block
            onClick={() => setIsNewEntry(true)}
          />
          <Button
            className="!border-0 rounded-none"
            block
            icon={<TagOutlined />}
            onClick={() => setAssigningTag(true)}
          />
          <Link
            href={{ pathname: "/user-habits/[id]", query: { id } }}
            legacyBehavior
            passHref
          >
            <Button
              className="!border-0 rounded-none"
              icon={<SettingOutlined />}
              block
            />
          </Link>
          <Popconfirm
            title="Delete this user habit"
            description="All your entries will be deleted. Habit itself won't be deleted."
            onConfirm={async () => {
              await deleteUserHabit();
              await mutate(
                `${USERS_API_URL}/${loggedUser?.id}/${USER_HABITS_API_URL}`,
              );
              message.success("User habit deleted");
            }}
          >
            <Button
              className="!border-0 rounded-none"
              icon={<DeleteOutlined />}
              danger
              block
            />
          </Popconfirm>
        </Flex>
      </Flex>
    </>
  );
};
