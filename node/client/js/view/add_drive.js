window.co2.view.AddDriveView = Backbone.View.extend({
  _addDriveFormTemplate: '#template-add-drive',

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
        category: 'drive',
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
    this._addDriveFormTemplate = Handlebars.compile($(this._addDriveFormTemplate).html());

    this.render();
  },

  render: function() {
    this.$el.html(this._addDriveFormTemplate());
    this.$('.drive-date').datepicker();
  }
});