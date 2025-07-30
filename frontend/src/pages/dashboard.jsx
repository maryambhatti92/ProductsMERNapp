import React, { useState, useEffect } from 'react';
import { Layout, message, Spin, Row, Col, Typography } from 'antd';
import {getTodos,addTodo,updateTodo, deleteTodo,} from '../api/todoService';
import AppHeader from '../components/Header';
import AppFooter from '../components/Footer';
import AddButton from '../components/AddButton';
import FilterBar from '../components/FilterBar';
import TodoList from '../components/TodoList';
import TodoFormModal from '../components/TodoFormModal';
import '../styles/Dashboard.css';
import Bgimage from '../assets/Wave@1x-10.0s-1920px-953px.svg';

const { Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchText, setSearchText] = useState('');

  const loadTodos = async () => {
    setLoading(true);
    try {
      const response = await getTodos();
      setTodos(Array.isArray(response.data) ? response.data : response.data.data || []);
    } catch {
      message.error('Failed to load todos');
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrEdit = async (values) => {
    try {
      if (editTodo) {
        await updateTodo(editTodo._id, values);
        message.success('Todo updated');
      } else {
        await addTodo(values);
        message.success('Todo added');
      }
      setModalVisible(false);
      setEditTodo(null);
      loadTodos();
    } catch {
      message.error('Error saving todo');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      message.success('Todo deleted');
      loadTodos();
    } catch {
      message.error('Delete failed');
    }
  };

  const handleToggle = async (todo) => {
    try {
      await updateTodo(todo._id, {
        ...todo,
        completed: !todo.completed,
      });
      message.success('Status updated');
      loadTodos();
    } catch (err) {
      message.error('Failed to update status, ' + err.message);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'completed' && todo.completed) ||
      (filterStatus === 'pending' && !todo.completed);

    const matchesSearch =
      searchText.trim() === '' ||
      todo.title.toLowerCase().includes(searchText.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <Layout className="layout">
      <AppHeader />
      <Content className="content">
        <AddButton onClick={() => setModalVisible(true)} />
        <FilterBar
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <Row justify="center">
          <Col xs={24} sm={22} md={20} lg={18} xl={16}>
            <div className="card">
              <Title level={4}>Todo List</Title>
              {loading ? (
                <Spin />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onEdit={(todo) => {
                    setEditTodo(todo);
                    setModalVisible(true);
                  }}
                  onDelete={handleDelete}
                  onToggle={handleToggle}
                />
              )}
            </div>
          </Col>
        </Row>
      </Content>
      <AppFooter />
      <TodoFormModal
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditTodo(null);
        }}
        onSubmit={handleAddOrEdit}
        initialValues={editTodo}
      />
    </Layout>
  );
};

export default Dashboard;
