document.addEventListener("DOMContentLoaded", () => {
  const mapDiv = document.getElementById("map");

  if (!mapDiv) return;
  const geometry = JSON.parse(mapDiv.dataset.geometry);

  const lat = geometry.coordinates[1];
  const lng = geometry.coordinates[0];

  const map = L.map("map").setView([lat, lng], 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .openPopup();
});

