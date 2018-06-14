import React from 'react';
import ReactDOM from 'react-dom';
import {Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import {startSetBookings } from './actions/bookings';
import { login, logout } from './actions/auth';
import getVisibleBookings from './selectors/bookings';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';

//create the store
const bookingStore = configureStore();

const state = bookingStore.getState();
//const visibleBookings = getVisibleBookings(state.bookings, state.filters);

//console.log(visibleBookings)  //print current store state
const jsx = (
    <Provider store={bookingStore}>
        <AppRouter />
    </Provider>
);
let hasRendered = false;
const renderApp = () =>{
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
}

ReactDOM.render(<p>Loading....</p>, document.getElementById('app'));

/* bookingStore.dispatch(startSetBookings()).then( () =>{
    ReactDOM.render(jsx, document.getElementById('app'));
}); */

//Tracking authentication states
firebase.auth().onAuthStateChanged((user) => {
    //checking if user logged in 
    if(user){         //check if user is logged in, if so then get their bookings- later, we will add a check to see if user is admin or driver so that we can get all the bookings
        bookingStore.dispatch(login(user.uid));
        bookingStore.dispatch(startSetBookings()).then( () =>{
        renderApp();
        if(history.location.pathname === '/login'){
            history.push('/dashboard');
        }
        console.log(user.email);
    });
    }else{
        bookingStore.dispatch(logout());
        renderApp();
        history.push('/');
        console.log('Is Logged Out!');
    }
});


