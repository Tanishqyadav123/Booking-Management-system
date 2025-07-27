import { comedianDropDown, locationDropDown, venueDropDown } from "../controllers/dropdown.controller";
import { authenticationMiddlware } from "../middlewares/authentication.middleware";
import { Router } from "express";

const router = Router();

router.get("/comedian", authenticationMiddlware, comedianDropDown);
router.get("/location", authenticationMiddlware, locationDropDown);
router.get("/venue", authenticationMiddlware, venueDropDown);

export default router;
