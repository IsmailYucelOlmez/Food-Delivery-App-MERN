"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const driverRoute_1 = __importDefault(require("./routes/driverRoute"));
mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
    console.log("Driver Service connected to MongoDB");
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/driver", driverRoute_1.default);
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Driver Service started on port ${PORT}`);
});
