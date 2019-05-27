function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample

  d3.json("/metadata/" + sample).then((sample) =>{

    // Use d3 to select the panel with id of `#sample-metadata`
    var sample_metadata = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    sample_metadata.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(sample).forEach(([key, value]) => {
      var row = sample_metadata.append("li");
      row.text(`${key}: ${value}`);

    })
  })
};
function buildCharts(sample) 
{

 
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/samples/${sample}`;
  d3.json(url).then((sampledata) => 
  {

    // @TODO: Build a Bubble Chart using the sample data
    var xValues = sampledata.otu_ids;
    var yValues = sampledata.sample_values;
    var tValues = sampledata.otu_labels;
    var mSize = sampledata.sample_values;
    var mClrs = sampledata.otu_ids;

    var trace1 = 
    {
      x: xValues,
      y: yValues,
      text: tValues,
      mode: 'markers',
      marker: 
      {
        size: mSize,
        color: mClrs
      }
    };


    var layout = 
    {
      xaxis: {title: "OTU ID"}
    };

    Plotly.newPlot('bubble', [trace1], layout);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    d3.json(url).then((sampledata) =>
    {
      var pieValue = sampledata.sample_values.slice(0,10);
      var pielabel = sampledata.otu_ids.slice(0, 10);

      var trace2 = [
      {
        values: pieValue,
        labels: pielabel,
        type: 'pie'
      }];

      Plotly.newPlot('pie', trace2);
    });
  });
}

function init() 
{
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => 
  {
    sampleNames.forEach((sample) => 
    {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
