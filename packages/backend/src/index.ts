import express from "express";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());

app.get("/api/data", async (req: any, res: any) => {
  res.json({});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
