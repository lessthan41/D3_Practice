class DashboardComponent {
  constructor (Air, CarFlow, aim, unit, Ymax = 100) {
    this.AirComponent = Object.keys(Air[0]); // Pollutant Name
    this.Air = crossfilter(Air);
    this.Car = crossfilter(CarFlow);
    this.aim = aim;
    this.unit = unit;
    this.chart = null;
    this.Ymax = Ymax;
  }

  init () {
    this.plot();
  }

  plot () {
    //  data, aim, ylab, unit, Ymax
    this.chart = new Chart(this.Air, this.Car, this.aim,
      '車流(輛小型車)', '濃度(' + this.unit + ')', '輛小型車', this.unit, 8000, this.Ymax);
    this.chart.render();
    this.chart.drawLegend(['車流量', this.AirComponent])
  }
}
