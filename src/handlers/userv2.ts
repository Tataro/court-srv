import { Router, Request, Response } from "express";
import { MongoClient, Db } from "mongodb";

let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const uri = process.env.MONGODB_URI as string;

  const client = await MongoClient.connect(uri);

  const db = client.db(process.env.MONGODB_DB);

  cachedDb = db;
  return db;
}
// import { connectToDatabase } from "../db";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("users");
    // console.log("xxxxxxxxx");
    const users = await collection.find({}).limit(10).toArray();

    console.log("users", users);
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retrieve users" });
  }
});

export default router;
