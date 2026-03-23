import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import connectDB from "./db/dbConnect.js";
import cors from "cors";

// Load environment variables from .env file
dotenv.config({ path: "./.env" });
const PORT = process.env.PORT;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"], // allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // allowed headers
  }),
);

app.use("/auth", authRouter);

// First BE should connect to the DB and then only start the server for the world to access.
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Server failed to start due to DB error:", err);
    process.exit(1); // Kill the process here instead
  });
