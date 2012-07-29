co2.object.Co2Stat = Parse.Object.extend("Co2Stat", {

  // Attributes:
  //   daily: Object, cost per day
  //   monthly: Object, cost per month
  //   yearly: Object, cost per year
  //   lifetime: Object
  initialize: function(attrs) {
    if (this.isNew()) {
      var now = moment(new Date());
      if (!attrs.daily) {
        attrs.daily[now.format("YYYY-MM-DD")] = 0;
      }
      if (!attrs.monthly) {
        attrs.monthly[now.format("YYYY-MM")] = 0;
      }
      if (!attrs.yearly) {
        attrs.yearly[now.format("YYYY-MM")] = 0;
      }
      if (!attrs.lifetime) {
        attrs.lifetime = 0;
      }
    }
  }
}):
