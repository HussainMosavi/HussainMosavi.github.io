// ===============================
//  Steinburg WebGIS - main.js
// ===============================

// 1️⃣ Initialize the map (centered on Kreis Steinburg)
var map = L.map('map').setView([53.92, 9.52], 10);

// 2️⃣ Add OpenStreetMap basemap
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 3️⃣ Define CORS proxy (allows external WMS to load from GitHub)
var proxy = 'https://corsproxy.io/?';

// 4️⃣ CORINE Land Cover (via proxy to avoid CORS issues)
var corineUrl = 'https://ows.mundialis.de/services/service?';

var corine = L.tileLayer.wms(proxy + encodeURIComponent(corineUrl), {
  layers: 'CORINE',
  format: 'image/png',
  transparent: true,
  version: '1.3.0',
  attribution: '© European Environment Agency (EEA) via mundialis.de'
}).addTo(map);

// 5️⃣ Add another working WMS for testing (Esri World Imagery)
var imagery = L.tileLayer.wms('https://services.arcgisonline.com/arcgis/services/World_Imagery/MapServer/WMSServer?', {
  layers: '0',
  format: 'image/png',
  transparent: false,
  attribution: '© Esri, Maxar, Earthstar Geographics'
});

// 6️⃣ Add a layer control to toggle overlays
var baseLayers = {
  "OpenStreetMap": osm
};

var overlayLayers = {
  "🌍 CORINE Land Cover": corine,
  "🛰️ Esri World Imagery": imagery
};

L.control.layers(baseLayers, overlayLayers, { collapsed: false }).addTo(map);

// 7️⃣ Confirm in console
console.log("Steinburg WebGIS map initialized successfully.");
