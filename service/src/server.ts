import express, { Application, Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import routes from "./routes";
import mongoes from "./db/mongoes";
import User from "./models/user";

async function connectDB() {
  await mongoes.connect();
  console.log("Connected ✅");
}

const app: Application = express();

const displayRoutes = require("express-routemap");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.get("/api/v1", (req: Request, res: Response) => {
  res.json({
    code: 200,
    vesion: "1.0",
  });
});

app.use("/api/v1", routes.router);

connectDB().then(() => {
  app.listen(port, async () => {
    console.log(`start :${port}`);

    // const user = new User({ name_th: "test" });
    // await user.save();
    // webhookService.handleNoti(`start :${port}`);
    displayRoutes(app);
  });
});
