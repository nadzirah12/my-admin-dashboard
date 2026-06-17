const express = require("express");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

module.exports = app;