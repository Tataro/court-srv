import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

import userHandlers from "./handlers/user";

const app = express();

app.use(bodyParser.json());

app.use("/users", userHandlers);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Not Found" });
});

export default app;
