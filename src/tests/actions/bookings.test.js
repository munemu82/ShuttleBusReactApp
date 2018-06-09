import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { submitBooking, editBooking, removeBooking } from '../../actions/bookings';
import bookings from '../fixtures/bookings';
import startAddBooking from '../../actions/bookings';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore(thunk);
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
    const action = submitBooking(bookings[2]);
    expect(action).toEqual({
        type: 'SUBMIT_BOOKING',
        booking:bookings[2]
    });
});
test('Should add booking to the database and store', (done) =>{
   const store = createMockStore({});
   const bookingData = {
       clientName: 'John Smith',
       pickupAddress: 'Hilton Hotel, George St, Sydney NSW',
       destinationAddress: 'Sydney Domestic Airport',
       pickupDate: 1528597000000,
       pickupTime: '10:30',
       tripPrice: 30.55,
       createdAt: 1528597000000
   }
   store.dispatch(startAddBooking(bookingData)).then(() =>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:'SUBMIT_BOOKING',
            booking: {
                id: expect.any(String),
                ...bookingData
            }
        });
        return database.ref(`bookings/${actions[0].booking.id}`).once('value');
   }).then((snapshot) =>{
    expect(snapshot.val()).toEqual(bookingData);
    done();
});
});
test('Should add booking with defaults to the database and store', (done) =>{
    const store = createMockStore({});
    const bookingDefault= {
        clientName : '', 
        pickupAddress: '',
        destinationAddress:'', 
        pickupDate:0, 
        pickupTime:'0:00',
        tripPrice:0, 
        status:'Initialized',
        createdAt:0 
    }
    store.dispatch(startAddBooking({})).then(() =>{
         const actions = store.getActions();
         expect(actions[0]).toEqual({
             type:'SUBMIT_BOOKING',
             booking: {
                 id: expect.any(String),
                 ...bookingDefault
             }
         });
         return database.ref(`bookings/${actions[0].booking.id}`).once('value');
    }).then((snapshot) =>{
     expect(snapshot.val()).toEqual(bookingDefault);
     done();
 });
});

/* test('Should setup submission of booking action object with default values', () =>{
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
}); */