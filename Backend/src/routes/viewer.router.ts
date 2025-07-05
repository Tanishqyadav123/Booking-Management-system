import { getAllEvents, getEventDetails } from "../controllers/viewer.controller";
import { authenticationMiddlware } from "../middlewares/authentication.middleware";
import { Router } from "express";

const router = Router();

router.get("/all-event", authenticationMiddlware, getAllEvents);
router.get("/event/:eventId", authenticationMiddlware, getEventDetails);

export default router;
