class SOIPerYearChart {
  constructor(SOI) {
    // console.log(SOI);
    this.SOIDimension = SOI.dimension(function(SOI) {
      return SOI.year;
    });
    // console.log(this.SOIDimension.top(Infinity));
    this.chartContainer = d3.select('#yearSOICountChart');
    this.chart = null; // This will hold chart SVG Dom element reference
    this.chartWidth = 960; // Width in pixels
    this.chartHeight = 400; // Height in pixels
    this.margin = 50; // Margin in pixels
    this.chartHeightWithoutMargin = this.chartHeight - this.margin;
    this.chartWidthWithoutMargin = this.chartWidth - this.margin;
    this.countScale = null;
    this.yearScale = null;
    this.tooltipContainer = null;
  }

  render() {
    this.createSvg();
    this.initScales();
    this.drawAxes();
    this.drawBar();
  }

  createSvg () {
    this.chart = this.chartContainer
      .append('svg')
      .attr('width', this.chartWidth)
      .attr('height', this.chartHeight);
  }

  initScales () {
    // console.log(+this.chart.attr('width'));
    let chartWidth = +this.chart.attr('width') - this.margin;
    let chartHeight = +this.chart.attr('height') - this.margin;

    this.countScale = d3.scaleLinear().domain([-5, 5]).range([chartHeight, this.margin]);
    this.yearScale = d3.scaleLinear().domain([1979, 2020]).range([this.margin, chartWidth]);
  }

  drawAxes () {
    let countAxis = d3.axisLeft(this.countScale);
    let yearAxis = d3.axisBottom(this.yearScale);

    this.chart
      .append('g')
      .attr('class', 'c-axis')
      .attr('transform', 'translate(' + this.margin + ', 0)')
      .call(countAxis)
      .append('g')
      .append('text')
        .attr("fill", "currentColor")
        .attr('x', '15')
        .attr('dy', '2.5em')
        .attr('font-size', 'larger')
        .text("SOI Index");

    this.chart
      .append('g')
      .attr('class', 'c-axis')
      .attr('transform', 'translate(0, ' + this.chartHeightWithoutMargin + ')')
      .call(yearAxis)
      .append('g')
      .append('text')
        .attr("fill", "currentColor")
        .attr('x', '500')
        .attr('dy', '3.5em')
        .attr('font-size', 'larger')
        .text("Year");
  }

  drawBar () {

    let line = d3.line()
      .x((d) => {
        return this.yearScale(d.year);
      })
      .y((d) => {
        return this.countScale(d.SOI);
      });

    // bar
    this.chart.selectAll()
      .data(this.SOIDimension.top(Infinity))
      .enter()
      .append('rect')
      .attr('class', 'c-bar')
      .attr('x', (d) => this.yearScale(d.year))
      .attr('y', (d) => this.countScale(d.SOI))
      .attr('height', (d) => this.chartHeightWithoutMargin - this.countScale(d.SOI))
      .attr('width', () => this.chartWidthWithoutMargin/45)
      .on('mouseover', (d) => {
        this.showTooltip(
          parseInt(d.year) + ':  ' + Math.round(d.SOI*100)/100,
          d3.event.pageX,
          d3.event.pageY
        );
      })
      .on('mouseout', (d) => {
        this.hideTooltip();
      })
      .on('mousemove', (d) => {
        this.hideTooltip();
        this.showTooltip(
          parseInt(d.year) + ':  ' + Math.round(d.SOI*100)/100,
          d3.event.pageX,
          d3.event.pageY
        );
      });

    // Absline
    this.chart
      .append('g')
      .attr('class', 'abs-line')
      .append('path')
      .attr('d', line([{year: 1979, SOI: 0}, {year: 2020, SOI: 0}]))

  }

  createTooltipIfDoesntExist () {
    if (this.tooltipContainer !== null) {
      return;
    }

    this.tooltipContainer = this.chartContainer
      .append('div')
      .attr('class', 'c-tooltip')
  }

  showTooltip (content, left, top) {
    this.createTooltipIfDoesntExist();

    this.tooltipContainer
      .html(content)
      .style('left', left+10 + 'px')
      .style('top', top+50 + 'px');

    this.tooltipContainer
      .transition()
      .duration(100)
      .style('opacity', 1);
  }

  hideTooltip () {
    this.createTooltipIfDoesntExist();

    this.tooltipContainer
      .transition()
      .duration(300)
      .style('opacity', 0);
  }
}
