co2.router.Router = Backbone.Router.extend({
  routes: {
    "login": "login",
    "logout": "logout",
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
      new Parse.Query("Co2Stat").get(Parse.User.current().get("stats").id, {
        success: function(stats) {
          window.co2.stats = stats;
        }
      });
      co2.appView = new co2.view.AppView();
      if (co2.signUpView) {
        co2.signUpView.$el.hide();
      }
    }
  },

  logout: function() {
    Parse.User.logOut();
    co2.appRouter.navigate("login", { trigger: true });
  }
});
