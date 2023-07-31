import { scrapper } from "./scrapper";
import express from "express";
import cors from "cors";

const app = express();
const port = 9999;

app.use(cors());

app.get("/api/data", async (req: any, res: any) => {
  const data: any = await scrapper();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
