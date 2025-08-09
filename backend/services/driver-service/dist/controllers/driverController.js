"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDriver = exports.createDriver = exports.getDriverById = exports.getDrivers = void 0;
const driver_1 = __importDefault(require("../models/driver"));
const mongoose_1 = __importDefault(require("mongoose"));
const createRegexArray = (input) => {
    return input.split(",").map((item) => new RegExp(item.trim(), "i"));
};
const getDrivers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const location = req.query.searchQuery || "";
        const licence_type = req.query.licence || "";
        const page = parseInt(req.query.page) || 1;
        let query = {};
        if (licence_type) {
            const licencesArray = licence_type.split(",").map((licence) => new RegExp(licence, "i"));
            query["licence_type"] = { $all: licencesArray };
        }
        if (location) {
            query["location"] = { $in: createRegexArray(location) };
        }
        const pageSize = 10;
        const skip = (page - 1) * pageSize;
        console.log(query);
        const drivers = yield driver_1.default.find(query).skip(skip).limit(pageSize).lean();
        // lean() function return the documents from queries with the lean option enabled are plain JavaScript objects, not Mongoose Documents.
        const total = yield driver_1.default.countDocuments(query);
        const response = {
            data: drivers,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / pageSize),
            },
        };
        res.json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Occured" });
    }
});
exports.getDrivers = getDrivers;
const getDriverById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driver = yield driver_1.default.findOne({ user: req.userId });
        if (!driver) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(driver);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Occured" });
    }
});
exports.getDriverById = getDriverById;
const createDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingDriver = yield driver_1.default.findOne({ user: req.userId });
        if (existingDriver) {
            return res.status(409).json({ message: "Driver already exists" });
        }
        const driver = new driver_1.default(req.body);
        driver.user = new mongoose_1.default.Types.ObjectId(req.userId);
        driver.created_at = new Date();
        driver.updated_at = new Date();
        console.log(driver);
        yield driver.save();
        res.status(201).send(driver);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Occured" });
    }
});
exports.createDriver = createDriver;
const updateDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driver = yield driver_1.default.findOne({ user: req.userId });
        if (!driver) {
            return res.status(404).json({ message: "Driver not Found" });
        }
        driver.location = req.body.location;
        driver.licence_type = req.body.licence_type;
        driver.experience_years = req.body.experience_years;
        driver.languages = req.body.languages;
        driver.have_vehicle_type = req.body.have_vehicle_type;
        driver.additional_info = req.body.additional_info;
        driver.updated_at = new Date();
        yield driver.save();
        res.status(200).json(driver);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Occured" });
    }
});
exports.updateDriver = updateDriver;
const getDriverDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverId = req.params.id;
        const driver = yield driver_1.default.findOne({ user: driverId });
        if (!driver) {
            return res.status(404).json({ message: "driver not found" });
        }
        res.json(driver);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
});
exports.default = { getDrivers: exports.getDrivers, createDriver: exports.createDriver, updateDriver: exports.updateDriver, getDriverById: exports.getDriverById, getDriverDetails };
