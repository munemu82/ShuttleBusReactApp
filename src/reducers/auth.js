export default ( state = {}, action ) => {
    switch(action.type){
        case 'LOGIN':
            return {
                uid: action.uid
            };
        case 'LOGOUT':
            return {};
        case 'SIGNUP_DRIVER':
            return [    
                ...state,        //this just append the new driver after previous ones
                action.driver
            ];
        default:
            return state;
    }
};
