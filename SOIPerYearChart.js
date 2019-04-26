class SOIPerYearChart {
  constructor(SOI) {
    var SOI = crossfilter();
    this.SOIDimension = SOI.dimension(function(SOI) {
      return SOI.year + SOI.SOIJan;
    });
    this.createGroupFromDimension();
    this.chartContainer = d3.select('#yearSOICountChart');
    this.chart = null; // This will hold chart SVG Dom element reference
    this.chartWidth = 960; // Width in pixels
    this.chartHeight = 400; // Height in pixels
    this.margin = 50; // Margin in pixels
    this.chartHeightWithoutMargin = this.chartHeight - this.margin;
    this.countScale = null;
    this.yearScale = null;
    this.tooltipContainer = null;
  }

  createGroupFromDimension() {
    // console.log(this.SOIDimension.group().reduce);
    this.SOIPerYearGroup = this.SOIDimension.group()
      .reduce(
        // reduceAdd()
        (output, input) => {
          output.count++;
          output.year = input.year;
          return output;
        },
        // reduceRemove()
        (output, input) => {
          --output.count;
          output.year = input.year;
          return output;
        },
        // reduceInitial()
        () => {
          return {
            year: null,
            count: 0
          };
        }
      )
      .order(function(p) {
        return p.count;
      });
  }

  render() {
    this.createSvg();
    this.initScales();
    this.drawAxes();
    // this.drawLine();
    // this.drawPoints();
  }

  createSvg () {
    this.chart = this.chartContainer
      .append('svg')
      .attr('width', this.chartWidth)
      .attr('height', this.chartHeight);
  }

  initScales () {
    // TODO potentially unsafe, if top() returns []
    // let maxCount = this.SOIPerYearGroup.top(1)[0];
    let chartWidth = +this.chart.attr('width') - this.margin;
    let chartHeight = +this.chart.attr('height') - this.margin;

    this.countScale = d3.scaleLinear().domain([-5, 5]).range([chartHeight, this.margin]);
    // TODO We are hardcoding years for now
    this.yearScale = d3.scaleLinear().domain([1933, 1992]).range([this.margin, chartWidth]);
  }

  drawAxes () {
    let countAxis = d3.axisLeft(this.countScale);
    let yearAxis = d3.axisBottom(this.yearScale);

    this.chart
      .append('g')
      .attr('class', 'c-axis')
      .attr('transform', 'translate(' + this.margin + ', 0)')
      .call(countAxis);

    this.chart
      .append('g')
      .attr('class', 'c-axis')
      .attr('transform', 'translate(0, ' + this.chartHeightWithoutMargin + ')')
      .call(yearAxis);
  }
}

// module.exports = SOIPerYearChart;
