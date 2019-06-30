
function choose(name){
      if (name == "BVBar"){
        document.getElementById("level1").style.display = "";
        document.getElementById("level2").style.display = "none";
        document.getElementById("BVBar").checked = true;
        document.getElementById("TotalStack").checked = false;
        
       
        
      } else if (name == 'TotalStack'){
        document.getElementById("level2").style.display = "";
        document.getElementById("level1").style.display = "none";
        document.getElementById("BVBar").checked = false;
        document.getElementById("TotalStack").checked = true;

      }

    }
//*******************************************************
//  Select the javascript to run the graph
//******************************************************
// if (GraphToRun == "Graph1"){
//   createGraph1()
// } else {
//   createGraph2()
// };

//*******************************************************
//  JS for First Graph
//******************************************************

function createGraph1(firstGraph){
  console.log("this ran")
  //d3.selectAll("svg").remove();

  console.log(firstGraph);


    BVGraph1_YVal = firstGraph.map((s) => s.Total);
    BVGraph1_YVal = BVGraph1_YVal.map(Number);
    BVGraph1_maxY = Math.max.apply(null, BVGraph1_YVal);

    //make the svg container
    //const svg = d3.select('svg');
    const svgContainer = d3.select('#container');
    const svg = d3.select('#container')
      .append('svg')

   
   // create margin

    const margin = 80;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;

    //append margin to svg
    
    const chart = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

   // create xAxis to be appended
    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(firstGraph.map((s) => s.Funding_Category))
      .padding(0.4)
    
   // create yAxis to be appended
    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, BVGraph1_maxY]);

    // create chart grids to be appended
    const makeYLines = () => d3.axisLeft()
      .scale(yScale)

  // Append the xAxis (xScale) to the chart
    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

  // Append the yAxis (yScale) to the chart
    chart.append('g')
      .call(d3.axisLeft(yScale));


  // Append grid to the chart
    chart.append('g')
      .attr('class', 'grid')
      .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat('')
      )

// container items to be grouped together.  add data
    const barGroups = chart.selectAll()
      .data(firstGraph)
      .enter()
      .append('g')

    // when mouse is on the bar, do this
    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => xScale(g.Funding_Category))
      .attr('y', (g) => yScale(g.Total))
      .attr('height', (g) => height - yScale(g.Total))
      .attr('width', xScale.bandwidth())
      .on('mouseenter', function (actual, i) {
        d3.selectAll('.Total')
          .attr('opacity', 0)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.6)
          .attr('x', (a) => xScale(a.Funding_Category) - 5)
          .attr('width', xScale.bandwidth() + 10)

        const y = yScale(actual.Total)

        line = chart.append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width)
          .attr('y2', y)

        barGroups.append('text')
          .attr('class', 'divergence')
          .attr('x', (a) => xScale(a.Funding_Category) + xScale.bandwidth() / 2)
          .attr('y', (a) => yScale(a.Total) + 30)
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .text((a, idx) => {
            const divergence = (a.Total - actual.Total).toFixed(1)
            
            let text = ''
            if (divergence > 0) text += '+'
            text += `${divergence}`

            return idx !== i ? text : '';
          })

      })
  // when mouse is off the bar, do this
      .on('mouseleave', function () {
        d3.selectAll('.Total')
          .attr('opacity', 1)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', (a) => xScale(a.Funding_Category))
          .attr('width', xScale.bandwidth())

        chart.selectAll('#limit').remove()
        chart.selectAll('.divergence').remove()
      })

    barGroups 
      .append('text')
      .attr('class', 'Total')
      .attr('x', (a) => xScale(a.Funding_Category) + xScale.bandwidth() / 2)
      .attr('y', (a) => yScale(a.Total) + 30)
      .attr('text-anchor', 'middle')
      .text((a) => `${(a.Total)}`)

            
  // xAxis label
    svg
      .append('text')
      .attr('class', 'label')
      .attr('x',50)
      .attr('y', 80)
      .attr('text-anchor', 'middle')
      .text('BV ($K)')

  //  label
    svg.append('text')
      .attr('class', 'label')
      .attr('x', width / 2 + margin)//  label
      .attr('y', height + margin * 1.7 )
      .attr('text-anchor', 'middle')
      .text('Funding Sources')

  //  label
    svg.append('text')
      .attr('class', 'title')
      .attr('x', width / 2 + margin)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text('Business Volume Projection')

  //  label
    svg.append('text')
      .attr('class', 'source')
      .attr('x', width - margin / 2)
      .attr('y', height + margin * 1.7)
      .attr('text-anchor', 'start')
      .text('UCB Bootcamp, 2019')
};

//*******************************************************
//  JS for Second Graph
//******************************************************

function find_in_object(my_object, my_criteria){

  return my_object.filter(function(obj) {
    return Object.keys(my_criteria).every(function(c) {
      return obj[c] == my_criteria[c];
    });
  });

}

function createGraph2(firstData, secondGraph){

  var Year = firstData.map((i) => i.Year)
 
  console.log(Year)

 // Get Trace Data
  var Year1 = find_in_object(secondGraph, {Year: Year[4]});
  var Total1 = Year1.map((z) => z.Total);
  var TotalNum1 = Total1.map(Number)
  var FundingCategory1 = Year1.map((i) => i.Funding_Category)

  console.log(Year1);

  var Year2 = find_in_object(secondGraph, {Year: Year[3]});
  var Total2 = Year2.map((z) => z.Total);
  var TotalNum2 = Total2.map(Number)
  var FundingCategory2 = Year2.map((i) => i.Funding_Category)

  console.log(Year2);

  var Year3 = find_in_object(secondGraph, {Year: Year[2]});
  var Total3 = Year3.map((z) => z.Total);
  var TotalNum3 = Total3.map(Number)
  var FundingCategory3 = Year3.map((i) => i.Funding_Category)

  console.log(Year3);

  var Year4 = find_in_object(secondGraph, {Year: Year[1]});
  var Total4 = Year4.map((z) => z.Total);
  var TotalNum4 = Total4.map(Number)
  var FundingCategory4 = Year4.map((i) => i.Funding_Category)

  console.log(Year4);

  var Year5 = find_in_object(secondGraph, {Year: Year[0]});
  var Total5 = Year5.map((z) => z.Total);
  var TotalNum5 = Total5.map(Number)
  var FundingCategory5 = Year5.map((i) => i.Funding_Category)

  console.log();



  var trace1 = {
    x: FundingCategory1,
    y: TotalNum1,
    name: Year[0],
    type: 'bar'
  };



  var trace2 = {
    x: FundingCategory2,
    y: TotalNum2,
    name: Year[1],
    type: 'bar'
  };

  var trace3 = {
    x: FundingCategory3,
    y: TotalNum3,
    name: Year[2],
    type: 'bar'
  };

  var trace4 = {
    x: FundingCategory4,
    y: TotalNum4,
    name: Year[3],
    type: 'bar'
  };

  var trace5 = {
    x: FundingCategory5,
    y: TotalNum5,
    name: Year[4],
    type: 'bar'
  };


  var data = [trace1, trace2, trace3, trace4, trace5];

  console.log(data)

  var layout = {
  grid: {rows: 1, columns: 1, pattern: 'independent'}, autosize: false,
  width: 1000,
  height:  600,
  };



  Plotly.newPlot('container2', data ,layout);


};