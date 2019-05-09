class DashboardComponent {
  constructor (AQI) {
    // console.log(AQI);
    this.AQI = crossfilter(AQI);
  }

  init () {
    this.initAQIChart();
  }

  initAQIChart () {
    let varAQIPerDayChart = new AQIPerDayChart(this.AQI, '#AQIPerDayChart');
    varAQIPerDayChart.render();
    let varAQIPerDayChart2 = new AQIPerDayChart(this.AQI, '#AQIPerDayChart2');
    varAQIPerDayChart2.render();
  }
}
