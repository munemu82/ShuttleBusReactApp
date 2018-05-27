//creating default booking
const bookingsReducerDefaultState = [];

//bookings reducer
const bookingsReducer = (state = bookingsReducerDefaultState, action) =>{
    switch(action.type){
        case 'SUBMIT_BOOKING':
            return [    
                ...state,        //this just append the new booking after previous ones
                action.booking
            ];
        case 'REMOVE_BOOKING':
            return state.filter(({ id }) => id !== action.id );
        case 'EDIT_BOOKING':
            return state.map((booking) => {
                if(booking.id === action.id){
                  return {    //returning updated booking
                    ...booking, // get the booking to be updated
                    ...action.updates   //apply updates required to the booking
                  };      
                }else{      // no updates made to the booking 
                    return booking;
                }
            })    
        default:
            return state;
        }      
    }; 

    export default bookingsReducer;