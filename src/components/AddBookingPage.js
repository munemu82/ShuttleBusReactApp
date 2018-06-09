import React from 'react';
import BookingForm from './BookingForm';
import { connect } from 'react-redux';
import { startAddBooking } from '../actions/bookings';


export class AddBookingPage extends React.Component {
  onSubmit = (booking) => {
    this.props.startAddBooking(booking);
    this.props.history.push('/dashboard'); 
  };
  render(){
    return (
      <div className="content">
        <hr />
        <BookingForm 
          onSubmit = {this.onSubmit}
        />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  startAddBooking: (booking) => dispatch(startAddBooking(booking))
});

export default connect(undefined, mapDispatchToProps)(AddBookingPage); //this connect to the bookings store and save the booking record  
