// src/components/Header.jsx
import React from 'react';
import { Layout, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../styles/dashboard.css';

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
  return (
    <Header className="app-header">
      <div className="header-left">
        <Title level={4} className="app-header-title">
          Todo Manager
        </Title>
      </div>
      <div className="header-right">
        <Avatar icon={<UserOutlined />} className="white-avatar" />
      </div>
    </Header>
  );
};

export default AppHeader;