"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
    console.log("Order Service connected to MongoDB");
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use("/api/order/checkout/webhook", express_1.default.raw({ type: "*/*" }));
app.use(express_1.default.json());
app.use("/api/order", orderRoute_1.default);
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Order Service started on port ${PORT}`);
});
