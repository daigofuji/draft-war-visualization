// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation().ready(function() {

  var draftdata = {};

  $.getJSON( 'json/data/mlb_draft_rounds.json' ).done(function( data ) {
    draftdata = data;
    drawchart("1999", data);
  });

  function drawchart(year, data) {
    $('.js-chart, .js-player-list').empty();
    var overallpickdata = [],
      wardata = [],
      namedata = [],
      players = [];

    // update title
    $('.js-title-year').text(year);
    // process data
    $.each( data, function( i, item ) {
      if(item.year === year) {
        console.log(item.name.replace(' (minors)',''), item.war);
        // list preparation
        var li = "<li class='player" + i + "'>";
        li += item.pos + " ";
        li += item.war ? "<b>" : "";
        li += item.name.replace(' (minors)','').replace('*','');
        li += item.war ? "</b>" : "";
        li += " (" + item.team + " - " + item.round + ")";
        li += "<strong>" + item.war + "</strong></li>";
        players.push( li );
        // chart preparation
        overallpickdata.push(item.overall_pick);
        wardata.push(item.war ? item.war : 0);
        namedata.push(item.name.replace(' (minors)',''));
      }
    });

    //update the list
    $( "<ol/>", {
      "class": "draft-list",
      html: players.join( "" )
    }).appendTo( ".js-player-list" );
    
    // chartist chart
    new Chartist.Line('.ct-chart',
    {
      //data
      labels: overallpickdata,
      series: [
        {
          name: 'WAR',
          data: wardata
        }
      ]
    },
    {
      //options
      showLine: false,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return (index + 1) % 50 === 0 ? value : null;
        }
      }
    },
    [
      //responsive options
      ['screen and (min-width: 800px)', {
        axisX: {
          labelInterpolationFnc: function(value, index) {
            return (index + 1) % 20 === 0 ? value : null;
          }
        }
      }]
    ]);

     // creating tool tips -- out of box 
     // http://gionkunz.github.io/chartist-js/examples.html
    var $chart = $('.ct-chart');
    var $toolTip = $chart
      .append('<div class="tooltip"></div>')
      .find('.tooltip')
      .hide();
    $chart.on('mouseenter', '.ct-point', function() {
      var $point = $(this),
        value = $point.attr('ct:value'),
        seriesName = $point.parent().attr('ct:series-name');
      $toolTip.html(seriesName + '<br>' + value).show();
    });
    $chart.on('mouseleave', '.ct-point', function() {
      $toolTip.hide();
    });
    $chart.on('mousemove', function(event) {
      $toolTip.css({
        left: (event.offsetX || event.originalEvent.layerX) - $toolTip.width() / 2 - 10,
        top: (event.offsetY || event.originalEvent.layerY) - $toolTip.height() - 40
      });
    });
  }

  // Drop down to redraw the chart
  $('.js-dropdown').change(function(event) {
    console.log(event.currentTarget.value);
    drawchart(event.currentTarget.value, draftdata);
  });

 
});