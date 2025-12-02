import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./models/index.js";
import BQRouter from "./routes/bqRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", BQRouter);

// Default route (optional, just to test)
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

// Sync DB and start server
db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing DB:", err);
  });
