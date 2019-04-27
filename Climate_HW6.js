
(function () {
  d3.dsv(',', 'https://raw.githubusercontent.com/lessthan41/D3_Practice/master/SOI.csv', function (row) {
    return {
      year: +row['Year'],
      SOIJan: +row['Jan'],
      SOIFeb: +row['Feb'],
      SOIMar: +row['Mar'],
      SOIApr: +row['Apr'],
      SOIMay: +row['May'],
      SOIJun: +row['Jun'],
      SOIJul: +row['Jul'],
      SOIAug: +row['Aug'],
      SOISep: +row['Sep'],
      SOIOct: +row['Oct'],
      SOINov: +row['Nov'],
      SOIDec: +row['Dec']
    };
  }).then(function (SOI) {
    // console.log(SOI);
    let dashboard = new DashboardComponent(SOI);
    // dashboard = SOI;
    dashboard.init();
  });
})();
