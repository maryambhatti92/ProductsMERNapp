import React, { useEffect } from 'react';
import { Modal, Form, Input, Checkbox, message } from 'antd';

const TodoFormModal = ({ visible, onCancel, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues || {});
    }
  }, [visible, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (values.title.length > 200) {
       
        message.error('Title must not exceed 200 characters.');
        return;
      }

      onSubmit(values);
      message.success(initialValues ? 'Todo updated successfully!' : 'Todo added successfully!');
      form.resetFields();
    } catch (errorInfo) {
      // This catches only if validation fails
      const titleError = errorInfo?.errorFields?.find((field) => field.name[0] === 'title');
      if (titleError) {
        message.error(titleError.errors[0]);
      } else {
        message.error('Please fix form errors before submitting.');
      }
    }
  };

  return (
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
      {visible && (
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: 'Title is required' },
              { max: 200, message: 'Title cannot exceed 200 characters' },
            ]}
          >
            <Input  />
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
