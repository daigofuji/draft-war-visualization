// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation().ready(function() {

  new Chartist.Line('.ct-chart', {
    labels: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48"],
    series: [
      {
        name: 'WAR',
        data: ["20","28.6","-1.2","34.3","36","9.7","37.6","0","4.5","8.8","33.2","14.3","-0.1","0","0.3","2.3","0","-0.7","1","0","10.1","0.1","24.4","2","15.2","-1.9","2.1","13.2","0","-0.6","0","-0.1","0","-1.3","0.8","3.1","-1.2","0","0","2.5","0","13","0","-0.1","8.6","0","0.8","-2.7"],
        player: ["Justin Upton","Alex Gordon","Jeff Clement","Ryan Zimmerman","Ryan Braun","Ricky Romero","Troy Tulowitzki","Wade Townsend","Mike Pelfrey","Cameron Maybin","Andrew McCutchen","Jay Bruce","Brandon Snyder","Trevor Crowe","Lance Broadway","Chris Volstad","*C.J. Henry","Cesar Carrillo","John Mayberry","Mark Pawelek","Cliff Pennington","*Aaron Thompson","*Jacoby Ellsbury","Brian Bogusevic","Matt Garza","*Craig Hansen","Joey Devine","*Colby Rasmus","*Jacob Marceaux","Tyler Greene","*Matt Torra","*Chaz Roe","*Johnny Drennen","*Ryan Tucker","*Cesar Ramos","*Travis Buck","*Trevor Bell","*Eli Iorg","*Hank Sanchez","*Luke Hochevar","*Beau Jones","*Clay Buchholz","*Mark McCormick","*Sean West","*Jed Lowrie","*Tyler Herron","*Michael Bowden","*Garrett Olson"]
      }
    ]
  },
  {showLine: false});
  var $chart = $('.ct-chart');
  var $toolTip = $chart
    .append('<div class="tooltip"></div>')
    .find('.tooltip')
    .hide();
  $chart.on('mouseenter', '.ct-point', function() {
    var $point = $(this),
      value = $point.attr('ct:value'),
      seriesName = $point.parent().attr('ct:series-name');
      console.log($point)
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