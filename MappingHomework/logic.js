// Creating our initial map object

var myMap = L.map("map", {

  center: [37.0902, -95.7129],

  zoom: 5

});


// Adding a tile layer (the background map image) to our map

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// API endpoint
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";



// Grab the data with d3

d3.json(link, function(data) {

    // Grab the 'features' from the data
    var features = data.features;

    // Grab the titles of the locations
    var titles = []; 
    features.forEach(function(d) {
      var title = d.properties.title;
      var words = title.split("of");
     titles.push(words[1]);

    });

    console.log(titles)


    // Loop through each feature and add a marker using the latitude/longitude values

    for(var i = 0; i < features.length; i++) {
     
      // Add circles to the map
      L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
        fillOpacity: 0.75,
        color: "#404040",
        weight: 0.5,

        // Adjust fill color
        fillColor: chooseColor(features[i].properties.mag),

        // Adjust radius
        radius: markerSize(features[i].properties.mag)

      }).bindPopup("<h3>" + titles[i] + "</h3><hr><h3><center>" + features[i].properties.mag + " ML</center></h3>").addTo(myMap);

    }



    // Create a legend for the map

    var legend = L.control({position: "bottomright"});
    // Legend will be called once map is displayed

    legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3,4,5],
        labels=[];
        



      // Loop through our magnitude intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
            '<i style="background:' +  chooseColor(grades[i]) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
    };



    // Add the legend to the map
    legend.addTo(myMap);

});


// Function to choose marker color based on magnitude value

function chooseColor(magnitude) {

  if (magnitude > 5) {
    return '##ff000';
  }
  else if (magnitude >= 3 && magnitude <= 5) {
    return '#ffbf00';
  }
  else if (magnitude >= 1 && magnitude <= 2) {
    return '#ffff00';
  }
  else   {
    return '#00ff80';
  }
}

// Function to adjust marker radius based on magnitude value

function markerSize(magnitude) {
  return magnitude * 20000;
}