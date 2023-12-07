import axios from 'axios';

const codespaceApiUrl = process.env.CODESPACE_NAME ? `https://${process.env.CODESPACE_NAME}-8080.github.dev/api` : '';
const apiUrl = codespaceApiUrl || 'http://localhost:8080/api';

export const fetchTodos = () => {
    return axios.get(`${apiUrl}/todos`);
};

export const addTodo = (data) => {
    return axios.post(`${apiUrl}/todos/add`, data);
};

export const deleteTodoByTitle = (title) => {
    return axios.delete(`${apiUrl}/todos/delete?title=${title}`);
};

export const deleteTodoById = (id) => {
    return axios.delete(`${apiUrl}/todos/delete?id=${id}`);
};

export const searchTodoByTitle = (title) => {
    return axios.get(`${apiUrl}/todos/search?title=${title}`);
};

export const searchTodoById = (id) => {
    return axios.get(`${apiUrl}/todos/search?id=${id}`);
};

export const updateTodoById = (id, data) => {
    return axios.put(`${apiUrl}/todos/update/${id}`, data);
};