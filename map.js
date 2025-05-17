document.addEventListener("DOMContentLoaded", function () {
  const map = L.map("map");

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, ©CartoDB',
    subdomains: 'abcd',
    maxZoom: 18
  }).addTo(map);

  const countries = [
    { country: "Switzerland", lat: 46.8182, lon: 8.2275, info: "Highest earning potential" },
    { country: "Singapore", lat: 1.3521, lon: 103.8198, info: "Near-perfect employment rate" },
    { country: "USA", lat: 38.7946, lon: -106.5348, info: "Balanced appeal across categories" },
    { country: "Australia", lat: -25.2744, lon: 133.7751, info: "Strong in education" },
    { country: "Canada", lat: 56.1304, lon: -106.3468, info: "Career and livability balance" },
    { country: "United Kingdom", lat: 55.3781, lon: -3.4360, info: "Top in education" },
    { country: "United Arab Emirates", lat: 23.4241, lon: 53.8478, info: "Career potential in Gulf" },
    { country: "New Zealand", lat: -40.9006, lon: 174.8860, info: "High livability" },
    { country: "Austria", lat: 47.5162, lon: 14.5501, info: "Stable European hub" },
    { country: "Italy", lat: 41.8719, lon: 12.5674, info: "Southern European mobility" },
    { country: "Hong Kong", lat: 22.3193, lon: 114.1694, info: "Economic access in Asia" },
    { country: "Latvia", lat: 56.8796, lon: 24.6032, info: "Emerging EU mobility option" },
    { country: "Malta", lat: 35.9375, lon: 14.3754, info: "Citizenship investment access" },
    { country: "Hungary", lat: 47.1625, lon: 19.5033, info: "Low earnings, high flexibility" },
    { country: "Greece", lat: 39.0742, lon: 21.8243, info: "More mobility than earnings" },
    { country: "Portugal", lat: 39.3999, lon: -8.2245, info: "Popular for remote workers" }
  ];

  const boundsArray = countries.map(c => [c.lat, c.lon]);

  countries.forEach((c, index) => {
    const numberedIcon = L.divIcon({
      className: 'numbered-marker',
      html: `<div class="marker-circle">${index + 1}</div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    L.marker([c.lat, c.lon], { icon: numberedIcon })
      .addTo(map)
      .bindPopup(`<b>${index + 1}. ${c.country}</b><br>${c.info}`);
  });

  map.fitBounds(boundsArray);

  // Legend (floating box on map)
  const legend = L.control({ position: 'bottomleft' });

  legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'leaflet-control map-legend');
    div.innerHTML = `
      <p><strong>Legend</strong></p>
      <p>Scores reflect comparative rankings based on<br>employment, earnings, and livability data.</p>
    `;
    return div;
  };

  legend.addTo(map);

  // Collapsible sections
  document.querySelectorAll(".collapsible").forEach(button => {
    button.addEventListener("click", function () {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
    });
  });

  // Country Info box update
  const descriptions = {}; // Add actual descriptions if needed
  const infoBox = document.getElementById("country-info");

  document.querySelectorAll(".country-btn").forEach(button => {
    button.addEventListener("click", () => {
      const country = button.getAttribute("data-country");
      const imageName = country.replace(/\s+/g, '') + ".png";
      infoBox.innerHTML = `
        <h3>${country}</h3>
        <p>${descriptions[country] || 'Description coming soon.'}</p>
        <img src="${imageName}" alt="${country}" />
      `;
      infoBox.scrollIntoView({ behavior: "smooth" });
    });
  });
});
