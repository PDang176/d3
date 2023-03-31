import { margin, marginLeft, xMax, yMax} from './dimensions.js';

// Parse CSV Data
const data = await d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv");

// Append SVG Object to the Page
const svg = d3.select('.charts').select(".barchart")
  .append("g")
  .attr("transform","translate(" + marginLeft + "," + margin + ")");

// X Axis
const x = d3.scaleLinear()
  .domain([0, 13000])
  .range([0, xMax]);

svg.append("g")
  .attr("transform", "translate(0," + yMax + ")")
  .call(d3.axisBottom(x));

// Y Axis
const y = d3.scaleBand()
  .domain(data.map(d => d.Country))
  .range([0, yMax])
  .padding(0.1);

svg.append("g")
  .call(d3.axisLeft(y));
  // .selectAll("text")
  //     .attr("transform", "translate(-15, -10)rotate(-90)")
  //     .style("text-anchor", "middle");

// Bars
svg.append('g')
  .selectAll("bar")
  .data(data).enter()
  .append("rect")
  .attr("x", x(0))
  .attr("y", d => y(d.Country))
  .attr("width", d => x(d.Value))
  .attr("height", y.bandwidth())
  .attr("fill-opacity", d => d.Value / 13000);

  export {};