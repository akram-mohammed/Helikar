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
					console.log(intercept);
					plotStandard(dataJSON, type, props.var_x, props.var_y, props.var_g, props.x_name, props.y_name, slope, intercept);

				});
			});
		}
		else {
			plotStandard(dataJSON, type, props.var_x, props.var_y, props.var_g, props.x_name, props.y_name);
		}
	}

	if (type === "plotDendogram") {

		ocpu.seturl("http://localhost/ocpu/github/shubhamkmr47/Helikar/R");

		var data = dataJSON;

		var req = ocpu.rpc("dendogram", {data: data}, function(output){
        var dendogramData = output.message;
				plotDendogram(dendogramData);
      });

			//if R returns an error, alert the error message
      req.fail(function(){
        alert("Server error: " + req.responseText);
      });
	}

	if (type === "plotKMeans") {

		ocpu.seturl("http://localhost/ocpu/github/shubhamkmr47/Helikar/R");

		var data = dataJSON;

		var req = ocpu.rpc("kmeansCluster", {data: data}, function(output){
				var kmeansData = output.message;
				plotKMeans(kmeansData)
			});

			//if R returns an error, alert the error message
			req.fail(function(){
				alert("Server error: " + req.responseText);
			});
	}

	if (type === "plotScatterMatrix") {

		ocpu.seturl("http://localhost/ocpu/github/shubhamkmr47/Helikar/R");

		var data = dataJSON;

		var req = ocpu.rpc("scatterMatrix", {data: data}, function(output){
				var scatterMatrixData = output.message;
					plotScatterMatrix(scatterMatrixData);
			});

			//if R returns an error, alert the error message
			req.fail(function(){
				alert("Server error: " + req.responseText);
			});
	}

	if (type === "plotQQ") {

		ocpu.seturl("http://localhost/ocpu/github/shubhamkmr47/Helikar/R");

		var data = dataJSON;

		var req = ocpu.rpc("q_qplot", {data: data}, function(output){
				var qqPlotData = output.message;
					plotQQ(qqPlotData);
			});

			//if R returns an error, alert the error message
			req.fail(function(){
				alert("Server error: " + req.responseText);
			});
	}

	if (type === "plotTimeSeries") {

		ocpu.seturl("http://localhost/ocpu/github/shubhamkmr47/Helikar/R");

		var data = dataJSON;

		//var data = '[{ "date": "19740901", "Ageing": "7", "Aids": "1", "Animal Welfare": "1", "Bird Flu": "", "BSE": "", "Coal Pits": "", "EU": "7", "Countryside": "1", "Crime": "15", "Defence": "5", "Drug Abuse": "4", "Economy": "52", "Education": "13", "Farming": "", "German Reunification": "", "GM foods": "", "Housing": "9", "Inflation/Prices": "14", "Inner Cities": "", "Local Govt": "2", "Low Pay": "6", "Morality": "7", "NHS": "27", "Northern Ireland": "", "Nuclear Power": "", "Nuclear Weapons": "1", "Pensions": "10", "Fuel Prices": "7", "Environment": "3", "The Pound": "1", "Poverty/Inequality": "11", "Privatisation": "1", "Public Services": "6", "Immigration": "29", "Scots/Welsh Assembly": "1", "Taxation": "6", "Trade Unions": "", "Transport": "3", "Tsunami": "", "Unemployment": "28" }, { "date": "19741001", "Ageing": "4", "Aids": "1", "Animal Welfare": "1", "Bird Flu": "", "BSE": "", "Coal Pits": "", "EU": "9", "Countryside": "1", "Crime": "14", "Defence": "9", "Drug Abuse": "4", "Economy": "52", "Education": "14", "Farming": "", "German Reunification": "", "GM foods": "", "Housing": "11", "Inflation/Prices": "13", "Inner Cities": "", "Local Govt": "3", "Low Pay": "8", "Morality": "7", "NHS": "19", "Northern Ireland": "", "Nuclear Power": "", "Nuclear Weapons": "1", "Pensions": "11", "Fuel Prices": "4", "Environment": "4", "The Pound": "1", "Poverty/Inequality": "14", "Privatisation": "1", "Public Services": "5", "Immigration": "26", "Scots/Welsh Assembly": "1", "Taxation": "4", "Trade Unions": "", "Transport": "3", "Tsunami": "", "Unemployment": "27" }, { "date": "19771101", "Ageing": "8", "Aids": "", "Animal Welfare": "1", "Bird Flu": "", "BSE": "", "Coal Pits": "", "EU": "6", "Countryside": "2", "Crime": "18", "Defence": "4", "Drug Abuse": "5", "Economy": "52", "Education": "12", "Farming": "", "German Reunification": "", "GM foods": "", "Housing": "9", "Inflation/Prices": "14", "Inner Cities": "", "Local Govt": "3", "Low Pay": "7", "Morality": "7", "NHS": "21", "Northern Ireland": "", "Nuclear Power": "", "Nuclear Weapons": "1", "Pensions": "10", "Fuel Prices": "4", "Environment": "5", "The Pound": "1", "Poverty/Inequality": "11", "Privatisation": "1", "Public Services": "5", "Immigration": "22", "Scots/Welsh Assembly": "1", "Taxation": "2", "Trade Unions": "", "Transport": "2", "Tsunami": "", "Unemployment": "23" }, { "date": "19780801", "Ageing": "6", "Aids": "", "Animal Welfare": "1", "Bird Flu": "", "BSE": "", "Coal Pits": "", "EU": "6", "Countryside": "1", "Crime": "19", "Defence": "5", "Drug Abuse": "3", "Economy": "55", "Education": "11", "Farming": "", "German Reunification": "", "GM foods": "", "Housing": "11", "Inflation/Prices": "17", "Inner Cities": "", "Local Govt": "3", "Low Pay": "7", "Morality": "7", "NHS": "15", "Northern Ireland": "", "Nuclear Power": "", "Nuclear Weapons": "1", "Pensions": "8", "Fuel Prices": "5", "Environment": "4", "The Pound": "1", "Poverty/Inequality": "13", "Privatisation": "1", "Public Services": "5", "Immigration": "22", "Scots/Welsh Assembly": "1", "Taxation": "4", "Trade Unions": "", "Transport": "2", "Tsunami": "", "Unemployment": "30" }, { "date": "19790201", "Ageing": "6", "Aids": "", "Animal Welfare": "1", "Bird Flu": "", "BSE": "", "Coal Pits": "", "EU": "6", "Countryside": "2", "Crime": "17", "Defence": "6", "Drug Abuse": "3", "Economy": "55", "Education": "14", "Farming": "", "German Reunification": "", "GM foods": "", "Housing": "10", "Inflation/Prices": "16", "Inner Cities": "", "Local Govt": "4", "Low Pay": "8", "Morality": "7", "NHS": "20", "Northern Ireland": "0", "Nuclear Power": "", "Nuclear Weapons": "", "Pensions": "9", "Fuel Prices": "5", "Environment": "5", "The Pound": "1", "Poverty/Inequality": "13", "Privatisation": "1", "Public Services": "4", "Immigration": "19", "Scots/Welsh Assembly": "1", "Taxation": "2", "Trade Unions": "", "Transport": "4", "Tsunami": "", "Unemployment": "33" }]';

		var req = ocpu.rpc("timeSeries", {data: data}, function(output){
				var timeSeriesData = output.message;
				var count = output.count;
				alert(timeSeriesData);
				plotTimeSeries(timeSeriesData, count);
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
	console.log(data);
	elems = data.map(function (x) {
		return x[var_x];
	});
	console.log(elems);
	console.log(var_g);
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
			console.log(out);

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
	console.log(out);

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

	console.log(slope);

    if(!group) {
        return [{key: "Data", values: JSON.parse(array), slope: slope, intercept: intercept}];
    }

    var data = JSON.parse(array);
    var out = [];
    var obj = {}
    data.forEach(function (d) {
        (obj[d[group]] = obj[d[group]] ? obj[d[group]] : []).push(d);
    });

    console.log(obj);

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
    console.log(myData);

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

	console.log(myData);

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

	console.log(process);
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
				console.log(p);
				myData.push(p);
				console.log(myData);
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
			console.log(myData);

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
