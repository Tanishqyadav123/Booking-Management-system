import {
  getAllCompletedEvents,
  getAllEvents,
  getAllUpComingEvents,
  getEventDetails
} from "../controllers/viewer.controller";
import { authenticationMiddlware } from "../middlewares/authentication.middleware";
import { Router } from "express";

const router = Router();

router.get("/all-event", authenticationMiddlware, getAllEvents);
router.get("/all-completed-event", authenticationMiddlware, getAllCompletedEvents);
router.get("/all-upcoming-event", authenticationMiddlware, getAllUpComingEvents);
router.get("/event/:eventId", authenticationMiddlware, getEventDetails);

export default router;
