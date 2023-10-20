import React from 'react';
import { Container, Typography } from '@mui/material';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

function App() {
  return (
    <Container>
      <Typography align='center' variant="h4" component="h1" sx={{ mt:2 , mb:2 }}>
        ToDo List
      </Typography>
      <AddTodo />
      <TodoList />
    </Container>
  );
}

export default App;
