import { margin, marginLeft, xMax, yMax} from './dimensions.js';

// Parse CSV Data
const data = await d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/9_OneNumSevCatSubgroupOneObs.csv");

// Get Opacity Max
const opacityMax = d3.max(data, d => d.Value);

// Append SVG Object to the Page
const svg = d3.select('.charts').select(".barcodechart")
  .append("g")
  .attr("transform","translate(" + marginLeft + "," + margin + ")");

// Calculate Date Domain
const dateDomain = d3.extent(data, d => new Date(d.TIME));

// Calculate Date Range
const dateRange = dateDomain[1].getFullYear() - dateDomain[0].getFullYear();

// X Axis
const x = d3.scaleTime()
  .domain([dateDomain[0], dateDomain[1].setFullYear(dateDomain[1].getFullYear() + 1)])
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

// Bars
svg.append('g')
  .selectAll("bar")
  .data(data).enter()
  .append("rect")
  .attr("x", d => x(new Date(d.TIME)))
  .attr("y", d => y(d.Country))
  .attr("width", xMax / dateRange)
  .attr("height", y.bandwidth())
  .attr("fill-opacity", d => d.Value / opacityMax)

  export {};