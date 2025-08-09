"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const searchRestaurantController_1 = __importDefault(require("../controllers/searchRestaurantController"));
const router = express_1.default.Router();
router.get("/search/:city", searchRestaurantController_1.default.searchRestaurant);
router.get("/:restaurantId", searchRestaurantController_1.default.getRestaurantById);
exports.default = router;
