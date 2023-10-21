import React, { useState } from 'react';
import { Button, TextField, Container, Box, Alert, CircularProgress } from '@mui/material';
import { addTodo } from '../api/todos';

const AddTodo = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertType, setAlertType] = useState(null);

    const { loading, refreshTodos } = props;

    const handleAddTodo = (title, description) => {
        var todoData;

        if (!title) {
            setAlertType('error');
            setAlertMessage('Title is required!');
            setTimeout(() => {
                setAlertMessage(null);
                setAlertType(null);
            }, 3000);
            return;
        } else {
            todoData = {
                title: title,
                description: description
            };
        }

        addTodo(todoData)
            .then(() => {
                setAlertType('success');
                setAlertMessage('ToDo added successfully!');
                refreshTodos();  // This should refresh the todos in App.js
                setTimeout(() => {
                    setAlertMessage(null);
                    setAlertType(null);
                }, 3000);
            })
            .catch(error => {
                setAlertType('error');
                setAlertMessage(error.message);
                setTimeout(() => {
                    setAlertMessage(null);
                    setAlertType(null);
                }, 3000);
            });
    };

    return (
        <Container maxWidth="sm" bgcolor="#e8eaf6" sx={{ mb: 2 }}>
            <Box bgcolor="#e8eaf6" component="form" noValidate sx={{ mt: 3, maxWidth: 500, mb: 2 }}>
                <TextField
                    margin="normal"
                    size='small'
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    margin="normal"
                    size='small'
                    fullWidth
                    multiline
                    id="description"
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => handleAddTodo(title, description)}
                >
                    Add ToDo
                </Button>
            </Box>

            {loading && <CircularProgress />}
            {alertMessage && <Alert severity={alertType}>{alertMessage}</Alert>}
        </Container>
    );
}

export default AddTodo;
