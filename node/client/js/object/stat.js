 co2.object.Co2Stat = Parse.Object.extend("Co2Stat", {

  // Attributes:
  //   daily: Object, cost per day
  //   monthly: Object, cost per month
  //   yearly: Object, cost per year
  //   lifetime: Object
  initialize: function(attrs) {
    var now = moment(new Date()),
      date = now.format("YYYY-MM-DD"),
      month = now.format("YYYY-MM"),
      year = now.format("YYYY");
    attrs = attrs || {};
    if (this.isNew()) {
      if (!attrs.daily) {
        attrs.daily = {};
        attrs.daily[now.format("YYYY-MM-DD")] = 0;
      }
      if (!attrs.monthly) {
        attrs.monthly = {};
        attrs.monthly[now.format("YYYY-MM")] = 0;
      }
      if (!attrs.yearly) {
        attrs.yearly = {};
        attrs.yearly[now.format("YYYY-MM")] = 0;
      }
      if (!attrs.lifetime) {
        attrs.lifetime = 0;
      }
    }
  },

  addCo2Cost: function(cost, date) {
    var self = this, end = moment(date),
      daily = this.get("daily"), start, diff;
    if (daily) {
      start = _.max(_.keys(daily), function(day) {
        return moment(day, "YYYY-MM-DD").toDate();
      });
      start = moment(start);
      diff = end.diff(start, "days");
      _.times(diff, function(i) {
        self.setCo2CostForDate(moment(start).add("days", i), 0);
      });
    }
    self.setCo2CostForDate(end, cost);
  },

  setCo2CostForDate: function(now, cost) {
    var date = now.format("YYYY-MM-DD"),
      month = now.format("YYYY-MM"),
      year = now.format("YYYY"),
      daily, monthly, yearly, lifetime;
    daily = this.get("daily") || {};
    daily[date] = daily[date] ? daily[date] + cost : cost;
    this.set("daily", daily);
    monthly = this.get("monthly") || {};
    monthly[month] = monthly[month] ? monthly[month] + cost : cost;
    this.set("monthly", monthly);
    yearly = this.get("yearly") || {};
    yearly[year] = yearly[year] ? yearly[year] + cost : cost;
    this.set("yearly", yearly);
    lifetime = this.get("lifetime") || 0;
    this.set("lifetime", lifetime + cost);
  }
}, {
  refreshStats: function(cost) {
    co2.stats.addCo2Cost(cost);
    co2.stats.save({}, {
      success: function() {
        console.log("success");
      }
    });
  }
});
