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

export { firebase, googleAuthProvider, database as default };
/* //Child removed event - trigger everytime a booking is removed
database.ref('bookings').on('child_removed', (snapshot) =>{
       console.log(snapshot.key, snapshot.val());
});
//Child change event - trigger everytime a booking is updated
database.ref('bookings').on('child_changed', (snapshot) =>{
    console.log(snapshot.key, snapshot.val());
});
//Child added event - trigger everytime a booking is added
database.ref('bookings').on('child_added', (snapshot) =>{
    console.log(snapshot.key, snapshot.val());
}); */
/* database.ref('bookings').on('value', (snapshot) =>{
    const bookings = [];
       snapshot.forEach((childSnapshot) =>{
           bookings.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
           });
       });
       console.log(bookings);
}); */
/* database.ref('bookings')
    .once('value')
    .then((snapshot) => {
       const bookings = [];
       snapshot.forEach((childSnapshot) =>{
           bookings.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
           });
       });
       console.log(bookings);
    }); */
/* database.ref('bookings').push({
    clientName: 'Protais Hakizimana',
    pickupAddress: 'Cabramatta Station, NSW',
    destinationAddress: 'Sydney International Airport',
    pickupDate: '08/06/2018',
    pickupTime: '10:30'
});
 */
//Testing connection
/* database.ref().set({
    name: 'Amos Munezero',
    age: 30,
    isSingle: false,
    location: {
        city: 'Sydney',
        country: 'Australia'
    }
}).then(() => {             //Promise on resolve
    console.log('Data is saved successfully!');
}).catch((error) => {
    console.log('Writing to the database failed.', error);
}) 
database.ref().update({
    name: 'John Smith',
    age: 40,
    job: 'Senior Software Engineer',
    isSingle: null
}).then(() =>{ 
    console.log('Record updated successfull');
}).catch((e) =>{
    console.log('Failed to update', e);
}); 
 */