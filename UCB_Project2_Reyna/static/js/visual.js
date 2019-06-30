    


    BVGraph1_YVal = firstGraph.map((s) => s.Total);
    BVGraph1_YVal = BVGraph1_YVal.map(Number);
    BVGraph1_maxY = Math.max.apply(null, BVGraph1_YVal);

    const svg = d3.select('svg');
    const svgContainer = d3.select('#container');
    
    const margin = 80;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;

    const chart = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(firstGraph.map((s) => s.Funding_Category))
      .padding(0.4)
    
    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, BVGraph1_maxY]);

    // vertical grid lines
    // const makeXLines = () => d3.axisBottom()
    //   .scale(xScale)

    const makeYLines = () => d3.axisLeft()
      .scale(yScale)

    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    chart.append('g')
      .call(d3.axisLeft(yScale));

    // vertical grid lines
    // chart.append('g')
    //   .attr('class', 'grid')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(makeXLines()
    //     .tickSize(-height, 0, 0)
    //     .tickFormat('')
    //   )

    chart.append('g')
      .attr('class', 'grid')
      .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat('')
      )

    const barGroups = chart.selectAll()
      .data(firstGraph)
      .enter()
      .append('g')

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

            
    
    svg
      .append('text')
      .attr('class', 'label')
      .attr('x',50)
      .attr('y', 80)
      .attr('text-anchor', 'middle')
      .text('BV ($K)')

    svg.append('text')
      .attr('class', 'label')
      .attr('x', width / 2 + margin)
      .attr('y', height + margin * 1.7 )
      .attr('text-anchor', 'middle')
      .text('Funding Sources')

    svg.append('text')
      .attr('class', 'title')
      .attr('x', width / 2 + margin)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text('Business Volume Projection')

    svg.append('text')
      .attr('class', 'source')
      .attr('x', width - margin / 2)
      .attr('y', height + margin * 1.7)
      .attr('text-anchor', 'start')
      .text('UCB Bootcamp, 2019')
  