import express from "express";
import userController from "../controllers/userController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateUser } from "../middleware/validation";

const router=express.Router();

router.post("/", jwtCheck, userController.createCurrentUser)
router.put("/", jwtCheck , jwtParse , validateUser,userController.updateCurrentUser)

export default router