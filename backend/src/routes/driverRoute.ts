import express  from "express";
import { jwtCheck, jwtParse } from '../middleware/auth';
import driverController from '../controllers/driverController';

const router=express.Router();

router.get("/",jwtCheck,jwtParse,driverController.getDrivers)
router.post("/",jwtCheck,jwtParse,driverController.createDriver)
router.put("/",jwtCheck,jwtParse,driverController.updateDriver)

export default router