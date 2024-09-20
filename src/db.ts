import { MongoClient, Db } from "mongodb";
import "dotenv/config";

let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const uri = process.env.MONGODB_URI as string;
  //   console.log("uri", uri);

  const client = await MongoClient.connect(uri);

  const db = client.db(process.env.MONGODB_DB);

  cachedDb = db;
  return db;
}
