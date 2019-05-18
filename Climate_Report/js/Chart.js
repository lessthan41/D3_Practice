
class Chart {
  
  constructor(Air, Car, aims, ylab1, ylab2, unitCar, unitAir, Ymax1 = 100, Ymax2 = 100) {
    this.CarDimension = Car.dimension(function(Car) {
      return Car
    });
    this.AirDimension = Air.dimension(function(Air) {
      return Air
    });
    // console.log(this.CarDimension.top(Infinity));
    this.ylab1 = ylab1;
    this.ylab2 = ylab2;
    this.unitCar = unitCar;
    this.unitAir = unitAir;
    this.toPlotCar = new Array();
    this.toPlotAir = new Array();
    this.Ymax1 = Ymax1;
    this.Ymax2 = Ymax2;
    this.chartContainer = d3.select(aims);
    this.chart = null; // This will hold chart SVG Dom element reference
    this.chartWidth = 960; // Width in pixels
    this.chartHeight = 400; // Height in pixels
    this.margin = 50; // Margin in pixels
    this.chartHeightWithoutMargin = this.chartHeight - this.margin;
    this.chartWidthWithoutMargin = this.chartWidth - this.margin;
    this.YScale1 = null;
    this.YScale2 = null;
    this.hourScale = null;
    this.featureIdCount = 1; // Add ID Count for setting Line and Point Color
    this.tooltipContainer = null;
    this.tooltipColor = ['aliceblue', '#2055b6', '#ffd1d1', '#e81717', '#8cf299', '#0a7017']; // back, bor, back, bor
    this.tooltipColorCount = 0; // set for tooltip color change
  }

  render() {
    this.createSvg();
    this.initScales();
    this.drawAxis();
    this.setToPlotCar();
    this.drawLine(this.toPlotCar, 'Car');
    this.drawPoints(this.toPlotCar, 'Car');
    this.setToPlotAir();
    this.drawLine(this.toPlotAir, 'Air');
    this.drawPoints(this.toPlotAir, 'Air');
  }

  createSvg() {
    this.chart = this.chartContainer
      .append('svg')
      .attr('width', this.chartWidth)
      .attr('height', this.chartHeight);
  }

  // Set Scales for two Axis
  initScales() {

    this.YScale1 = d3.scaleLinear().domain([0, this.Ymax1]).range([this.chartHeightWithoutMargin, this.margin]);
    this.YScale2 = d3.scaleLinear().domain([0, this.Ymax2]).range([this.chartHeightWithoutMargin, this.margin]);
    this.hourScale = d3.scaleLinear().domain([0, 23]).range([this.margin, this.chartWidthWithoutMargin]);
  }

  // Draw Axis
  drawAxis() {
    let countAxis1 = d3.axisLeft(this.YScale1);
    let countAxis2 = d3.axisRight(this.YScale2);
    let hourAxis = d3.axisBottom(this.hourScale);

    this.chart
      .append('g')
      .attr('class', 'c-axis')
      .attr('transform', 'translate(' + this.margin + ', 0)')
      .call(countAxis1)
      .append('g')
      .append('text')
      .attr("fill", "currentColor")
      .attr('x', '35')
      .attr('dy', '2.5em')
      .attr('font-size', 'larger')
      .text(this.ylab1);

    this.chart
      .append('g')
      .attr('class', 'c-axis')
      .attr('transform', 'translate(0, ' + this.chartHeightWithoutMargin + ')')
      .call(hourAxis)
      .append('g')
      .append('text')
      .attr("fill", "currentColor")
      .attr('x', '500')
      .attr('dy', '3.5em')
      .attr('font-size', 'larger')
      .text('小時');


    this.chart
      .append('g')
      .attr('class', 'c-axis')
      .attr('transform', 'translate(' + this.chartWidthWithoutMargin + ', 0)')
      .call(countAxis2)
      .append('g')
      .append('text')
      .attr("fill", "currentColor")
      .attr('x', '-20')
      .attr('dy', '2.5em')
      .attr('font-size', 'larger')
      .text(this.ylab2);

  }

