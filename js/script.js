// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation().ready(function() {

  var draftdata = {};

  $.getJSON( '../json/data/mlb_draft_rounds.json' ).done(function( data ) {
    draftdata = data;
    drawchart("1999", data);
  });

  function drawchart(year, data) {
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
        li += item.name.replace(' (minors)','');
        li += item.war ? "</b>" : "";
        li += " (" + item.team + ", " + item.round + ")";
        li += "<strong>" + item.war + "</strong></li>"
        players.push( li );
        // chart preparation
        overallpickdata.push(item.overall_pick);
        wardata.push(item.war ? item.war : 0);
        namedata.push(item.name.replace(' (minors)',''));
      }
    });

    //update the list
    $( "<ol/>", {
      "class": "my-new-list",
      html: players.join( "" )
    }).appendTo( ".js-player-list" );
    
    // chartist chart
    new Chartist.Line('.ct-chart', {
      labels: overallpickdata,
      series: [
        {
          name: 'WAR',
          data: wardata
        }
      ]
    },
    {showLine: false});

     // creating tool tips -- out of box
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
    $('.js-chart, .js-player-list').empty();
    drawchart(event.currentTarget.value, draftdata);
  });

 
});