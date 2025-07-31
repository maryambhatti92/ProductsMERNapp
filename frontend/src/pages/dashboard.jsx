import React, { useState, useEffect } from 'react';
import {
  Layout,
  message,
  Spin,
  Row,
  Col,
  Typography,
} from 'antd';

import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from '../api/todoService';

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

  const [overlayMessage, setOverlayMessage] = useState('');
  const [overlayType, setOverlayType] = useState('success'); // 'success' or 'error'
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!overlayMessage) return;

    setFadeOut(false); // reset fade animation to fade-in

    // Start fade-out after 3 seconds (2 sec fade duration)
    const fadeTimer = setTimeout(() => setFadeOut(true), 3000);
    // Remove message after 5 seconds
    const hideTimer = setTimeout(() => setOverlayMessage(''), 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [overlayMessage]);

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
        setOverlayType('success');
        setOverlayMessage('Todo updated');
      } else {
        await addTodo(values);
        message.success('Todo added');
        setOverlayType('success');
        setOverlayMessage('Todo added');
      }
      setModalVisible(false);
      setEditTodo(null);
      loadTodos();
    } catch {
      message.error('Error saving todo');
      setOverlayType('error');
      setOverlayMessage('Error saving todo');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      message.success('Todo deleted');
      setOverlayType('success');
      setOverlayMessage('Todo deleted');
      loadTodos();
    } catch {
      message.error('Delete failed');
      setOverlayType('error');
      setOverlayMessage('Delete failed');
    }
  };

  const handleToggle = async (todo) => {
    try {
      await updateTodo(todo._id, {
        ...todo,
        completed: !todo.completed,
      });
      message.success('Status updated');
      setOverlayType('success');
      setOverlayMessage('Status updated');
      loadTodos();
    } catch (err) {
      message.error('Failed to update status, ' + err.message);
      setOverlayType('error');
      setOverlayMessage('Failed to update status, ' + err.message);
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
    <Layout className="dashboard-layout">
      <AppHeader />
      <Content
        className="dashboard-content"
        style={{ backgroundImage: `url(${Bgimage})`, position: 'relative' }}
      >
        <div className="dashboard-inner">
          <Row justify="center" style={{ position: 'relative' }}>
            <Col xs={24} sm={22} md={20} lg={18} xl={16}>
              <div className="todo-section">
                 {/* Move overlay here */}
  {overlayMessage && (
    <div
      className={`overlay-message ${fadeOut ? 'fade-out' : 'fade-in'} ${
        overlayType === 'success' ? 'success' : 'error'
      }`}
      style={{
        position: 'absolute',
        top: '-50px', // Adjust as needed to sit above the Title
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '12px 20px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        zIndex: 1000,
        borderRadius: 4,
        userSelect: 'none',
        width: 'fit-content',
        minWidth: 200,
        maxWidth: '90%',
        whiteSpace: 'nowrap',
        backgroundColor: overlayType === 'success' ? '#52c41a' : '#ff4d4f',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}
    >
      {overlayMessage}
    </div>
  )}

                <Title level={4} className="todo-section-title">
                  Todo List
                </Title>

                <Row gutter={[16, 16]} className="mb-4" style={{ justifyContent: 'center' }}>
                  <Col xs={24} md={12}>
                    <FilterBar
                      filterStatus={filterStatus}
                      setFilterStatus={setFilterStatus}
                      searchText={searchText}
                      setSearchText={setSearchText}
                      compact
                    />
                  </Col>
                  <Col xs={24} md={6}>
                    <AddButton onClick={() => setModalVisible(true)} />
                  </Col>
                </Row>

                <div style={{ position: 'relative' }}>
                  {loading ? (
                    <div className="todo-loader" style={{ minHeight: 200 }}>
                      <Spin size="large" />
                    </div>
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
              </div>
            </Col>
          </Row>
        </div>
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
