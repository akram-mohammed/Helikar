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

function plotStandard(plotData) {
	data = plotData.dataJSON;
	type = plotData.type;
	var_x = plotData.var_x;
	var_y = plotData.var_y;
	var_g = plotData.var_g;
	x_name = plotData.x_name;
	y_name = plotData.y_name;
	slope = plotData.slope;
	intercept = plotData.intercept;

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
