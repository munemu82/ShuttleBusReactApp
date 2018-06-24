import moment from 'moment';

//filters default object
const filtersReducerDefaultState = {
    clientName: '',
    sortBy: 'pickupDate',
    pickupDate: moment().startOf('week')  //set default filter date as first day of the week
  };   
//filters reducer 
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_CLIENTNAME_FILTER':
            return {
                ...state,
                clientName: action.clientName
            }
        case 'SORTBY_BOOKING_PRICE':
            return {
                ...state,
                sortBy: 'tripPrice'
            }
        case 'SORTBY_PICKUP_DATE':
            return {
                ...state,
                sortBy: 'pickupDate'
            }         
        case 'SET_PICKUP_DATE_FILTER':
            return {
              ...state,
              pickupDate: action.pickupDate
            };
        default:
            return state;
    }
  };  

export default filtersReducer;