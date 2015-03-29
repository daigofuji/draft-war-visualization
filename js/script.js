// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation().ready(function() {

  new Chartist.Line('.ct-chart', {
    labels: ['1', '2', '3', '4', '5', '6'],
    series: [
      {
        name: 'WAR',
        data: [20,28.6,-1.2,34.3,36,9.7,37.6,,4.5,8.8,33.2,14.3,-0.1,0,0.3,2.3,,-0.7,1,,10.1,0.1,24.4,2,15.2,-1.9,2.1,13.2,,-0.6,,-0.1,,-1.3,0.8,3.1,-1.2,,,2.5,,13,,-0.1,8.6,,0.8,-2.7]
      }
    ]
  });
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
});