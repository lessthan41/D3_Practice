class SOIPerYearChart {
  constructor(SOI) {
    // console.log(SOI);
    this.SOIDimension = SOI.dimension(function(SOI) {
      return SOI.year + SOI.month;
    });
    // console.log(this.SOIDimension.top(Infinity));
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

  render() {
    this.createSvg();
    this.initScales();
    this.drawAxes();
    this.drawLine();
    this.drawPoints();
  }

  createSvg () {
    this.chart = this.chartContainer
      .append('svg')
      .attr('width', this.chartWidth)
      .attr('height', this.chartHeight);
  }

  initScales () {
    // TODO potentially unsafe, if top() returns []
    let chartWidth = +this.chart.attr('width') - this.margin;
    let chartHeight = +this.chart.attr('height') - this.margin;

    this.countScale = d3.scaleLinear().domain([-50, 50]).range([chartHeight, this.margin]);
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

  /**
  * Reverse the Dataset
  */
  dimensionReorder(SOI) {
    let reorder = SOI.reverse();
    // console.log(reorder);
    let tmp, toInsert;
    let i, j = 0;

    for(i=0; i<60; i++){
      tmp = reorder[11+12*i];
      // console.log(tmp);
      toInsert =[
        tmp, reorder[0+12*i], reorder[1+12*i],
        reorder[2+12*i], reorder[3+12*i], reorder[4+12*i],
        reorder[5+12*i], reorder[6+12*i], reorder[7+12*i],
        reorder[8+12*i], reorder[9+12*i], reorder[10+12*i]
      ];

      for(j=0; j<12; j++){
        reorder[j+12*i] = toInsert[j];
      }
    }
    // console.log(reorder);
    return(reorder);
  }

  drawLine () {

    let line = d3.line()
      .x((d) => {
        return this.yearScale(d.year);
      })
      .y((d) => {
        return this.countScale(d.SOI);
      });

    // console.log(this.dimensionReorder(this.SOIDimension.top(Infinity)));
    // Line
    this.chart
      .append('g')
      .attr('class', 'c-line')
      .append('path')
      .attr('d', line(this.dimensionReorder(this.SOIDimension.top(Infinity))));

    // Absline
    this.chart
      .append('g')
      .attr('class', 'abs-line')
      .append('path')
      .attr('d', line([{year: 1933, month: "Jan", SOI: 0}, {year: 1993, month: "Dec", SOI: 0}]));

  }

  drawPoints(){
    this.chart
      .append('g')
      .attr('class', 'c-points')
      .selectAll('circle')
      .data(this.SOIDimension.top(Infinity))
      .enter()
      .append('circle')
      .attr('cx', (d) => {
        return this.yearScale(d.year);
      })
      .attr('cy', (d) => {
        return this.countScale(d.SOI);
      })
      .attr('r', '2')

    // Hover
    // ... Part before this line stays the same

  .on('mouseover', (d) => {
    this.showTooltip(
      d.month + ', ' + parseInt(d.year) + ': <br>' + Math.round(d.SOI*100)/100,
      d3.event.pageX,
      d3.event.pageY
    );
  })
  .on('mouseout', (d) => {
    this.hideTooltip();
  });
  }

  createTooltipIfDoesntExist () {
    if (this.tooltipContainer !== null) {
      return;
    }

    this.tooltipContainer = this.chartContainer
      .append('div')
      .attr('class', 'c-tooltip');
  }

  showTooltip (content, left, top) {
    this.createTooltipIfDoesntExist();

    this.tooltipContainer
      .html(content)
      .style('left', left + 'px')
      .style('top', top + 'px');

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
