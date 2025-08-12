import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import userRoute from './routes/userRoute'
import Database from "./db";

dotenv.config();

const db = Database.getInstance();

const PORT = process.env.PORT || 3001;

const app=express();

app.use(cors())
app.use(express.json())

app.use("/api/my/user",userRoute)

const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING || 'mongodb://mongodb:27017/fooddelivery';

db.connect(mongoConnectionString);

app.listen(PORT,()=>{
    console.log(`User Service started on port ${PORT}`)
})
