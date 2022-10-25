const request = require('supertest');

let app;
const mockMorgan = jest.fn((req, res, next) => next());
const mockTable = jest.fn().mockResolvedValue([]);

beforeAll(() => {
    jest.mock('morgan', () => () => mockMorgan);
    jest.mock('../lib/knex', () => ({ select: () => ({ table: mockTable }) }));
    app = request(require('../app'));
});

afterAll(() => {
    jest.unmock('morgan');
});

describe('GET', () => {
    it('should allow access with a password', () => {
        return app.get('/admin')
            .auth('admin', 'admin')
            .expect(200);
    });

    it('should reject access without a password', () => {
        return app.get('/admin')
            .expect(401);
    });
})
