import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import TodoList from './components/TodoList';

function App() {
  return (
    <Container component="main" maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>
          ToDo List
        </Typography>
        <TodoList />
    </Container>
  );
}

export default App;
