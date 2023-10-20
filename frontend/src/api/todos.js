import axios from 'axios';

const API_URL = "http://localhost:8080"; // Using the Docker container name for service resolution.

export const fetchTodos = () => {
    return axios.get(`${API_URL}/api/todos`);
};

export const addTodo = (data) => {
    return axios.post(`${API_URL}/add`, data);
};

export const deleteTodoByTitle = (title) => {
    return axios.delete(`${API_URL}/delete?title=${title}`);
};

export const deleteTodoById = (id) => {
    return axios.delete(`${API_URL}/delete?id=${id}`);
};

export const searchTodoByTitle = (title) => {
    return axios.get(`${API_URL}/search?title=${title}`);
};

export const searchTodoById = (id) => {
    return axios.get(`${API_URL}/search?id=${id}`);
};
