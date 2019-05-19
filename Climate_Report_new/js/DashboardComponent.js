


class DashboardComponent {
  constructor (Air0905, CarFlow0905, Air0926, CarFlow0926, aim, unit, Ymax = 100) {
    this.AirComponent0905 = Object.keys(Air0905[0]); // Pollutant Name
    this.Air0905 = crossfilter(Air0905);
    this.Car0905 = crossfilter(CarFlow0905);
    this.Air0926 = crossfilter(Air0926);
    this.Car0926 = crossfilter(CarFlow0926);
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
    this.chart = new Chart(this.Air0905, this.Car0905, this.Air0926, this.Car0926, this.aim,
      '車流(輛小型車)', '濃度(' + this.unit + ')', '輛小型車', this.unit, 8000, this.Ymax);
    this.chart.render();
    this.chart.drawLegend(['車流量 05', '車流量 26', this.AirComponent0905 + ' 05', this.AirComponent0905 + ' 26'])
  }
}
