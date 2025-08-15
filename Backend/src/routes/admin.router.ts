import { adminSignIn, adminSignUp, getAdminProfile, getAnalyticsData } from "../controllers/admin.controller";
import { authenticationMiddlware } from "../middlewares/authentication.middleware";
import { roleGuard } from "../middlewares/roleGuard.middleware";
import { Router } from "express";
import { userType } from "../entity/auth.entity";

const router = Router();

router.post("/sign-up", adminSignUp);
router.post("/sign-in", adminSignIn);
router.get("/get-me", authenticationMiddlware, roleGuard([userType.ADMIN]), getAdminProfile);
router.get("/analytics", authenticationMiddlware, roleGuard([userType.ADMIN]), getAnalyticsData);

export default router;
