co2.view.IntervalStatsView = Backbone.View.extend({
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'],

  initialize: function() {
    var self = this;
    var stats = Parse.User.current().get('stats').fetch({
      success: function(statsModel) {
        var ticks = [],
          driveTotals = [],
          flightTotals = [],
          utilityTotals = [],
          overallTotals = [];

        _.each(statsModel.get('monthly'), function(tObj, date) {
          ticks.push(self.months[parseInt(date.substr(5), 10) - 1]);
          driveTotals.push(tObj['drive'] ? tObj['drive'] : 0);
          flightTotals.push(tObj['flight'] ? tObj['flight'] : 0);
          utilityTotals.push(tObj['utils'] ? tObj['utils'] : 0);
          overallTotals.push(tObj['total'] ? tObj['total'] : 0);
        });

        //var ser
        window.plot1 = $.jqplot('line-graph', [driveTotals, flightTotals, utilityTotals, overallTotals], {
          // The "seriesDefaults" option is an options object that will
          // be applied to all series in the chart.
          seriesDefaults:{
            renderer:$.jqplot.BarRenderer,
            rendererOptions: {fillToZero: true}
          },
          // Custom labels for the series are specified with the "label"
          // option on the series option.  Here a series option object
          // is specified for each series.
          series:[
            {label:'Driving emissions'},
            {label:'Flight emissions'},
            {label:'Utility emissions'},
            {label:'Total emissions'}
          ],
          // Show the legend and put it outside the grid, but inside the
          // plot container, shrinking the grid to accomodate the legend.
          // A value of "outside" would not shrink the grid and allow
          // the legend to overflow the container.
          legend: {
            show: true,
            placement: 'outsideGrid'
          },
          axes: {
            // Use a category axis on the x axis and use our custom ticks.
            xaxis: {
              renderer: $.jqplot.CategoryAxisRenderer,
              ticks: ticks
            },
            // Pad the y axis just a little so bars can get close to, but
            // not touch, the grid boundaries.  1.2 is the default padding.
            yaxis: {
              pad: 1.05,
              tickOptions: {formatString: '%.1f%n'}
            }
          }
        });
      }
    });
  }
});