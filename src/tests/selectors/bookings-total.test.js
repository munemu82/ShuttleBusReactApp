import selectBookingsTotal from '../../selectors/bookings-total';
import bookings from '../fixtures/bookings';

test('Should return 0 if no bookings', () =>{
    const res = selectBookingsTotal([]);
    expect(res).toBe(0);
});

test('Should correctly multiple booking', () =>{
    const res = selectBookingsTotal([bookings[0]]);
    expect(res).toBe(120);
});