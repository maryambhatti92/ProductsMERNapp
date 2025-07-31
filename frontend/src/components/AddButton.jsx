import React from 'react';
import { Button } from 'antd';

const AddButton = ({ onClick }) => (
  <Button
    type="primary"
    block
    onClick={onClick}
    style={{ backgroundColor: '#153D64', borderColor: '#153D64' }}
  >
    Add Todo
  </Button>
);

export default AddButton;