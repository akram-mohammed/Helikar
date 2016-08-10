/*
 *	Contains all the plot functions
 *	MASSIVE TODO: reorganise the variables into SOME consistent system
 */
function makePlot(obj, props) {


	// read.csv
	ocpu.seturl("//public.opencpu.org/ocpu/library/utils/R");

	// plot
	if(obj) {
		var hot = obj.props.data_table;
		var type = obj.props.plot_type;
		var props = obj.props;
		var dataJSON = JSON.stringify(hot.getData());
		var reg = type === "regression";
	}
	else {
		var dataJSON = JSON.stringify(props.data);
		var type = props.type;
	}

	if (type === "urlData") {
		$.ajax({
			url: props.url,
			type: 'GET',
			dataType: "json",
			success: getUrlData
	});

	function getUrlData(data){
		dataJSON = JSON.stringify(data);
		alert(dataJSON);
	}

	}

	if(type === "regression") type = "scatterChart";

	/*
	 *	Testing NVD3
	 */

	var nvdata = [{key: "Data", values: JSON.parse(dataJSON)}];

	/*
	 *	Slope/intercept
	 */

	ocpu.seturl("//public.opencpu.org/ocpu/library/stats/R");

	if(type === "lineChart" || type === "scatterChart") {

		ocpu.seturl("//public.opencpu.org/ocpu/library/stats/R");

		if(reg === true) {
			var slope, intercept;

			var req = ocpu.call("lm", {
				formula: new ocpu.Snippet(props.var_y + " ~ " + props.var_x),
				data: new ocpu.Snippet("jsonlite::fromJSON('" + dataJSON + "')")
			}, function (session) {
				session.getObject(null, {force: true}, function (obj) {
					intercept = obj.coefficients[0];
					slope = obj.coefficients[1];
					plotStandard(dataJSON, type, props.var_x, props.var_y, props.var_g, props.x_name, props.y_name, slope, intercept);
				});
			});
		}
		else {
			plotStandard(dataJSON, type, props.var_x, props.var_y, props.var_g, props.x_name, props.y_name);
		}
	}

	if (type === "plotDendogram") {

		ocpu.seturl("//public.opencpu.org/ocpu/github/shubhamkmr47/Helikar/R");

		var data = dataJSON;

		var req = ocpu.rpc("dendogram", {data: data}, function(output){
        var dendogramData = output.message;
				addNewPlot('Dendogram', dendogramData);
				plotDendogram(dendogramData);
      });

			//if R returns an error, alert the error message
      req.fail(function(){
        alert("Server error: " + req.responseText);
      });
	}

	if (type === "plotKMeans") {

		var var_x = props.var_x, var_y = props.var_y, kvalue = props.kvalue;

		ocpu.seturl("//public.opencpu.org/ocpu/github/shubhamkmr47/Helikar/R");

		var data = dataJSON, plotData = {};
		plotData.kvalue = kvalue;

		var req = ocpu.rpc("kmeansCluster", {data: data, var_x: var_x, var_y: var_y, kvalue: kvalue}, function(output){
				var kmeansData = output.message;
				plotData.kmeansData = kmeansData;
				addNewPlot('K-means clustering', plotData);
				plotKMeans(plotData);
			});

			//if R returns an error, alert the error message
			req.fail(function(){
				alert("Server error: " + req.responseText);
			});
	}

	if (type === "plotScatterMatrix") {

		ocpu.seturl("//public.opencpu.org/ocpu/github/shubhamkmr47/Helikar/R");

		var data = dataJSON;

		var req = ocpu.rpc("scatterMatrix", {data: data}, function(output){
				var scatterMatrixData = output.message;
				addNewPlot('Scatter Matrix', scatterMatrixData);
				plotScatterMatrix(scatterMatrixData);
			});

			//if R returns an error, alert the error message
			req.fail(function(){
				alert("Server error: " + req.responseText);
			});
	}

	if (type === "plotQQ") {

	var var_x = props.var_x, var_y = props.var_y;

		ocpu.seturl("//public.opencpu.org/ocpu/github/shubhamkmr47/Helikar/R");

		var data = dataJSON, plotData = {};

		var req = ocpu.rpc("q_qplot", {data: data, var_x: var_x, var_y}, function(output){
				 	plotData.qqdata = output.qqdata;
					plotData.linedata = output.linedata;
					addNewPlot('Q-Q plot', plotData);
					plotQQ(plotData);
			});

			//if R returns an error, alert the error message
			req.fail(function(){
				alert("Server error: " + req.responseText);
			});
	}

	if (type === "plotTimeSeries") {

		ocpu.seturl("//public.opencpu.org/ocpu/github/shubhamkmr47/Helikar/R");

		var data = dataJSON;

		var req = ocpu.rpc("timeSeries", {data: data}, function(output){
				var timeSeriesData = output.message;
				var count = output.count;
				addNewPlot('Time Series', timeSeriesData);
				plotTimeSeries(timeSeriesData, count);
			});

			//if R returns an error, alert the error message
			req.fail(function(){
				alert("Server error: " + req.responseText);
			});
	}

	if (type === "plotComatrix") {

		ocpu.seturl("//public.opencpu.org/ocpu/github/shubhamkmr47/Helikar/R");

		var method = props.comatrix;
		var data = dataJSON;

		var req = ocpu.rpc("comatrix",
											{	data: data,
												method: method
											}, function(output){
				var comatrixData = output.message;
				addNewPlot(method, comatrixData);
				comatrixPlot(comatrixData);
			});

			//if R returns an error, alert the error message
			req.fail(function(){
				alert("Server error: " + req.responseText);
			});
	}

	if (type == "plotBarChart") {
		if (props.simple_bool) {

			ocpu.seturl("//public.opencpu.org/ocpu/github/shubhamkmr47/Helikar/R");

			var data = dataJSON, value = props.var_x, plotData = {};

			var req = ocpu.rpc("simpleBar", {data: data, value: value}, function(output){
					var simpleBarPlotData = output.message;
					plotData.data = simpleBarPlotData;
					plotData.value = value;
					addNewPlot('Simple Bar Plot', plotData);
					plotSimpleBar(plotData);
				});

				//if R returns an error, alert the error message
				req.fail(function(){
					alert("Server error: " + req.responseText);
				});
		}
		if (props.group_bool) {

			ocpu.seturl("//public.opencpu.org/ocpu/github/shubhamkmr47/Helikar/R");

			var data = dataJSON;

			var req = ocpu.rpc("groupBar", {data: data}, function(output){
					var groupBarPlotData = output.message;
						addNewPlot('Group Bar Plot', groupBarPlotData);
						plotGroupBar(groupBarPlotData);
				});

				//if R returns an error, alert the error message
				req.fail(function(){
					alert("Server error: " + req.responseText);
				});
		}
		if (props.stack_bool) {

			ocpu.seturl("//public.opencpu.org/ocpu/github/shubhamkmr47/Helikar/R");

			var data = dataJSON;

			var req = ocpu.rpc("groupBar", {data: data}, function(output){
					var stackBarPlotData = output.message;
					addNewPlot('Stack Bar Plot', stackBarPlotData);
					plotStackBar(stackBarPlotData);
				});

				//if R returns an error, alert the error message
				req.fail(function(){
					alert("Server error: " + req.responseText);
				});
		}
	}

	if (type == "plotScatterPlot") {
		var var_x = props.var_x, var_y = props.var_y, straight_bool = props.straight_bool, exponential_bool = props.exponential_bool, polynomial_bool = props.polynomial_bool, logarithmic_bool = props.logarithmic_bool;
		ocpu.seturl("//public.opencpu.org/ocpu/github/shubhamkmr47/Helikar/R");
		var data = dataJSON, plotData = {};

		var req = ocpu.rpc("scatterplot", {data: data, var_x: var_x, var_y: var_y}, function(output){
			plotData.scatterdata = output.scatterdata;
			plotData.lindata = output.lindata;
			plotData.expdata = output.expdata;
			plotData.logdata = output.logdata;
			plotData.poldata = output.poldata;
			plotData.straight_bool = straight_bool;
			plotData.exponential_bool = exponential_bool;
			plotData.polynomial_bool = polynomial_bool;
			plotData.logarithmic_bool = logarithmic_bool;
			plotData.label_x = var_x;
			plotData.label_y = var_y;
			addNewPlot('Scatter Plot', plotData);
			plotScatterData(plotData);
			});

			//if R returns an error, alert the error message
			req.fail(function(){
				alert("Server error: " + req.responseText);
			});
	}

	if (type == "plotHeatmap") {
		ocpu.seturl("http://localhost/ocpu/github/shubhamkmr47/Helikar/R");

		var data = dataJSON, plotData = {};

		var req = ocpu.rpc("heat_map", {data: data}, function(output){
				plotData.message = output.message;
				addNewPlot('Heatmap', plotData.message);
				plotHeatmap(plotData.message);
			});

			//if R returns an error, alert the error message
			req.fail(function(){
				alert("Server error: " + req.responseText);
			});
	}

	if(type === "discreteBarChart")
		plotBar(dataJSON, type, props.var_x, props.var_y);

	if(type === "histogram")
		plotHist(dataJSON, props.var_x, props.var_g);

	if(type === "boxChart")
		plotBox(dataJSON, type, props.var_g, props.var_x, props.x_name, props.y_name);

	/*
	 *	Done testing
	 */

}

