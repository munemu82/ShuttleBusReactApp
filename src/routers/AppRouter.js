import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import HomePage from '../components/HomePage';
import AddBookingPage from '../components/AddBookingPage';
import EditBookingPage from '../components/EditBookingPage';
import AboutUsPage from '../components/AboutUsPage';
import PartnersPage from '../components/PartnersPage';
import ContactUsPage from '../components/ContactUsPage';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AppRouter = () => (
  <BrowserRouter>
    <div className="container">
      <Header />
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/dashboard" component={DashboardPage} exact={true} />
        <Route path="/booking/edit/:id" component={EditBookingPage} />
        <Route path="/create" component={AddBookingPage} />
        <Route path="/aboutUs" component={AboutUsPage} />
        <Route path="/partners" component={PartnersPage} />
        <Route path="/contactUs" component={ContactUsPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default AppRouter;
