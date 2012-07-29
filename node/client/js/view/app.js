window.co2.view.AppView = Backbone.View.extend({
  el: "#carbonizer",

  initialize: function() {
    var stats = Parse.User.current().get("stats");
    this.render();

    var statsView = new co2.view.StatsView({
      el: "#stats",
      model: stats
    });

    var intervalStatsView = new co2.view.IntervalStatsView({
      el: "#interval-stats",
      model: stats
    });

    var addInfoView = new co2.view.AddInfoView({
      el: '#add-info',
      model: stats
    });

    stats.fetch();

    var recentEventsView = new co2.view.RecentEventsView();

  },

  render: function() {
    this.$el.show();
  },
});
