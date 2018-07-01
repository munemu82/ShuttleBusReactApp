import selectBookings from '../../selectors/bookings';
import moment from 'moment';

//setup some bookings data
const bookings = [{
    id: '1',
    clientName:'Test Name1',
    pickupAddress: '116 Mcburney Rd, Cabramatta',
    destinationAddress: '220 George St, Sydney',
    pickupDate:0,
    tripPrice:120,
    status:'Initialized',
    createdAt:0
},{
    id: '2',
    clientName:'Zedric Munezero',
    pickupAddress: '116 Mcburney Rd, Cabramatta',
    destinationAddress: 'Paramatta Station',
    pickupDate:-1000,
    tripPrice:80,
    status:'Initialized',
    createdAt:-1000
},{
    id: '3',
    clientName:'Ibrahim Jalo',
    pickupAddress: '85 Mcburney Rd, Cabramatta',
    destinationAddress: 'Sydney Domestic Aiport',
    pickupDate:1000,
    tripPrice:115,
    status:'Booked',
    createdAt:1000
}];

test('Should filter by client name and sort by pickup date', () =>{
    const filters = {
        clientName: 'e',
        sortBy: 'pickupDate',
        pickupDate: undefined,
        tripPrice: undefined
    }
    const result = selectBookings(bookings, filters);
    expect(result).toEqual([bookings[0], bookings[1]]);
});

test('should filter by pickup date', () => {
    const filters = {
      clientName: '',
      sortBy: 'date',
      pickupDate: 0,
      tripPrice: undefined
    };
    const result = selectBookings(bookings, filters);
    expect(result).toEqual([bookings[0], bookings[2]]);
  });

test('should sort by date', () => {
    const filters = {
      clientName: '',
      sortBy: 'pickupDate',
      pickupDate: undefined,
    };
    const result = selectBookings(bookings, filters);
    expect(result).toEqual([bookings[2], bookings[0], bookings[1]]);
  }); 
  
/* test('Should filter by client name and sort by trip price', () =>{
    const filters = {
        clientName: 'e',
        sortBy: 'tripPrice'
        //tripPrice: undefined,
    }
    const result = selectBookings(bookings, filters);
    expect(result).toEqual([bookings[1], bookings[0]]);
}); */

test('should sort by trip price', () => {
    const filters = {
      clientName: '',
      sortBy: 'tripPrice',
      pickupDate: undefined,
    };
    const result = selectBookings(bookings, filters);
    expect(result).toEqual([bookings[0], bookings[2], bookings[1]]);
  });