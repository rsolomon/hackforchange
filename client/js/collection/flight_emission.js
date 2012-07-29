window.co2.collection.FlightEmissionCollection = window.co2.collection.AMEECollection.extend({
  data: {
    'path': '/3.6/categories/Great_Circle_flight_methodology/calculation',

    //TEMP
    'values.IATAcode1': 'LHR',
    'values.IATAcode2': 'LAX'
  },

  parse: function(data) {
    return data.output.amounts;
  }
});