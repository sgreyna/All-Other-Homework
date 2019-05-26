
// from data.js
var tData = data;
// Get a reference to the table body
var tbody = d3.select("tbody");
// initial load data
tData.forEach((ufosighting) =>
{
    // append a row for each data
    var row = tbody.append("tr");
    // append cell per value
    Object.entries(ufosighting).forEach(([key, value]) =>{
        var cell = row.append("td");
        cell.text(value);
    })
});


// date placeholder
var catchInput = "this"
// Select the filter button

var submit = d3.select("#filter-btn");

submit.on("click", function() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element 
    var inputElement = d3.select("#datetime");
    
    if (inputElement.property("value").length ==0)
    {
        // if input is null; use the placeholder value
        var inputValue = inputElement.attr("placeholder");
        console.log(inputValue);
    } else {
        // Get the value property of the input element
        var inputValue = inputElement.property("value");
        console.log(inputValue);
    };

    catchInput = inputValue;
    
    //clear table
    var curTable = document.getElementById("ufo-table");
    for (var i = curTable.rows.length - 1; i > 0; i--)
    {
        curTable.deleteRow(i);
    }

    var tableData = tData.filter(selectDate);

    tableData.forEach((ufosighting) =>
    {
        // append a row for each data
        var row = tbody.append("tr");
        // append cell per value
        Object.entries(ufosighting).forEach(([key, value]) =>{
            var cell = row.append("td");
            cell.text(value);
        })
    });
   
});


// Create a custom filtering function
function selectDate(sights) 
{
    return sights.datetime == catchInput;
}

