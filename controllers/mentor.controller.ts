import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import { Request, Response } from "express";
import prisma from "../config/prisma";

export const submitReview = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { sessionId, toUserId, rating, feedback } = req.body;

  if (!req.userId) {
    res.status(401).json({ error: "Unauthorized - userId missing" });
    return;
  }

  if (!sessionId || !toUserId || !rating) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }

  const user = await prisma.user.findUnique({ where: { id: toUserId } });

  if (!user) {
    res.status(404).json({ error: "User to review not found." });
    return;
  }

  try {
    const review = await prisma.mentorReview.create({
      data: {
        sessionId,
        fromUserId: req.userId,
        toUserId,
        rating,
        feedback,
      },
    });

    res.status(201).json({ message: "Review submitted", review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};


// GET /api/mentor/review/:userId
export const getMentorReviews = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const reviews = await prisma.mentorReview.findMany({
      where: { toUserId: userId },
      include: {
        fromUser: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};
// GET /api/mentor/feedback/given
export const getGivenFeedbacks = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  try {
    const reviews = await prisma.mentorReview.findMany({
      where: { fromUserId: userId },
      include: {
        toUser: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch given feedback" });
  }
};
// GET /api/mentor/feedback/received
export const getReceivedFeedbacks = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  try {
    const reviews = await prisma.mentorReview.findMany({
      where: { toUserId: userId },
      include: {
        fromUser: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch received feedback" });
  }
};
