import { Habit, useGetHabits } from "@/services/api/habits";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, List, Modal } from "antd";
import { FC, useMemo, useState } from "react";
import { NewHabitForm } from "./new-habit-form";
import { useGetLoggedUserUserHabits } from "@/services/api/user-habits";

type NewHabitModalProps = {
  open: boolean;
  onCancel: () => void;
};

export const NewHabitModal: FC<NewHabitModalProps> = (props) => {
  const { open, onCancel } = props;
  const { mutate: updateUserHabits } = useGetLoggedUserUserHabits();
  const { data: publicHabits } = useGetHabits(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const body = useMemo(() => {
    switch (currentStep) {
      case 0:
        return (
          <List
            dataSource={publicHabits}
            itemLayout="horizontal"
            grid={{ gutter: 24, column: 1 }}
            footer={
              <Button
                icon={<PlusOutlined />}
                block
                onClick={() => setCurrentStep((prev) => ++prev)}
              />
            }
            renderItem={(i) => (
              <List.Item
                className="hover:bg-slate-200 rounded-md cursor-pointer !pl-2 !py-1"
                onClick={() => {
                  setSelectedHabit(i);
                  setCurrentStep((prev) => ++prev);
                }}
              >
                <List.Item.Meta
                  title={i.name}
                  description={i.description}
                  avatar={`[${i.unit}]`}
                />
              </List.Item>
            )}
          />
        );
      case 1:
        return (
          <NewHabitForm
            habit={selectedHabit ?? undefined}
            onFinish={async () => {
              setCurrentStep(0);
              setSelectedHabit(null);
              onCancel();
              await updateUserHabits();
            }}
          />
        );
    }
  }, [currentStep, onCancel, publicHabits, selectedHabit, updateUserHabits]);

  return (
    <Modal
      title={
        currentStep === 1 ? (
          <>
            <Button
              icon={<ArrowLeftOutlined />}
              className="!border-0"
              onClick={() => setCurrentStep((prev) => --prev)}
            />
            <span>New Habit</span>
          </>
        ) : (
          "New Habit"
        )
      }
      open={open}
      footer={null}
      // classNames={{ body: "!pt" }}
      onCancel={() => {
        setCurrentStep(0);
        setSelectedHabit(null);
        onCancel();
      }}
      destroyOnClose
    >
      {body}
    </Modal>
  );
};
