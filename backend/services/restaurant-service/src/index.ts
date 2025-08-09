import express from "express"
import cors from "cors"
import "dotenv/config";
import mongoose from "mongoose";
import restaurantRoute from "./routes/restaurantRoute";
import { v2 as cloudinary } from "cloudinary";
import searchRestaurantRoute from './routes/searchRestaurantRoute'

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>{
    console.log("Restaurant Service connected to MongoDB")
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const app=express();

app.use(cors())
app.use(express.json())

app.use("/api/my/restaurant", restaurantRoute);
app.use("/api/restaurant", searchRestaurantRoute)

const PORT = process.env.PORT || 3002;

app.listen(PORT,()=>{
    console.log(`Restaurant Service started on port ${PORT}`)
})
