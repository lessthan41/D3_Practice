class DashboardComponent {
  constructor (AQI) {
    // console.log(AQI);
    this.AQI = crossfilter(AQI);
  }

  init () {
    this.initAQIChart();
  }

  initAQIChart () {
    let SO2Chart = new AQIPerDayChart(this.AQI, '#SO2PerHourChart', 'SO2', ['July', 'November'], 20);
    SO2Chart.render();
    let O3Chart = new AQIPerDayChart(this.AQI, '#O3PerHourChart', 'O3', ['July', 'November']);
    O3Chart.render();
    let PM25Chart = new AQIPerDayChart(this.AQI, '#PM25PerHourChart', 'PM25', ['July', 'November']);
    PM25Chart.render();
  }
}
