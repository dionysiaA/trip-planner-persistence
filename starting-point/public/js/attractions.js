'use strict';
/* global $ globalData attractionModule hotels restaurants activities */

/**
 * This module holds collection of enhanced attraction objects which can be
 * easily looked up by type and id. It is primarily used when someone clicks
 * to add an attraction in the `options` module.
 */

var attractionsModule = (function() {


  var enhanced = {
    hotels: globalData.hotels.then(function(resolvedHotels) {
        /*
      create: function (databaseAttraction) {
      return new Attraction(databaseAttraction);
    }

       */
        return resolvedHotels.map(attractionModule.create)
      })
      .catch(function(err) {
        console.error(err);
      }),
    // restaurants: globalData.restaurants.map(attractionModule.create),
    restaurants: globalData.restaurants.then(function(resolvedRestaurants) {
        return resolvedRestaurants.map(attractionModule.create)
      })
      .catch(function(err) {
        console.error(err);
      }),
    // activities: globalData.activities.map(attractionModule.create)
    activities: globalData.activities.then(function(resolvedActivites) {
        return resolvedActivites.map(attractionModule.create)
      })
      .catch(function(err) {
        console.error(err);
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
      var foundObject;
      $.when(enhanced.hotels, enhanced.restaurants, enhanced.activities)
        .done(function(h, r, a) {
          if (type === 'hotel') foundObject = findById(h, id);
          else if (type === 'restaurant') foundObject = findById(r, id);
          else if (type === 'activity') foundObject = findById(a, id);
          else throw Error('Unknown attraction type');
        });
        return foundObject;
    },

    getEnhanced: function(databaseAttraction) {
      var type = databaseAttraction.type;
      var id = databaseAttraction.id;
      var found = publicAPI.getByTypeAndId(type, id);
      if (found) return found;
      throw Error('enhanced version not found', databaseAttraction);
    }
  };

  return publicAPI;

}());