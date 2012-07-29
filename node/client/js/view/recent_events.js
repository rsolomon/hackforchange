co2.view.RecentEventsView = Backbone.View.extend({
  _recentEventsTemplate: "#template-recent-events",

  el: ("#recent-events"),

  initialize: function() {
    this._recentEventsTemplate = Handlebars.compile($(this._recentEventsTemplate).html());
    var self = this, query = new Parse.Query("Co2Event");
    query.equalTo("parent", Parse.User.current());
    query.limit(5);
    query.descending("date");
    query.find({
      success: function(results) {
        self.events = query.collection(results).toJSON();
        self.render();
      }
    });
  },

  render: function() {
    Handlebars.registerHelper("formatDate", function(item) {
      return moment(new Date(item.iso)).format("ddd, Do YYYY");
    });
    Handlebars.registerHelper("icon", function(category) {
      var cat2icon = {
        "drive": "icon-truck",
        "flight": "icon-plane",
        "fligh": "icon-plane",
        "utils": "icon-bolt",
        "drive": "icon-truck",
      };
      return new Handlebars.SafeString("<i class='" + cat2icon[category] + "'/>");
    });
    this.$el.html(this._recentEventsTemplate({ events: this.events, test: "blah" }));
  }
});
