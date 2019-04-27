
(function () {
  d3.dsv(',', 'https://raw.githubusercontent.com/lessthan41/D3_Practice/master/SOI.csv', function (row) {
    return {
      year: +row['Year'],
      month: row['Month'],
      SOI: +row['SOI']
    };
  }).then(function (SOI) {
    for(i=0; i<SOI.length; i++){
      // console.log(i);
      switch (SOI[i]['month']) {
        case 'Jan':
          SOI[i]['year'] += 0;
          break;
        case 'Feb':
          SOI[i]['year'] += 0.083;
          break;
        case 'Mar':
          SOI[i]['year'] += 0.083*2;
          break;
        case 'Apr':
          SOI[i]['year'] += 0.083*3;
          break;
        case 'May':
          SOI[i]['year'] += 0.083*4;
          break;
        case 'Jun':
          SOI[i]['year'] += 0.083*5;
          break;
        case 'Jul':
          SOI[i]['year'] += 0.083*6;
          break;
        case 'Aug':
          SOI[i]['year'] += 0.083*7;
          break;
        case 'Sep':
          SOI[i]['year'] += 0.083*8;
          break;
        case 'Oct':
          SOI[i]['year'] += 0.083*9;
          break;
        case 'Nov':
          SOI[i]['year'] += 0.083*10;
          break;
        case 'Dec':
          SOI[i]['year'] += 0.083*11;
          break;

      }

    }
    // console.log(SOI);
    let dashboard = new DashboardComponent(SOI);
    // dashboard = SOI;
    dashboard.init();
  });
})();
