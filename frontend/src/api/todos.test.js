import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { deleteTodoById, deleteTodoByTitle, fetchTodos } from './todos';

describe('Tests APIs', () => {
    let mock;

    beforeEach(() => {
        mock = new AxiosMockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    it('successfully fetched list todos', async () => {
        const data = [{
            "id": 1,
            "title": "Grocery Shopping",
            "checked": false
        }];
        mock.onGet(`${process.env.REACT_APP_API_URL}/todos`).reply(200, data);
        const response = await fetchTodos();
        // Check if array
        expect(Array.isArray(response.data)).toBe(true);

        // Check format of each JSON object in the array
        response.data.forEach(todo => {
            expect(todo).toHaveProperty('id');
            expect(typeof todo.id).toBe('number');
            expect(todo).toHaveProperty('title');
            expect(typeof todo.title).toBe('string');
            expect(todo).toHaveProperty('checked');
            expect(typeof todo.checked).toBe('boolean');
        });
    });

    it('successfully deletes a todo by title', async () => {
        const titleToDelete = "text";
        mock.onDelete(`${process.env.REACT_APP_API_URL}/todos/delete?title=${titleToDelete}`).reply(200);
        const response = await deleteTodoByTitle(titleToDelete);
        expect(response.status).toBe(200);
    });

    it('successfully deletes a todo by id', async () => {
        const idToDelete = 1;
        mock.onDelete(`${process.env.REACT_APP_API_URL}/todos/delete?id=${idToDelete}`).reply(200);
        const response = await deleteTodoById(idToDelete);
        expect(response.status).toBe(200);
    });

    it('successfully searches todos by title', async () => {
        const titleToSearch = "Grocery Shopping";
        const data = [{
            "id": 1,
            "title": "Grocery Shopping",
            "checked": false
        }];
        mock.onGet(`${process.env.REACT_APP_API_URL}/todos/search?title=${titleToSearch}`).reply(200, data);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/todos/search?title=${titleToSearch}`);
        expect(response.status).toBe(200);
        expect(response.data[0].title).toBe(titleToSearch);
    });


    it('successfully searches todos by id', async () => {
        const idToSearch = 2;
        const data = [{
            "id": 2,
            "title": "sampleTitle2",
            "description": "sampleDescription2"
        }];
        mock.onGet(`${process.env.REACT_APP_API_URL}/todos/search?id=${idToSearch}`).reply(200, data);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/todos/search?id=${idToSearch}`);
        expect(response.status).toBe(200);
        expect(response.data[0].id).toBe(idToSearch);
    });

    it('successfully adds a todo', async () => {
        const todoData = {
            "title": "New Task",
            "checked": false
        };
        mock.onPost(`${process.env.REACT_APP_API_URL}/todos/add`).reply(200);

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/todos/add`, todoData);
        expect(response.status).toBe(200);
    });

    it('successfully updates a todo', async () => {
        const idToUpdate = 3;
        const newTitle = "updatedTitle";
        const updatedData = {
            "id": 3,
            "title": "updatedTitle",
            "description": "updatedDescription"
        };
        mock.onPut(`${process.env.REACT_APP_API_URL}/todos/update/${idToUpdate}/${newTitle}`).reply(200, updatedData);
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/todos/update/${idToUpdate}/${newTitle}`);
        expect(response.status).toBe(200);
        expect(response.data.title).toBe(newTitle);
    });
});
