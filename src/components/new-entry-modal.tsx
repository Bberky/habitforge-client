import { useCreateHabitEntryMutation } from "@/services/api/habit-entry";
import { useGetUserHabitCompletion } from "@/services/api/user-habits";
import { InputNumber, Modal } from "antd";
import { FC, useState } from "react";

type NewEntryModalProps = {
  userHabitId: number;
  open: boolean;
  onCancel: () => void;
};

export const NewEntryModal: FC<NewEntryModalProps> = (props) => {
  const { open, onCancel, userHabitId } = props;
  const [entry, setEntry] = useState<null | number>(null);
  const { trigger: create } = useCreateHabitEntryMutation(userHabitId);
  const { mutate: updateCompletion } = useGetUserHabitCompletion(userHabitId);

  return (
    <Modal
      open={open}
      onCancel={() => {
        setEntry(null);
        onCancel();
      }}
      onOk={async () => {
        if (entry === null) return;
        await create({ value: entry! });
        await updateCompletion();
        setEntry(null);
        onCancel();
      }}
    >
      <InputNumber
        className="mt-6 w-full"
        placeholder="Enter value"
        onChange={(v) => setEntry(v)}
        value={entry}
      />
    </Modal>
  );
};