  // Reverse the Car Dataset
  setToPlotCar() {
    let hours = [7, 8, 17, 18];
    let data = this.CarDimension.top(Infinity).reverse();
    for (var i = 0; i < data.length; i++) {
      this.toPlotCar.push({
        Yvalue: Object.values(data[i])[0],
        hour: hours[i]
      });
    }
  }

  // Reverse the Air Dataset
  setToPlotAir() {
    let hourcount = 0;
    let indx = 0;
    let data = this.AirDimension.top(Infinity).reverse();

    // console.log(data);
    for (var i = 0; i < data.length; i++) { // deal with NA data
      indx = 0;
      for (var j = 0; j < Object.keys(data[0]).length; j++) {
        if (Object.values(data[i])[j] == 0) {
          this.drawDottedLine(i, data);
          hourcount++;
          indx = 1;
        }
      }
      if (indx == 1) {
        continue;
      }
      this.toPlotAir.push({
        Yvalue: Object.values(data[i]),
        hour: hourcount
      });
      hourcount++;
    }
  }

  // Draw Line
  drawLine(toPlot, which) {

    switch (which) {
      case 'Car':
        let line = d3.line()
          .x((d) => {
            return this.hourScale(d.hour);
          })
          .y((d) => {
            return this.YScale1(d.Yvalue);
          });

        // Line
        this.chart
          .append('g')
          .attr('class', 'c-line')
          .attr('id', 'c-line' + this.featureIdCount) // Dont need ++
          .append('path')
          .attr('d', line(toPlot));

        break;

      case 'Air':
        let typeNum = toPlot[0]['Yvalue'].length;
        // console.log(typeNum);
        let featureIdCount = this.featureIdCount; // Store it and finally assign back
        for (var i = 0; i < typeNum; i++) {
          let line = d3.line()
            .x((d) => {
              return this.hourScale(d.hour);
            })
            .y((d) => {
              return this.YScale2(d.Yvalue[i]);
            });

          // Line
          this.chart
            .append('g')
            .attr('class', 'c-line')
            .attr('id', 'c-line' + this.featureIdCount++) // Dont need ++
            .append('path')
            .attr('d', line(toPlot));
        }
        this.featureIdCount = featureIdCount;
        break;
    }
  }

  // Add Dotted Line
  drawDottedLine(i, toPlot) {

    let line = d3.line()
      .x((d) => {
        return this.hourScale(d.hour);
      })
      .y((d) => {
        return this.YScale2(d.Yvalue);
      });

    if (i != 0 && i != 23) {
      this.chart
        .append('g')
        .attr('class', 'dotted-line')
        .append('path')
        .attr('d', line([{
            Yvalue: Object.values(toPlot[i - 1])[0],
            hour: i - 1
          },
          {
            Yvalue: 0,
            hour: i
          },
          {
            Yvalue: Object.values(toPlot[i + 1])[0],
            hour: i + 1
          }
        ]))
        .style('opacity', 0.7)
        .style('stroke', '#f24943')
        .style("stroke-dasharray", ("6, 6"));

      // Append text
      if(Object.values(toPlot[i - 1])[0] != 0){
        this.chart
          .append('g')
          .append('text')
          .attr("fill", "currentColor")
          .attr('x', this.hourScale(i) + 20)
          .attr('dy', '29.2em')
          .attr('font-size', 'smaller')
          .text('資料缺漏');
      }
    }


  }

