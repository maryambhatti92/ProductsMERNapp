import React, { useState } from 'react';
import { Table, Button, Space, Popconfirm, Tag, Switch } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../styles/Dashboard.css';

const TodoList = ({ todos, onEdit, onDelete, onToggle }) => {
  const safeData = Array.isArray(todos) ? todos : [];
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const columns = [
    { title: 'Title', dataIndex: 'title' },
    { title: 'Description', dataIndex: 'description' },
    {
      title: 'Status',
      dataIndex: 'completed',
      render: (completed) =>
        completed ? <Tag color="green">Completed</Tag> : <Tag color="blue">Pending</Tag>,
    },
    {
      title: 'Completed',
      dataIndex: 'completed',
      render: (completed, record) => (
        <Switch
          checked={completed}
          onChange={() => onToggle(record)}
          checkedChildren="Done"
          unCheckedChildren="Todo"
        />
      ),
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
          <Popconfirm title="Delete this todo?" onConfirm={() => onDelete(record._id)}>
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ overflowX: 'auto', paddingBottom: 20 }}>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={safeData}
        pagination={{
          current: currentPage,
          pageSize,
          onChange: (page) => setCurrentPage(page),
          showSizeChanger: false,
          showQuickJumper: false,
          position: ['bottomCenter'],
          className: 'custom-pagination',
        }}
      />
    </div>
  );
};

export default TodoList;