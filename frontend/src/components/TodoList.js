import React, { useState, useEffect } from 'react';
import { fetchTodos, deleteTodoById } from '../api/todos';
import { Alert, CircularProgress, Typography, Stack } from '@mui/material';
import TodoItem from './TodoItem';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTodos()
            .then(response => {
                setTodos(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError();
                <Alert severity="error">{error.message}</Alert>
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        deleteTodoById(id)
            .then(response => {
                setTodos(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError();
                <Alert severity="error">{error.message}</Alert>
                setLoading(false);
            });
    };

    const handleEdit = (id) => {
        // leave empty, not implemented yet, comming soon...
    };

    return (
        <div>
            {loading && <CircularProgress />}
            {error && <Typography variant="h6" color="error">Error: {error}</Typography>}

            <Stack direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}>
                {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} onEdit={handleEdit}/>
                ))}
            </Stack>
        </div>
    );
}

export default TodoList;
