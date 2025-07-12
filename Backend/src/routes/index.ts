import adminRouter from "./admin.router";
import authRouter from "./auth.router";
import comedianRouter from "./comedian.router";
import eventRouter from "./event.router";
import locationRouter from "./location.router";
import reviewRouter from "./review.router";
import { Router } from "express";
import seatTypeRouter from "./seat.router";
import venueRouter from "./venue.router";
import viewerRouter from "./viewer.router";
const router = Router();

router.use("/auth", authRouter);
router.use("/viewer", viewerRouter);
router.use("/comedian", comedianRouter);
router.use("/admin", adminRouter);
router.use("/location", locationRouter);
router.use("/seat-types", seatTypeRouter);
router.use("/venue", venueRouter);
router.use("/event", eventRouter);
router.use("/review", reviewRouter);

export default router;
