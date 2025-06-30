import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { submitReview, getMentorReviews, getGivenFeedbacks, getReceivedFeedbacks } from "../controllers/mentor.controller";

const router = express.Router();

router.post("/review", authenticate, submitReview);

router.get("/review/:userId", getMentorReviews);
router.get("/feedback/given", authenticate, getGivenFeedbacks);
router.get("/feedback/received", authenticate, getReceivedFeedbacks);
export default router;
