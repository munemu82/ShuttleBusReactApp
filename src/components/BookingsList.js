import React from 'react';
import {connect } from 'react-redux';
import BookingListItem from './BookingListItem';
import selectBookings from '../selectors/bookings';

const BookingsList = (props) => (
    <div>
       {props.bookings.map((booking) => {
           return <BookingListItem key={booking.id} {...booking} />
       })}
    </div>
);

//mapping state to the props
/* const mapStateToProps = (state) => {
    return {
        bookings: state.bookings,
        filters: state.filters
    };
} */
const mapStateToProps = (state) => {
    return {
        bookings: selectBookings(state.bookings, state.filters)
    };
};
//creating new component for higher order component(s)
export default connect(mapStateToProps)(BookingsList);

