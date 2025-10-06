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

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

const PORT = process.env.PORT || 4000;

const NASA_API_KEY = process.env.NASA_API_KEY;
console.log("NASA_API_KEY:", NASA_API_KEY);

// async function fetchRovers() {
//   try {
//     const response = await axios.get(
//       `https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${NASA_API_KEY}`
//     );
//     console.log("Rover data:", response.data);
//     const rovers = response.data.rovers;
//     console.log("Rovers:", rovers);
//   } catch (error) {
//     console.error("Error fetching rover data:", error);
//   }
// }
// fetchRovers();

// app.get("/api/rovers", async (req, res) => {
//   try {
//     const url = `https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${NASA_API_KEY}`;
//     console.log("Requesting:", url);

//     const response = await axios.get(url);
//     res.json(response.data);
//   } catch (err) {
//     console.error("Error from NASA:", err.response?.status, err.response?.data);
//     res.status(500).json({ error: "Failed to fetch rovers" });
//   }
// });
app.get("/", (req, res) => {
  res.send("HELLO");
});

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const fetch = (...args) =>
//   import("node-fetch").then(({ default: fetch }) => fetch(...args));

// const app = express();
// app.use(cors());

// const PORT = process.env.PORT || 5000;
// const NASA_API_KEY = process.env.NASA_API_KEY;

// app.get("/", (req, res) => {
//   res.send(" Mars Rovers backend is running!");
// });

// app.get("/api/rovers", async (req, res) => {
//   try {
//     const response = await fetch(
//       `https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${NASA_API_KEY}`
//     );
//     const data = await response.json();
//     res.json(data);
//   } catch (err) {
//     console.error("Error fetching rover data:", err);
//     res.status(500).json({ error: "Failed to fetch rovers" });
//   }
// });

// app.get("/api/rovers/:name/photos", async (req, res) => {
//   const { name } = req.params;
//   const { sol, earth_date, camera, page } = req.query;

//   const queryParams = new URLSearchParams({
//     api_key: NASA_API_KEY,
//     ...(sol ? { sol } : {}),
//     ...(earth_date ? { earth_date } : {}),
//     ...(camera ? { camera } : {}),
//     ...(page ? { page } : { page: 1 }),
//   });

//   try {
//     const response = await fetch(
//       `https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/photos?${queryParams}`
//     );
//     const data = await response.json();
//     res.json(data);
//   } catch (err) {
//     console.error("Error fetching photos:", err);
//     res.status(500).json({ error: "Failed to fetch photos" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
