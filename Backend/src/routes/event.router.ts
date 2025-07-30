import {
  allMyEvents,
  createNewEvent,
  getEventById,
  getEventDetailsWithSingleSeat
} from "../controllers/event.controller";
import { authenticationMiddlware } from "../middlewares/authentication.middleware";
import express from "express";
import { roleGuard } from "../middlewares/roleGuard.middleware";
import { upload } from "../middlewares/multer";
import { userType } from "../entity/auth.entity";

const router = express.Router();

router.get("/my", authenticationMiddlware, roleGuard([userType.COMEDIAN]), allMyEvents);
router.post("/", authenticationMiddlware, roleGuard([userType.COMEDIAN]), upload.single("eventBanner"), createNewEvent);
router.get("/:eventId", authenticationMiddlware, getEventById);
router.get("/single-seats/:eventId", authenticationMiddlware, getEventDetailsWithSingleSeat);
export default router;
