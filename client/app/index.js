import React from 'react';
import ReactDOM from 'react-dom';
import {Provider } from 'react-redux';
import configureStore from './store/configureStore';
import AppRouter, { history } from './routers/AppRouter';
import {startSetBookings } from './actions/bookings';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import './styles/styles.scss';

//create the store
const bookingStore = configureStore();
const state = bookingStore.getState();

const jsx = (
  <Provider store={bookingStore}>
      <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));

//Setup bookings store states
bookingStore.dispatch(startSetBookings());