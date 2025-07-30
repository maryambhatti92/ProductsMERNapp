import React, { useEffect } from 'react';
import { Modal, Form, Input, Checkbox } from 'antd';

const TodoFormModal = ({ visible, onCancel, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues || {});
    }
  }, [visible, initialValues, form]);

  // Inside TodoFormModal.jsx

const handleOk = async () => {
  try {
    const values = await form.validateFields();  // this returns the form values
    onSubmit(values);  // 🔥 THIS must call the prop passed from Dashboard
    form.resetFields();
  } catch (error) {
    // Validation errors are handled by AntD
  }
};


  return (
    // Modal is rendered only when visible = true
    <Modal
      title={initialValues ? 'Edit Todo' : 'Add Todo'}
      open={visible}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleOk}
      destroyOnHidden
    >
      {/* Form only exists in the DOM when visible is true */}
      {visible && (
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Title is required' }]}
          >
            <Input maxLength={200} />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item name="completed" valuePropName="checked">
            <Checkbox>Completed</Checkbox>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default TodoFormModal;
