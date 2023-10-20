import React, { useState, useEffect } from 'react';
import { fetchTodos } from '../api/todos';
import { Alert, List, ListItem, ListItemText, CircularProgress, Typography } from '@mui/material';

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

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            {loading && <CircularProgress />}
            {error && <Typography variant="h6" color="error">Error: {error}</Typography>}
            <List>
                {todos.map(todo => (
                    <ListItem key={todo.id} divider>
                        <ListItemText
                            primary={<Typography variant="h6">{todo.title}</Typography>}
                            secondary={todo.description}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default TodoList;
