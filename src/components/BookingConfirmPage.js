import React from 'react';
import BookingForm from './BookingForm';
import BookingFormResult from './BookingFormResult';
import { connect } from 'react-redux';
import { submitBooking } from '../actions/bookings';
const clientName = 'Dummy';
const BookingConfirmPage = (props) => (
 
    <div className="content">
      <hr />
      <h1> Booking confirmation</h1>
    </div>
);

export default connect()(BookingConfirmPage);   //this connect to the bookings store and save the booking record
