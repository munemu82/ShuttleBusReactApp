import * as firebase from 'firebase';  

//Setup Database connection configuration
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_Id,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);
const database = firebase.database();

//Setup Authentication provider settings
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuProvider = new firebase.auth.FacebookAuthProvider();

export { firebase, googleAuthProvider, facebookAuProvider, database as default };
