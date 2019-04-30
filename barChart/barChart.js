
(function () {
  d3.dsv(',', 'https://raw.githubusercontent.com/lessthan41/D3_Practice/master/Climate_HW6/SOI.csv', function (row) {
    return {
      year: +row['Year'],
      month: row['Month'],
      SOI: +row['SOI']
    };
  }).then(function (SOI) {


    let i, j;
    let afterAdjust = new Array;
    for(i=1980; i<2019; i++){
      for(j=0; j<12; j++){
        let sum = 0;
        if(SOI[12*(i-1980) + j].year == i){
          // console.log(SOI[j + k*(i-1980)]);
          sum += SOI[12*(i-1980) + j].SOI;
        }
        afterAdjust[i-1980] = {'year': i, SOI: sum/12}
      }
    }

    // console.log(afterAdjust);

    let dashboard = new DashboardComponent(afterAdjust);
    // dashboard = SOI;
    dashboard.init();
  });
})();
