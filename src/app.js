const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const routes = require("./routes");
app.use("/api", routes);

// Base route
app.get("/", (req, res) => {
  res.json({ message: "Backend API is running 🚀" });
});

module.exports = app;