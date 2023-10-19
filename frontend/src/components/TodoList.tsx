// TodoList.tsx

import React from 'react';
import TodoItem from './TodoItem';

interface TodoListProps {
    todos: { id: number, title: string, description: string }[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
    return (
        <div className="todo-list">
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    );
}

export default TodoList;
