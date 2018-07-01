import uuid from 'uuid';
import database from '../firebase/firebase';
import axios from 'axios';

//Setup url
const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000' : 'https://westx-shuttlebus.herokuapp.com';
//STATES FUNCTION GENERATORS
//SUBMIT_BOOKING
export const submitBooking = (booking) => ({ 
    type: 'SUBMIT_BOOKING',
    booking
});

export const startAddBooking = (bookingData = {} ) =>{
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        //Write the data to firebase
        const {
            clientName ='', 
            pickupAddress='',
            destinationAddress='', 
            pickupDate=0, 
            pickupTime='0:00',
            tripPrice=0, 
            status='Initialized',
            createdAt=0,
            selectedNoOfAdultsOption=0
        } = bookingData;
      // const booking = { clientName, pickupAddress, destinationAddress, pickupDate, pickupTime, tripPrice, status, createdAt};
       // const bookingInJSON = JSON.stringify(booking);
        return axios.post(`${ROOT_URL}/api/bookings/`, {
            clientName, pickupAddress, destinationAddress, pickupDate, pickupTime, tripPrice, status, createdAt, selectedNoOfAdultsOption
        }).then(res => {
        /*     res.headers(
                "Access-Control-Allow-Origin", "*",
                "Access-Control-Allow-Credentials", "true",
                "Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT",
                "Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"    
            ) */
            //console.log(res.data.createdBooking);
            dispatch(submitBooking({
                id: res.data.createdBooking.id,
                ...res.data.createdBooking
            }));
        });
    };
};

//CONFIRM_BOOKING    (i.e. driver select Client Pick button)
//EDIT_BOOKING
export const editBooking = (id, updates) => ({
    type: 'EDIT_BOOKING',
    id,
    updates
});
export const startEditBooking = ({ id, updates }) =>{
    return (dispatch, getState) =>{
        const uid = getState().auth.uid;
        return database.ref(`${ROOT_URL}/api/bookings/${id}`).update(updates).then( () =>{
            dispatch(editBooking(id, updates));
        });
    }
}
//REMOVE_BOOKING
export const removeBooking = ({ id } = {}) => ({
    type: 'REMOVE_BOOKING',
    id
});
export const startRemoveBooking = ({ id } = {}) =>{
    return (dispatch, getState) =>{
        const uid = getState().auth.uid;
        /* return database.ref(`users/${uid}/bookings/${id}`).remove().then( () =>{
            dispatch(removeBooking({ id }));
        }); */
        return axios.delete(`${ROOT_URL}/api/bookings/${id}`).then( () =>{
            dispatch(removeBooking({ id }));
        }); 
    }
}
//SET_BOOKINGS
export const setBookings = (bookings) =>({
    type: 'SET_BOOKINGS',
    bookings
});
export const startSetBookings = () => {
    return (dispatch, getState) =>{
        const uid = getState().auth.uid;
        let bookings = [];
        return axios.get(`${ROOT_URL}/api/bookings/`).then( res => {
            const tempBookings = res.data.bookings;
            
            fetch('https://westx-shuttlebus.herokuapp.com/api/bookings')
            .then(res => res.json())
            .then(data => {
                bookings = data.bookings;
                //console.log(data);
            });
            console.log(tempBookings);
            console.log(bookings);
            dispatch(setBookings(bookings));
        },
        (error) => { console.log(error) }
     );
    }
}
