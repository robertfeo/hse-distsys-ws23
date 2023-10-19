// TodoSearchForm.tsx

import React, { useState } from 'react';

interface TodoSearchFormProps {
    onSearch: (criteria: any) => void;
}

const TodoSearchForm: React.FC<TodoSearchFormProps> = ({ onSearch }) => {
    const [searchType, setSearchType] = useState("title");
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch({ type: searchType, value: query });
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={searchType} onChange={e => setSearchType(e.target.value)}>
                <option value="title">Search by Title</option>
                <option value="id">Search by ID</option>
            </select>
            <input
                type={searchType === "id" ? "number" : "text"}
                placeholder={searchType === "id" ? "Enter ID" : "Enter Title"}
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default TodoSearchForm;
