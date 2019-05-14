class DashboardComponent {
  constructor (AQI) {
    // console.log(AQI);
    this.AQI = crossfilter(AQI);
  }

  initQ1 () {
    let SO2Chart = new AQIChart(this.AQI, '#SO2PerHourChart', 'SO2', ['July', 'November'], 20);
    SO2Chart.render();
    let O3Chart = new AQIChart(this.AQI, '#O3PerHourChart', 'O3', ['July', 'November']);
    O3Chart.render();
    let PM25Chart = new AQIChart(this.AQI, '#PM25PerHourChart', 'PM25', ['July', 'November']);
    PM25Chart.render();
  }

  initQ2 () {
    let SO2Chart = new AQIChart(this.AQI, '#SO2PerDayChart', 'SO2', ['July', 'November'], 20, false);
    SO2Chart.render();
    let O3Chart = new AQIChart(this.AQI, '#O3PerDayChart', 'O3', ['July', 'November'], 100, false);
    O3Chart.render();
    let PM25Chart = new AQIChart(this.AQI, '#PM25PerDayChart', 'PM25', ['July', 'November'], 100, false);
    PM25Chart.render();
  }
}
