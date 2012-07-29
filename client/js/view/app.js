window.co2.view.AppView = Backbone.View.extend({
  el: "#carbonizer",

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.show();
  },
});
