//IMPORTS
const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname,'..','public');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');


//userdefined imports
const bookingRoutes = require('./api/routes/bookings');
const driverRoutes = require('./api/routes/drivers');

//INITIALIZATIONS
const app = express();
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

//SETUP SERVER SIDE  ROUTING
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");  //giving access to all clients
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
      
    next();
});

//ROUTES WHICH HANDLE REQUESTS 
//Calling for GET request to /bookings route
app.use('/api/bookings', bookingRoutes);

//Calling for GET request to /drivers route
app.use('/api/drivers', driverRoutes);

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
//SETUP CLIENT SIDE  ROUTING
app.use(express.static(publicPath));   //setup middleware to the application
app.get('*', (req, res) =>{
    res.sendFile(path.join(publicPath, 'index.html'));
});
//RUN SERVER 
//const server = http.createServer(app);
app.listen(port, () => {
    console.log('Server is up and running on port: ',port);
    //console.log(port);
})