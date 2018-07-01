import moment from 'moment';
import filtersReducer from '../../reducers/filters';

//Test case for default filter values
test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
      clientName: '',
      sortBy: 'pickupDate',
      pickupDate: moment().startOf('week')
    });
  });

//Test case for sorting by trip price
test('should set sortBy to trip price', () => {
    const state = filtersReducer(undefined, { type: 'SORTBY_BOOKING_PRICE' });
    expect(state.sortBy).toBe('tripPrice');
});

//Test case for sorting by pickup date
test('should set sortBy to pickup date', () => {
    const currentState = {
      text: '',
      sortBy: 'tripPrice',
      pickupDate: undefined
    };
    const action = { type: 'SORTBY_PICKUP_DATE' };
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('pickupDate');
});

//Test case for setting filter by client name
test('should set client name filter', () => {
    const clientName = 'This is my filter';
    const action = {
      type: 'SET_CLIENTNAME_FILTER',
      clientName
    };
    const state = filtersReducer(undefined, action);
    expect(state.clientName).toBe(clientName);
});

//Test case for setting filter by pickup date
test('should set pickup date filter', () => {
    const pickupDate = moment();
    const action = {
      type: 'SET_PICKUP_DATE_FILTER',
      pickupDate
    };
    const state = filtersReducer(undefined, action);
    expect(state.pickupDate).toEqual(pickupDate);
  });
  

