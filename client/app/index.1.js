import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';
import Home from './components/Home/Home';
import AboutUsPage from './components/AboutUs/AboutUsPage';
import PartnersPage from './components/PartnersAndIntegrations/PartnersPage'
import ContactPage from './components/contactus/ContactUsPage';
import DashboardPage from './components/Dashboard/DashboardPage';


import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/dashboard" component={DashboardPage}/>
        <Route path="/aboutus" component={AboutUsPage}/>
        <Route path="/partners" component={PartnersPage}/>
        <Route path="/contactUs" component={ContactPage}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
