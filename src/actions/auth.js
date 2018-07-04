import { firebase, googleAuthProvider, facebookAuProvider  } from '../firebase/firebase';
//Setup url
const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000' : 'https://westx-shuttlebus.herokuapp.com';


export const login = (uid) =>({
    type: 'LOGIN',
    uid
});
export const startLogin = ( loginProvider) =>{
    return () => {
        //A call back to authentication provider and bring up a login popup screen
        if(loginProvider==='google'){
            return firebase.auth().signInWithPopup(googleAuthProvider);
        }else{
            return firebase.auth().signInWithPopup(facebookAuProvider);
        } 
    };
};
export const startFaceBookLogin = () =>{
    return () => {
        //A call back to authentication provider and bring up a login popup screen
        return firebase.auth().signInWithPopup(facebookAuProvider);
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});
//Logout action 
export const startLogout = () => {
    return firebase.auth().signOut();
    console.log('Logout button clicked');
};

