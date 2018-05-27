import React from 'react';
import BookingsList from './BookingsList';
import { Link } from 'react-router-dom';
import BookingListFilters from './BookingListFilters';

const DashboardPage = () => (
  <div className="content">
    <h1>Bookings List</h1>
    <hr />
    <BookingListFilters />
    <BookingsList />
  </div>
);

export default DashboardPage;
