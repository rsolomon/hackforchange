co2.object.Co2Event = Parse.Object.extend("Co2Event", {

  // Attributes:
  //   date : Date
  //   cost: number
  //   category: co2.object.Co2Event.Category

  initialize: function(attrs) {
    var user = Parse.User.current();
    this.set("parent", user);
  },

  updateStats: function() {
    var  user = Parse.User.current(),
      stats;
      stats = user.get("stats");
    stats.addCo2Cost(this.get("cost"));
    stats.save({}, {
      success: function() {
        console.log("success");
      }
    });
  }
}, {
  findForUser: function(options) {
    var query = new Parse.Query(co2.object.Co2Event);
    query.equalTo("parent", Parse.User.current());
    query.find({
      success: function(items) {
        options.success(query.collection(items));
      },
      error: options.error
    });
  },
  Category: {
    FLIGHT: "flight",
    CAR: "car",
    PUBLIC_TRANSPORT: "public_transport",
    UTILITY: "utility",
    FOOD: "food"
  }
});
