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
            selectedNoOfAdultsOption=0,
            userEmail=''
        } = bookingData;
      // const booking = { clientName, pickupAddress, destinationAddress, pickupDate, pickupTime, tripPrice, status, createdAt};
       // const bookingInJSON = JSON.stringify(booking);
        return axios.post(`${ROOT_URL}/api/bookings/`, {
            clientName, pickupAddress, destinationAddress, pickupDate, pickupTime, tripPrice, status, createdAt, selectedNoOfAdultsOption, userEmail
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
        let userBookings = [];
        return axios.get(`${ROOT_URL}/api/bookings/`).then( res => {
            const allBookings = res.data.bookings;
            console.log(allBookings);
            console.log(sessionStorage.getItem('userInfo'));
            allBookings.forEach(function(element) {
               // console.log(element);
              // if user is set then retrieve bookings only belong to them
                if(element.userEmail ===sessionStorage.getItem('userInfo')){
                    console.log(element);
                    userBookings.push(element);
                }
            });
            const driverInfo = sessionStorage.getItem('driverInfo');
            //Check if user is a driver, if is a driver, then retrieve all bookings for them
            if(sessionStorage.getItem('userInfo') === driverInfo){
                console.log(allBookings);
                dispatch(setBookings(allBookings));
            }else{  //if user is not a driver, then retrieve bookings only belong to them
                dispatch(setBookings(userBookings));
            } 
        },
        (error) => { console.log(error) }
     );
    }
}
