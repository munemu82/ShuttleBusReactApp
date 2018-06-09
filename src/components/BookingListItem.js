import React from 'react';
import {connect } from 'react-redux';
import {Link } from 'react-router-dom';
import { removeBooking } from '../actions/bookings';
import { Button } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import numeral from 'numeral';
//Export a stateless functional component 

const BookingListItem = ({ id, clientName, pickupAddress, destinationAddress, pickupDate, tripPrice, createdAt}) => (
    <div>
         <Link to={`/booking/edit/${id}`} >
             <h2>{clientName}</h2>
        </Link>
        <p>{moment(createdAt).format('Do MMMM, YYYY')}-{pickupAddress}-{destinationAddress}-{moment(pickupDate).format('Do MMMM, YYYY')}-{numeral(tripPrice).format('$0,0.00')} </p>
    </div>

);

export default connect()(BookingListItem);