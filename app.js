const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const bookingRoutes = require('./api/routes/bookings');
const driverRoutes = require('./api/routes/drivers');

//Setup MongoDB connection (to the cloud of Mongo Altas)
/* mongoose.connect('mongodb+srv://amos:'+process.env.MONGO_ATLAS_PW+'@shuttlebusnodeapp-dxsxb.mongodb.net/test?retryWrites=false',
{
    useMongoClient: true
}
); */
mongoose.connect('mongodb://amos:82Maniraki@ds159100.mlab.com:59100/westxshuttlebus',
{
    useMongoClient: true
}
);

//setup logging
app.use(morgan('dev'));

//setup body parser
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//Setup CORS to prevent CORS errors
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");  //giving access to all clients
    // res.header(
    //     "Access-Controll-Allow-Headers",
    //     "Origin, X-Request-With, Content-Type, Accept, Authorization",
    //     "Access-Controll-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET",
    //     "Content-type': 'application/json; charset=utf-8"
    //    // "Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8"
    // );
    // console.log('Request made');
    // if(req.method ==='OPTIONS'){
    //     res.header('Access-Controll-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    //     return res.status(200).json({});
    // }
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
      
    next();
});
/* app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', 'http://shuttlebus.com');  //giving access to only to shuttlebus
}); */

//ROUTES WHICH HANDLE REQUESTS 
//Calling for GET request to /bookings route
app.use('/bookings', bookingRoutes);

//Calling for GET request to /drivers route
app.use('/drivers', driverRoutes);

//ERROR HANDLING
app.use((req, res, next) =>{
    const error = new Error('Not found');
    error.status(404);
    next(error);
});
app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({  
        error: {
            message: error.message
        }
    });
});


module.exports = app;
