var defaultCenter = [40.812575,-73.922024];
var defaultZoom = 14;

var map = L.map('my-map').setView(defaultCenter, defaultZoom);

L.tileLayer('https://a.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const lookupLandUse = function(landUseCode) {

  switch(landUseCode) {
  case '01':
    return {
      color: "#f4f455",
      description: 'One & Two Family'
    }
  case '02':
    return {
      color: "#f7d496",
      description: 'Multi - Family Walk- Up Buldings'
    }
  case '03':
    return {
      color: "#FF9900",
      description: 'Multi - Family Elevator'
    }
  case '04':
    return {
      color: "#f7cabf",
      description: 'Mixed Residential and Commercial'
    }
  case '05':
    return {
      color: "#ea6661",
      description: 'Commercial and Office'
    }
  case '06':
    return {
      color: "#d36ff4",
      description: 'Industrial and Manufacturing'
    }
  case '07':
    return {
      color: "#dac0e8",
      description: 'Transportation and Utility'
    }
  case '08':
    return {
      color: "#5CA2D1",
      description: 'Public Facilities and Institutions'
    }
  case '09':
    return {
      color: "#8ece7c",
      description: 'Open Space and Outdoor Recreation'
    }
  case '10':
    return {
      color: "#bab8b6",
      description: 'Parking Facilities'
    }
  case '11':
    return {
      color: "#5f5f60",
      description: 'Vacant Land'
    }
  default:
    return {
      color: 'black',
      description: 'No LU Recorded'
    }
  }
}

var LU_Map = L.geoJSON(StudyAreaPlutoData, {
      style: function(feature) {

          return {
            color: 'BLACK',
            fillColor: lookupLandUse(feature.properties.LandUse).color,
            fillOpacity: 0.8,
            weight: 1,
          }
      },

    onEachFeature: function(feature, layer) {
      const description = lookupLandUse(feature.properties.LandUse).description;

      layer.bindPopup(`${feature.properties.Address}<br/>${description}`, {
        closeButton: false,
        minWidth: 60,
        offset: [0, -10]
      });
      layer.on('mouseover', function (e) {
        this.openPopup();

        e.target.setStyle({
          weight: 3,
          color: '#FFF',
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
      });
      layer.on('mouseout', function (e) {
        this.closePopup();
        LU_Map.resetStyle(e.target);
      });
    }
  }).addTo(map);

var myStyle = {
  radius: 10,
  opacity: 1,
  fillColor: 'red',
  fillOpacity: 0.5,
  color: '#FFF',
  weight: .05
};

var geojsonMarkerOptions = {
  style: 'myStyle',
};

var OfficeOverlay  = L.geoJSON(NewOfficeSpace, {
   pointToLayer: function (feature, latlng) {
       return L.circleMarker(latlng, geojsonMarkerOptions);
   }
}).addTo(map);

var overlays = {
  "Offices": OfficeOverlay
};

L.control.layers({}, overlays).addTo(map);

// OfficeOverlay.forEach(function(OfficeObject) {
// //   var latLon = [OfficeObject.lat, OfficeObject.lon];
// //
// //   // if (buildingObject.buildingtype === 'Commercial') buildingtypeColor = 'red';
// //   // if (buildingObject.buildingtype === 'Mixed Use') buildingtypeColor = 'orange';
// //
// //   var options = {
// //     radius: 10,
// //     opacity: 1,
// //     fillColor: "black",
// //     fillOpacity: 0.5,
// //     color: '#FFF',
// //     weight: .05,
// //   };
// //
// //   var marker = L.circleMarker(latLon, options)
// //       .bindPopup(OfficeObject.Address + ' Built in ' +  OfficeObject.YearBuilt, {offset: [0, -6]})
// //       .addTo(map)
// //   // add the marker to the markersArray
// //   markersArray.push(marker);
// // });

$('.fly-to-random').click(function(e) {
  var randomMarker = markersArray[Math.floor(Math.random() * markersArray.length)];
  map.setView(randomMarker._latlng);
  randomMarker.openPopup();
  e.stopPropagation();
});

$('.reset').click(function() {
  map.flyTo(defaultCenter, defaultZoom)
}).addTo(map);
