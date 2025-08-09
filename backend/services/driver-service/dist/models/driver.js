"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const driverSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    user_name: { type: String, required: true },
    location: { type: String, required: true, },
    licence_type: { type: [String], required: true },
    experience_years: { type: Number, required: true },
    languages: { type: [String], required: true, },
    have_vehicle_type: { type: [String], required: false, },
    additional_info: { type: String, required: false, },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});
const Driver = mongoose_1.default.model("Driver", driverSchema);
exports.default = Driver;
