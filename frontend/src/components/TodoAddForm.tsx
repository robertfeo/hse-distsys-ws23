// TodoAddForm.tsx

import React, { useState } from 'react';
import { addTodo } from '../services/apiService';

const TodoAddForm: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addTodo(title, description);
        // You may want to update the parent (Home) component's state here to reflect the new todo
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            ></textarea>
            <button type="submit">Add Todo</button>
        </form>
    );
}

export default TodoAddForm;
