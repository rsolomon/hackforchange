co2.view.StatsView = Backbone.View.extend({
  initialize: function() {
    var stats = Parse.User.current().get('stats').fetch({
      success: function(attrs) {
        var plot4 = $.jqplot('pie4', [[["a",1],["b",1],["c",1]]], {
          seriesDefaults:{
            renderer:$.jqplot.PieRenderer,
            rendererOptions:{ sliceMargin: 0 }
          },
          grid:{borderWidth:0, shadow:false},
          legend:{ show: true }
        });

        //debugger;
      }
    });
    //debugger;


  }
});