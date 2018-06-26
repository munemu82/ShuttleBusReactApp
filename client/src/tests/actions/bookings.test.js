import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    submitBooking, 
    editBooking, 
    startEditBooking,
    removeBooking,
    startRemoveBooking,
    setBookings,
    startSetBookings
} from '../../actions/bookings';
import bookings from '../fixtures/bookings';
import startAddBooking from '../../actions/bookings';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore(thunk);
beforeEach((done) =>{
    const bookingsData = {};
    bookings.forEach(({id, clientName, pickupAddress, destinationAddress,
    pickupDate, pickupTime, tripPrice, status, createdAt }) => {
        bookingsData[id] = {  clientName, pickupAddress, destinationAddress,
            pickupDate, pickupTime, tripPrice, status, createdAt }
    });
    database.ref('bookings').set(bookingsData).then((done) => done());
});

//BEGIN OF TEST CASES
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
//Test remove booking action
test('Should setup remove booking action object', () =>{
    const action = removeBooking({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_BOOKING',
        id: '123abc'
    });
});
test('Should remove booking from firebase', (done) =>{
    const store = createMockStore({});
    const id = bookings[2].id;
    store.dispatch(startRemoveBooking({ id })).then( () =>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_BOOKING',
            id
        });
        return database.ref(`bookings/${id}`).once('value')
    }).then( (snapshot) =>{
        expect(snapshot.val()).toBeFalsy();
        done();
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
test('Should edit booking from firebase', (done) =>{
    const store = createMockStore({});
    const id = bookings[0].id;
    const updates = { tripPrice: 125};
    store.dispatch(startEditBooking(id, updates)).then( () =>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_BOOKING',
            id, 
            updates
        });
        return database.ref(`bookings/${id}`).once('value');
    }).then( (snapshot) =>{
        expect(snapshot.val().tripPrice).toBe(updates.tripPrice);
        done();
    });
});

//Set and fetch bookings 
test('Should setup set bookings action object with data', () =>{
    const action = setBookings(bookings);
    expect(action).toEqual({
        type: 'SET_BOOKINGS',
        bookings
    })
});
test('Should fetch the bookings from the database', (done) =>{
    const store = createMockStore({});
    store.dispatch(startSetBookings()).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_BOOKINGS',
            bookings
        });
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