export default ( state = {}, action ) => {
    switch(action.type){
        case 'SIGNUP_DRIVER':
            return [    
                ...state,        //this just append the new driver after previous ones
                action.driver
            ];
        default:
            return state;
    }
};
