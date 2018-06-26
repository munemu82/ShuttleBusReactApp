import { 
    sortByPickUpDate, 
    setClientNameFilter, 
    setPickupDateFilter, 
    sortByBookingPrice 
} from '../../actions/filters';
import moment from 'moment';

test('Should generate pickup date action object', () =>{
    const action = setPickupDateFilter(moment(0));
    expect(action).toEqual({
        type: 'SET_PICKUP_DATE_FILTER',
        pickupDate: moment(0)
    });
});

test('Should generate set clientName filter object', () =>{
    const clientNameTextFilter = 'Hecelyn Munezero';
    const action = setClientNameFilter(clientNameTextFilter);
    expect(action).toEqual({
        type: 'SET_CLIENTNAME_FILTER',
        clientName: clientNameTextFilter
    });
});

test('Should generate set clientName filter object with default values', () =>{
    const action = setClientNameFilter();
    expect(action).toEqual({
        type: 'SET_CLIENTNAME_FILTER',
        clientName: ''
    });
});

test('Should generate action object for sort by pickupdate', () =>{
    expect(sortByPickUpDate()).toEqual({ type: 'SORTBY_PICKUP_DATE' });
});

test('Should generate action object for sort by tripPrice', () =>{
    expect(sortByBookingPrice()).toEqual({ type: 'SORTBY_BOOKING_PRICE' });
});