var plotsData = [], plotsId = 1;

function addNewPlot(type, data){

  var time = new Date();
  time = time.toLocaleString();

  plotsData.unshift({
    'id': plotsId,
    'type': type,
    'data': data,
    'time': time
  });

  plotsId = plotsId + 1;
}

function plotDashboard(plotType, plotData){

  switch (plotType) {
    case 'Dendogram':
      plotDendogram(plotData);
      break;

    case 'K-means clustering':
      plotKMeans(plotData);
      break;

    case 'Scatter Matrix':
      plotScatterMatrix(plotData);
      break;

    case 'Q-Q plot':
      plotQQ(plotData);
      break;

    case 'Simple Bar Plot':
      plotSimpleBar(plotData);
      break;

    case 'Group Bar Plot':
      plotGroupBar(plotData);
      break;

    case 'Stack Bar Plot':
      plotStackBar(plotData);
      break;

    case 'Heatmap':
      comatrixPlot(plotData);
      break;

    case 'Line Plot':
      plotStandard(plotData);
      break;

    case 'Linear Regression':
      plotStandard(plotData);
      break;

    case 'Histogram':
      plotHist(plotData);
      break;

  }
}

function getDashboardOptionIds(){
  var result = plotsData.map(function(a) {return a.id;});
  return(result);
}

function getDashboardOptionType(){
  var result = plotsData.map(function(a) {return a.type;});
  return(result);
}

function getDashboardOptionData(){
  var result = plotsData.map(function(a) {return a.data;});
  return(result);
}

function getDashboardOptionTime(){
  var result = plotsData.map(function(a) {return a.time;});
  return(result);
}
