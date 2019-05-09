
(function () {
  d3.dsv(',', 'https://raw.githubusercontent.com/lessthan41/D3_Practice/master/Climate_HW7/toPlot.csv', function (row) {
    return {
      AQI: +row['AQI']
    };
  }).then(function (AQI) {
    for(i=0; i<30; i++){
      AQI[i]['date'] = parseInt(i)+1;
    }

    let dashboard = new DashboardComponent(AQI);
    dashboard.init();
  });
})();
