import { useCreateTagMutation } from "@/services/api/tags";
import { App, ColorPicker, Form, Input, Modal } from "antd";
import { FC } from "react";

type NewTagModalProps = {
  open: boolean;
  onCancel: () => void;
};

export const NewTagModal: FC<NewTagModalProps> = (props) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const { open, onCancel } = props;
  const { trigger: createTag } = useCreateTagMutation();

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => form.submit()}
      title="New Tag"
      destroyOnClose
    >
      <Form
        onFinish={async (val) => {
          await createTag({
            name: val.name,
            color: parseInt(
              typeof val.color === "string"
                ? val.color.slice(1)
                : val.color.toHex(),
              16,
            ),
          });
          message.success("Tag created");
          form.resetFields();
          onCancel();
        }}
        form={form}
        initialValues={{ color: "#1677ff" }}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="color" label="Color" rules={[{ required: true }]}>
          <ColorPicker showText disabledAlpha />
        </Form.Item>
      </Form>
    </Modal>
  );
};
