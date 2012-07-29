co2.router.Router = Backbone.Router.extend({
  routes: {
    "login": "login",
    "app": "app"
  },

  login: function() {
    if (Parse.User.current()) {
      this.navigate("app", { trigger: true });
    } else {
      co2.signUpView = new co2.view.SignupView();
      if (co2.appView) {
        co2.appView.$el.hide();
      }
    }
  },

  app: function() {
    if (!Parse.User.current()) {
      this.navigate("login", { trigger: true });
    } else {
      co2.appView = new co2.view.AppView();
      if (co2.signUpView) {
        co2.signUpView.$el.hide();
      }
    }
  }
});
