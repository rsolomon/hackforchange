co2.view.IntervalStatsView = Backbone.View.extend({
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'],

  initialize: function() {
    var self = this;
    var stats = Parse.User.current().get('stats').fetch({
      success: function(statsModel) {
        var ticks = [],
          totals = [];

        _.each(_.keys(statsModel.get('monthly')), function(date) {
         // alert(date);
          var month = self.months[parseInt(date.substr(5), 10) - 1];
          //alert(parseInt(date.substr(5), 10))
          ticks.push(month);
          totals.push(statsModel.get('monthly')[date]);
          //alert(totals[0]);


          // Can specify a custom tick Array.
          // Ticks should match up one for each y value (category) in the series.
          //var ticks = ['May', 'June', 'July', 'August'];


          //alert(month);
        });

        //var ser
        window.plot1 = $.jqplot('line-graph', [totals], {
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