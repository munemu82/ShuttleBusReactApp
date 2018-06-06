import React from 'react';
import {connect } from 'react-redux';
import BookingListItem from './BookingListItem';
import selectBookings from '../selectors/bookings';

export const BookingsList = (props) => (
    <div>
        {
            props.bookings.length === 0 ?(
                <p> There no bookings recorded at this time </p>
            ) : (
                props.bookings.map((booking) => {
                    return <BookingListItem key={booking.id} {...booking} />
                })
            )
        }
    </div>
);

const mapStateToProps = (state) => {
    return {
        bookings: selectBookings(state.bookings, state.filters)
    };
};
//creating new component for higher order component(s)
export default connect(mapStateToProps)(BookingsList);

