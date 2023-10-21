// App.js
import React, { useState, useEffect } from 'react';
import { fetchTodos } from './api/todos';
import { Container, Typography } from '@mui/material';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos()
      .then(response => {
        setTodos(response.data);
        setLoading(true);
      })
      .catch(error => {
        console.error('There was an error fetching the todos', error);
        setLoading(false);
      });
  }, []);

  const refreshTodos = () => {
    setLoading(true);
    fetchTodos()
      .then(response => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the todos', error);
        setLoading(false);
      });
  };

  return (
    <Container>
      <Typography align='center' variant="h4" component="h1" sx={{ mt: 2, mb: 2 }}>
        ToDo List
      </Typography>
      <AddTodo refreshTodos={refreshTodos} />
      <TodoList todos={todos} loading={loading} refreshTodos={refreshTodos} />
    </Container>
  );
}

export default App;
