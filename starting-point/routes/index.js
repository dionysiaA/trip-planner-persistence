var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../models/hotel');
var Restaurant = require('../models/restaurant');
var Activity = require('../models/activity');

router.get('/', function(req, res, next) {
  Promise.all([
      Hotel.findAll(),
      Restaurant.findAll(),
      Activity.findAll()
    ])
    .spread(function(dbHotels, dbRestaurants, dbActivities) {
      // res.json(dbHotels, dbRestaurants, dbActivities);
      res.render('index', {
        templateHotels: dbHotels,
        templateRestaurants: dbRestaurants,
        templateActivities: dbActivities
      });
    })
    .catch(next);
});

router.get('/api/options', function(req, res, next) {
  Promise.all([
      Hotel.findAll(),
      Restaurant.findAll(),
      Activity.findAll()
    ])
    .spread(function(hotels, restaurants, activities) {
      res.json({
        hotels,
        restaurants,
        activities
      });
    })
    .catch(next);
});

router.get('/api/hotels', function(req, res, next) {

  Hotel.findAll()
    .then(function(hotels) {
      res.json(hotels);
    })
    .catch(next);
});

router.get('/api/activities', function(req, res, next) {

  Activity.findAll()
    .then(function(activities) {
      res.json(activities);
    })
    .catch(next);
});

router.get('/api/restaurants', function(req, res, next) {

  Restaurant.findAll()
    .then(function(restaurants) {
      res.json(restaurants);
    })
    .catch(next);
});
module.exports = router;