class Chart {
  constructor(AQI, aims, key, legendContent, Ymax = 100, hour = true) {
    this.AQIDimension = AQI.dimension(function(AQI) { return AQI });
    // console.log(this.AQIDimension.top(Infinity));
    this.typeHour = hour; // mean Hour or mean Day true: hour false: day
    this.unit = key == 'PM25' ? 'μg/m3' : 'ppb';
    this.toPlot7 = new Array();
    this.toPlot11 = new Array();
    this.key = key;
    this.Ymax = Ymax;
    this.chartContainer = d3.select(aims);
    this.chart = null; // This will hold chart SVG Dom element reference
    this.chartWidth = 960; // Width in pixels
    this.chartHeight = 400; // Height in pixels
    this.margin = 50; // Margin in pixels
    this.chartHeightWithoutMargin = this.chartHeight - this.margin;
    this.YScale = null;
    this.hourScale = null;
    this.tooltipContainer = null;
    this.legendContent = legendContent;
    this.color = ['aliceblue','#2055b6','#ffd1d1','#e81717']; // back, bor, back, bor
  }

  render() {
    this.createSvg();
    this.initScales();
    this.drawAxes();
    this.setToPlot();
    this.drawLine();
    this.drawDottedLine();
    this.drawPoints();
    this.drawLegend();
  }

  createSvg () {
    this.chart = this.chartContainer
      .append('svg')
      .attr('width', this.chartWidth)
      .attr('height', this.chartHeight);
  }

  initScales () {
    let Xmax = this.typeHour == true ? 23 : 30;
    let chartWidth = +this.chart.attr('width') - this.margin;
    let chartHeight = +this.chart.attr('height') - this.margin;
    this.YScale = d3.scaleLinear().domain([0, this.Ymax]).range([chartHeight, this.margin]);
    this.hourScale = d3.scaleLinear().domain([0, Xmax]).range([this.margin, chartWidth]);
  }

  drawAxes () {
    let xLabel = this.typeHour == true ? 'Hour' : 'Date';
    let countAxis = d3.axisLeft(this.YScale);
    let dateAxis = d3.axisBottom(this.hourScale);

    this.chart
      .append('g')
      .attr('class', 'c-axis')
      .attr('transform', 'translate(' + this.margin + ', 0)')
      .call(countAxis)
      .append('g')
      .append('text')
        .attr("fill", "currentColor")
        .attr('x', '70')
        .attr('dy', '2.5em')
        .attr('font-size', 'larger')
        .text("Concentration (" + this.unit + ")");

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
        .text(xLabel);
}

  // Reverse the Dataset
  setToPlot() {
    let hourCount = 0;
    for(var i=this.AQIDimension.top(Infinity).length-1; i>=0; i--){
      this.toPlot7.push({ concentration: this.AQIDimension.top(Infinity)[i][this.key+'_7'], hour: hourCount });
      this.toPlot11.push({ concentration: this.AQIDimension.top(Infinity)[i][this.key+'_11'], hour: hourCount });
      hourCount++;
    }
    if(!this.typeHour){ // 11月只有30天，第8天為無效值
      this.toPlot11.pop();
      this.toPlot11.splice(7, 1);
    }
  }

  drawLine () {
    let line = d3.line()
      .x((d) => {
        return this.hourScale(d.hour);
      })
      .y((d) => {
        return this.YScale(d.concentration);
      });

    // Line
    this.chart
      .append('g')
      .attr('class', 'c-line')
      .append('path')
      .attr('d', line(this.toPlot7));

    this.chart
      .append('g')
      .attr('class', 'c-line2')
      .append('path')
      .attr('d', line(this.toPlot11));
  }

  drawDottedLine () {

    let line = d3.line()
      .x((d) => {
        return this.hourScale(d.hour);
      })
      .y((d) => {
        return this.YScale(d.concentration);
      });

    if(!this.typeHour){
      this.chart
        .append('g')
        .attr('class', 'dotted-line')
        .append('path')
        .attr('d', line([this.toPlot11[6], {concentration: 0, hour: 7}, this.toPlot11[7]]))
        .style("stroke-dasharray", ("6, 6"));
      // Append text
      this.chart
        .append('g')
        .append('text')
          .attr("fill", "currentColor")
          .attr('x', '260')
          .attr('dy', '29.5em')
          .attr('font-size', 'smaller')
          .text('Data Loss')
      if(this.key == 'O3'){ // Special Case
        this.chart
          .append('g')
          .append('text')
            .attr("fill", "currentColor")
            .attr('x', '700')
            .attr('dy', '29.5em')
            .attr('font-size', 'smaller')
            .text('Data Loss')
      }
    }
  }

  drawPoints () {
    this.chart
      .append('g')
      .attr('class', 'c-points')
      .selectAll('circle')
      .data(this.toPlot7)
      .enter()
      .append('circle')
      .attr('cx', (d) => {
        return this.hourScale(d.hour);
      })
      .attr('cy', (d) => {
        return this.YScale(d.concentration);
      })
      .attr('r', '2')
      .on('mouseover', (d) => { // Hover
        this.createHover(d, [this.color[0], this.color[1]]);
      })
      .on('mouseleave', (d) => {
        this.hideTooltip();
      });

    this.chart
      .append('g')
      .attr('class', 'c-points2')
      .selectAll('circle')
      .data(this.toPlot11)
      .enter()
      .append('circle')
      .attr('cx', (d) => {
        return this.hourScale(d.hour);
      })
      .attr('cy', (d) => {
        return this.YScale(d.concentration);
      })
      .attr('r', '2')
      .on('mouseover', (d) => { // Hover
        this.createHover(d, [this.color[2], this.color[3]]);
      })
      .on('mouseleave', (d) => {
        this.hideTooltip();
      });
  }

  createHover (d, color) {
    let unitLabel = this.typeHour == true ? 'Hour' : 'Date';
      this.showTooltip(
        unitLabel + '：' + parseInt(d.hour) +'<br>Con：' + Math.round(d.concentration*100)/100 +' '+ this.unit ,
        d3.event.pageX,
        d3.event.pageY,
        color
      );
  }

  createTooltipIfDoesntExist () {
    if (this.tooltipContainer !== null) {
      return;
    }
    this.tooltipContainer = this.chartContainer
      .append('div')
      .attr('class', 'c-tooltip');
  }

  showTooltip (content, left, top, color) {
    this.createTooltipIfDoesntExist();
    this.tooltipContainer
      .html(content)
      .style('left', left+10 + 'px')
      .style('top', top+20 + 'px');

    this.tooltipContainer
      .style('display', null)
      .style('background', color[0])
      .style('border-color', color[1])
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

  drawLegend () {
    // Color ball
    this.chart
      .append('g')
      .attr('class', 'c-legend')
        .append('circle')
          .attr('r', '4')
          .attr('cx', '800')
          .attr('cy', '3.5em')
          .style("fill", '#2f6bda');

    this.chart
      .append('g')
      .attr('class', 'c-legend')
        .append('circle')
          .attr('r', '4')
          .attr('cx', '800')
          .attr('cy', '2em')
          .style("fill", '#f24943');

    // Line Name
    this.chart
      .append('g')
      .append('text')
        .attr("fill", "currentColor")
        .attr('x', '810')
        .attr('dy', '3.8em')
        .text(this.legendContent[0]);

    this.chart
      .append('g')
      .append('text')
        .attr("fill", "currentColor")
        .attr('x', '810')
        .attr('dy', '2.3em')
        .text(this.legendContent[1]);
  }
}
