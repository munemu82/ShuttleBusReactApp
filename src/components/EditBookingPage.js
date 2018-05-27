import React from 'react';
import { connect } from 'react-redux';
import BookingForm from './BookingForm';
import { editBooking } from '../actions/bookings';

const EditBookingPage = (props) =>{
    console.log(props);
    return (
        <div className="content">
            <h1>Booking details</h1>
            <BookingForm 
                booking = {props.booking}
                onSubmit = { (booking) => {
                    //call dispatch action to perform update
                    props.dispatch(editBooking(props.booking.id, booking));
                    //redirect back to dashboard page
                    props.history.push('/dashboard');
                    //console.log("Updated", booking)
                }}
             />
        </div>
    );
};

const mapStateToProps = (state, props) =>{
    return {
        booking: state.bookings.find( (booking) => booking.id === props.match.params.id)
    };
};
export default connect(mapStateToProps)(EditBookingPage);