function plotHist(plotData) {

	array = plotData.dataJSON;
	var_x = plotData.var_x;
	var_g = plotData.var_g;

	data = JSON.parse(array);
	elems = data.map(function (x) {
		return x[var_x];
	});

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
