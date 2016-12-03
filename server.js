// BASE SETUP
// =============================================================================

// call the packages we need

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000; // set our port

var mongoose = require('mongoose');
mongoose.connect('mongodb://myguide:cammac@ds023654.mlab.com:23654/my_guide_tours'); // connect to our database



var Tour = require('./app/models/tour');


// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {

    res.json({ message: 'hooray! welcome to our api!' });
});

//=============================================================================
// on routes that end in /tour
// ----------------------------------------------------
router.route('/tour')

// create a tour (accessed at POST http://localhost:8080/tour)
.post(function(req, res) {

    var theTour = new Tour();
    tour.name = req.body.name

    // set the category name (comes from the request)
    console.log("body:" + req.body);

    // set the category name (comes from the request)
    console.log("theTour:" + tour.name);
    tour.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Code created!' });
    });


})

// get all the category (accessed at GET http://localhost:8080/api/tour)
.get(function(req, res) {
    Tour.find(function(err, tour) {
        if (err)
            res.send(err);

        res.json(tour);
    });
});

// on routes that end in /category/:category_id
// ----------------------------------------------------
router.route('/tour/:tour')

// get the category with that id
.get(function(req, res) {
    Tour.findById(req.params.tour_id, function(err, tour) {
        if (err)
            res.send(err);
        res.json(tour);
    });
})

// update the category with this id
.put(function(req, res) {
    Tour.findById(req.params.tour_id, function(err, tour) {

        if (err)
            res.send(err);

        tour.name = req.body.name;
        tour.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Code updated!' });
        });

    });
})

// delete the category with this id
.delete(function(req, res) {
    Tour.remove({
        _id: req.params.tour_id
    }, function(err, tour) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);