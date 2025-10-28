// ---- Steinburg WebGIS: minimal, proven WMS pattern ----

// 1) Map + basemap
const map = L.map('map').setView([53.92, 9.52], 10);
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19, attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 2) Small helper: add WMS with optional proxy + loud errors
const PROXY = 'https://corsproxy.io/?'; // comment out to try direct
function addWMS({ title, url, options = {}, useProxy = true }) {
  const full = useProxy ? PROXY + encodeURIComponent(url) : url;
  const layer = L.tileLayer.wms(full, {
    format: 'image/png',
    transparent: true,
    version: '1.1.1',   // safer axis order
    ...options,
    errorTileUrl:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB' // red if failing
  });
  layer.on('tileerror', (e) => console.warn(`[WMS ERROR] ${title}`, e));
  return { title, layer };
}

// 3) Known-good WMS (3857) – should show immediately when toggled
const esriImagery = addWMS({
  title: '🛰️ Esri World Imagery',
  url: 'https://services.arcgisonline.com/arcgis/services/World_Imagery/MapServer/WMSServer?',
  options: { layers: '0', transparent: false },
  useProxy: false // Esri allows direct
});

// 4) Schleswig-Holstein boundaries (requires proxy due to CORS)
const shKreise = addWMS({
  title: '🧭 SH Kreisgrenzen',
  url: 'https://geodienste.schleswig-holstein.de/ows/verwaltungsgrenzen?',
  options: { layers: 'kreisgrenzen' },
  useProxy: true
});

// 5) Add overlays + control
const overlays = {};
[esriImagery, shKreise].forEach(({ title, layer }) => { overlays[title] = layer; });
L.control.layers({ 'OpenStreetMap': osm }, overlays, { collapsed: false }).addTo(map);

// 6) Show one overlay by default so you SEE something now
shKreise.layer.addTo(map);

// 7) Minimal debug
console.log('Map ready. If overlays don’t appear, check Network tab for GetMap responses (status 200 & image/png).');
