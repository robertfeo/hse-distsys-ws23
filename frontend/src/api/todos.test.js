import AxiosMockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { fetchTodos } from './todos';

describe('Tests APIs', () => {
    let mock;

    beforeEach(() => {
        mock = new AxiosMockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    it('fetching list todos was successfull!', async () => {
        const data = [{
            "id": 1,
            "title": "text",
            "description": "text"
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

            expect(todo).toHaveProperty('description');
            expect(typeof todo.description).toBe('string');
        });
    });

    // other tests soon...
});
