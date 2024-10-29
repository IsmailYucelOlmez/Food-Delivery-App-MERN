import express, {Request,Response} from "express"
import cors from "cors"
import "dotenv/config";
import mongoose from "mongoose";
import userRoute from './routes/userRoute'


mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>{
    console.log("connected")
})


const app=express();

app.use(express.json())
app.use(cors())

app.use("/api/my/user",userRoute)

app.listen(7000,()=>{
    console.log("server started")
})