import { addTodo } from '../api/todos';

const generateRandomTodo = () => {
    const id = Math.floor(Math.random() * 100000);
    const titles = ['Learn React', 'Go Shopping', 'Read Book', 'Fix Bugs'];
    const descriptions = [
        'Learn about components, props, and state',
        'Buy milk, bread, and cheese',
        'Read a chapter of "Clean Code"',
        'Fix UI and backend bugs'
    ];

    const title = titles[Math.floor(Math.random() * titles.length)];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];

    return { id, title, description };
};

const addDummyData = async () => {
    for (let i = 0; i < 2; i++) {
        const randomTodo = generateRandomTodo();
        try {
            await addTodo(randomTodo);
        } catch (error) {
            console.error('Failed to add todo:', error);
        }
    }
};

export default addDummyData;
