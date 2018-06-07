import React from 'react';
import BookingsList from './BookingsList';
import { Link } from 'react-router-dom';
import BookingListFilters from './BookingListFilters';
import BookingsSummary from './BookingsSummary';

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
