import {
  createNewVenue,
  deleteVenueById,
  getAllVenueByLocation,
  getVenueById,
  getVenueDetailsWithSeats,
  updateVenueDetails
} from "../controllers/venue.controller";
import { authenticationMiddlware } from "../middlewares/authentication.middleware";
import { roleGuard } from "../middlewares/roleGuard.middleware";
import { Router } from "express";
import { upload } from "../middlewares/multer";
import { userType } from "../entity/auth.entity";

const router = Router();

router.post("/", authenticationMiddlware, roleGuard([userType.ADMIN]), upload.single("venueImage"), createNewVenue);
router.get("/location/:locationId", authenticationMiddlware, getAllVenueByLocation);
router.get("/:venueId", authenticationMiddlware, getVenueById);
router.get("/seat-detail/:venueId", authenticationMiddlware, getVenueDetailsWithSeats);
router.patch("/:venueId", authenticationMiddlware, upload.single("venueImage"), updateVenueDetails);
router.delete("/:venueId", authenticationMiddlware, roleGuard([userType.ADMIN]), deleteVenueById);
export default router;
