var globalData = (function() {
  var hotels, restaurants, activities;
  //first ajax request
  hotels = (function ajaxGetHotels() {
    return $.ajax({
        method: 'GET',
        url: '/api/hotels'
      })
      .then(function(resolvedHotels) {
        return resolvedHotels;
      })
      .catch(function(error) {
        console.error(`There was an error ${error}`);
      })
  }());
  console.log(hotels, 'hotels');
  restaurants = (function ajaxGetRestaurants() {
    return $.ajax({
        method: 'GET',
        url: '/api/restaurants'
      })
      .then(function(resolvedRestaurants) {
        return resolvedRestaurants;
      })
      .catch(function(error) {
        console.error(`There was an error ${error}`);
      })
  }());
  console.log(restaurants, 'restaurants');
  activities = (function ajaxGetActivities() {
    return $.ajax({
        method: 'GET',
        url: '/api/activities'
      })
      .then(function(resolvedActivities) {
        return resolvedActivities;
      })
      .catch(function(error) {
        console.error(`There was an error ${error}`);
      })
  }());
  console.log(activities, 'activities');

// you could improve this by this functionality here:
/*
$.when(hotels, restaurants, activities)
  .done(function(resolvedHotels, resolvedRestaurants, resolvedActivities){
      hotels = resolvedHotels,
      restaurants = resolvedRestaurants,
      activities = resolvedActivities
  })
  .fail(function(error){
    console.error(error);
  })
 */
  var publicApi = {
    hotels,
    restaurants,
    activities
  }
  return publicApi;
}());