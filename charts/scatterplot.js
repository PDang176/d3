import { margin, xMax, yMax} from './dimensions.js';

// Color Palette
const colors = ['#0000FF', '#00FF00', '#FF0000'];

// Create Random Points
const numPoints = 100;
const data = [];
for (let i = 0; i < numPoints; i++) {
  data.push([Math.random() * xMax, Math.random() * yMax, Math.floor(Math.random() * colors.length)]);
}

// Append SVG Object to the Page
const svg = d3.select('.charts').select(".scatterplot")
  .append("g")
  .attr("transform","translate(" + margin + "," + margin + ")");

// X Axis
const x = d3.scaleLinear()
  .domain([0, 500])
  .range([0, xMax]);

svg.append("g")
  .attr("transform", "translate(0," + yMax + ")")
  .call(d3.axisBottom(x));

// Y Axis
const y = d3.scaleLinear()
  .domain([0, 500])
  .range([yMax, 0]);

svg.append("g")
  .call(d3.axisLeft(y));

// Dots
svg.append('g')
  .selectAll("dot")
  .data(data).enter()
  .append("circle")
  .attr("cx", d => d[0])
  .attr("cy", d => d[1])
  .attr("fill", d => colors[d[2]])
  .attr("r", 3)

  export {};