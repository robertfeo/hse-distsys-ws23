import React, { useState } from 'react';
import { deleteTodoById } from '../api/todos';
import { Typography, Stack, Container } from '@mui/material';
import TodoItem from './TodoItem';

function TodoList(props) {
    const [error, setError] = useState(null);

    const { todos, refreshTodos } = props;

    const handleDelete = (id) => {
        deleteTodoById(id)
            .then(() => {
                refreshTodos();
            })
            .catch(error => {
                setError(error.message);
            });
    };

    const handleEdit = (id) => {
        // leave empty, not implemented yet, comming soon...
    };

    return (
        <Container bgcolor="#e8eaf6">
            {error && <Typography variant="h6" color="error">Error: {error}</Typography>}

            <Stack direction="column"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}>
                {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} onEdit={handleEdit} />
                ))}
            </Stack>
        </Container>
    );
}

export default TodoList;
