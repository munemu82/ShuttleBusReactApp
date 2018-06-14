import uuid from 'uuid';
import database from '../firebase/firebase';

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
            createdAt=0 
        } = bookingData;
        const booking = { clientName, pickupAddress, destinationAddress, pickupDate, pickupTime, tripPrice, status, createdAt};

       return database.ref(`users/${uid}/bookings`).push(booking).then((ref) =>{
            dispatch(submitBooking({
                id: ref.key,
                ...booking
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
        return database.ref(`users/${uid}/bookings/${id}`).update(updates).then( () =>{
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
        return database.ref(`users/${uid}/bookings/${id}`).remove().then( () =>{
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
        return database.ref(`users/${uid}/bookings`).once('value').then( (snapshot) =>{
            const bookings = [];
            snapshot.forEach( (childsnapshot) =>{
                bookings.push({
                    id: childsnapshot.key,
                    ...childsnapshot.val()
                });
            });
            dispatch(setBookings(bookings));
        });
    }
}
