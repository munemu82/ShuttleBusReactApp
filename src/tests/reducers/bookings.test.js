import bookingsReducer from '../../reducers/bookings';
import bookings from '../fixtures/bookings';

//test case for INIT state 
 test('should set default state', () => {
    const state = bookingsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
  }); 

//Test case for removing a booking given a correct booking id
  test('should remove booking by id', () => {
    const action = {
      type: 'REMOVE_BOOKING',
      id: bookings[1].id
    };
    const state = bookingsReducer(bookings, action);
    expect(state).toEqual([bookings[0], bookings[2]]);
  });
  
  //Test case for removing a booking given a wrong or non existing booking id
  test('should not remove booking if id not found', () => {
    const action = {
      type: 'REMOVE_BOOKING',
      id: '-1'
    };
    const state = bookingsReducer(bookings, action);
    expect(state).toEqual(bookings);
  });

  //Test case for submitting a new booking
  test('should add a new booking', () => {
    const booking = {
      id: '109',
      clientName: 'Erdem Gurdin',
      pickupAddress: '115 Pacific Hwy, North Sydney',
      destinationAddress: '220 Pitt St, Sydney',
      pickupDate:20000,
      tripPrice:95,
      status:'Initialized',
      createdAt: 20000
    };
    const action = {
      type: 'SUBMIT_BOOKING',
      booking
    };
    const state = bookingsReducer(bookings, action);
    expect(state).toEqual([...bookings, booking]);
  });

  //Test case for editing a valid existing booking
  test('should edit a booking', () => {
    const tripPrice = 92;
    const action = {
      type: 'EDIT_BOOKING',
      id: bookings[1].id,
      updates: {
        tripPrice
      }
    };
    const state = bookingsReducer(bookings, action);
    expect(state[1].tripPrice).toBe(tripPrice);
  });
  
  //Test case for editing an invalid or nonexisting booking
  test('should not edit a booking if id not found', () => {
    const tripPrice = 92;
    const action = {
      type: 'EDIT_BOOKING',
      id: '-1',
      updates: {
        tripPrice
      }
    };
    const state = bookingsReducer(bookings, action);
    expect(state).toEqual(bookings);
  });