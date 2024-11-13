import express from "express"
import searchRestaurantController from "../controllers/searchRestaurantController";
import { param } from "express-validator";

const router=express.Router();

router.get("/:restaurantId",param("restaurantId").isString().trim().notEmpty().withMessage("RestaurantId paramenter must be a valid string"),searchRestaurantController.getRestaurantById)
router.get("/search/:city",param("restaurantId").isString().trim().notEmpty().withMessage("City paramenter must be a valid string"),searchRestaurantController.searchRestaurant)

export default router 