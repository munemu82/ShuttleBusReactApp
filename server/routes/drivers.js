const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//importing the booking model
const Driver = require('../models/driver');

//REST API to GET request drivers
router.get('/', (req, res, next) => {
    Driver.find().select("_id driverName driverEmail driverPhoneNumber")
    .exec().then( docs =>{
        const response = {
            count: docs.length,
            drivers: docs.map( doc =>{
                return{
                    id: doc._id,
                    driverName: doc.driverName,
                    driverEmail: doc.driverEmail,
                    driverPhoneNumber: doc.driverPhoneNumber,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/api/drivers/'+doc._id
                    }
                }
            })
        }
        // if(docs.length > 0){
            res.status(200).json(response);
     
    }).catch(err =>  {
        console.log(err);
        res.status(500).json({error : err});
    });
});

//REST API to POST request drivers
router.post('/', (req, res, next) => {
    //Create booking object 
    const driver = new Driver({
        _id : mongoose.Types.ObjectId(),
        driverName: req.body.driverName,
        driverEmail: req.body.driverEmail,
        driverPhoneNumber: req.body.driverPhoneNumber
    });
    //save booking to the MongoDB Database
    driver.save().then(result =>{
        console.log(result)
        res.status(200).json({
            message: 'New driver added successfully!',
            createdDriver: {
                driverName: result.driverName,
                driverEmail: result.driverEmail,
                driverPhoneNumber: result.driverPhoneNumber,
                id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/api/drivers/'+result._id
                }
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//REST API to GET request driver by id
router.get('/:driverId', (req, res, next) => {
        res.status(200).json({
            message: 'Driver details!',
            driverId: req.params.driverId
        });
    });

//REST API to GET request to delete driver by id
router.delete('/:driverId', (req, res, next) => {
    res.status(200).json({
        message: 'Driver deleted',
        driverId: req.params.driverId
    });
});

module.exports = router;