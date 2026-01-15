import dotenv from "dotenv";
dotenv.config();
import cors from "cors"

import express from "express";
import { connectDB } from "./config/db.js"; 
import notesRoutes from "./routes/notesRoute.js";
import rateLimiter from "./middleware/rateLimiter.js";


const app = express();

//middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json()); //this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

//our simple custom middleware
// app.use((req, res, next)=> {
// console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
// next();
// });


connectDB()
  .then(() => {
    app.use("/api/notes", notesRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });
