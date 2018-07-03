//Import required external modules
const path = require('path');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
//Import internal modules
const bookingRoutes = require('./routes/bookings');
const driverRoutes = require('./routes/drivers');

//Setup MongoDB connection
mongoose.connect('mongodb://amos:82Maniraki@ds159100.mlab.com:59100/westxshuttlebus',
{
    useMongoClient: true
}
);
//Server settings
const port = process.env.PORT || 3000;
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//APIs routes 
const publicPath = path.join(__dirname, '..', 'public');

//Server side API routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/drivers', driverRoutes);

//client side routes
app.use(express.static(publicPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up!');
});