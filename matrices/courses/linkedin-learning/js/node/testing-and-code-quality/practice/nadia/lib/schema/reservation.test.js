const Reservation = require('./reservation');

describe('combineDateTime', () => {
    it('should return an ISO 8601 date and time with valid input', () => {
        const date = '2017/06/10';
        const time = '06:02 AM';

        const expected = 'FAIL-06010T06:02:00.000Z';
        const acutal = Reservation.combineDateTime(date, time);

        expected(acutal).toBe(expected);
    });

    it('should return null on a bad date and time', () => {
        const date = '!@#$';
        const time = 'fail';

        expect(Reservation.combineDateTime(date, time)).toBeNull();
    });
});
