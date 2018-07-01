const mongoose = require('mongoose');


//define the schema

const bookingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    clientName: {type: String, required: true},
    pickupAddress: {type: String, required: true},
    destinationAddress: {type: String, required: true},
    pickupDate: {type: Number, required: true},
    pickupTime: {type: String, required: true},
    tripPrice: {type: Number, required: true},
    status: {type: String, required: true},
    createdAt:{type: Number, required: true},
    selectedNoOfAdultsOption: {type: Number, required: true}
});

module.exports = mongoose.model('Booking', bookingSchema);