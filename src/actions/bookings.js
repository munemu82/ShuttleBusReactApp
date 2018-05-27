import uuid from 'uuid';

//STATES FUNCTION GENERATORS
//SUBMIT_BOOKING
export const submitBooking = (
    { clientName ='anonymous', 
      pickupAddress='Sydney',
      destinationAddress='Sydney International Airport', 
      pickupDate=0, 
      tripPrice=0, 
      status='Initialized',
      createdAt=0 
    } = {}
) => ({
    type: 'SUBMIT_BOOKING',
    booking: {
        id: uuid(),
        clientName,
        pickupAddress,
        destinationAddress,
        pickupDate,
        tripPrice,
        status,
        createdAt
    }
});

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