import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

import userRoutes from "./routes/user";

const app = express();

app.use(bodyParser.json());

// ตั้งค่าเส้นทาง (Routes)
app.use("/users", userRoutes);

// จัดการข้อผิดพลาด 404
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Not Found" });
});

export default app;
