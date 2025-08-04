import { createOrder, verifyPayment } from "../controllers/booking.controller";
import { authenticationMiddlware } from "../middlewares/authentication.middleware";
import express from "express";
import { roleGuard } from "../middlewares/roleGuard.middleware";
import { userType } from "../entity/auth.entity";

const router = express.Router();

router.post("/create-order", authenticationMiddlware, roleGuard([userType.VIEWER]), createOrder);
router.post("/verify-payment", authenticationMiddlware, roleGuard([userType.VIEWER]), verifyPayment);

export default router;
