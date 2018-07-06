export default ( state = {}, action ) => {
    switch(action.type){
        case 'SIGNUP_DRIVER':
            return [    
                ...state,        //this just append the new driver after previous ones
                action.driver
            ];
        case 'SET_DRIVER_BY_EMAIL':
            return state.map((email) => {
                if(email === action.driverEmail){
                    return {
                        ...driver
                    } // get the driver    
                }else{      // no updates made to the booking 
                    return "No driver matches to the email";
                }
            })
        case 'SET_DRIVERS':
            return action.drivers;
        default:
            return state;
    }
};
