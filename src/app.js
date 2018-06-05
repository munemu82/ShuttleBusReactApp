import React from 'react';
import ReactDOM from 'react-dom';
import {Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {submitBooking } from './actions/bookings';
import {setClientNameFilter } from './actions/filters';
import getVisibleBookings from './selectors/bookings';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

//create the store
const bookingStore = configureStore();

//create actions
bookingStore.dispatch(submitBooking({clientName: 'Amos Munezero', tripPrice: 85}));
bookingStore.dispatch(submitBooking({clientName: 'Hecelyn Munezero'}));
bookingStore.dispatch(submitBooking({clientName: 'John Smith', tripPrice: 150, createdAt: 1000}));
bookingStore.dispatch(submitBooking({clientName: 'Mr Sample', tripPrice: 55, createdAt: 5000}));
//bookingStore.dispatch(setClientNameFilter('Amos'));  //this is now set dynamically on UI

const state = bookingStore.getState();
//const visibleBookings = getVisibleBookings(state.bookings, state.filters);

//console.log(visibleBookings)  //print current store state
const jsx = (
    <Provider store={bookingStore}>
        <AppRouter />
    </Provider>
);
ReactDOM.render(jsx, document.getElementById('app'));