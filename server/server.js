require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const PORT = 3000;
const HOST = "0.0.0.0";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());

const authRoutes = require("./routes/auth");
const predictRoutes = require("./routes/predict");
app.use("/auth", authRoutes);
app.use("/", predictRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, HOST, () => {
      console.log(`✅ Server running at http://${HOST}:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
