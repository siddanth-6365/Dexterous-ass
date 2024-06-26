import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Routes from "./routes";
import cors from "cors";
import { connectToDB } from "./db";

dotenv.config();
const app: Express = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectToDB();

app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Hello woring fine!" });
});

app.use("/api", Routes);

app.listen(port, () => {
  console.log(`[Server] running at ${port}`);
});