  // Add Points
  drawPoints(toPlot, which) {

    switch (which) {
      case 'Car':
        this.chart
          .append('g')
          .attr('class', 'c-points')
          .attr('id', 'c-points' + this.featureIdCount++) // Need ++
          .selectAll('circle')
          .data(toPlot)
          .enter()
          .append('circle')
          .attr('cx', (d) => {
            return this.hourScale(d.hour);
          })
          .attr('cy', (d) => {
            return this.YScale1(d.Yvalue);
          })
          .attr('r', '2')
          .on('mouseover', (d) => { // Hover
            this.createHover(d, which, d.Yvalue);
          })
          .on('mouseleave', (d) => {
            this.hideTooltip();
          });

        break;

      case 'Air':
        let typeNum = toPlot[0]['Yvalue'].length;
        for (var i = 0; i < typeNum; i++) {
          this.chart
            .append('g')
            .attr('class', 'c-points')
            .attr('id', 'c-points' + this.featureIdCount++) // Need ++
            .selectAll('circle')
            .data(toPlot)
            .enter()
            .append('circle')
            .attr('cx', (d) => {
              return this.hourScale(d.hour);
            })
            .attr('cy', (d) => {
              return this.YScale2(d.Yvalue[i]);
            })
            .attr('r', '2')
            .on('mouseover', (d) => { // Hover
              this.createHover(d, which, d.Yvalue[0]);
            })
            .on('mouseleave', (d) => {
              this.hideTooltip();
            });
        }

        break;

    }
  }

  // Create Hover for Points
  createHover(d, which, yvalue) {
    let title = (which == 'Car') ? '車流' : '濃度';
    let unit = (which == 'Car') ? this.unitCar : this.unitAir;
    this.showTooltip(
      '時間：' + parseInt(d.hour) + '<br>' + title + '：' + Math.round(yvalue * 100) / 100 + ' ' + unit,
      d3.event.pageX,
      d3.event.pageY,
      which
    );
  }

  createTooltipIfDoesntExist() {
    if (this.tooltipContainer !== null) {
      return;
    }
    this.tooltipContainer = this.chartContainer
      .append('div')
      .attr('class', 'c-tooltip');
  }

  // Set Tooltip Colors and Show
  showTooltip(content, left, top, which) {
    this.createTooltipIfDoesntExist();
    let indx;
    switch (which) {
      case 'Car':
        indx = 0;
        break;
      default:

    }
    this.tooltipContainer
      .html(content)
      .style('left', left + 10 + 'px')
      .style('top', top + 20 + 'px');

    this.tooltipContainer
      .style('display', null)
      .style('background', (which == 'Car') ? this.tooltipColor[0] : this.tooltipColor[2])
      .style('border-color', (which == 'Car') ? this.tooltipColor[1] : this.tooltipColor[3])
      .transition()
      .duration(100)
      .style('opacity', 1);
  }

  hideTooltip() {
    this.createTooltipIfDoesntExist();
    this.tooltipContainer
      .transition()
      .duration(300)
      .style('opacity', 0);

    setTimeout(function() {}, 300);

    this.tooltipContainer
      .style('display', 'none');
  }

  // Legend Setting
  drawLegend(legendContent) {
    let cx = (legendContent[1] == 'ETHYLBENZENE' || legendContent[1] == 'M_P_XYLENES') ? 730 : 800;

    // Color ball
    this.chart
      .append('g')
      .attr('class', 'c-legend')
      .append('circle')
      .attr('r', '4')
      .attr('cx', cx)
      .attr('cy', '3.5em')
      .style("fill", '#2f6bda');

    this.chart
      .append('g')
      .attr('class', 'c-legend')
      .append('circle')
      .attr('r', '4')
      .attr('cx', cx)
      .attr('cy', '2em')
      .style("fill", '#f24943');

    // Line Name
    this.chart
      .append('g')
      .append('text')
      .attr("fill", "currentColor")
      .attr('x', cx+10+'')
      .attr('dy', '3.8em')
      .text(legendContent[0]);

    this.chart
      .append('g')
      .append('text')
      .attr("fill", "currentColor")
      .attr('x', cx+10+'')
      .attr('dy', '2.3em')
      .text(legendContent[1]);
  }
}