function plotHist(array, var_x, var_g) {

	data = JSON.parse(array);
	// console.log(data);
	elems = data.map(function (x) {
		return x[var_x];
	});
	// console.log(elems);
	// console.log(var_g);
	ocpu.seturl("//public.opencpu.org/ocpu/library/graphics/R");
	ocpu.call("hist", {
		x: elems,
		plot: new ocpu.Snippet("FALSE"),
		breaks: Number(var_g) || "Sturges"
	}, function (session) {
		session.getObject(null, {force: true}, function (obj) {
			vals = [];
			mids = obj["mids"];
			counts = obj["counts"];
			mids.forEach(function (d, n) {
				vals.push({"label": d, "value": counts[n]});
			})
			out = [{'key': 'out', 'values': vals}];
			// console.log(out);

			d3.selectAll("svg > *").remove();

		 	nv.addGraph(function() {

				var chart = nv.models.discreteBarChart()
				.x(function(d) { return d.label })    //Specify the data accessors.
				.y(function(d) { return d.value })
				.color(d3.scale.category10().range())
				;

				chart.yAxis.tickFormat(d3.format(',.0d'));

				d3.select('#plot-panel')
				.datum(out)
				.call(chart);

				nv.utils.windowResize(chart.update);

				return chart;
			}.bind(this));
		}.bind(this))
	}.bind(this))
}

