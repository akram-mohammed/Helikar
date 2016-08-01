function plotScatterData(plotData){

  d3.selectAll("svg > *").remove();

  var logdata = plotData.logdata;
  alert(logdata);

  // logdata = '[{"X":"100","Y":"300"},{"X":"100","Y":"200"},{"X":"250","Y":"250"}]'
  logdata = JSON.parse(logdata);

  var data = plotData.scatterdata;
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

  var line = d3.svg.line()
	.x(function(d) { return x(d.X); } )
	.y(function(d) { return y(d.Y); } );

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

  // group that will contain all of the plots
  var groups = svg.append("g").attr("transform", "translate(" + margin.l + "," + margin.t + ")");

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
      r: function(d) { return 4;},
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

    // skip this functionality for IE9, which doesn't like it
    var matched, browser;
    jQuery.uaMatch = function( ua ) {
      ua = ua.toLowerCase();

      var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
          /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
          /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
          /(msie) ([\w.]+)/.exec( ua ) ||
          ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
          [];

      return {
          browser: match[ 1 ] || "",
          version: match[ 2 ] || "0"
      };
    };

    matched = jQuery.uaMatch( navigator.userAgent );
    browser = {};

    if ( matched.browser ) {
      browser[ matched.browser ] = true;
      browser.version = matched.version;
    }

    // Chrome is Webkit, but Webkit is also Safari.
    if ( browser.chrome ) {
      browser.webkit = true;
    } else if ( browser.webkit ) {
      browser.safari = true;
    }

    jQuery.browser = browser;

    if (!browser.msie) {
      circle.moveToFront();
      }
  };
  // what happens when we leave a bubble?
  var mouseOff = function() {
    var circle = d3.select(this);

    // console.log(circle.attr("id"));

    // go back to original size and opacity
    if(circle.attr("id") == "center"){
      circle.transition()
      .duration(800).style("opacity", 0.8)
      .attr("r", 8).ease("elastic");
    }
    else{
      circle.transition()
      .duration(800).style("opacity", 0.8)
      .attr("r", 4.5).ease("elastic");
    }

    // fade out guide lines, then remove them
    d3.selectAll(".guide").transition().duration(100).styleTween("opacity",
            function() { return d3.interpolate(0.8, 0); })
      .remove()
  };

  // run the mouseon/out functions
  circles.on("mouseover", mouseOn);
  circles.on("mouseout", mouseOff);

  // // tooltips (using jQuery plugin tipsy)
  // circles.append("title")
  //     .text(function(d) { return d.description; })

  $(".circles").tipsy({ gravity: 's', });

  // draw axes and axis labels
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(" + margin.l + "," + (h - 60 + margin.t) + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + margin.l + "," + margin.t + ")")
    .call(yAxis);

  svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", w + 50)
    .attr("y", h - margin.t - 5)
    .text("x-coordinate");

  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", -20)
    .attr("y", 45)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("y-coordinate");


  svg.append("path")
      .datum(logdata)
      .attr("transform", "translate(" + margin.l + "," + margin.t + ")")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", "1.5px")
      .attr("d", line);
}
