import { Response, Request } from 'express';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Sample data
let todos: { id: number; title: string; description: string }[] = [];

// Routes
app.get('/api/todos', (req: Request, res: Response) => {
    res.json(todos);
});

app.post('/api/todos/add', (req: Request, res: Response) => {
    const { title, description } = req.body;
    const newTodo = { id: todos.length + 1, title, description };
    todos.push(newTodo);
    res.json(newTodo);
});

app.delete('/api/todos/delete', (req: Request, res: Response) => {
    const { title, id } = req.query;

    if (typeof title === 'string') {
        todos = todos.filter(todo => todo.title !== title);
        return res.json({ message: 'Todo with title deleted' });
    }

    if (typeof id === 'string') {
        todos = todos.filter(todo => todo.id !== parseInt(id, 10));
        return res.json({ message: 'Todo with id deleted' });
    }

    res.status(400).json({ error: 'Provide a title or id for deletion' });
});

app.get('/api/todos/search', (req: Request, res: Response) => {
    const { title, id } = req.query;

    if (typeof title === 'string') {
        const result = todos.filter(todo => todo.title === title);
        return res.json(result);
    }

    if (typeof id === 'string') {
        const result = todos.filter(todo => todo.id === parseInt(id, 10));
        return res.json(result);
    }

    res.status(400).json({ error: 'Provide a title or id for search' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
