import express from "express";
import userController from "../controllers/userController";
import { jwtCheck } from "../middleware/auth";

const router=express.Router();

router.post("/", jwtCheck, userController.createCurrentUser)

export default router