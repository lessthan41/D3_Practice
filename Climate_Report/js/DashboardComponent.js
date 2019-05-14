class DashboardComponent {
  constructor (AQI) {
    // console.log(AQI);
    this.AQI = crossfilter(AQI);
  }

  init () {
    let NOXChart = new Chart(this.AQI, '#NOXPerHourChart', 'NOX', ['CarNumber', 'NOx']);
    NOXChart.render();
  }
}
