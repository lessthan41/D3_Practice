class DashboardComponent {
  constructor (SOI) {
    // We don't store athletes
    // console.log(SOI);
    this.SOI = crossfilter(SOI);
  }

  init () {
    this.initSOIChart();
  }

  initSOIChart () {
    // console.log(this.SOI);
    let varSOIPerYearChart = new SOIPerYearChart(this.SOI);
    varSOIPerYearChart.render();
  }
}

// module.exports = DashboardComponent;
