window.co2.collection.AMEECollection = Backbone.Collection.extend({
  'url': 'http://localhost:1337',
  data: { },
  fetch: function(options) {
    var options = options || {};
    options.data = options.data || {};

    // Merge provided data with class defaults
    _.extend(options.data, this.data);

    Backbone.Collection.prototype.fetch.call(this, options);
  }
});