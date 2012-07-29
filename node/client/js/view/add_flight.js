window.co2.view.AddFlightView = Backbone.View.extend({
  _addFlightFormTemplate: '#template-add-flight',

  events: {
    'click button': 'onSubmitClick'
  },

  onSubmitClick: function() {
    var arriving = this.$('.flight-arriving').data('selected'),
      departing = this.$('.flight-departing').data('selected');

    this.collection.fetch({
      data: {
        arriving: arriving,
        departing: departing
      }
    });
  },

  initialize: function() {
    var self = this;
    this.collection.on('reset', function(collection) {
      var co2Model = collection.findDefault();
      var event = new co2.object.Co2Event({
        category: 'flight',
        cost: co2Model.get('value'),
        date: new Date(this.$('.flight-date').val())
      });
      event.save({
        error: function() {
          alert('error saving... :(');
        },
        success: function() {
          self.render();
        }
      });
    }, this);

    // Initialize templates
    this._addFlightFormTemplate = Handlebars.compile($(this._addFlightFormTemplate).html());

    this.render();
  },

  render: function() {
    this.$el.html(this._addFlightFormTemplate());

    var options = {
      serviceUrl: '/flights',
      width: 250,
      delimiter: /(,|;)\s*/,
      deferRequestBy: 10, //miliseconds
      noCache: true
    };

    var $arriving = this.$('.flight-arriving'),
      $departing = this.$('.flight-departing'),
      $date = this.$('.flight-date');

    $arriving.autocomplete(_.extend({
      onSelect: function(value, key) {
        $arriving.data('selected', key);
      }
    }, options));
    $departing.autocomplete(_.extend({
      onSelect: function(value, key) {
        $departing.data('selected', key);
      }
    }, options));
    $date.datepicker();
  }
});