// Home.tsx

import React, { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';
import TodoAddForm from '../components/TodoAddForm';
import { fetchTodos } from '../services/apiService';

const Home: React.FC = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const getTodos = async () => {
            const fetchedTodos = await fetchTodos();
            setTodos(fetchedTodos);
        };
        getTodos();
    }, []);

    return (
        <div className="home-container">
            <h1>Todo List</h1>
            <TodoAddForm />
            <TodoList todos={todos} />
        </div>
    );
};

export default Home;
