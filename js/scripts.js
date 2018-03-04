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
      opacity: ".5",
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

var StudyAreaBoundary = L.geoJSON(StudyArea, {
  fillColor: "none",
  color: "#ff8049",
  weight: 3,
}).addTo(map);


var LU_Map = L.geoJSON(PlutoData, {
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

  var geojsonMarkerOptions = {
      radius: 10,
      opacity: 1,
      fillColor: "ORANGE",
      fillOpacity: 0.5,
      weight: .05,
  };

  var OfficeOverlay  = L.geoJSON(NewOfficeSpace, {
     pointToLayer: function (feature, latlng) {
       var marker = L.circleMarker(latlng, geojsonMarkerOptions)
           .bindPopup(feature.properties.Address + ' Built in ' +  feature.properties.YearBuilt, {offset: [0, -6]});
           marker.on('mouseover', function (e) {
               this.openPopup();
           });
           marker.on('mouseout', function (e) {
               this.closePopup();
           });

        return marker;
    }
   })

  var ResidentialPoints = {
    radius: 10,
    opacity: 1,
    fillColor: "YELLOW",
    fillOpacity: 0.5,
    weight: .05,
  };

  var ResidentialOverlay = L.geoJSON(NewResidentialFloorArea, {
    pointToLayer: function (feature, latlng) {
      var marker = L.circleMarker(latlng, geojsonMarkerOptions)
          .bindPopup(feature.properties.Address + ' Built in ' +  feature.properties.YearBuilt, {offset: [0, -6]});
          marker.on('mouseover', function (e) {
              this.openPopup();
          });
          marker.on('mouseout', function (e) {
              this.closePopup();
          });

       return marker;
      }
  })

  var RetailPoints = {
    radius: 10,
    opacity: 1,
    fillColor: "RED",
    fillOpacity: 0.5,
    weight: .05,
  };

  var RetailOverlay = L.geoJSON(NewRetailFloorArea, {
    pointToLayer: function (feature, latlng) {
      var marker = L.circleMarker(latlng, geojsonMarkerOptions)
          .bindPopup(feature.properties.Address + ' Built in ' +  feature.properties.YearBuilt, {offset: [0, -6]});
          marker.on('mouseover', function (e) {
              this.openPopup();
          });
          marker.on('mouseout', function (e) {
              this.closePopup();
          });

       return marker;
      }
  })

  var StoragePoints = {
    radius: 10,
    opacity: 1,
    fillColor: "#939393",
    fillOpacity: 0.5,
    weight: .05,
  };

  var StorageOverlay = L.geoJSON(NewStorageArea, {
    pointToLayer: function (feature, latlng) {
      var marker = L.circleMarker(latlng, geojsonMarkerOptions)
          .bindPopup(feature.properties.Address + ' Built in ' +  feature.properties.YearBuilt, {offset: [0, -6]});
          marker.on('mouseover', function (e) {
              this.openPopup();
          });
          marker.on('mouseout', function (e) {
              this.closePopup();
          });

       return marker;
      }
  })

  var FactoryPoints = {
    radius: 10,
    opacity: 1,
    fillColor: "#262626",
    fillOpacity: 0.5,
    weight: .05,
  };

  var FactoryOverlay = L.geoJSON(NewFactoryFloorArea, {
    pointToLayer: function (feature, latlng) {
      var marker = L.circleMarker(latlng, geojsonMarkerOptions)
          .bindPopup(feature.properties.Address + ' Built in ' +  feature.properties.YearBuilt, {offset: [0, -6]});
          marker.on('mouseover', function (e) {
              this.openPopup();
          });
          marker.on('mouseout', function (e) {
              this.closePopup();
          });

       return marker;
   }
  })

  var overlays = {
    "LandUse": LU_Map,
    "Offices": OfficeOverlay,
    "Residential": ResidentialOverlay,
    "Retail": RetailOverlay,
    "Storage": StorageOverlay,
    "Factory": FactoryOverlay,
  };

  L.control.layers({}, overlays).addTo(map);

  $(document).ready(function(){
  $("LandUse").click(function(){
          $("#legend").hide();
      });
  });
