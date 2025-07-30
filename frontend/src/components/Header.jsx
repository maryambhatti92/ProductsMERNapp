// src/components/Header.jsx
import React from 'react';
import { Layout, Typography } from 'antd';
import '../styles/dashboard.css'

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
  return (
    <Header className="app-header">
      <Title level={3} className="app-header-title">
        Todo Manager
      </Title>
    </Header>
  );
};

export default AppHeader;
