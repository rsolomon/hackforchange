window.co2.view.AddDriveView = Backbone.View.extend({
  _addFlightFormTemplate: '#template-add-drive',

  events: {
    'click button': 'onSubmitClick'
  },

  onSubmitClick: function() {
    var distance = parseFloat(this.$('.drive-distance').val()),
      mileage = parseFloat(this.$('.drive-mileage').val()),
      self = this;

    if (distance && mileage) {
      var gallons = distance / mileage;
      var calcCarbon = gallons * (19/6);
      var event = new co2.object.Co2Event({
        category: 'flight',
        cost: calcCarbon,
        date: new Date(this.$('.drive-date').val())
      });
      event.save({
        error: function() {
          alert('error saving... :(');
        },
        success: function() {
          self.render();
        }
      });
    }
  },

  initialize: function() {

    // Initialize templates
    this._addFlightFormTemplate = Handlebars.compile($(this._addFlightFormTemplate).html());

    this.render();
  },

  render: function() {
    this.$el.html(this._addFlightFormTemplate());
    this.$('.drive-date').datepicker();
  }
});