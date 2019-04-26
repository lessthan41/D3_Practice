class DashboardComponent {
  constructor (SOI) {
    // We don't store athletes
    this.SOI = crossfilter(SOI);
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
