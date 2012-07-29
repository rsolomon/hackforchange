window.co2.collection.FlightCollection = Backbone.Collection.extend({
  'url': 'http://localhost:1337/flights',

  parse: function(data) {
    return data;
  }
});