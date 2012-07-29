co2.collection.FoodEmissionCollection = co2.collection.AMEECollection.extend({
  data: {
    'path': '/data/embodied/clm/food/drill'
  }

//  fetch: function(options) {
//    var data = {
//      'values.IATAcode1': options.data.departing,
//      'values.IATAcode2': options.data.arriving
//    };
//
//    co2.collection.AMEECollection.prototype.fetch.call(this, {
//      data: data
//    });
//  }
});