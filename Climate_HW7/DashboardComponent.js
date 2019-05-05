class DashboardComponent {
  constructor (AQI) {
    // console.log(AQI);
    this.AQI = crossfilter(AQI);
  }

  init () {
    this.initAQIChart();
  }

  initAQIChart () {
    let varAQIPerDayChart = new AQIPerDayChart(this.AQI);
    varAQIPerDayChart.render();
  }
}
