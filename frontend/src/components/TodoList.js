import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList() {

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/todos')
            .then(response => {
                setTodos(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []); // The empty array ensures this useEffect runs only once, similar to componentDidMount.

    // Your component logic will go here
    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <h2>{todo.title}</h2>
                        <p>{todo.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
