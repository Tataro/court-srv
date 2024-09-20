import { Router, Request, Response } from "express";

import { connectToDatabase } from "../db";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("users");
    const users = await collection.find({}).limit(10).toArray();
    // console.log("users", users);

    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retrieve users" });
  }
});

export default router;
