import uuid from 'uuid';
import database from '../firebase/firebase';

//STATES FUNCTION GENERATORS
//SUBMIT_BOOKING
export const submitBooking = (booking) => ({ 
    type: 'SUBMIT_BOOKING',
    booking
});

export const startAddBooking = (bookingData = {} ) =>{
    return (dispatch) => {
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

       return database.ref('bookings').push(booking).then((ref) =>{
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
//REMOVE_BOOKING
export const removeBooking = ({ id } = {}) => ({
    type: 'REMOVE_BOOKING',
    id
});