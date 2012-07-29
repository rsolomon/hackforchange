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
        attrs.daily[now.format("YYYY-MM-DD")] = {};
      }
      if (!attrs.monthly) {
        attrs.monthly = {};
        attrs.monthly[now.format("YYYY-MM")] = {};
      }
      if (!attrs.yearly) {
        attrs.yearly = {};
        attrs.yearly[now.format("YYYY-MM")] = {};
      }
      if (!attrs.lifetime) {
        attrs.lifetime = {};
      }
    }
  },

  addCo2Cost: function(event) {
    var self = this, cost = event.get("cost"), date = event.get("date"),
      category = event.get("category"), end = moment(date),
      daily = this.get("daily"), start, diff;
    if (daily) {
      start = _.max(_.keys(daily), function(day) {
        return moment(day, "YYYY-MM-DD").toDate();
      });
      start = moment(start);
      diff = end.diff(start, "days");
      _.times(diff, function(i) {
        self.setCo2CostForDate(moment(start).add("days", i), 0, category);
      });
    }
    self.setCo2CostForDate(end, cost, category);
  },

  setCo2CostForDate: function(now, cost, category) {
    var date = now.format("YYYY-MM-DD"),
      month = now.format("YYYY-MM"),
      year = now.format("YYYY"),
      daily, monthly, yearly, lifetime;
    this._setBucket("daily", date, cost, category);
    this._setBucket("monthly", month, cost, category);
    this._setBucket("yearly", year, cost, category);
    lifetime = this.get("lifetime") || {};
    lifetime[category] = lifetime[category] || 0;
    lifetime[category] = lifetime[category] ? lifetime[category] + cost : cost;
    lifetime.total = lifetime.total ? lifetime.total + cost : cost;
    this.set("lifetime", lifetime);
  },

  _setBucket: function(type, key, cost, category) {
    bucket = this.get(type) || {};
    bucket[key] = bucket[key] || {};
    if (bucket[key][category]) {
      bucket[key][category] = bucket[key][category] + cost;
    } else {
      bucket[key][category] = cost;
    }
    bucket[key].total = bucket[key].total ? bucket[key].total + cost : cost;
    this.set(type, bucket);
  }
}, {
  refreshStats: function(event) {
    co2.stats.addCo2Cost(event);
    co2.stats.save({}, {
      success: function() {
        console.log("success");
      }
    });
  },
  clearMyStats: function(event) {
    co2.stats.set({
      daily: {},
      monthly: {},
      yearly: {},
      lifetime: {}
    });
  }
});
