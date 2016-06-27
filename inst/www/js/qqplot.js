function plotQQ(data){

  d3.selectAll("svg > *").remove();

  data = JSON.parse(data);

  // set the stage
  var margin = {t:30, r:20, b:20, l:40 },
    w = $(document).width() - margin.l - margin.r,
    h = 500 - margin.t - margin.b,
    x = d3.scale.linear().range([0, w]),
    y = d3.scale.linear().range([h - 60, 0]),
    //colors that will reflect geographical regions
    color = d3.scale.category10();

  var svg = d3.select("#plot-panel").append("svg")
    .attr("width", w + margin.l + margin.r)
    .attr("height", h + margin.t + margin.b);

  // set axes, as well as details on their ticks
  var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(20)
    .tickSubdivide(true)
    .tickSize(6, 3, 0)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .ticks(20)
    .tickSubdivide(true)
    .tickSize(6, 3, 0)
    .orient("left");

  // sort data alphabetically by region, so that the colors match with legend
  //data.sort(function(a, b) { return d3.ascending(a.region, b.region); })

  var max_X = d3.max(data, function(d) { return +d.X;} );
  var min_X = d3.min(data, function(d) { return +d.X;} );
  var max_Y = d3.max(data, function(d) { return +d.Y;} );
  var min_Y = d3.min(data, function(d) { return +d.Y;} );

  var x0 = Math.max(-d3.min(data, function(d) { return d.trust; }), d3.max(data, function(d) { return d.trust; }));
  x.domain([min_X, max_X]);
  y.domain([min_Y, max_Y]);

  // style the circles, set their locations based on data
  var circles =
  groups.selectAll("circle")
    .data(data)
    .enter().append("circle")
    .attr("class", "circles")
    .attr({
      cx: function(d) { return x(+d.X); },
      cy: function(d) { return y(+d.Y); },
      r: function(d)  { return 4;},
    })
    .style("fill", function(d) { return color(d.cl); });

  // what to do when we mouse over a bubble
  var mouseOn = function() {
    var circle = d3.select(this);

  // transition to increase size/opacity of bubble
    circle.transition()
    .duration(800).style("opacity", 1)
    .attr("r", 16).ease("elastic");

    // append lines to bubbles that will be used to show the precise data points.
    // translate their location based on margins
    svg.append("g")
      .attr("class", "guide")
    .append("line")
      .attr("x1", circle.attr("cx"))
      .attr("x2", circle.attr("cx"))
      .attr("y1", +circle.attr("cy") + 26)
      .attr("y2", h - margin.t - margin.b)
      .attr("transform", "translate(40,20)")
      .style("stroke", circle.style("fill"))
      .transition().delay(200).duration(400).styleTween("opacity",
            function() { return d3.interpolate(0, 0.8); })

    svg.append("g")
      .attr("class", "guide")
    .append("line")
      .attr("x1", +circle.attr("cx") - 16)
      .attr("x2", 0)
      .attr("y1", circle.attr("cy"))
      .attr("y2", circle.attr("cy"))
      .attr("transform", "translate(40,30)")
      .style("stroke", circle.style("fill"))
      .transition().delay(200).duration(400).styleTween("opacity",
            function() { return d3.interpolate(0, 0.8); });

  // function to move mouseover item to front of SVG stage, in case
  // another bubble overlaps it
    d3.selection.prototype.moveToFront = function() {
      return this.each(function() {
      this.parentNode.appendChild(this);
      });
    };
}
