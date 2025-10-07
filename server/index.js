require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "https://api.nasa.gov/mars-photos/api/v1",
  "http://localhost:3000",
];
app.use(express.json());
app.use(cors({ origin: allowedOrigins }));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const NASA_API_KEY = process.env.NASA_API_KEY;
console.log("NASA_API_KEY:", NASA_API_KEY);

app.get("/api/rovers", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${NASA_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching rover data:", err);
    res.status(500).json({ error: "Failed to fetch rovers" });
  }
});

app.get("/api/rovers/:name/photos", async (req, res) => {
  const { name } = req.params;
  const { sol = 1000, camera, earth_date } = req.query;

  try {
    let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/photos?api_key=${NASA_API_KEY}`;

    if (earth_date) {
      url += `&earth_date=${earth_date}`;
    } else {
      url += `&sol=${sol}`;
    }

    if (camera) {
      url += `&camera=${camera}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching rover photos:", err);
    res.status(500).json({ error: "Failed to fetch rover photos" });
  }
});
