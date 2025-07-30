import React from 'react';
import { Layout } from 'antd';
import '../styles/dashboard.css'

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer className="app-footer">
      © MemzCode 2025 Todo App.
    </Footer>
  );
};

export default AppFooter;
