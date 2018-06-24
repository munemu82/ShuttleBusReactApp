import React from 'react';
import BookingsList from '../Bookings/BookingsList';
import { Link } from 'react-router-dom';
import BookingListFilters from '../Bookings/BookingListFilters';
import BookingsSummary from '../Bookings/BookingsSummary';

const DashboardPage = () => (
  <div className="content">
     <h1>Bookings Dashboard</h1>
    <BookingsSummary />
    <hr />
    <BookingListFilters />
    <BookingsList />
  </div>
);

export default DashboardPage;
