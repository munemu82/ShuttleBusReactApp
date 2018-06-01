import React from 'react';

export default class BookingFormResult extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bookingData: this.props.bookingData
    }
  }
    render() {
      return <div>
        <h1>Booking confirmation {this.state.bookingData}</h1>
        <p>Pickup Address: </p>
        <p>Pickup Date & Time: </p>
        <p>Destination Address: </p>
        <div>Form will be here </div>
        </div>
    }
}