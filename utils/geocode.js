const https = require("https");

async function geocodeLocation(location) {
  return new Promise((resolve, reject) => {
    const query = encodeURIComponent(`${location}, India`);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

    const options = {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; WanderlustProject/1.0)"
      }
    };

    https.get(url, options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          if (!json || json.length === 0) return resolve(null);
          resolve({
            type: "Point",
            coordinates: [parseFloat(json[0].lon), parseFloat(json[0].lat)]
          });
        } catch (err) {
          console.error(err);
          resolve(null);
        }
      });
    }).on("error", (err) => {
      console.error(err);
      resolve(null);
    });
  });
}

module.exports = geocodeLocation;




