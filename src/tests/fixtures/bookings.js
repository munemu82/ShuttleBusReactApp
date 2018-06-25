import moment from 'moment'

export default [{
  id: '1',
  clientName:'Test Name1',
  pickupAddress: '116 Mcburney Rd, Cabramatta',
  destinationAddress: '220 George St, Sydney',
  pickupDate:0,
  pickupTime:'10:00',
  tripPrice:120,
  status:'Initialized',
  createdAt: 0
}, {
  id: '2',
  clientName:'Zedric Munezero',
  pickupAddress: '116 Mcburney Rd, Cabramatta',
  destinationAddress: 'Paramatta Station',
  pickupDate:-1000,
  pickupTime:'10:00',
  tripPrice:80,
  status:'Initialized',
  createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
  id: '3',
  clientName:'Ibrahim Jalo',
  pickupAddress: '85 Mcburney Rd, Cabramatta',
  destinationAddress: 'Sydney Domestic Aiport',
  pickupDate:1000,
  pickupTime:'10:00',
  tripPrice:115,
  status:'Booked',
  createdAt: moment(0).add(4, 'days').valueOf()
}
];