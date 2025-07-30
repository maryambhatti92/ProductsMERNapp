import React from 'react';
import { Row, Col, Button } from 'antd';

const AddButton = ({ onClick }) => (
  <Row justify="center" className="section">
    <Col xs={24} sm={22} md={20} lg={18} xl={16}>
      <Row gutter={[16, 16]} justify="end">
        <Col xs={24} sm={12} md={6}>
          <Button type="primary" block onClick={onClick}>
            Add Todo
          </Button>
        </Col>
      </Row>
    </Col>
  </Row>
);

export default AddButton;
