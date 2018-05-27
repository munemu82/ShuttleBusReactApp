import React from 'react';
import BookingForm from './BookingForm';
import { connect } from 'react-redux';
import { submitBooking } from '../actions/bookings';


const AddBookingPage = (props) => (
  <div className="content">
    <hr />
    <BookingForm 
      onSubmit = { (booking) => {
        //console.log(booking);
        props.dispatch(submitBooking(booking));   //submit the booking to the store
        props.history.push('/dashboard'); //this is to redirect to home page
      }}
    />
  </div>
);

export default connect()(AddBookingPage);   //this connect to the bookings store and save the booking record
