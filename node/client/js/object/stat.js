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

  addCo2Cost: function(cost) {
    // TODO: do backfill for missing dates
    var now = moment(new Date()),
      date = now.format("YYYY-MM-DD"),
      month = now.format("YYYY-MM"),
      year = now.format("YYYY"),
      daily, monthly, yearly;
    daily = this.get("daily") || {};
    daily[date] = daily[date] ? daily[date] + cost : cost;
    this.set("daily", daily);
    monthly = this.get("monthly") || {};
    monthly[month] = monthly[month] ? monthly[month] + cost : cost;
    this.set("monthly", monthly);
    yearly = this.get("yearly") || {};
    yearly[year] = yearly[year] ? yearly[year] + cost : cost;
    this.set("yearly", yearly);
  }
});
