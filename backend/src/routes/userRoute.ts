import express from "express";
import userController from "../controllers/userController";
import { jwtCheck, jwtParse } from "../middleware/auth";

const router=express.Router();

router.post("/", jwtCheck, jwtParse, userController.createCurrentUser)
router.put("/", jwtParse, userController.updateCurrentUser)

export default router