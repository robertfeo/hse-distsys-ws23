import axios from 'axios';

export const fetchTodos = () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/todos`);
};

export const addTodo = (data) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/add`, data);
};

export const deleteTodoByTitle = (title) => {
    return axios.delete(`${process.env.REACT_APP_API_URL}/delete?title=${title}`);
};

export const deleteTodoById = (id) => {
    return axios.delete(`${process.env.REACT_APP_API_URL}/delete?id=${id}`);
};

export const searchTodoByTitle = (title) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/search?title=${title}`);
};

export const searchTodoById = (id) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/search?id=${id}`);
};
