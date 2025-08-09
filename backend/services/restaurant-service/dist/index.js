"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const restaurantRoute_1 = __importDefault(require("./routes/restaurantRoute"));
const cloudinary_1 = require("cloudinary");
const searchRestaurantRoute_1 = __importDefault(require("./routes/searchRestaurantRoute"));
mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
    console.log("Restaurant Service connected to MongoDB");
});
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/my/restaurant", restaurantRoute_1.default);
app.use("/api/restaurant", searchRestaurantRoute_1.default);
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Restaurant Service started on port ${PORT}`);
});
