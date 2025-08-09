import express from "express";
import SearchRestaurantController from "../controllers/searchRestaurantController";

const router = express.Router();

router.get("/search/:city", SearchRestaurantController.searchRestaurant);
router.get("/:restaurantId", SearchRestaurantController.getRestaurantById);

export default router;
