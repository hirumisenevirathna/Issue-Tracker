const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const issueRoutes = require("./routes/issue.routes");

const app = express();

app.use(cors({
  origin: [
    "https://trustworthy-courage-production.up.railway.app",
    "http://localhost:5173"
  ],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);

app.get("/", (req, res) => {
  res.send("Issue Tracker API running");
});

module.exports = app;