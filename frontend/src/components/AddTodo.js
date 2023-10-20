import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Box } from '@mui/material';

const AddTodo = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAddTodo = async () => {
        try {
            const response = await axios.post('http://backend:8080/api/todos/add', { title, description });
            if (response.status === 200) {
                // Clear the input fields after successful addition
                setTitle("");
                setDescription("");
                alert("ToDo item added successfully!");
            } else {
                alert("Failed to add the ToDo item. Please try again.");
            }
        } catch (error) {
            console.error("Error adding ToDo:", error);
            alert("Failed to add the ToDo item. Please try again.");
        }
    };

    return (
        <Container maxWidth="sm" bgcolor="#e8eaf6" sx={{ marginBottom: 2 }}>
            <Box bgcolor="#e8eaf6" component="form" noValidate sx={{ mt: 3}}>
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
                    onClick={handleAddTodo}
                >
                    Add ToDo
                </Button>
            </Box>
        </Container>
    );
}

export default AddTodo;
