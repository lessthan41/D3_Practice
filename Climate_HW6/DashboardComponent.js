class DashboardComponent {
  constructor (SOI) {
    // console.log(SOI);
    // We don't store athletes
    this.SOI = crossfilter(SOI);
    // console.log(this.SOI);
  }

  init () {
    this.initSOIChart();
  }

  initSOIChart () {
    let varSOIPerYearChart = new SOIPerYearChart(this.SOI);
    varSOIPerYearChart.render();
  }
}

// module.exports = DashboardComponent;
