import React from 'react';
import { Row, Col, Select, Input } from 'antd';

const { Option } = Select;

const FilterBar = ({ filterStatus, setFilterStatus, searchText, setSearchText, compact }) => (
  <Row gutter={[16, 16]} justify="space-between" align="middle">
    <Col span={compact ? 14 : 24}>
      <Input
        placeholder="Search todos by title"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        allowClear
        style={{ width: '100%' }}
      />
    </Col>
    <Col span={compact ? 10 : 24}>
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
  </Row>
);

export default FilterBar;