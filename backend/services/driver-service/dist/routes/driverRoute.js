"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const driverController_1 = __importDefault(require("../controllers/driverController"));
const router = express_1.default.Router();
router.get("/search", driverController_1.default.getDrivers);
router.get("/profile", auth_1.jwtCheck, auth_1.jwtParse, driverController_1.default.getDriverById);
router.post("/", auth_1.jwtCheck, auth_1.jwtParse, driverController_1.default.createDriver);
router.put("/", auth_1.jwtCheck, auth_1.jwtParse, driverController_1.default.updateDriver);
router.get("/:id", driverController_1.default.getDriverDetails);
exports.default = router;
