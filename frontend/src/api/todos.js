import axios from 'axios';

const API_URL = "http://backend:8080/api/todos"; // Using the Docker container name for service resolution.

export const fetchTodos = () => {
    return axios.get(API_URL);
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
