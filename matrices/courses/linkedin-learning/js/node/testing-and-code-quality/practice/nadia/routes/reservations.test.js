const request = require('supertest');

let app;

const mockMorgan = jest.fn((req, res, next) => next());
const mockInsert = jest.fn().mockResolvedValue([1349]);

beforeAll(() => {
    jest.mock('./', () => require('./reservations'));
    jest.mock('morgan', () => () => mockMorgan);
    jest.mock('../lib/knex', () => () => ({
        insert: mockInsert
    }));
    app = request(require('../app'));
});

afterAll(() => {
    jest.unmock('./');
    jest.unmock('morgan');
});

describe('GET', () => {
    it('should return the reservations form', async () => {
        const response = await app.get('/reservations')
            .expect('Content-Type', /html/)
            .expect(200);

        expect(response.text).toContain('To make reservations please fill out the following form');
    });
});

describe('POST', () => {
    it('should reject an invalid reservation request', async () => {
        const response = await app.post('/reservations')
            .type('form')
            .send({
                date: '2017/06/10',
                time: '06:02 AM',
                party: 'bananas',
                name: 'familiy',
                email: 'username@example.com'
            });

        expect(response.text).toContain('Sorry, there was a problem with your booking request.');
        expect(response.status).toBe(400);
    });

    it('should accept a valid reservation request', async () => {
        const response = await app.post('/reservations')
            .type('form')
            .send({
                date: '2017/06/10',
                time: '06:02 AM',
                party: '8',
                name: 'familiy',
                email: 'username@example.com'
            })
            .expect(200);

        expect(response.text).toContain('Thanks, your booking request #1349');
    });
});
