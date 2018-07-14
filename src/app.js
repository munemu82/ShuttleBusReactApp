import React from 'react';
import ReactDOM from 'react-dom';
import {Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import {startSetBookings } from './actions/bookings';
import {startSetDrivers, startSetDriverByEmail } from './actions/drivers';
import { login, logout } from './actions/auth';
import getVisibleBookings from './selectors/bookings';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import { WSAEUSERS } from 'constants';

//create the store
const bookingStore = configureStore();

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

//Tracking authentication states
firebase.auth().onAuthStateChanged((user) => {
    //checking if user logged in 
    if(user){         //check if user is logged in, if so then get their bookings- later, we will add a check to see if user is admin or driver so that we can get all the bookings
        //localStorage.setItem("userInfo", user.email);
        sessionStorage.setItem("userInfo", user.email);
        
        // console.log(user);
        console.log(user.email);
        bookingStore.dispatch(startSetDriverByEmail(user.email)).then( (result) =>{
            console.log('THis is from the app');
            const state = bookingStore.getState();
            console.log(state);
        });
        bookingStore.dispatch(login(user.uid));
        bookingStore.dispatch(startSetBookings()).then( () =>{
        renderApp();
        if(history.location.pathname === '/login'){
            location.reload();
            history.push('/dashboard');
        }
        //get all drivers
        //bookingStore.dispatch(startSetDrivers());
        
        //get driver by email
       // bookingStore.dispatch(startSetDriverByEmail(user.email));
       // bookingStore.dispatch(getDriverByEmail(user.email));
       
    });
    }else{
        bookingStore.dispatch(logout());
        renderApp();
        history.push('/');
        console.log('Is Logged Out!');
        // Remove all saved data from sessionStorage
        sessionStorage.clear();
    }
});


