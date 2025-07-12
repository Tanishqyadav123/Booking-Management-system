import { addNewReview, deleteReviewById, getAllReviews } from "../controllers/review.controller";
import { authenticationMiddlware } from "../middlewares/authentication.middleware";
import express from "express";
import { roleGuard } from "../middlewares/roleGuard.middleware";
import { userType } from "../entity/auth.entity";

const router = express.Router();

router.post("/", authenticationMiddlware, roleGuard([userType.VIEWER]), addNewReview);
router.get("/", authenticationMiddlware, roleGuard([userType.ADMIN, userType.VIEWER]), getAllReviews);
router.delete("/:reviewId", authenticationMiddlware, roleGuard([userType.ADMIN, userType.VIEWER]), deleteReviewById);
export default router;