function plotBar(array, type, var_x, var_y) {

	data = JSON.parse(array);

	vals = [];
	obj = {};
	data.forEach(function (d) {
		vals.push({"x" : d[var_y], "y": d[var_x]});
	});

	out = [{'key': 'out', 'values': vals}];

	d3.selectAll("svg > *").remove();

 	nv.addGraph(function() {

		var chart = nv.models[type]()
		.x(function(d) { return d.label })    //Specify the data accessors.
		.y(function(d) { return d.value })
		.color(d3.scale.category10().range())
		;

		d3.select('#plot-panel')
		.datum(out)
		.call(chart);

		nv.utils.windowResize(chart.update);

		return chart;
	}.bind(this));
}

/*
 *  NVD3 data format:
 *     [{key: "group_name", values: [group_elements]}, ...]
 */

function buildData(array, group, slope, intercept) {

    if(!group) {
        return [{key: "Data", values: JSON.parse(array), slope: slope, intercept: intercept}];
    }

    var data = JSON.parse(array);
    var out = [];
    var obj = {}
    data.forEach(function (d) {
        (obj[d[group]] = obj[d[group]] ? obj[d[group]] : []).push(d);
    });

    Object.keys(obj).forEach(function (o) {
        if(o != "null") {
            temp = {key: o, values: obj[o], slope: slope, intercept: intercept};
            out.push(temp);
        }
    });

    return out;
}


