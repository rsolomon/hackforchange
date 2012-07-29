window.co2.view.AppView = Backbone.View.extend({
  el: "#carbonizer",

  initialize: function() {
    var statsView = new co2.view.StatsView({
      el: "#stats"
    });

    var intervalStatsView = new co2.view.IntervalStatsView({
      el: "#interval-stats"
    });

    var addInfoView = new co2.view.AddInfoView({
      el: '#add-info'
    });

    var recentEventsView = new co2.view.RecentEventsView();
    this.render();
  },

  render: function() {
    this.$el.show();
  },
});
