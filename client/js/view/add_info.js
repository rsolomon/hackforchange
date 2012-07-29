co2.view.AddInfoView = Backbone.View.extend({
  initialize: function() {
    $('#add-info-tabs a:first').tab('show');
    this.emissionCollection = new co2.collection.FlightEmissionCollection;
    this.emissionCollection.on('reset', function(collection) {
      var co2Model = collection.findDefault();
      alert("Your flight will produce " + co2Model.get('value') + co2Model.get('unit') + ' of CO2');
    });

    this.addFlightView = new co2.view.AddFlightView({
      el: '.add-flight',
      collection: this.emissionCollection
    });
  }
});