window.co2.view.AddDriveView = Backbone.View.extend({
  _addDriveFormTemplate: '#template-add-drive',

  events: {
    'click button': 'onSubmitClick',
    'click .drive-ms6': 'onMazdaClick',
    'click .drive-sub': 'onSubiClick'
  },

  onMazdaClick: function(e) {
    this.$('.drive-mileage').val('19');
    return false;
  },

  onSubiClick: function(e) {
    this.$('.drive-mileage').val('23');
    return false;
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
          self.model.fetch();
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