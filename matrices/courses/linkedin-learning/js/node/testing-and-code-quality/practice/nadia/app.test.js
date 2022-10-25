const request = require('supertest');

let app;
const mockMorgan = jest.fn((req, res, next) => next());

describe('errors', () => {
    const OLD_ENV = process.env;

    beforeAll(() => {
        jest.mock('morgan', () => () => mockMorgan);
        jest.mock('./routes', () => (req, res, next) => next());
    });

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV };
    });

    afterAll(() => {
        jest.unmock('morgan');
        jest.unmock('./routes');
        process.env = OLD_ENV;
    });


    it('should return a 404 for a missing page in test', async () => {
        app = request(require('./app'));
        const response = await app.get('/bananas')
            .expect(404);

        expect(response.text).toContain('app.js');
    });

    it('should return a 404 for a missing page in production', async () => {
        process.env.NODE_ENV = 'production';
        app = request(require('./app'));
        const response = await app.get('/bananas')
            .expect(404);

        expect(response.text).not.toContain('app.js');
    });
})
