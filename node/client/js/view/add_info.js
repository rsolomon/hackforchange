co2.view.AddInfoView = Backbone.View.extend({
  initialize: function() {
    $('#add-info-tabs a:first').tab('show');

    this.addFlightView = new co2.view.AddFlightView({
      el: '.add-flight',
      collection: new co2.collection.FlightEmissionCollection
    });

    this.addDriveView = new co2.view.AddDriveView({
      el: '.add-drive'
    });

    this.addUtilsView = new co2.view.AddUtilsView({
      el: '.add-utils'
    });
  }
});