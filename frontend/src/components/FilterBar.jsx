import React from 'react';
import { Row, Col, Select, Input } from 'antd';

const { Option } = Select;

const FilterBar = ({ filterStatus, setFilterStatus, searchText, setSearchText }) => (
  <Row justify="center" className="section">
    <Col xs={24} sm={22} md={20} lg={18} xl={16}>
      <Row gutter={[16, 16]} justify="space-between" align="middle">
        <Col xs={24} sm={12} md={6}>
          <Select
            value={filterStatus}
            onChange={setFilterStatus}
            style={{ width: '100%' }}
            placeholder="Filter by status"
          >
            <Option value="all">All</Option>
            <Option value="completed">Completed</Option>
            <Option value="pending">Pending</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Input
            placeholder="Search todos by title"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
        </Col>
      </Row>
    </Col>
  </Row>
);

export default FilterBar;
