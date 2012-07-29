window.co2.collection.FlightCollection = Backbone.Collection.extend({
  'url': '/flights',

  parse: function(data) {
    return data;
  }
});