import express from "express"
import cors from "cors"
import "dotenv/config";
import mongoose from "mongoose";
import userRoute from './routes/userRoute'

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>{
    console.log("User Service connected to MongoDB")
})

const app=express();

app.use(cors())
app.use(express.json())

app.use("/api/my/user",userRoute)

const PORT = process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log(`User Service started on port ${PORT}`)
})
