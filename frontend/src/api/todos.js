import axios from 'axios';

const herokuApiUrl = process.env.REACT_APP_BACKEND_URL ? `http://backend:8080/api` : 'https://robertf-todoapp-api-175ccf43153c.herokuapp.com/api';
const apiUrl = herokuApiUrl || 'http://localhost:8080/api';

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