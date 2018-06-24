import React from 'react';
import {connect } from 'react-redux';
import numeral from 'numeral';
import selectBookings from '../../selectors/bookings';
import selectBookingsTotal from '../../selectors/bookings-total';

export const BookingsSummary = ({ bookingCount, bookingsTotal }) => {
    const bookingWord = bookingCount === 1 ? 'booking' : 'bookings';
    const formattedBookingsTotal = numeral(bookingsTotal).format('$0,0.00');
    return (
        <div>
            <h1> Viewing {bookingCount} {bookingWord} totalling {formattedBookingsTotal} </h1>
        </div>
    );
};

const mapStateToProps = (state) =>{
    const visibleBookings = selectBookings(state.bookings, state.filters);
    return {
        bookingsCount: visibleBookings.length,
        bookingsTotal: selectBookingsTotal(visibleBookings)
    };
};

export default connect(mapStateToProps)(BookingsSummary);