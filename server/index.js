require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

const NASA_API_KEY = process.env.NASA_API_KEY;
console.log("NASA_API_KEY:", NASA_API_KEY);

app.get("/api/rovers", async (req, res) => {
  try {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${NASA_API_KEY}`;
    console.log("Requesting:", url);

    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error("Error from NASA:", err.response?.status, err.response?.data);
    res.status(500).json({ error: "Failed to fetch rovers" });
  }
});

// app.get("/api/rovers", async (req, res) => {
//   try {
//     const response = await axios.get(
//       `https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${NASA_API_KEY}`
//     );
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch rovers" });
//   }
// });
