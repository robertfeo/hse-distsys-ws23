const BASE_URL = "http://localhost:8080/api/todos";

export const fetchTodos = async () => {
    return await fetch(BASE_URL).then(res => res.json());
}

export const addTodo = async (title: string, description: string) => {
    return await fetch(`${BASE_URL}/add`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description })
    }).then(res => res.json());
}

export const deleteTodoByTitle = async (title: string) => {
    return await fetch(`${BASE_URL}/delete?title=${title}`, { method: "DELETE" });
}

export const deleteTodoById = async (id: number) => {
    return await fetch(`${BASE_URL}/delete?id=${id}`, { method: "DELETE" });
}

export const searchTodoByTitle = async (title: string) => {
    return await fetch(`${BASE_URL}/search?title=${title}`).then(res => res.json());
}

export const searchTodoById = async (id: number) => {
    return await fetch(`${BASE_URL}/search?id=${id}`).then(res => res.json());
}
