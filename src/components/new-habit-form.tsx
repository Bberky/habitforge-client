import { Habit, useCreateHabitMutation } from "@/services/api/habits";
import {
  HabitGoalInterval,
  useCreateUserHabitMutation,
} from "@/services/api/user-habits";
import { useGetLoggedUser } from "@/services/api/users";
import { App, Button, Form, Input, Select } from "antd";
import { FC } from "react";

type NewHabitFormProps = {
  habit?: Habit;
  onFinish: () => void;
};

export const NewHabitForm: FC<NewHabitFormProps> = ({ habit, onFinish }) => {
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const { message } = App.useApp();
  const { trigger: createHabit, data } = useCreateHabitMutation();
  const { trigger: createUserHabit } = useCreateUserHabitMutation();
  const { data: user } = useGetLoggedUser();

  return (
    <>
      <Form initialValues={habit} disabled={habit !== undefined} form={form1}>
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="description">
          <Input placeholder="Description" />
        </Form.Item>
        <Form.Item name="unit" rules={[{ required: true }]}>
          <Input placeholder="Unit" />
        </Form.Item>
      </Form>
      <Form
        form={form2}
        onFinish={async (val) => {
          await createUserHabit({
            ...val,
            user_id: user!.id,
            habitId: habit?.id ?? data?.id,
          });
          message.success("Habit created");
        }}
      >
        <Form.Item name="goalInterval" rules={[{ required: true }]}>
          <Select
            placeholder="Goal interval (how often should the goal be achieved)"
            options={[
              {
                value: HabitGoalInterval.DAILY,
              },
              {
                value: HabitGoalInterval.WEEKLY,
              },
              {
                value: HabitGoalInterval.MONTHLY,
              },
              {
                value: HabitGoalInterval.YEARLY,
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="goalThreshold" rules={[{ required: true }]}>
          <Input placeholder="Goal threshold (when is the goal achieved)" />
        </Form.Item>
      </Form>
      <Button
        type="primary"
        block
        onClick={async () => {
          let habitId = habit?.id;

          try {
            await form1.validateFields();
            await form2.validateFields();
          } catch (_) {
            return;
          }

          if (habit === undefined) {
            const createdHabit = await createHabit({
              ...form1.getFieldsValue(),
              authorId: user!.id,
            });
            habitId = createdHabit.id;
          }

          await createUserHabit({
            ...form2.getFieldsValue(),
            userId: user!.id,
            habitId: habitId,
          });
          message.success(`Started tracking ${form1.getFieldValue("name")}}`);

          onFinish();
        }}
      >
        Finish
      </Button>
    </>
  );
};
