
const mongoose = require('mongoose');

//importing the booking model
const Booking = require('../../models/booking');

//REST API to GET request bookings
module.exports = (app) => {
    app.get('/api/bookings', (req, res, next) => {
        Booking.find().select("_id clientName pickupAddress destinationAddress pickupDate pickupTime tripPrice status createdAt")
        .exec().then( docs =>{
            const response = {
                count: docs.length,
                bookings: docs.map( doc =>{
                    return{
                        id: doc._id,
                        clientName: doc.clientName,
                        pickupAddress: doc.pickupAddress,
                        destinationAddress: doc.destinationAddress,
                        pickupDate: doc.pickupDate,
                        pickupTime: doc.pickupTime,
                        tripPrice: doc.tripPrice,
                        status: doc.status,
                        createdAt: doc.createdAt,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/bookings/'+doc._id
                        }
                    }
                })
            }
            // if(docs.length > 0){
                res.status(200).json(response);
        /*  }else{
                res.status(404).json({
                    message: 'No Entries found!'
                })
            } */
        
        }).catch(err =>  {
            console.log(err);
            res.status(500).json({error : err});
        });
    });

    //REST API to POST request booking
    app.post('/api/bookings', (req, res, next) => {
        //Create booking object 
        const booking = new Booking({
            _id : mongoose.Types.ObjectId(),
            clientName: req.body.clientName,
            pickupAddress: req.body.pickupAddress,
            destinationAddress: req.body.destinationAddress,
            pickupDate: req.body.pickupDate,
            pickupTime: req.body.pickupTime,
            tripPrice: req.body.tripPrice,
            status: req.body.status,
            createdAt:req.body.createdAt,
            selectedNoOfAdultsOption: req.body.selectedNoOfAdultsOption
        });
        //save booking to the MongoDB Database
        booking.save().then(result =>{
            console.log(result)
            res.status(200).json({
                message: 'New booking added successfully!',
                createdBooking: {
                    clientName: result.clientName,
                    pickupAddress: result.pickupAddress,
                    destinationAddress: result.destinationAddress,
                    pickupDate: result.pickupDate,
                    pickupTime: result.pickupTime,
                    tripPrice: result.tripPrice,
                    status: result.status,
                    createdAt: result.createdAt,
                    selectedNoOfAdultsOption: result.selectedNoOfAdultsOption,
                    id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/bookings/'+result._id
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

    //REST API to GET request booking by id
    app.get('/api/bookings/:bookingId', (req, res, next) => {
        const id = req.params.bookingId;
        Booking.findById(id).select(" clientName pickupAddress _id")
        .exec().then(doc =>{
            console.log("From the database ",doc);
            //send status and result
            if(doc){
                res.status(200).json({
                    booking: doc,
                    request: {
                        type: 'GET',
                        description: 'Get all bookings using the url below',
                        url: 'http://localhost:3000/bookings'
                    }
                });
            }else{
                res.status(404).json({message: 'No valid entry found for provided ID!'});
            }
        
        }).catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
    });

    //REST API to PATCH request to update booking given a booking id
    app.patch('/api/bookings/:bookingId', (req, res, next) => {
        const id = req.params.bookingId;
        const updateOps = {};
        for(const ops of req.body){
            updateOps[ops.propName] = ops.value;
        }
        Booking.update({_id: id}, {$set: updateOps}).exec().then( result =>{
            res.status(200).json({
                message: 'Booking updated successfully',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/bookings/'+id
                }
            });
        }).catch(err =>  {
            console.log(err);
            res.status(500).json({error : err});
        });
    });

    //REST API to DELETE request to delete booking given a booking id
    app.delete('/api/bookings/:bookingId', (req, res, next) => {
        const id = req.params.bookingId;
        Booking.remove({_id: id}).exec().then( result =>{
            console.log(result);
            res.status(200).json(result);
        }).catch(err =>  {
            console.log(err);
            res.status(500).json({error : err});
        });
    });
};
//export the routes
//module.exports = router;

