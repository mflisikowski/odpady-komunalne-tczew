import { scrapper } from "./scrapper";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/api/data", async (req: any, res: any) => {
  const data: any = await scrapper();
  res.json(data);
});

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 9999;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

export default app;