'use strict';
/* global $ attractionModule hotels restaurants activities */

/**
 * This module holds collection of enhanced attraction objects which can be
 * easily looked up by type and id. It is primarily used when someone clicks
 * to add an attraction in the `options` module.
 */

var attractionsModule = (function() {

  var hotels, restaurants, activities;
  //first ajax request
  function ajaxGetHotels() {
    return $.ajax({
      method: 'GET',
      url: '/api/hotels'
    })
    .then(function(hotels) {
      return hotels
    })
    .catch(function(error){
      console.error(`There was an error ${error}`);
    })
  }

  function ajaxGetRestaurants() {
    return $.ajax({
      method: 'GET',
      url: '/api/restaurants'
    })
    .then(function(restaurants) {
      return restaurants
    })
    .catch(function(error){
      console.error(`There was an error ${error}`);
    })
  }

  function ajaxGetActivities() {
    return $.ajax({
      method: 'GET',
      url: '/api/activities'
    })
    .then(function(activities) {
      return activities
    })
    .catch(function(error){
      console.error(`There was an error ${error}`);
    })
  }

  // application state
  var enhanced = {
    hotels: ajaxGetHotels().then(function(hotels) {
        return hotels.map(attractionModule.create)
      }),
    restaurants: ajaxGetRestaurants().then(function(restaurants) {
      return restaurants.map(attractionModule.create)
    }),
    activities: ajaxGetActivities().then(function(activities) {
      return activities.map(attractionModule.create)
    })
  };

  // private helper methods (only available inside the module)

  function findById(array, id) {
    return array.find(function(el) {
      return +el.id === +id;
    });
  }

  // globally accessible module methods (available to other modules)

  var publicAPI = {

    getByTypeAndId: function(type, id) {
      if (type === 'hotel') return findById(enhanced.hotels, id);
      else if (type === 'restaurant') return findById(enhanced.restaurants, id);
      else if (type === 'activity') return findById(enhanced.activities, id);
      else throw Error('Unknown attraction type');
    },

    getEnhanced: function(databaseAttraction) {
      var type = databaseAttraction.type;
      var id = databaseAttraction.id;
      var found = publicAPI.getByTypeAndId(type, id);
      if (found) return found;
      throw Error('enhanced version not found', databaseAttraction);
    },
    getHotels: ajaxGetHotels,
    getActivities: ajaxGetActivities,
    getRestaurants: ajaxGetRestaurants
  };

  return publicAPI;

}());