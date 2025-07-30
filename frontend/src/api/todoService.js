// src/api/todoService.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getTodos = () => API.get('/todo');
export const addTodo = (data) => API.post('/todo', data);
export const updateTodo = (id, data) => API.put(`/todo/${id}`, data);
export const deleteTodo = (id) => API.delete(`/todo/${id}`);
