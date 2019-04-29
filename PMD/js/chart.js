(function () {
  var svg = d3.select('svg'),
      width = +svg.attr('width'),
      height = +svg.attr('height');
  var projection = d3.geoMercator()
    .scale(1500)
    .center([120,23])
    .translate([width / 2, height / 2]);

  tw = d3.json("https://raw.githubusercontent.com/Bourbon0212/Diana-Visualization/master/assets/twCounty.geojson");
  tw.then(function(json){
    // console.log(json.features);
    svg.append("g")
        .selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
          // draw each country
          .attr("d", d3.geoPath()
            .projection(projection)
          )
          .attr('backgroundcolor', 'aliceblue')

  });

})();
