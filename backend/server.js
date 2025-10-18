import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("🌱 Go GREEN Server is Running Successfully!");
});

// Example GET route
app.get("/api/hello", (req, res) => {
  res.json({ message: "👋 Hello from your Node.js server!" });
});

// Example POST route for eco actions
app.post("/api/eco", (req, res) => {
  const { action } = req.body;
  const points = 10;
  res.json({
    feedback: `Nice job doing: ${action} 🌎`,
    points: points
  });
});

app.listen(3000, () =>
  console.log("✅ Server running on http://localhost:3000")
);
