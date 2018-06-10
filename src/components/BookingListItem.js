import React from 'react';
import {connect } from 'react-redux';
import {Link } from 'react-router-dom';
import { removeBooking } from '../actions/bookings';
import { Button } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import numeral from 'numeral';
//Export a stateless functional component 

const BookingListItem = ({ id, clientName, pickupAddress, destinationAddress, pickupDate, pickupTime, tripPrice, createdAt}) => (
    <div>
         <Link to={`/booking/edit/${id}`} >
             <h2>{clientName}</h2>
        </Link>
        <p><strong>Date created:</strong>{moment(createdAt).format('Do MMMM, YYYY')}-<span></span> <strong>Pickup Datetime:</strong> {moment(pickupDate).format('Do MMMM, YYYY')} {pickupTime}-<span></span> <strong>Booking Fare: </strong>{numeral(tripPrice).format('$0,0.00')} <br /><strong>Pickup Address:</strong>{pickupAddress}< br /><strong>Destination:</strong>{destinationAddress}</p>
    </div>

);

export default connect()(BookingListItem);