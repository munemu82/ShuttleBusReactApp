import database from '../firebase/firebase';
import axios from 'axios';

//Setup url
const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000' : 'https://westx-shuttlebus.herokuapp.com';
//STATES FUNCTION GENERATORS
//SIGNUP_DRIVER
export const signupDriver = (driver) => ({ 
    type: 'SIGNUP_DRIVER',
    driver
});

export const startSignupDriver = (driverData = {} ) =>{
    return (dispatch, getState) => {
        //Write the data to firebase
        const {
            driverName ='', 
            driverEmail='',
            driverPhoneNumber=''
        } = driverData;
        return axios.post(`${ROOT_URL}/api/drivers/`, {
            driverName, driverEmail, driverPhoneNumber
        }).then(res => {
            dispatch(signupDriver({
                id: res.data.createdDriver.id,
                ...res.data.createdDriver
            }));
        });
    };
};

//SET_BOOKINGS
export const setDriverByEmail = (driverEmail) =>({
    type: 'SET_DRIVER_BY_EMAIL',
    driverEmail
});
export const startSetDriverByEmail = ( driverEmail ) => {
    return (dispatch, getState) =>{
        return axios.get(`${ROOT_URL}/api/drivers/email/${driverEmail}`).then( res => {
            const driverDetails = res.data.driver;
            console.log(driverDetails);
            dispatch(setDriverByEmail(driverEmail));
        },
        (error) => { console.log(error) }
     );
    }
}
export const getDriverByEmail = (email) => {
    return axios.get(`${ROOT_URL}/api/drivers/email/${email}`).then( res => {
        const driverDetails = res.data.driver;
        console.log(driverDetails)
    },
    (error) => { console.log(error) }
 );
}

//SET_DRIVERS
export const setDrivers = (drivers) =>({
    type: 'SET_DRIVERS',
    drivers
});
export const startSetDrivers = () => {
    return (dispatch, getState) =>{
        const uid = getState().auth.uid;
        return axios.get(`${ROOT_URL}/api/drivers/`).then( res => {
            const drivers = res.data.drivers;

            console.log(drivers);
            dispatch(setDrivers(drivers));
        },
        (error) => { console.log(error) }
     );
    }
}
