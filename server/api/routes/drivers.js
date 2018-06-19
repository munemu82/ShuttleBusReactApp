const express = require('express');
const router = express.Router();

//REST API to GET request drivers
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Drivers list was fetched !'
    });
});

//REST API to POST request drivers
router.post('/', (req, res, next) => {
    const driver = {
        name : req.body.name,
        email: req.body.email
    }
    res.status(201).json({
        message: 'Driver object was created !',
        driver: driver
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