const mongoose = require('mongoose');

const driverSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    driverName: {type: String, required: true},
    driverEmail: {type: String, required: true},
    driverPhoneNumber: {type: String, required: true}
});

module.exports = mongoose.model('Driver', driverSchema);