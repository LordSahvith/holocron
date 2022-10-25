const request = require('supertest');

let app;
const mockMorgan = jest.fn((req, res, next) => next());

beforeAll(() => {
    jest.mock('./', () => require('./homepage'));
    jest.mock('morgan', () => () => mockMorgan);
    app = request(require('../app'));
});

afterAll(() => {
    jest.unmock('./');
    jest.unmock('morgan');
});

describe('GET', () => {
    it('should contain the word "Nadia"', async () => {
        const response = await app.get('/')
            .expect(200);

        expect(response.text).toContain('Nadia');
    });
});

describe('DELETE', () => {
    it('should fail to delete the homepage', () => {
        return app.delete('/')
            .expect(500);
    });
});
