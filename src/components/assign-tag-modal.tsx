import { useAddHabitTagMutation, useGetTags } from "@/services/api/tags";
import { Modal } from "antd";
import { FC } from "react";

type AssignTagModalProps = {
  assignedTags: number[];
  habitId: number;
  open: boolean;
  onCancel: () => void;
};

export const AssignTagModal: FC<AssignTagModalProps> = (props) => {
  const { open, onCancel, habitId, assignedTags } = props;
  const { data: tags } = useGetTags();
  const { trigger: assignTag } = useAddHabitTagMutation(habitId);

  return (
    <Modal open={open} onCancel={onCancel} title="Assign Tag">
      {tags
        ?.filter((i) => !assignedTags.includes(i.id))
        .map((i) => (
          <div
            key={i.id}
            className="flex items-center space-x-2 hover:bg-slate-300 rounded-lg px-4 py-1 cursor-pointer"
            onClick={async () => {
              await assignTag(i.id);
              onCancel();
            }}
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: `#${i.color.toString(16)}` }}
            />
            <span>{i.name}</span>
          </div>
        ))}
    </Modal>
  );
};
