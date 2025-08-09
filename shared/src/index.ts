import express from "express";
import "dotenv/config";
import { PORT } from "./config";

const app = express();
const port = PORT!;

app.listen(port, () => {
  console.log(`Shared Server is running on port ${port}`);
});
