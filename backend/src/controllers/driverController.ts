import Driver from "../models/driver";
import { Request, Response } from "express";
import mongoose from "mongoose";

export const getDrivers = async (req: Request, res: Response) => {
    try {
        
        const location = (req.query.location as string) || "";
        const licence_type = (req.query.licence_type as string) || "";
        const experience_years = (req.query.experience_years as string) || "";
        const have_vehicle_type = (req.query.have_vehicle_type as string) || "";
        const selectedCuisines = (req.query.selectedCuisines as string) || "";      
        const page = parseInt(req.query.page as string) || 1;

        let query: any = {};

        if (selectedCuisines) {
            const cuisinesArray = selectedCuisines.split(",").map((cuisine) => new RegExp(cuisine, "i"));

            query["cuisines"] = { $all: cuisinesArray };
        }      

        const pageSize = 10;
        const skip = (page - 1) * pageSize;

        const sortOption = "lastUpdated";
        const drivers = await Driver.find(query).sort({ [sortOption]: 1 }).skip(skip).limit(pageSize).lean();


        const total = await Driver.countDocuments(query);

        const response = {
            data: drivers,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / pageSize),
            },
        };

        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Occured" });
    }
}

export const createDriver=async(req:Request,res:Response)=>{

    try {

        const existingDriver=await Driver.findOne({user:req.userId});

        if(existingDriver){

            return res.status(409).json({message:"Driver already exists"})
        }

        const driver=new Driver(req.body)
        driver.user=new mongoose.Types.ObjectId(req.userId);
        driver.created_at=new Date();
        driver.updated_at=new Date();

        await driver.save();
        res.status(201).send(driver);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error Occured"})
    }
}

export const updateDriver=async(req:Request,res:Response)=>{

    try {
        const driver=await Driver.findOne({user:req.userId});

        if(!driver){
            return res.status(404).json({message:"Driver not Found"})
        }

        driver.location=req.body.location;
        driver.license_type=req.body.license_type;
        driver.experience_years=req.body.experience_years;
        driver.languages=req.body.languages;
        driver.have_vehicle_type=req.body.have_vehicle_type;
        driver.additional_info=req.body.additional_info;
        driver.updated_at=new Date();

        await driver.save();
        res.status(200).json(driver);
        
    } catch (error) {   
        console.log(error);
        res.status(500).json({message:"Error Occured"})
    }
}

export default { getDrivers,createDriver,updateDriver }