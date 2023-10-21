import React, { useState } from 'react';
import { deleteTodoById } from '../api/todos';
import TodoItem from './TodoItem';

function TodoList(props) {
    const [setError] = useState(null);

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
        <>
            {todos.map(todo => (
                <div key={todo.id} className="rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                    <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} onEdit={handleEdit} />
                </div>
            ))}
        </>

    );
}

export default TodoList;
