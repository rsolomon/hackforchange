co2.collection.FlightEmissionCollection = co2.collection.AMEECollection.extend({
  data: {
    'path': '/3.6/categories/Great_Circle_flight_methodology/calculation'

//    //TEMP
//    'values.IATAcode1': 'LHR',
//    'values.IATAcode2': 'LAX'
  },

  fetch: function(options) {
    var data = {
      'values.IATAcode1': options.data.departing,
      'values.IATAcode2': options.data.arriving
    };

    co2.collection.AMEECollection.prototype.fetch.call(this, {
      data: data
    });
  },

  parse: function(data) {
    return data.output.amounts;
  }
});