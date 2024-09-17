import { Router, Request, Response } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const mocks = [
    {
      id: 1,
      name: "John Doe",
      email: "john@gmail.com",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@mail.com",
    },
  ];

  try {
    res.status(200).json(mocks);
  } catch (error) {
    res.status(500).json({ error: "cannot get users" });
  }
});

export default router;
