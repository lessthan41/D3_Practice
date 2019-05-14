
(function () {

  d3.dsv(',', 'https://raw.githubusercontent.com/lessthan41/D3_Practice/master/Climate_HW8/toPlotQ1.csv', function (row) {
    return {
      SO2_7: +row['SO2.7.Q1'],
      O3_7: +row['O3.7.Q1'],
      PM25_7: +row['PM2.5.7.Q1'],
      SO2_11: +row['SO2.11.Q1'],
      O3_11: +row['O3.11.Q1'],
      PM25_11: +row['PM2.5.11.Q1']
    };
  }).then(function (AQI) {
    let dashboard = new DashboardComponent(AQI);
    dashboard.initQ1();
  });

  d3.dsv(',', 'https://raw.githubusercontent.com/lessthan41/D3_Practice/master/Climate_HW8/toPlotQ2.csv', function (row) {
    return {
      SO2_7: +row['SO2.7.Q2'],
      O3_7: +row['O3.7.Q2'],
      PM25_7: +row['PM2.5.7.Q2'],
      SO2_11: +row['SO2.11.Q2'],
      O3_11: +row['O3.11.Q2'],
      PM25_11: +row['PM2.5.11.Q2']
    };
  }).then(function (AQI) {
    let dashboard = new DashboardComponent(AQI);
    dashboard.initQ2();
  });

})();
