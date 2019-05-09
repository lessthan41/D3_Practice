class AQIPerDayChart {
  constructor(AQI, aims) {
    // console.log(AQI);
    this.AQIDimension = AQI.dimension(function(AQI) {
      return AQI.date + AQI.AQI;
    });
    // console.log(this.AQIDimension.top(Infinity));
    this.chartContainer = d3.select(aims);
    this.chart = null; // This will hold chart SVG Dom element reference
    this.chartWidth = 960; // Width in pixels
    this.chartHeight = 400; // Height in pixels
    this.margin = 50; // Margin in pixels
    this.chartHeightWithoutMargin = this.chartHeight - this.margin;
    this.AQIScale = null;
    this.dateScale = null;
    this.tooltipContainer = null;
  }

  render() {
    this.createSvg();
    this.initScales();
    this.bgColor();
    this.drawAxes();
    this.drawLine();
    this.drawDottedLine();
    this.drawPoints();
  }

  createSvg () {
    this.chart = this.chartContainer
      .append('svg')
      .attr('width', this.chartWidth)
      .attr('height', this.chartHeight);
  }

  initScales () {
    let chartWidth = +this.chart.attr('width') - this.margin;
    let chartHeight = +this.chart.attr('height') - this.margin;

    this.AQIScale = d3.scaleLinear().domain([0, 200]).range([chartHeight, this.margin]);
    this.dateScale = d3.scaleLinear().domain([0, 30]).range([this.margin, chartWidth]);
  }

  // Change Bgcolor
  bgColor () {

    this.chart.append('rect') // 150 - 200
      .attr('height', (this.chartHeight - 2*this.margin)/4)
      .attr('width', this.chartWidth - 2*this.margin)
      .attr('x', this.margin)
      .attr('y', this.margin)
      .attr('fill', '#ff0000')
      .attr('opacity', 0.5);

    this.chart.append('rect') // 100 - 150
      .attr('height', (this.chartHeight - 2*this.margin)/4)
      .attr('width', this.chartWidth - 2*this.margin)
      .attr('x', this.margin)
      .attr('y', this.margin + (this.chartHeight - 2*this.margin)/4) // margin + 1/4圖表長
      .attr('fill', '#ff7e00')
      .attr('opacity', 0.5);

    this.chart.append('rect') // 50 - 100
      .attr('height', (this.chartHeight - 2*this.margin)/4)
      .attr('width', this.chartWidth - 2*this.margin)
      .attr('x', this.margin)
      .attr('y', this.margin + 2*(this.chartHeight - 2*this.margin)/4) // margin + 1/4圖表長
      .attr('fill', '#ffff00')
      .attr('opacity', 0.5);

    this.chart.append('rect') // 0 - 50
      .attr('height', (this.chartHeight - 2*this.margin)/4)
      .attr('width', this.chartWidth - 2*this.margin)
      .attr('x', this.margin)
      .attr('y', this.margin + 3*(this.chartHeight - 2*this.margin)/4) // margin + 1/4圖表長
      .attr('fill', '#00e800')
      .attr('opacity', 0.5);
  }

  drawAxes () {
    let countAxis = d3.axisLeft(this.AQIScale);
    let dateAxis = d3.axisBottom(this.dateScale);

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
        .text("AQI Index");

    this.chart
      .append('g')
      .attr('class', 'c-axis')
      .attr('transform', 'translate(0, ' + this.chartHeightWithoutMargin + ')')
      .call(dateAxis)
      .append('g')
      .append('text')
        .attr("fill", "currentColor")
        .attr('x', '500')
        .attr('dy', '3.5em')
        .attr('font-size', 'larger')
        .text("Date");

    // Append Text
    this.chart
      .append('g')
      .append('text')
        .attr("fill", "currentColor")
        .attr('x', '290')
        .attr('dy', '29em')
        .attr('font-size', 'smaller')
        .text("Data Loss")

    this.chart
      .append('g')
      .append('text')
        .attr("fill", "currentColor")
        .attr('x', '922')
        .attr('dy', '27.25em')
        .attr('font-size', 'smaller')
        .text("Good")

    this.chart
      .append('g')
      .append('text')
        .attr("fill", "currentColor")
        .attr('x', '917')
        .attr('dy', '21em')
        .attr('font-size', 'smaller')
        .text("Normal")

    this.chart
      .append('g')
      .append('text')
        .attr("fill", "currentColor")
        .attr('x', '925')
        .attr('dy', '14.5em')
        .attr('font-size', 'smaller')
        .text("Bad")

    this.chart
      .append('g')
      .append('text')
        .attr("fill", "currentColor")
        .attr('x', '920')
        .attr('dy', '7.5em')
        .attr('font-size', 'smaller')
        .text("Pretty")
    this.chart // Same Place
      .append('g')
      .append('text')
        .attr("fill", "currentColor")
        .attr('x', '923')
        .attr('dy', '8.75em')
        .attr('font-size', 'smaller')
        .text("Bad")
}

  // Reverse the Dataset
  dimensionReorder(AQI) {
    AQI.sort(function (a, b) {
     return a.date > b.date ? 1 : -1;
    });
    AQI.splice(7,1); // remove 8th
    return AQI
  }

  drawLine () {

    let line = d3.line()
      .x((d) => {
        return this.dateScale(d.date);
      })
      .y((d) => {
        return this.AQIScale(d.AQI);
      });

    // Line
    this.chart
      .append('g')
      .attr('class', 'c-line')
      .append('path')
      .attr('d', line(this.dimensionReorder(this.AQIDimension.top(Infinity))));
  }

  drawDottedLine () {

    let line = d3.line()
      .x((d) => {
        return this.dateScale(d.date);
      })
      .y((d) => {
        return this.AQIScale(d.AQI);
      });

    this.chart
      .append('g')
      .attr('class', 'dotted-line')
      .append('path')
      .attr('d', line([this.dimensionReorder(this.AQIDimension.top(Infinity))[6], {AQI: 0, date: 8},
                       this.dimensionReorder(this.AQIDimension.top(Infinity))[7]]))
      .style("stroke-dasharray", ("6, 6"));
  }

  drawPoints () {
    this.chart
      .append('g')
      .attr('class', 'c-points')
      .selectAll('circle')
      .data(this.AQIDimension.top(Infinity))
      .enter()
      .append('circle')
      .attr('cx', (d) => {
        return this.dateScale(d.date);
      })
      .attr('cy', (d) => {
        return this.AQIScale(d.AQI);
      })
      .attr('r', '2')
      // Hover
      .on('mouseover', (d) => {
        let toShow;
        switch (parseInt(d.date)) {
          case 1:
            toShow = 'st'
            break;
          case 21:
            toShow = 'st'
            break;
          case 2:
            toShow = 'nd'
            break;
          case 22:
            toShow = 'nd'
            break;
          case 3:
            toShow = 'rd'
            break;
          case 23:
            toShow = 'rd'
            break;
          default:
            toShow = 'th'
        }

        this.showTooltip(
          'AQI：' + Math.round(d.AQI*100)/100 + '<br>' + parseInt(d.date) + toShow + ', Nov.',
          d3.event.pageX,
          d3.event.pageY
        );
      })
      .on('mouseleave', (d) => {
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
      .style('left', left+10 + 'px')
      .style('top', top+20 + 'px');

    this.tooltipContainer
      .style('display', null)
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

    setTimeout(function(){}, 300);

    this.tooltipContainer
      .style('display', 'none');
  }
}
