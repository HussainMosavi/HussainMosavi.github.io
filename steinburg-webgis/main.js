// Initialize the map centered on Steinburg
var map = L.map('map').setView([53.92, 9.52], 10);

// Base map
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// --- 1. CORINE Land Cover (Europe-wide reference WMS)
var corine = L.tileLayer.wms('https://ows.mundialis.de/services/service?', {
  layers: 'CORINE',
  format: 'image/png',
  transparent: true,
  attribution: '© European Environment Agency (EEA)'
});

// --- 2. Schleswig-Holstein Administrative Boundaries
var kreise = L.tileLayer.wms('https://geodienste.schleswig-holstein.de/ows/verwaltungsgrenzen?', {
  layers: 'kreisgrenzen',
  format: 'image/png',
  transparent: true,
  version: '1.1.1',
  crs: L.CRS.EPSG3857,
  attribution: '© Geodienste Schleswig-Holstein'
}).addTo(map);

// --- 3. Add GeoJSON for Train Stations (example points)
fetch('https://raw.githubusercontent.com/glynnbird/trainstationdata/master/data/de_stations.geojson')
  .then(response => response.json())
  .then(data => {
    var stations = L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(`<b>${feature.properties.name}</b>`);
        }
      },
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 4,
          color: '#0077ff',
          fillOpacity: 0.7
        });
      }
    });
    // Add to map and also to layer control
    overlayLayers["🚉 Train Stations (OSM)"] = stations;
    stations.addTo(map);
  });

// --- 4. Layer Control
var baseLayers = { "OpenStreetMap": osm };
var overlayLayers = {
  "🟩 Land Cover (CORINE)": corine,
  "🧭 Kreis Boundaries": kreise
};

L.control.layers(baseLayers, overlayLayers, { collapsed: false }).addTo(map);
