import "dotenv/config";

import errorMiddleware from "./handlers/error.handler";
import express from "express";
import { PORT } from "./config";
import rateLimit from "express-rate-limit";
import router from "./routes";
const app = express();

// Defining the limiter :-
const limiter = rateLimit({
  windowMs: 60 * 1000,
  message: "Request rate Exceed",
  limit: 10
});

// Adding the middleware for extracting data :-
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("uploads"));
app.use(limiter);

app.use("/api/v1/", router);

// Introducing the middleware for error :-
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`Server is  running on the PORT : ${PORT}`);
});