function plotStandard(data, type, var_x, var_y, var_g, x_name, y_name, slope, intercept) {
	var myData = buildData(data, var_g, slope, intercept);

	d3.selectAll("svg > *").remove();

 	nv.addGraph(function() {

		var chart = nv.models[type]()
			.x(function(d) { return d[var_x] })    //Specify the data accessors.
			.y(function(d) { return d[var_y] })
			.color(d3.scale.category10().range())
			;

		chart.xAxis.axisLabel(x_name || var_x);
		chart.yAxis.axisLabel(y_name || var_y);

		d3.select('#plot-panel')
			.datum(myData)
			.call(chart);

		nv.utils.windowResize(chart.update);

		return chart;

	}.bind(this));
}

function realBox(myData, x_name, y_name) {

	d3.selectAll("svg > *").remove();

	nv.addGraph(function() {

		var chart = nv.models.boxPlotChart()
		.x(function(d) { return d.label })    //Specify the data accessors.
		.y(function(d) { return d.values.Q3 })
		.maxBoxWidth(75)
		.staggerLabels(true)
		;

		chart.xAxis.axisLabel(x_name);
		chart.yAxis.axisLabel(y_name);

		d3.select('#plot-panel')
		.datum(myData)
		.call(chart);

		nv.utils.windowResize(chart.update);
		
		return chart;
	});

}

function plotBox(data, type, var_x, var_y, x_name, y_name) {
	ocpu.seturl("//public.opencpu.org/ocpu/library/stats/R");

	process = [], keys = [];
	var myData = [];

	data = JSON.parse(data);
	categories = _.uniq(data.map(function (d) {
		return d[var_x]
	}));

	categories.forEach(function (x) {
		now = data.filter(function(d) {
			return d[var_x] === x;
		}).map(function(y) {
			return y[var_y]
		});

		if(now[0] !== null)
			process.push({label: x, values: now});
	});

	_.initial(process).forEach(function (p) {
		ocpu.call("quantile", {
			x: p.values
		}, function (session) {
			session.getObject(function(out) {
				d = {
					Q1: out[1],
					Q2: out[2],
					Q3: out[3],
					whisker_low: out[0],
					whisker_high: out[4],
					outliers: []
				};
				p.values = d;
				myData.push(p);
			});
		});
	});

	var last = _.last(process);

	ocpu.call("quantile", {
		x: last.values
	}, function (session) {
		session.getObject(function(out) {
			d = {
				Q1: out[1],
				Q2: out[2],
				Q3: out[3],
				whisker_low: out[0],
				whisker_high: out[4],
				outliers: []
			};
			last.values = d;
			myData.push(last);

			realBox(myData, x_name, y_name);
		});
	});
}

function plotHierarchical(obj) {

	var data = document.getElementById('plot-panel').innerHTML;
	root = JSON.parse(data);

	var width = 640,
	height = 480;

	var cluster = d3.layout.cluster()
	.size([height - 50, width - 160]);

	var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.y, d.x]; });

	var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
	.attr("transform", "translate(40,0)");


	var nodes = cluster.nodes(root),
	links = cluster.links(nodes);

	var link = svg.selectAll(".link")
	.data(links)
	.enter().append("path")
	.attr("class", "link")
	.attr("d", diagonal);

	var node = svg.selectAll(".node")
	.data(nodes)
	.enter().append("g")
	.attr("class", "node")
	.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

	node.append("circle")
	.attr("r", 4.5);

	node.append("text")
	.attr("dx", function(d) { return d.children ? 8 : 8; })
	.attr("dy", function(d) { return d.children ? 20 : 4; })
	.style("text-anchor", function(d) { return d.children ? "end" : "start"; })
	.text(function(d) { return d.name; });


	d3.select(self.frameElement).style("height", height + "px");
}
