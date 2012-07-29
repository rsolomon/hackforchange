co2.view.AddInfoView = Backbone.View.extend({
  initialize: function() {
    $('#add-info-tabs a:first').tab('show');

    this.addFlightView = new co2.view.AddFlightView({
      el: '.add-flight',
      collection: new co2.collection.FlightEmissionCollection
    });
  }
});