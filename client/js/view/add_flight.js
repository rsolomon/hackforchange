window.co2.view.AddFlightView = Backbone.View.extend({
  _addFlightFormTemplate: '#template-add-flight',

  initialize: function() {

    // Initialize templates
    this._addFlightFormTemplate = Handlebars.compile($(this._addFlightFormTemplate).html());

    this.render();
  },

  render: function() {
    this.$el.html(this._addFlightFormTemplate());

    var options = {
      serviceUrl: 'http://localhost:1337/flights',
      width: 384,
      delimiter: /(,|;)\s*/,
      deferRequestBy: 10, //miliseconds
      noCache: true, //set to true, to disable caching
      onSelect: function(name, key) {
        $(this).data('selected', key);
      }
    };
    this.$('input').autocomplete(options);
  }
});