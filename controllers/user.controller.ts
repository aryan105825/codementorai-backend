import { Response } from "express";
import prisma from "../config/prisma";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

export const getMe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    });

    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user profile." });
  }
};
