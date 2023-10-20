import AxiosMockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { fetchTodos } from './todos';

describe('todos API', () => {
    let mock;

    beforeEach(() => {
        mock = new AxiosMockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    it('fetches todos successfully', async () => {
        const data = [{
            "id": 1,
            "title": "Adu gunoiu",
            "description": "din tomberone"
        }];
        mock.onGet('http://localhost:8080/api/todos').reply(200, data);

        const response = await fetchTodos();
        expect(response.data).toEqual(data);
    });


    // other tests soon...
});
