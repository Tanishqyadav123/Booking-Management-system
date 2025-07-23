import { cancelEventById, getAllComedians, updateEventSeatsPrice } from "../controllers/comedian.controller";
import { authenticationMiddlware } from "../middlewares/authentication.middleware";
import { roleGuard } from "../middlewares/roleGuard.middleware";
import { Router } from "express";
import { userType } from "../entity/auth.entity";

const router = Router();

router.get("/", authenticationMiddlware, getAllComedians);
router.delete("/:eventId", authenticationMiddlware, roleGuard([userType.ADMIN, userType.COMEDIAN]), cancelEventById);
router.patch(
  "/event/:eventId/seats-price",
  authenticationMiddlware,
  roleGuard([userType.COMEDIAN]),
  updateEventSeatsPrice
);
export default router;
