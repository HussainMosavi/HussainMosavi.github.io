// ===============================
// Steinburg WebGIS - main.js (Fixed CORINE version)
// ===============================

// 1️⃣ Initialize map (center on Kreis Steinburg)
var map = L.map('map').setView([53.92, 9.52], 9);

// 2️⃣ Add OSM basemap
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 3️⃣ Optional: Esri Imagery for visual comparison
var imagery = L.tileLayer.wms(
  "https://services.arcgisonline.com/arcgis/services/World_Imagery/MapServer/WMSServer?",
  {
    layers: "0",
    format: "image/png",
    transparent: false,
    attribution: "© Esri, Maxar, Earthstar Geographics"
  }
);

// 4️⃣ Add CORINE Land Cover (Fixed params)
var proxy = "https://corsproxy.io/?";
var corineUrl = "https://ows.mundialis.de/services/service?";

var corine = L.tileLayer.wms(proxy + encodeURIComponent(corineUrl), {
  SERVICE: "WMS",
  VERSION: "1.3.0",
  REQUEST: "GetMap",
  layers: "CORINE",
  styles: "",
  format: "image/png",
  transparent: true,
  uppercase: true,
  crs: L.CRS.EPSG3857,
  attribution: "© European Environment Agency (EEA) via mundialis.de"
}).addTo(map);

// 5️⃣ Layer control
var baseLayers = {
  "🗺️ OpenStreetMap": osm
};

var overlayLayers = {
  "🌍 CORINE Land Cover": corine,
  "🛰️ Esri Imagery": imagery
};

L.control.layers(baseLayers, overlayLayers, { collapsed: false }).addTo(map);

// 6️⃣ Console log for debugging
console.log("Steinburg WebGIS loaded with CORINE Land Cover WMS.");
