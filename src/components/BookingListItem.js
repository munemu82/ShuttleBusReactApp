import React from 'react';
import {connect } from 'react-redux';
import {Link } from 'react-router-dom';
import { removeBooking } from '../actions/bookings';
import { Button } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import numeral from 'numeral';
//Export a stateless functional component 

const BookingListItem = ({ dispatch, id, clientName, pickupAddress, destinationAddress, pickupDate, tripPrice, createdAt}) => (
    <div>
        <h3>{clientName}</h3>
        <p>{createdAt}-{pickupAddress}-{destinationAddress}-{moment(pickupDate).format('Do MMMM, YYYY')}-{numeral(tripPrice).format('$0,0.00')} -
        <Link to={`/booking/edit/${id}`} className="btn btn-primary" >Edit</Link>
         <Button onClick={() => {
             dispatch( removeBooking({ id }));
         }}  bsStyle="danger">Remove</Button>
         </p>
    </div>

);

export default connect()(BookingListItem);