require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const PORT = 3000;
const HOST = "0.0.0.0";

const app = express();


app.use(cors({ origin: true, credentials: true }));
app.use(express.json());


const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

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