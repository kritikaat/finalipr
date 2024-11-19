import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import schoolRoutes from "./routes/schoolRoutes.js";
import competitionRoutes from "./routes/competitonRoutes.js";
import essayRoutes from "./routes/essayRoutes.js";
import eloquenceRoutes from "./routes/eloquenceRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const prisma = new PrismaClient({
  log: ["query"],
});
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

// Route prefixes
app.use("/api", schoolRoutes);
app.use("/api", competitionRoutes);
app.use("/api/essay", essayRoutes);
app.use("/api/eloquence", eloquenceRoutes);
app.use("/api", authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const startServer = async () => {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

startServer();
