import React from 'react';
import { connect } from 'react-redux';
import BookingForm from './BookingForm';
import { startEditBooking, startRemoveBooking } from '../actions/bookings';

export class EditBookingPage extends React.Component{
    action = 'Edit';
    onSubmit = (booking) =>{
        this.props.startEditBooking(this.props.booking.id, booking);
        this.props.history.push('/dashboard');
    }
    onRemove = () => {
        this.props.startRemoveBooking({ id: this.props.booking.id });
        this.props.history.push('/dashboard');
    }
    render(){
        return (
            <div className="content">
                <h1>Booking details</h1>
                <BookingForm 
                    booking = {this.props.booking}
                    onSubmit = {this.onSubmit}
                    action = {this.action}
                 />
                 <button onClick={this.onRemove}> Remove </button>
            </div>
        );
    }
    
};

const mapStateToProps = (state, props) =>{
    return {
        booking: state.bookings.find( (booking) => booking.id === props.match.params.id)
    };
};
const mapDispatchToProps = (dispatch, props) => ({
    startEditBooking: (id, booking) => dispatch(startEditBooking(id, booking)),
    startRemoveBooking: (data) => dispatch(startRemoveBooking(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(EditBookingPage);