import { Request,Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import { producer, TOPICS } from '../config/kafka';
import { indexRestaurant, updateRestaurantIndex } from '../services/elasticsearchService';

const createRestaurant=async(req:Request, res:Response)=>{

    try {
        const existingRestaurant= await Restaurant.findOne({user:req.userId})

        if(existingRestaurant){

            return res.status(409).json({message:"User already have a restaurant"});
        }

        const imageUrl = await uploadImage(req.file as Express.Multer.File);

        const restaurant = new Restaurant(req.body);
        restaurant.imageUrl = imageUrl;
        restaurant.user = new mongoose.Types.ObjectId(req.userId);
        restaurant.lastUpdated = new Date();
        await restaurant.save();

        // Index restaurant in Elasticsearch
        await indexRestaurant(restaurant);

        // Send Kafka event for restaurant creation
        try {
            await producer.send({
                topic: TOPICS.RESTAURANT_CREATED,
                messages: [
                    {
                        key: restaurant._id.toString(),
                        value: JSON.stringify({
                            restaurantId: restaurant._id,
                            userId: restaurant.user,
                            restaurantName: restaurant.restaurantName,
                            city: restaurant.city,
                            country: restaurant.country,
                            cuisines: restaurant.cuisines,
                            deliveryPrice: restaurant.deliveryPrice,
                            estimatedDeliveryTime: restaurant.estimatedDeliveryTime,
                            imageUrl: restaurant.imageUrl,
                        })
                    }
                ]
            });
            console.log('Restaurant created event sent to Kafka');
        } catch (error) {
            console.error('Failed to send restaurant created event to Kafka:', error);
        }

        res.status(201).send(restaurant);


    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error Occured"})
    }
}

const getRestaurant=async(req:Request, res:Response)=>{

    try {
        
        const restaurant =await Restaurant.findOne({user:req.userId})
        
        if(!restaurant){

            return res.status(404).json({message:"Restaurant not Found"})
        }

        res.json(restaurant)

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error Occured"})
    }

}

const updateRestaurant=async(req:Request, res:Response)=>{

    try {
        const restaurant = await Restaurant.findOne({ user: req.userId, });
      
        if (!restaurant) {
            return res.status(404).json({ message: "restaurant not found" });
        }
      
        restaurant.restaurantName = req.body.restaurantName;
        restaurant.city = req.body.city;
        restaurant.country = req.body.country;
        restaurant.deliveryPrice = req.body.deliveryPrice;
        restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
        restaurant.cuisines = req.body.cuisines;
        restaurant.menuItems = req.body.menuItems;
        restaurant.lastUpdated = new Date();
      
        if (req.file) {
            const imageUrl = await uploadImage(req.file as Express.Multer.File);
            restaurant.imageUrl = imageUrl;
        }
      
        await restaurant.save();

        // Update restaurant in Elasticsearch
        await updateRestaurantIndex(restaurant);

        // Send Kafka event for restaurant update
        try {
            await producer.send({
                topic: TOPICS.RESTAURANT_UPDATED,
                messages: [
                    {
                        key: restaurant._id.toString(),
                        value: JSON.stringify({
                            restaurantId: restaurant._id,
                            userId: restaurant.user,
                            restaurantName: restaurant.restaurantName,
                            city: restaurant.city,
                            country: restaurant.country,
                            cuisines: restaurant.cuisines,
                            deliveryPrice: restaurant.deliveryPrice,
                            estimatedDeliveryTime: restaurant.estimatedDeliveryTime,
                            imageUrl: restaurant.imageUrl,
                        })
                    }
                ]
            });
            console.log('Restaurant updated event sent to Kafka');
        } catch (error) {
            console.error('Failed to send restaurant updated event to Kafka:', error);
        }

        res.status(200).send(restaurant);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error Occured"})
    }

}

const uploadImage = async (file: Express.Multer.File) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    return uploadResponse.url;
  };

export default {
    createRestaurant,
    getRestaurant,
    updateRestaurant
}
