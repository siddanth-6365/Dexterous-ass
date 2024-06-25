import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Routes from "./routes";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const app: Express = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

async function connectToDB() {
  await mongoose
    .connect(process.env.MONGODB_URI as string)
    .catch((error) => console.log('Connection error', error));
}

connectToDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello woring fine!");
});

app.use("/api", Routes);

app.listen(port, () => {
  console.log(`[Server] running at ${port}`);
});
