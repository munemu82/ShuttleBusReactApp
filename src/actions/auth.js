import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) =>({
    type: 'LOGIN',
    uid
});
export const startLogin = () =>{
    return () => {
        //A call back to authentication provider and bring up a login popup screen
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});
//Logout action 
export const startLogout = () => {
    /* return () => {
      return firebase.auth().signOut();
      console.log('Logout button clicked');
    }; */
    return firebase.auth().signOut();
    console.log('Logout button clicked');
};