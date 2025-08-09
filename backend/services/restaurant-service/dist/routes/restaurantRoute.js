"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const restaurantController_1 = __importDefault(require("../controllers/restaurantController"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, //5mb
    },
});
router.get("/", auth_1.jwtCheck, auth_1.jwtParse, restaurantController_1.default.getRestaurant);
router.post("/", upload.single("imageFile"), auth_1.jwtCheck, auth_1.jwtParse, restaurantController_1.default.createRestaurant);
router.put("/", upload.single("imageFile"), auth_1.jwtCheck, auth_1.jwtParse, restaurantController_1.default.updateRestaurant);
exports.default = router;
