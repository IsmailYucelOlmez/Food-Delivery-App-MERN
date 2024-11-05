import express from "express";
import userController from "../controllers/userController";
import { jwtCheck, jwtParse } from "../middleware/auth";


const router=express.Router();

router.get("/", jwtCheck, jwtParse, userController.getCurrentUser)
router.post("/", jwtCheck, userController.createCurrentUser)
router.put("/", jwtCheck , jwtParse , userController.updateCurrentUser)

export default router