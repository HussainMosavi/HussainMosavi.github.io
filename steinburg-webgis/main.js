// ======================================
// Steinburg WebGIS - CORINE (EPSG:4326)
// ======================================

// 1️⃣ Define map CRS as EPSG:4326 (since CORINE WMS supports this)
var crs4326 = new L.Proj.CRS(
  'EPSG:4326',
  '+proj=longlat +datum=WGS84 +no_defs',
  {
    resolutions: [1.40625, 0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125],
    origin: [-180, 90]
  }
);

// 2️⃣ Initialize map with EPSG:4326 CRS
var map = L.map('map', {
  crs: crs4326,
  center: [53.92, 9.52], // Steinburg area
  zoom: 7
});

// 3️⃣ Add base layer (OpenStreetMap in EPSG:4326)
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 4️⃣ Use proxy to avoid CORS issues on GitHub Pages
var proxy = 'https://corsproxy.io/?';
var corineUrl = 'https://ows.mundialis.de/services/service?';

// 5️⃣ Add CORINE Land Cover WMS (EPSG:4326)
var corine = L.tileLayer.wms(proxy + encodeURIComponent(corineUrl), {
  layers: 'CORINE',
  format: 'image/png',
  transparent: true,
  version: '1.1.1',
  srs: 'EPSG:4326',
  attribution: '© European Environment Agency (EEA) via mundialis.de'
}).addTo(map);

// 6️⃣ Add layer control
L.control.layers({ 'OpenStreetMap': osm }, { '🌍 CORINE Land Cover': corine }, { collapsed: false }).addTo(map);
