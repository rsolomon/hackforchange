co2.view.StatsView = Backbone.View.extend({
  initialize: function() {
    this.model.on('change', function(statsModel) {
      $('#pie4').html('');
      var driveTotal = 0,
        flightTotal = 0,
        utilityTotal = 0;

      _.each(statsModel.get('yearly'), function(tObj, year) {
        driveTotal += tObj['drive'] ? tObj['drive'] : 0;
        flightTotal += tObj['flight'] ? tObj['flight'] : 0;
        utilityTotal += tObj['utils'] ? tObj['utils'] : 0;
      });

      var plot4 = $.jqplot('pie4', [[["Driving",driveTotal],["Flights", flightTotal],["Utilities",utilityTotal]]], {
        seriesDefaults:{
          renderer:$.jqplot.PieRenderer,
          rendererOptions:{ sliceMargin: 0, showDataLabels: true }
        },
        grid:{borderWidth:0, shadow:false},
        legend:{ show: true }
      });
    });
  }
});