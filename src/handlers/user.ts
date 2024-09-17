import { Router, Request, Response } from "express";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const USERS_TABLE = process.env.USERS_TABLE;
const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const params = {
    TableName: USERS_TABLE,
  };

  try {
    const command = new ScanCommand(params);
    const { Items } = await docClient.send(command);
    res.json(Items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retrieve users" });
  }
});

router.get("/:userId", async (req: Request, res: Response) => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  };

  try {
    const command = new GetCommand(params);
    const { Item } = await docClient.send(command);
    if (Item) {
      const { userId, name } = Item;
      res.json({ userId, name });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find user with provided "userId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retrieve user" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { userId, name } = req.body;

  if (!userId || !name) {
    return res.status(400).json({ error: "userId and name are required" });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId,
      name,
    },
  };

  try {
    const command = new PutCommand(params);
    await docClient.send(command);
    res.status(201).json({ userId, name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create user" });
  }
});

export default router;
