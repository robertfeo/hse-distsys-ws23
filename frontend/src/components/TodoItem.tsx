// TodoItem.tsx

import React from 'react';

interface TodoItemProps {
    todo: { id: number, title: string, description: string };
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    return (
        <div className="todo-item">
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            {/* You can add a delete or edit button here */}
        </div>
    );
}

export default TodoItem;
