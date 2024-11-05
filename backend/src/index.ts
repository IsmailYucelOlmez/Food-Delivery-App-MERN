import express, {Request,Response} from "express"
import cors from "cors"
import "dotenv/config";
import mongoose from "mongoose";
import userRoute from './routes/userRoute'
import { v2 as cloudinary } from "cloudinary";


mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>{
    console.log("connected")
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const app=express();

app.use(express.json())
app.use(cors())

app.use("/api/my/user",userRoute)

app.listen(7000,()=>{
    console.log("server started")
})