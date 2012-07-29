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
    var self = this,
      loginData = {
        'email': self.loginForm.find('input[name=email]').val(),
        'password': self.loginForm.find('input[name=password]').val()
      };
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
    var self = this,
      signupData = {
        'name': self.signupForm.find('input[name=name]').val(),
        'password': self.signupForm.find('input[name=password]').val(),
        'email': self.signupForm.find('input[name=email]').val()
      },
      user = new Parse.User();
    signupData.username = signupData.email;
    user.set("username", signupData.email);
    user.set("password", signupData.password);
    user.signUp({
        name: signupData.name,
        stats: new co2.object.Co2Stat()
      }, {
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
