window.co2.view.AddUtilsView = Backbone.View.extend({
  _addUtilsFormTemplate: '#template-add-utils',

  events: {
    'click button': 'onSubmitClick'
  },

  onSubmitClick: function() {
    var gas = parseFloat(this.$('.utils-gas').val()),
      electricity = parseFloat(this.$('.utils-electricity').val()),
      self = this;

    if (gas && electricity) {
      var gasCarbon = gas * 12,
        electricityCarbon = electricity * 2;

      var event = new co2.object.Co2Event({
        category: 'utils',
        cost: gasCarbon + electricityCarbon,
        date: new Date(this.$('.utils-date').val())
      });
      event.save({
        error: function() {
          alert('error saving... :(');
        },
        success: function() {
          self.render();
          self.model.fetch();
        }
      });
    }
  },

  initialize: function() {

    // Initialize templates
    this._addUtilsFormTemplate = Handlebars.compile($(this._addUtilsFormTemplate).html());

    this.render();
  },

  render: function() {
    this.$el.html(this._addUtilsFormTemplate());
    this.$('.utils-date').datepicker();
  }
});