import "./types";
import express from "express";
import sequelize from "./models";
import cors from "cors";

import dotenv from "dotenv";
import publicRouter from "./routes/public";
import privateRouter from "./routes/private";
import loggerMiddleware from "./middleware/loggerMiddleware";

dotenv.config();

const app = express();

app
  .use(express.json())
  .use(
    cors({
      origin: process.env.CORS_ORIGIN!,
      optionsSuccessStatus: 200,
    })
  )
  .use(loggerMiddleware)
  .use("/api", publicRouter)
  .use("/api", privateRouter);

sequelize.sync().catch((err: any) => {
  console.error("Error syncing Sequelize models:", err);
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

export default app;
