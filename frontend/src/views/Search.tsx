// Search.tsx

import React, { useState } from 'react';
import TodoList from '../components/TodoList';
import TodoSearchForm from '../components/TodoSearchForm';
import { searchTodoById } from '../services/apiService';

const Search: React.FC = () => {
    const [todos, setTodos] = useState([]);

    const handleSearch = async (criteria: any) => {
        const fetchedTodos = await searchTodoById(criteria);
        setTodos(fetchedTodos);
    };

    return (
        <div className="search-container">
            <h1>Search Todo Items</h1>
            <TodoSearchForm onSearch={handleSearch} />
            <TodoList todos={todos} />
        </div>
    );
}

export default Search;
