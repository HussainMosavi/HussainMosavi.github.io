// 1️⃣ Initialize map
var map = L.map('map').setView([53.92, 9.52], 10); // Steinburg area

// 2️⃣ Add basemap (OpenStreetMap)
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 3️⃣ Add CORINE Land Cover WMS layer
var corine = L.tileLayer.wms('https://ows.mundialis.de/services/service?', {
  layers: 'CORINE',
  format: 'image/png',
  transparent: true,
  attribution: '© European Environment Agency (EEA) via mundialis.de'
}).addTo(map);

// 4️⃣ Optional: add a layer control
var baseLayers = { "OpenStreetMap": osm };
var overlayLayers = { "Land Cover (CORINE)": corine };
L.control.layers(baseLayers, overlayLayers, { collapsed: false }).addTo(map);
