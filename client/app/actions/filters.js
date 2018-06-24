//SET_CLIENTNAME_FILTER
export const setClientNameFilter = (clientName = '') => ({
    type: 'SET_CLIENTNAME_FILTER',
    clientName
  });

//SET_PICKUP_DATE_FILTER
export const setPickupDateFilter = (pickupDate) => ({
  type: 'SET_PICKUP_DATE_FILTER',
  pickupDate
});
  
//SORTBY_PICKUP_DATE
export const sortByPickUpDate = () =>({
    type: 'SORTBY_PICKUP_DATE'
});
//SORTBY_BOOKING_PRICE
export const sortByBookingPrice = () =>({
    type: 'SORTBY_BOOKING_PRICE'
});
