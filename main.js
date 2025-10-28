// Initialize the map centered on Kreis Steinburg
var map = L.map('map').setView([53.92, 9.52], 10);

// Basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add WMS Layer (Protected Areas - Naturschutzgebiete)
var nsg = L.tileLayer.wms('https://geodienste.schleswig-holstein.de/INSPIRE_NSG/SH_WMS?', {
  layers: 'Naturschutzgebiete',
  format: 'image/png',
  transparent: true,
  attribution: '© LfU Schleswig-Holstein'
}).addTo(map);

// Add GeoJSON Layer (Train stations in Germany from OSM Overpass)
fetch('https://raw.githubusercontent.com/deldersveld/topojson/master/countries/germany/germany-stations.json')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: function(feature, layer) {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(feature.properties.name);
        }
      },
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, { radius: 5, color: 'blue' });
      }
    }).addTo(map);
  })
  .catch(err => console.error('GeoJSON load error:', err));

