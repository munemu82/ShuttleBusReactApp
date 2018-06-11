import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import HomePage from '../components/HomePage';
import LoginPage from '../components/LoginPage';
import AddBookingPage from '../components/AddBookingPage';
import EditBookingPage from '../components/EditBookingPage';
import AboutUsPage from '../components/AboutUsPage';
import PartnersPage from '../components/PartnersPage';
import ContactUsPage from '../components/ContactUsPage';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import { Header } from '../components/Header';
import Footer from '../components/Footer';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div className="container">
      <Header />
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/login" component={LoginPage}/>
        <Route path="/dashboard" component={DashboardPage}/>
        <Route path="/booking/edit/:id" component={EditBookingPage} />
        <Route path="/create" component={AddBookingPage} />
        <Route path="/aboutUs" component={AboutUsPage} />
        <Route path="/partners" component={PartnersPage} />
        <Route path="/contactUs" component={ContactUsPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default AppRouter;
