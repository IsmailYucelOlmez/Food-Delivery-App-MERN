import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import driverController from "../controllers/driverController";

const router = express.Router();

router.get("/search", driverController.getDrivers);
router.get("/profile", jwtCheck, jwtParse, driverController.getDriverById);
router.post("/", jwtCheck, jwtParse, driverController.createDriver);
router.put("/", jwtCheck, jwtParse, driverController.updateDriver);
router.get("/:id", driverController.getDriverDetails);

export default router;
