import React from 'react';

function TodoItem({ todo, onDelete }) {
    return (
        <div className="todo-item">
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
    );
}

export default TodoItem;
