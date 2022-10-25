const reservations = require('./reservations');
const Reservation = require('./schema/reservation');

describe('validate', () => {
    it('should resolved with no optional fields', async () => {
        const reservation = new Reservation({
            date: '2017/06/10',
            time: '06:02 AM',
            party: 4,
            name: 'Family',
            email: 'username@example.com'
        });

        await expect(reservations.validate(reservation))
            .resolves.toEqual(reservation);
    });

    it('should reject with an invalid email', async () => {
        const reservation = new Reservation({
            date: '2017/06/10',
            time: '06:02 AM',
            party: 4,
            name: 'Family',
            email: 'username'
        });

        await expect(reservations.validate(reservation))
            .rejects.toBeInstanceOf(Error);
    });
});
