window.co2.view.SignupView = Backbone.View.extend({
  el: "#signup-view",

  signupForm: $("#signup"),
  loginForm: $("#login"),

  events: {
    "submit #login": "login",
    "submit #signup": "signup",
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.show();
  },

  login: function() {
    var self = this, loginData =  self.loginForm.formParams();
    Parse.User.logIn(loginData.email, loginData.password, {
      success: function(user) {
        self.loginForm[0].reset();
        co2.appRouter.navigate("app", { trigger: true });
      },
      error: function(user, error) {
        console.log("error " + error);
      }
    });
    return false;
  },

  signup: function() {
    var self = this, signupData = self.signupForm.formParams(),
      user = new Parse.User();
    signupData.username = signupData.email;
    user.set(signupData);
    user.signUp(null, {
      success: function(user) {
        self.signupForm[0].reset();
        co2.appRouter.navigate("app", { trigger: true });
      },
      error: function(user, error) {
        console.dir(user);
        console.dir(error);
      }
    });
    return false;
  }
});
