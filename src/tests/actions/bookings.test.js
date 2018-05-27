import { submitBooking, editBooking, removeBooking } from '../../actions/bookings';

//Test remove booking action
test('Should setup remove booking action object', () =>{
    const action = removeBooking({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_BOOKING',
        id: '123abc'
    });
});

//Test edit booking action
test('Should setup edit booking action object', () =>{
    const action = editBooking('123abc', { pickupAddress: '26-28 Canley Vale Rd'});
    expect(action).toEqual({
        type: 'EDIT_BOOKING',
        id: '123abc',
        updates: {
            pickupAddress: '26-28 Canley Vale Rd'
        }
    });
});

//Test submit booking action
test('Should setup submission of booking action object with provided values', () =>{
    const bookingData = {
        clientName: 'Zuberi Munezero',
        pickupAddress: '116 Mcburney Road',
        destinationAddress: 'Cabramatta West Public School',
        pickupDate: '19/05/2018',
        tripPrice: 25,
        status: 'Initialized',
        createdAt: 1000,
    };
    const action = submitBooking(bookingData);
    expect(action).toEqual({
        type: 'SUBMIT_BOOKING',
        booking: {
            ...bookingData,
            id: expect.any(String)    //Since id is dynamic we only care if was generated correctly
        }
    });
});
test('Should setup submission of booking action object with default values', () =>{
    const action = submitBooking();
    expect(action).toEqual({
        type: 'SUBMIT_BOOKING',
        booking: {
            id: expect.any(String),    //Since id is dynamic we only care if was generated correctly
            clientName: 'anonymous', 
            pickupAddress: 'Sydney',
            destinationAddress: 'Sydney International Airport', 
            pickupDate: 0, 
            tripPrice: 0, 
            status: 'Initialized',
            createdAt: 0 
        }
    });
});