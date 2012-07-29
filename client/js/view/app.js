window.co2.view.AppView = Backbone.View.extend({
  el: "#carbonizer",
  events: {
    "click .logout": "logout"
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.show();
  },

  logout: function() {
    Parse.User.logOut();
    co2.appRouter.navigate("login", { trigger: true });
  }
});
